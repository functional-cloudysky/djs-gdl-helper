function print(x) {
	console.log(x);
}

function prt(x) {
	process.stdout.write(x);
}

function beep(cnt) {
	return;
}

function shell(c) {
	(require("child_process")).exec(c);
}

function sound(a) {
	return;
}

function EmbedMsgbox(typ, content) {
	if( typ == '!' ) {
		var MsgBox = new DJS11.RichEmbed()
			.setColor('#00C8C8')
			.setTitle('주의')
			.setDescription( "<:WXPMBX03:706030882036908032> " + content );

		return MsgBox;
	} else if( typ.toUpperCase() == 'X' ) {
		var MsgBox = new DJS11.RichEmbed()
			.setColor('#00C8C8')
			.setTitle('문제가 발생했습니다!')
			.setDescription( "<:WXPMBX01:704469296683810836> " + content );

		return MsgBox;
	} else if( typ == '?' ) {
		var MsgBox = new DJS11.RichEmbed()
			.setColor('#00C8C8')
			.setTitle('질문')
			.setDescription( "<:W95MBX02:704529164396658720> " + content );

		return MsgBox;
	} else {
		var MsgBox = new DJS11.RichEmbed()
			.setColor('#00C8C8')
			.setTitle('알림')
			.setDescription( "<:W95MBX04:704529118280155196> " + content );

		return MsgBox;
	}
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function rndval(length, chars) {
    var result           = '';
    var characters       = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=+-]}{[\'";:/?.,<>~!@#$%^&()';
    var charactersLength = characters.length;
    for(var i=0; i<length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function rndvalue(chr, length) {
	var result           = '';
	var characters       = chr;
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function swear(content) {
	var sw = ['FUCK', 'SHIT', '!ASSHOLE', '!PISSOFF', '!DICKHEAD', 'BITCH', 'BASTARD', '씨발', '병신',
				'지랄', 'ㅅㅂ', 'ㅆㅂ', 'ㅄ', 'ㅂㅅ', '젠장', '개새끼', '존나', '좆나', '뻑유',
				'!왓더퍼킹', '쉽새끼', '양아치', '🖕'];

	var retval = false;
	var retcnt = content;
	var idx = 0;

	for(var swd of sw) {
		if(swd.startsWith("!")) {
			if(content.toUpperCase().replace(/\s/gi, '').includes(swd.replace("!", ''))) {
				retval = true;

				var regex = new RegExp(swd.replace("!", ''), "gi");

				retcnt = retcnt.replace(regex, "(욕설치환" + String(idx + 10000) + ")");
			}
		} else {
			if(content.toUpperCase().includes(swd)) {
				retval = true;

				var regex = new RegExp(swd, "gi");

				retcnt = retcnt.replace(regex, "(욕설치환" + String(idx + 20000) + ")");
			}
		}

		idx++;
	}

	return [retval, retcnt];
}

function progress(val) {
	if(val > 95) return '[`####################`]';
	if(val > 90) return '[`###################-`]';
	if(val > 85) return '[`##################--`]';
	if(val > 80) return '[`#################---`]';
	if(val > 75) return '[`################----`]';
	if(val > 70) return '[`###############-----`]';
	if(val > 65) return '[`##############------`]';
	if(val > 60) return '[`#############-------`]';
	if(val > 55) return '[`############--------`]';
	if(val > 50) return '[`###########---------`]';
	if(val > 45) return '[`##########----------`]';
	if(val > 40) return '[`#########-----------`]';
	if(val > 35) return '[`########------------`]';
	if(val > 30) return '[`#######-------------`]';
	if(val > 25) return '[`######--------------`]';
	if(val > 20) return '[`#####---------------`]';
	if(val > 15) return '[`####----------------`]';
	if(val > 10) return '[`###-----------------`]';
	if(val >  5) return '[`#-------------------`]';
	if(val >= 0) return '[`--------------------`]';
}

var rtimer = null;

var GotYellowCards = [];
var lowConnections = []; // 접속율 낮은사람
var lowMessageRate = []; // 말 거의 없는사람
var noNotification = []; // 들어와도 알림 안받음

var jsnSwearWarnings = {};

var jsnMsgCounts = {};

print("helper 시작 중. . .\n");

const readline = require('readline');

const DJS11 = require('djs11');

const CONST11 = require('djs11/src/util/Constants.js');
CONST11.DefaultOptions.ws.properties.$browser = `Discord Android`;

const client = new DJS11.Client({
	prefix: '!'
});

function getUserStatus(id) {
	const prec = client.users.find(user => user.id == id).presence;

	try {
		if(prec['game']['name'].toLowerCase() == 'custom status') {
			return prec['game']['state'];
		} else {
			return "-";
		}
	} catch(e) {
		return "-";
	}
}

function convertMention(mention) {
	var retval = mention;

	const matches = mention.match(/<@!?(\d+)>/g);

	if (!matches) return mention;

	for(m of matches) {
		try {
			const id = m.match(/<@!?(\d+)>/)[1];
			const us = client.users.find(user => user.id == id)['username'];
			retval = retval.replace(m, `[@${us}]`);
		} catch(e) {}
	}

	return retval;

	//const id = matches[1];

	//return client.users.find(user => user.id == id);
}

function getUserFromMention(mention) {
	const matches = mention.match(/<@!?(\d+)>/);

	if (!matches) return;

	const id = matches[1];

	return client.users.find(user => user.id == id);
}


myUsername = "gdl-helper";

var sch, cid, ns, nc;

var jsnIsMemberMobile = {};
var jsnLastMessage = {}, jsnUserTimeout = {}, jsnUserTimeout2 = {};
var jsnUserStats = {}, jsnOldMsg = {}, jsnOldMsgCnt = {}, jsnHello = {}, jsnWarned = {}, jsnNoWarning = {  };
var dios = [[]], dl = [];
var jsnCustomStatus = {};

var jsnDidMemberJoined = {};

var connected = false;

client.on('ready', () => {
	print('[v11] 로그인 완료!');//\n\n' +
	//		'┌──────────────────────────┐ \n' +
	//		'│T-자유대화       A-고급대화실       R-AlphaGeneral  │ \n' +
	//		'│E-개인실험실     S-test server 2    Y-AlphaYT       │ \n' +
	//		'│X-시험실         G-게임방           O-회의실        │ \n' +
	//		'└──────────────────────────┘ ');
	//client.user.setGame("!help", "https://www.twitch.tv/-");
	con1 = 1;
	connected = true;

	client.user.setPresence({
		status: "invisible"/*,
		activity: {
			name: '<TM 관리 중단됨>',  //The message shown
			type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
		},
		game: {
			name: '<TM 관리 중단됨>',  //The message shown
			type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
		}*/
	});

	// client.channels.get("669855794220630030").send(EmbedMsgbox("!", "helper v200522.5 RC 버전 [디버그] 실행 중입니다. 곧 이 버전이 정식 적용될 예정입니다. [[오작동 신고]](https://discord.gg/e5W9G6e)"));
});

function toDate(t) {
	var date = new Date(Number(t));
	
	var hour = date.getHours(); hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes(); min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds(); sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1; month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate(); day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

function getTime() {
	return toDate(new Date());
}

const fs = require('fs');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var lastMessager = '-1';

var jsnRandomLevel = {};

String.prototype.__defineGetter__('lower', () => this.toLowerCase());
String.prototype.__defineGetter__('upper', () => this.toUpperCase());

const prefix = '!';

// 노드 최신 버전에선 (params, { member }) 이렇게 쓰는건뎅;;;
client.command('MUTE', (params, msg) => {
	const member = msg.member;
	const tag = params.value('member') || params.value('m');
	if(!tag) return msg.reply2('[자동발신] 형식: !mute --member=사용자이름#1234 [--reason=차단사유] [--duration=분단위기간] [--hard] [--force]\n\n * -m=태그, --member=태그: 차단할 사용자\n * -r=사유, --reason=사유: 차단하는 이유를 지정합니다.\n * -d=기간, --duration=기간: 차단할 기간을 분 단위로 지정합니다. 0으로 지정하면 무기한 차단됩니다.\n * -h, --hard: 레드 카드를 부여합니다.\n * -f, --force: 차단할 수 없는 사용자를 강제로 차단합니다.', 1);
	const reason = params.value('reason') || params.value('r') || '명시되지 않음';
	const duration = Number(params.value('duration') || params.value('d') || '0') || 0;
	const hard = params.has('hard') || params.has('h');
	const force = params.has('force') || params.has('f');
	
	const mbr = msg.guild.members.find(m => m.user.tag == tag);
	if(!mbr) return msg.reply2('[자동발신] 그런 멤버는 없습니다.', 1);
	
	if(msg.guild.id != '669855794220630027') return msg.reply2('[자동발신] 이 서버는 해당 기능을 지원하지 않습니다.', 1);
	if(!msg.member.roles.has('690915757932150785') && msg.author.id != '453432847617884172' && msg.author.id != msg.guild.ownerID) {
		return msg.reply2('[자동발신] 권한이 부족합니다.', 1);
	}
	if(!force && ([].includes(client.users.find(u => u.tag == tag).id))) {
		return msg.reply2('[자동발신] 지정한 사용자는 차단될 수 없습니다. 그래도 차단하고싶다면 --force(-f) 스위치를 사용하십시오.', 1);
	}
	
	var embed = new DJS11.RichEmbed()
		.setColor('#00C8C8')
		.setTitle(member.user.username + '가 권한 행사')
		.setDescription(client.users.find(u => u.tag == tag).username + ' ' + (hard ? '강한' : '약한') + ' 차단')
		.addField('발생 채널', msg.channel.name, 1)
		.addField('사유', reason, 1)
		.addField('기간(분)', duration || '무기한')
		.setTimestamp();
		
	msg.reply2('[자동발신] 차단했습니다.');
	
	if(hard) mbr.addRole('712945740720111638');
	else mbr.addRole('684361506271264778');
	
	client.channels.get('741236541367779338').send(embed);
});

client.on('message', (msg) => {
	if(msg.webhookID) return;
	
	var args = msg.content.split(/ +/);
	var command = args[0].toLowerCase().replace(prefix, '');
	var param = idx => args[idx];
	
	if(command == 'vcjoin') {
		var _vc = args[1];
		var vc;
		if(!_vc) {
			return msg.channel.send(EmbedMsgbox('X', '채널 이름을 알려주지 않았읍니다.'));
		}
		
		_vc = _vc.replace(/\\x20/g, ' ');
		
		if(Number(_vc)) {
			vc = client.channels.get(_vc);
		} else {
			vc = client.channels.find('name', _vc);
		}
		
		if(!vc) return msg.channel.send(EmbedMsgbox('X', '채널을 찾을 수 없습니다(대소문자 구분 주의).'));
		if(vc.type != 'voice') return msg.channel.send(EmbedMsgbox('X', '음성 채널이 아닙니다.'));
		
		vc.join().then(c => connection = c);
	}
	
	if(command == 'vcleave') {
		var _vc = args[1];
		var vc;
		if(!_vc) {
			return msg.channel.send(EmbedMsgbox('X', '채널 이름을 알려주지 않았읍니다.'));
		}
		
		_vc = _vc.replace(/\\x20/g, ' ');
		
		if(Number(_vc)) {
			vc = client.channels.get(_vc);
		} else {
			vc = client.channels.find('name', _vc);
		}
		
		if(!vc) return msg.channel.send(EmbedMsgbox('X', '채널을 찾을 수 없습니다(대소문자 구분 주의).'));
		if(vc.type != 'voice') return msg.channel.send(EmbedMsgbox('X', '음성 채널이 아닙니다.'));
		
		vc.leave();
		connection = null;
	}

	if(msg.guild !== null) {
		var username;
		try {
			username = client.users.find(user => user.id == msg.member.user.id)['username'];
		} catch(e) {
			username = "x";
		}

		jsnLastMessage[msg.member.user.id] = msg.content;
	
		// 아 node.js 5.0 콘스트 짜증나
		if(command == 'random-level') {
			// 7949 2370 5201 3281 50
			if(jsnRandomLevel[msg.member.user.id]) return msg.channel.send(EmbedMsgbox('X', '이 기능은 1시간에 한 번씩만 쓸 수 있습니다. ~~그렇다고 계정 새로 파지 맙시당 ^^;;;~~'));
			var tm = client.guilds.get(msg.guild.id);
			var member = tm.members.random();
			var user = member.user;
			var limit = 0;
			
			while(user.bot || member.roles.has('694406926305460314') || user.id == msg.member.user.id) {
				member = tm.members.random();
				user = member.user;
				limit++;
				if(limit > 200) {
					break;
				}
			}
			
			jsnRandomLevel[msg.member.user.id] = 1;
			setTimeout(() => jsnRandomLevel[msg.member.user.id] = 0, 1000 * 60 * 60);
			
			client.channels.get('794923705201328150').send('!GIVELEVEL ' + user.id + ' ' + msg.guild.id + ' ' + msg.member.user.id + ' ' + msg.channel.id);
		}
	
		if(command == 'random-member') {
			// 7949 2370 5201 3281 50
			var tm = client.guilds.get(msg.guild.id);
			var member = tm.members.random();
			var user = member.user;
			var limit = 0;
			
			while(user.bot || member.roles.has('694406926305460314')) {
				member = tm.members.random();
				user = member.user;
				limit++;
				if(limit > 200) {
					break;
				}
			}
			
			msg.channel.send('[자동발신] 랜덤으로 멤버를 뽑았읍니다. (당첨자: ' + user.tag + ')');
		}
		
		if(msg.content.toUpperCase().startsWith("!EQUATION2")) {
			msg.channel.send(EmbedMsgbox("!", "!EQUATION2 명령어는 정상적으로 동작하지 않습니다. !X-EQUATION2 명령어를 사용하십시오."));
		}

		if(msg.content.toUpperCase().startsWith("!X-EQUATION2")) { (function() {
			var rawnum = msg.content.toLowerCase().replace(/\s/g, '').replace("!x-equation2", '');
			
			// 귀찮음
			if (
				rawnum.includes('(') || 
				rawnum.includes(')') || 
				
				rawnum.includes('[') || 
				rawnum.includes(']') || 
				
				rawnum.includes('{') || 
				rawnum.includes('}') || 
				
				rawnum.includes('/') || 
				rawnum.includes('*')
			) return msg.channel.send(EmbedMsgbox("X", "항이 많은 것은 처리할 수 있지만 분수, 곱셉이나 괄호가 있으면 안 됩니다. 정리해서 다시 하십시오."));

			var a = 0, b = 0, c = 0, d; var la = 0, lb = 0, lc = 0;
			while(1) {
				if(la > 2004) {
					return msg.channel.send(EmbedMsgbox("X", "x의 2승의 계수가 2,004개를 초과했읍니다."));
				}
				
				var _제곱계수 = rawnum.match(/(-?(\d*))x([^]|)2/);
				if(! _제곱계수 ) break; _제곱계수 = _제곱계수 [0];
				var __제곱계수 = _제곱계수 ['replace'] (/x([^]|)2$/, '');
				if(__제곱계수 == '')  __제곱계수 = '1';
				if(__제곱계수 == '-') __제곱계수 = '-1';
				var 제곱계수 = Number( __제곱계수 );
				a += 제곱계수;
				rawnum = rawnum.replace( _제곱계수, '' );
				la++;
			}
			
			while(1) {
				if(lb > 2005) {
					return msg.channel.send(EmbedMsgbox("X", "x의 계수가 2,005개를 초과했읍니다."));
				}
				
				var _계수 = rawnum.match(/(-?(\d*))x/);
				if(! _계수 ) break; _계수 = _계수 [0];
				var __계수 = _계수 ['replace'] (/x$/, '');
				if(__계수 == '')  __계수 = '1';
				if(__계수 == '-') __계수 = '-1';
				var 계수 = Number( __계수 );
				b += 계수;
				rawnum = rawnum.replace( _계수, '' );
				lb++;
			}
			
			while(1) {
				if(lc > 2002) {
					return msg.channel.send(EmbedMsgbox("X", "상수항의 개수가 2,002개를 초과했읍니다."));
				}
				
				var _상수 = rawnum.match(/(-?(\d+))/);
				if(! _상수 ) break; _상수 = _상수 [0];
				var 상수 = Number( _상수 ) || 0;
				c += 상수;
				rawnum = rawnum.replace( _상수, '' );
				lc++;
			}
			
			// 판별식
			d = b*b + ((-4) * a * c);
			if(d < 0) return msg.channel.send('[자동발신] 허근 (해 없음)');
			if(!d)    return msg.channel.send('[자동발신] 중근 (' + ((-b) / (2 * a)) + ')');
			else      return msg.channel.send('[자동발신] 실근 (' + (((-b) + Math.sqrt(d)) / (2 * a)) + ' 또는 ' + (((-b) - Math.sqrt(d)) / (2 * a)) + ')');
			
		})(); }
		
		if(msg.content.toUpperCase().startsWith("!FUNCTION-STANDARD")) {
			msg.channel.send(EmbedMsgbox("!", "!X-FUNCTION-STANDARD 명령어를 사용하십시오."));
		}
		
		if(msg.content.toUpperCase().startsWith("!X-FUNCTION-STANDARD")) { (function() {
			const 식 = msg.content.toLowerCase().replace(/\s/g, '').replace(/[|]/g, ',').replace('y=', '').replace('!x-function-standard', '');
			var a, b, c; if(식 ['match'] (/^(\d*)x([^]|)2([+]|[-])(\d*)x([+]|[-])(\d*)$/)) {
				return msg.channel.send(EmbedMsgbox("X", "개발 중입니다. a, b 및 c의 값을 지정하십시오."));
			} else if(식 ['match'] (/^(\d+)[,](\d+)[,](\d+)$/)) {
				const nl = 식 ['split'] (',');
				a = Number(nl[0]) || 0;
				b = Number(nl[1]) || 0;
				c = Number(nl[2]) || 0;
				
				const x = b / (2 * a);
				const y = ((4 * a * c - (b*b)) / (4 * a));
				
				msg.channel.send('[자동발신] y = ' + (a == 1 ? '' : a) + '(x ' + (x > 0 ? ('+' + x) : x) + ')^2 ' + (y > 0 ? ('+' + y) : x));
			} else {
				return msg.channel.send(EmbedMsgbox("X", "형식: `!X-FUNCTION-STANDARD y = ax^2 + bx + c` 또는 `!X-FUNCTION-STANDARD a, b, c` 또는 `!X-FUNCTION-STANDARD a | b | c`"));
			}
		})(); }
		
		if(command == 'crash-prune') clearInterval(rtimer), msg.channel.send('[자동발신] ' + '일괄 삭제 타이머가 중지됐읍니다.');
		
		if(command == 'prune') { (function() {
			if(!msg.member.hasPermission('MANAGE_MESSAGES')) {
				return msg.channel.send('[자동발신] 안돼요!!');
			}
			
			var count = Number(param(1));
			var ttc   = Number(param(2)) || 10;
			if(count !== 0 && !count) return msg.channel.send('[자동발신] 형식: `!prune 삭제할-메시지-수 [타이머-초-시간=10]`\n(대괄호가 있는 것은 써도 되고 안 써도 되는 옵션으로 안 쓰면 등호 뒤의 값이 사용됩니다. 사용할 경우 대괄호는 빼고 입력하십시오)');
			if(ttc < 7 || ttc > 5555555555555555555)
				return msg.channel.send('[자동발신] 삭제 타이머는 7초 이상 5,555,555,555,555,555,555초 이하이여야 합니다.' + (ttc < 7 ? ' 타이머는 실수로 중요한 메시지를 대량으로 지우는 대참사를 방지하기 위함을 기억해주세요.' : ''));
			
			var template = (s, p) => '채널 메시지 ' + count + '개를 ' + (s < 0 ? 0 : (Math.floor(s) == s ? (s + '.0') : s)) + '초 뒤 지우려고 합니다(취소: `!crash-prune`)... ' + p;
			
			msg.channel.send(template(ttc, progress(0))).then(message => {
				var tv = 0, ts = ttc;
				rtimer = setInterval(() => {
					if(ts <= 0) {
						msg.channel.bulkDelete(count);
						clearInterval(rtimer);
					} else {
						message.edit(template(ts -= 1.5, progress(tv += ((1.5 / ttc) * 100))));
					}
				}, 1500);
			});
		})(); }
		
		if(command == 'timer') { (function() {
			var ttc   = Number(param(1));
			var prpt  = msg.content.replace(prefix, '').replace(/timer/i, '').replace(param(1), '').replace(/^(\s*)/, '') || '';
			
			if(ttc !== 0 && !ttc) return msg.channel.send('[자동발신] 형식: `!timer 초단위-시간 [안내문]`\n(대괄호가 있는 것은 써도 되고 안 써도 되는 옵션으로 안 쓰면 등호 뒤의 값이 사용됩니다. 사용할 경우 대괄호는 빼고 입력하십시오)');
			if(ttc < 1 || ttc > 5555555555555555555)
				return msg.channel.send('[자동발신] 타이머는 1초 이상 5,555,555,555,555,555,555초 이하이여야 합니다.');
			
			var template = (m, s, p) => m + ' ' + (s < 0 ? 0 : (Math.floor(s) == s ? (s + '.0') : s)) + '초 남았습니다... ' + p;
			
			msg.channel.send(template(prpt, ttc, progress(0))).then(message => {
				var tv = 0, ts = ttc;
				var ttimer = setInterval(() => {
					if(ts <= 0) {
						msg.channel.send('[자동발신] ' + msg.author.username + '의 타이머가 끝났읍니다!');
						clearInterval(ttimer);
					} else {
						message.edit(template(prpt, ts -= 1.5, progress(tv += ((1.5 / ttc) * 100))));
					}
				}, 1500);
			});
		})(); }
		
		if(command == 'help') {
			msg.channel.send (
				'<확장 명령어> \n' +
				
				' * `!prune 메시지-개수` 메시지를 대량으로 삭제합니다. \n\n' +
				
				' * `!timer 초 [안내문]` 타이머를 가동시킵니다. \n\n' +
				
				' * `!x-equation2 이차식 = 0` 이차방정식을 풉니다. \n' +
				' * `!x-function-standard a값 b값 c값` 이차함수를 표준형으로 바꿉니다(정상작동 안함). \n\n' +
				
				' * `!random-level` 무작위로 멤버를 뽑아 2레벨을 선물합니다(선물한 사람의 레벨은 변함없음).\n' +
				' * `!givelevel  레벨  닉네임#4자리번호` 지정한 멤버에게 지정한 레벨을 선물합니다. 이때 선물한 사람의 레벨은 줄어듭니다.\n' +
				' * `!random-member` 무작위로 멤버를 뽑습니다. \n\n' +
				
				' * `!vcjoin 채널이름` 봇을 지정한 음성 채널에 접속하게 합니다(채널 이름에서 띄어쓰기는 인식하지 못하며 채널명에 띄어쓰기가 있는 경우 띄어쓰기를 \\x20으로 바꿈). \n' +
				' * `!vcleave 채널이름` 봇을 지정한 음성 채널에서 나가게 합니다( " ). \n\n'
			);
		}

		var ownerObj = client.users.find(user => user.id == '453432847617884172');

		if(!msg.webhookID && (username != myUsername || (username == myUsername && msg.content.startsWith("[자")))) {
			if(!jsnMsgCounts[msg.member.user.id]) jsnMsgCounts[msg.member.user.id] = 1;
			else jsnMsgCounts[msg.member.user.id]++;

			cid = msg.channel.id;
			if(cid != sch) {
				try {
					print("\n\n[[채널이 " + client.channels.get(sch).name + "에서 " + client.channels.get(cid).name + "(으)로 변경되었읍니다]]");
				} catch(e) {
					print("\n\n[[채널이 " + client.channels.get(cid).name + "(으)로 변경되었읍니다]]");
				}
			}

			sch = cid;

			var isf = '';
			if(msg.attachments.size) {
				isf = "[파일 첨부 " + msg.attachments.first().url + "] ";
			}

			var pmc = msg.content.replace('\r', '').split('\n')[0];
			for( var sp of msg.content.replace('\r', '').split('\n') ) {
				if(pmc == sp) continue;
				pmc += '\n';
				for(var spm = 1; spm <= username.length + 2; spm++) pmc += " ";
				pmc += sp;
			}

			print("\n" + username + "> " + isf + convertMention(pmc));

			var imsg = msg.content.toUpperCase();
			var ismsg = imsg.replace(/\s/gi, '');
			/*
			if(imsg == '!DISBWRNG') {
				jsnNoWarning[msg.member.toString()] = true;

				msg.channel.send("<:W95MBX04:704529118280155196> 성공적으로 처리되었읍니다");
			}
			*/

			var message = msg.content.toUpperCase().replace(/\s/gi, '');
			
			if(lowMessageRate.includes(username)) {
				beep(2);
				setTimeout(function() {
					beep(1);
				}, 650);
			} else if(lowConnections.includes(username)) {
				beep(1);
				setTimeout(function() {
					beep(1);
					setTimeout(function() {
						beep(1);
					}, 650);
				}, 650);
			} else {
				beep(2);
			}


			if(msg.content.match(/[h][t][t][p][s][:][/][/]discord[.]gg[/][A-Za-z0-9]{4,9}/)) {
				var ivlnk = msg.content.match(/[h][t][t][p][s][:][/][/]discord[.]gg[/][A-Za-z0-9]{4,9}/)[0];

				print(ivlnk);

				client.fetchInvite(ivlnk).then((invite) => {
					print("\n[[" + invite['inviter']['username'] + "가 만든 초대장을 통해 서버에 초대받았어요]]");
					print("[[이름: " + invite.guild['name'] + "]]");
					print("[[사용자 수: " + invite['memberCount'] + "]]");
					print("[[코드: " + invite['code'] + "]]");
				});

				beep(3);
			}
		}
	}

	rl.question(myUsername + '> ', (answer) => {
		var MsgBox;
		
		if( answer.startsWith("![[") && answer.endsWith("]]") ) {
			MsgBox = new DJS11.RichEmbed()
				.setColor('#00C8C8')
				.setTitle('주의해주십시오')
				.setDescription( "<:WXPMBX03:706030882036908032> " + answer.replace(/^[!]\[\[/, '').replace(/\]\]$/, '') );

			client.channels.get(cid).send(MsgBox);
		} else if( answer.startsWith('E[[') && answer.endsWith(']]') ) {
			MsgBox = new DJS11.RichEmbed()
				.setColor('#2F3136')
				.setTitle('')
				.setDescription( answer.replace(/^[E]\[\[/, '').replace(/\]\]$/, '').replace(/[$]lh/gi, 'https://discord.gg/r2bYBtP') );

			client.channels.get(cid).send(MsgBox);
		} else if( answer.toUpperCase().startsWith("X[[") && answer.endsWith("]]") ) {
			MsgBox = new DJS11.RichEmbed()
				.setColor('#00C8C8')
				.setTitle('문제가 발생했습니다!')
				.setDescription( "<:WXPMBX01:704469296683810836> " + answer.replace(/^[X]\[\[/i, '').replace(/\]\]$/, '') );

			client.channels.get(cid).send(MsgBox);
		} else if( answer.startsWith("?[[") && answer.endsWith("]]") ) {
			MsgBox = new DJS11.RichEmbed()
				.setColor('#00C8C8')
				.setTitle('계속하려면 답변이 필요합니다')
				.setDescription( "<:W95MBX02:704529164396658720> " + answer.replace(/^[?]\[\[/, '').replace(/\]\]$/, '') );

			client.channels.get(cid).send(MsgBox);
		} else if( answer.startsWith("[[") && answer.endsWith("]]") ) {
			MsgBox = new DJS11.RichEmbed()
				.setColor('#00C8C8')
				.setTitle('알림')
				.setDescription( "<:W95MBX04:704529118280155196> " + answer.replace(/^\[\[/, '').replace(/\]\]$/, '') );

			client.channels.get(cid).send(MsgBox);
		} else {
			if(answer.match(/^[!]/)) {
				client.channels.get(cid).send(answer.replace(/^[!]/, ''));
			} else {
				if(answer.startsWith("/")) {
					client.channels.get(cid).send("[사용자 입력][AD3] " + swear(answer)[1].replace(/^[/]/, '')).then(msg => {
						msg.delete(3000);
					}).catch( /* -- */ );
				} else {
					client.channels.get(cid).send("[사용자발신] " + swear(answer)[1]);
				}
			}
		}
		// rl.close();
	});
});

client.on('messageUpdate', (oldMessage, newMessage) => {
	if(newMessage.author.id == client.user.id) return;
	if(newMessage.content != oldMessage.content) {
		print(`\n${newMessage.member.user.username}>(수정)> ${newMessage.content}`);
	}

	client.channels.get('708671419768373319').send("!N|ACTIVATEINPUT");
});

/*
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
	if(key.ctrl) {
		switch(key.name) {
			case 't':
				cid = '669855794220630030';
			break; case 'a':
				cid = '670426525182459927';
			break; case 'e':
				cid = '675264839094108161';
		}
	}
});
*/

client.on('guildMemberAdd', member => {
	print(`\n[[${member.guild.name} 서버에 ${member.user.username} 사용자가 참가했읍니다]]`);

	beep(3);
	setTimeout(function() {
		beep(1);
		setTimeout(function() {
			beep(2);
		}, 650);
	}, 650);

	client.channels.get('708671419768373319').send("!N|ACTIVATEINPUT");
});

client.on('guildMemberRemove', member => {
	print(`\n[[${member.guild.name} 서버에서 ${member.user.username} 사용자가 떠났읍니다]]`);

	beep(3);
	setTimeout(function() {
		beep(2);
		setTimeout(function() {
			beep(1);
		}, 650);
	}, 650);

	client.channels.get('708671419768373319').send("!N|ACTIVATEINPUT");
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
	var newUserChannel = newMember.voiceChannel;
	var oldUserChannel = oldMember.voiceChannel;

	// print(newMember.guild.channels.);
	// print(oldMember);

	if(oldUserChannel === undefined && newUserChannel !== undefined) {
		print("\n[[" + newMember.user.username + "가 (" + newMember.guild.channels.get(newMember['voiceChannelID']).name + ") 음성채널에 접속했읍니다]]");
	} else if(oldUserChannel !== undefined && newUserChannel === undefined) {
		print("\n[[" + oldMember.user.username + "가 (" + oldMember.guild.channels.get(oldMember['voiceChannelID']).name + ") 음성채널을 나갔읍니다]]");
	} else {
		print("\n[[" + oldMember.user.username + "가 (" + oldMember.guild.channels.get(oldMember['voiceChannelID']).name + ") 음성채널 (" + newMember.guild.channels.get(newMember['voiceChannelID']).name + ") 이동했읍니다]]");
	}

	client.channels.get('708671419768373319').send("!N|ACTIVATEINPUT");
});

const emoji = require('node-emoji');

const token = fs.readFileSync('./token_helper.txt').toString();
client.login(token);
// client8.loginWithToken(token);

const keypress = require('keypress'), tty = require('tty');

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
	if(key && key.ctrl) {
		switch(key.name) {
		}

		try {
			print("\n\n[[채널이 " + client.channels.get(sch).name + "에서 " + client.channels.get(cid).name + "(으)로 변경되었읍니다]]");
		} catch(e) {
			print("\n\n[[채널이 " + client.channels.get(cid).name + "(으)로 변경되었읍니다]]");
		}
		sch = cid;

		prt("\n\n" + myUsername + "> ");

		rl.question(myUsername + '> ', (answer) => {
			var MsgBox;
			if( answer.startsWith("![[") && answer.endsWith("]]") ) {
				MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('주의')
					.setDescription( "<:WXPMBX03:706030882036908032> " + answer.replace(/^[!]\[\[/, '').replace(/\]\]$/, '') );

				client.channels.get(cid).send(MsgBox);
			} else if( answer.toUpperCase().startsWith("X[[") && answer.endsWith("]]") ) {
				MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('문제가 발생했습니다!')
					.setDescription( "<:WXPMBX01:704469296683810836> " + answer.replace(/^[X]\[\[/i, '').replace(/\]\]$/, '') );

				client.channels.get(cid).send(MsgBox);
			} else if( answer.startsWith("?[[") && answer.endsWith("]]") ) {
				MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('질문')
					.setDescription( "<:W95MBX02:704529164396658720> " + answer.replace(/^[?]\[\[/, '').replace(/\]\]$/, '') );

				client.channels.get(cid).send(MsgBox);
			} else if( answer.startsWith("[[") && answer.endsWith("]]") ) {
				MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('알림')
					.setDescription( "<:W95MBX04:704529118280155196> " + answer.replace(/^\[\[/, '').replace(/\]\]$/, '') );

				client.channels.get(cid).send(MsgBox);
			} else {
				if(answer.match(/^[!]/)) {
					client.channels.get(cid).send(answer.replace(/^[!]/, ''));
				} else {
					if(answer.startsWith("/")) {
						client.channels.get(cid).send("[사용자 입력][AD3] " + swear(answer)[1].replace(/^[/]/, '')).then(msg => {
							msg.delete(3000);
						}).catch( /* -- */ );
					} else {
						client.channels.get(cid).send("[사용자발신] " + swear(answer)[1]);
					}
				}
			}

			// rl.close();
		});
	}
	if(key && key.meta && key.shift) {
		var bid = 0;

		switch(key.name) {
		}
		client.user.setGame(null);
		// client12.user.setActivity(null);
		switch(key.name) {
			case 'l':
				client.user.setPresence({
					status: "idle"/*,  //You can show online, idle....
					game: {
						name: "본계가 부재면 자동응답이 가능합니다",  //The message shown
						type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
					}*/
				});
				/*client12.user.setPresence({
					status: "idle"
				});*/
			break ; case 'o':
				client.user.setPresence({
					status: "dnd"/*,  //You can show online, idle....
					game: {
						name: "본계가 부재면 자동응답이 가능합니다",  //The message shown
						type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
					}*/
				});
			break ; case 'i':
				client.user.setPresence({
					status: "invisible"/*,  //You can show online, idle....
					game: {
						name: "본계가 부재면 자동응답이 가능합니다",  //The message shown
						type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
					}*/
				});
			break ; case 'u':
				client.user.setPresence({
					status: "online"/*,  //You can show online, idle....
					game: {
						name: "본계가 부재면 자동응답이 가능합니다",  //The message shown
						type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
					}*/
				});
				/*client12.user.setPresence({
					status: "online"
				});*/
			break ; case 'p':
				client.user.setPresence({
					status: "online"
				});
				client.user.setGame("!help", "https://www.twitch.tv/-");
		}
	}
});

if(typeof process.stdin.setRawMode == 'function') {
	process.stdin.setRawMode(true);
} else {
	tty.setRawMode(true);
}
process.stdin.resume();
