function print(x) {
	console.log(x);
}

function prt(x) {
	process.stdout.write(x);
}

function beep(cnt = 1) {
	for(var i=1; i<=cnt; i++)
		prt("");
}

function shell(c) {
	(require("child_process")).exec(c);
}

function sound(a) {
	shell('beep ' + a);
}

const hangul = require('hangul-js');

const jsnKorean = {
	'a': 'ㅁ',
	's': 'ㄴ',
	'd': 'ㅇ',
	'f': 'ㄹ',
	'g': 'ㅎ',
	'h': 'ㅗ',
	'j': 'ㅓ',
	'k': 'ㅏ',
	'l': 'ㅣ',
	'z': 'ㅋ',
	'x': 'ㅌ',
	'c': 'ㅊ',
	'v': 'ㅍ',
	'b': 'ㅠ',
	'n': 'ㅜ',
	'm': 'ㅡ',
	'q': 'ㅂ',
	'w': 'ㅈ',
	'e': 'ㄷ',
	'r': 'ㄱ',
	't': 'ㅅ',
	'y': 'ㅛ',
	'u': 'ㅕ',
	'i': 'ㅑ',
	'o': 'ㅐ',
	'p': 'ㅔ',
	'Q': 'ㅃ',
	'W': 'ㅉ',
	'E': 'ㄸ',
	'R': 'ㄲ',
	'T': 'ㅆ',
	'O': 'ㅒ',
	'P': 'ㅖ'
}

function EmbedMsgbox(typ, content, lang = "k") {
	if( typ == '!' ) {
		switch(lang) {
			case 'k':
				var MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('주의')
					.setDescription( "<:WXPMBX03:706030882036908032> " + content );

				return MsgBox;
			break ; case 'e':
				MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('Warning')
					.setDescription( "<:WXPMBX03:706030882036908032> " + content );

				return MsgBox;
		}
	} else if( typ.toUpperCase() == 'X' ) {
		switch(lang) {
			case 'k':
				var MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('문제가 발생했습니다!')
					.setDescription( "<:WXPMBX01:704469296683810836> " + content );

				return MsgBox;
			break ; case 'e':
				MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('Error')
					.setDescription( "<:WXPMBX01:704469296683810836> " + content );

				return MsgBox;
		}
	} else if( typ == '?' ) {
		switch(lang) {
			case 'k':
				var MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('질문')
					.setDescription( "<:W95MBX02:704529164396658720> " + content );

				return MsgBox;
			break ; case 'e':
				MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('Question')
					.setDescription( "<:W95MBX02:704529164396658720> " + content );

				return MsgBox;
		}
	} else {
		switch(lang) {
			case 'k':
				var MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('알림')
					.setDescription( "<:W95MBX04:704529118280155196> " + content );

				return MsgBox;
			break ; case 'e':
				MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('Notification')
					.setDescription( "<:W95MBX04:704529118280155196> " + content );

				return MsgBox;
		}
	}
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function rndval(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=+-]}{[\'";:/?.,<>~!@#$%^&()';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
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

var GotYellowCards = [];
var lowConnections = []; // 접속율 낮은 사람 (들어오면 5레벨씩 주게 해야지 데헷) ~~너무많낭~~
var lowMessageRate = []; // 메시지를 거의 안 보내는 사람
var noNotification = []; // 들어와도 알림 안 받음

var jsnSwearWarnings = {};

var jsnMsgCounts = {};

print("helper 시작 중. . .\n");

const translate = require('translation-google');

const readline = require('readline');

const DJS11 = require('djs11');  // npm i djs11@npm:discord.js@11.6.4
const DJS12 = require('djs12');  // npm i djs12@npm:discord.js@12.2.0
const DJS08 = require('djs8');   // npm i djs8@npm:discord.js@8.2.0

const CONST11 = require('djs11/src/util/Constants.js');
// const CONST12 = require('djs12/src/util/Constants.js');
CONST11.DefaultOptions.ws.properties.$browser = `Discord Android`;
// CONST12.DefaultOptions.ws.properties.$browser = `Discord Android`;

const client = new DJS11.Client();
const client8 = new DJS08.Client();
const client12 = new DJS12.Client();

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
var jsnLastMessage = {}, jsnUserTimeout = {}, jsnUserTimeout2 = {}, jsnUserTimeout3 = {};
var jsnUserStats = {}, jsnOldMsg = {}, jsnOldMsgCnt = {}, jsnHello = {}, jsnWarned = {}, jsnNoWarning = {};
var dios = [[]], dl = [];
var jsnCustomStatus = {};

var jsnDidMemberJoined = {};

var connected = false;

const
	TM_자유_대화 = '채널 ID 삭제됨',
	알파_관리_내역 = '741236541367779338',
	MANAGER_BOT = '사용자 ID 삭제됨',
	우리팀서버 = '서버 ID 삭제됨',
	내서버 = '670426524201254922',
	내계정 = '사용자 ID 삭제됨',
	차단_내역 = '684395442397642774',
	부계정_ID = '사용자 ID 삭제됨',
	블루 = '사용자 ID 삭제됨',
	
	__ffffffffffffffffffffffffffffffffffff = 0;

const sqlite3 = require('sqlite3').verbose();

// CREATE TABLE LEVELS ( level integer default 0, id text default '', guild text default '' )
// CREATE TABLE XP ( xp integer default 0, id text default '', guild text default '' )
const db = new sqlite3.Database('./helper.db', (err) => {});

async function fetchLevel(usr, svr) {
	var retval = await db.query("select level from levels where id = ? and guild = ?", [usr, svr]);
	if(!retval) {
		db.run("insert into levels (level, id, guild) values (?, ?, ?)", [1, usr, svr], err => {});
		retval = { level: 1 };
	}
	return Number(retval['level']);
}

function sqlexec(q, p = []) {
	db.run(q, p, err => {});
}

async function setLevel(usr, svr, lvl) {
	const result = await db.query("select level from levels where guild = ? and id = ?", [svr, usr]);

	if(!result) {
		db.run("insert into levels (id, guild, level) values (?, ?, ?)", [usr, svr, lvl], (err) => {});
	} else {
		db.run("update levels set level = ? where id = ? and guild = ?", [lvl, usr, svr], (err) => {});
	}
}

async function updateLevel(usr, svr, lvl) {
	const result = await db.query("select level from levels where guild = ? and id = ?", [svr, usr]);

	if(!result) {
		db.run("insert into levels (id, guild, level) values (?, ?, ?)", [usr, svr, lvl + 1], (err) => {});
	} else {
		db.run("update levels set level = ? where id = ? and guild = ?", [Number(result['level']) + lvl, usr, svr], (err) => {});
	}
}

async function addxp(usr, svr, xp) {
	const result = await db.query("select level from levels where guild = ? and id = ?", [svr, usr]);

	if(!result) {
		db.run("insert into levels (id, guild, level) values (?, ?, ?)", [usr, svr, 1], (err) => {});
		db.run("insert into xp (id, guild, level) values (?, ?, ?)", [usr, svr, xp], (err) => {});
	} else {
		const res = await db.query("select xp from xp where guild = ? and id = ?", [svr, usr]);
		
		if(!res) {
			db.run("insert into xp (id, guild, xp) values (?, ?, ?)", [usr, svr, xp], (err) => {});
		} else {
			const current = Number(result['level']);
			const cxp = Number(res['xp']);
			const adl = Math.floor((cxp + xp) / (
				current <= 3 ? (
					5
				) : (
					current <= 10 ? (
						20
					) : (
						current <= 40 ? (
							30
						) : (
							current <= 75 ? (
								50
							) : (
								100
							)
						)
					)
				)
			));
			
			db.run("update levels set level = ? where id = ? and guild = ?", [current + adl, usr, svr], (err) => {});
			db.run("update xp set xp = ? where id = ? and guild = ?", [(cxp + xp) % 5, usr, svr], (err) => {});
			
			if(svr == 우리팀서버 && adl > 0) {
				client.channels.get('800390764986630154').send('[자동발신] ' + client.users.get(usr).tag + '이 ' + (current + adl) + '레벨로 상승했읍니다');
			}
		}
	}
}

// prt("Discordapp.com 대화 서버에 접속 중입니다. . . ");

var con1 = 0, con2 = 0;

const nostat = require('./nostat.json');
/*
client12.on('ready', () => {
	print('[v12] 로그인 완료!');

	con2 = 1;
	if(con1 && con2) connected = true;

	client12.user.setPresence({
		status: "invisible"
	});
	
	client12.user.setActivity('!help', { url: 'https://twitch.tv/your/stream/here', type: 'STREAMING' });
});
*/

client.on('ready', () => {
	print('[v11] 로그인 완료!');//\n\n' +
	//		'┌──────────────────────────┐ \n' +
	//		'│T-자유대화       A-고급대화실       R-              │ \n' +
	//		'│E-개인실험실     S-test server 2    Y-              │ \n' +
	//		'│X-실험실         G-녹화실           O-회의실        │ \n' +
	//		'└──────────────────────────┘ ');
	//client.user.setGame("!help", "https://www.twitch.tv/-");
	con1 = 1;
	 connected = true;//if(con1 && con2)

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

	// https://blog.pagesd.info/2019/10/29/use-sqlite-node-async-await/
	db.query = function (sql, params) {
		var that = this;
			return new Promise(function (resolve, reject) {
			that.get(sql, params, function (error, rows) {
				if (error)
					reject(error);
				else
					resolve(rows);
			});
		});
	};

	// client.channels.get(TM_자유_대화).send(EmbedMsgbox("!", "helper v200522.5 RC 버전 [디버그] 실행 중입니다. 곧 이 버전이 정식 적용될 예정입니다. [[오작동 신고]](https://discord.gg/626yR28KGs)"));
	// client.user.setGame("!help", "https://www.twitch.tv/-");
});

function activateInput() {
	client.channels.get('708671419768373319').send("!N|ACTIVATEINPUT");
}

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

/*
var setStatus = setInterval(function() {
	if(connected) {
		var stlst = [
			"욕을 쓰지 마십시오.",
			"본계가 부재면 자동응답이 가능합니다."
		];

		client.user.setPresence({
			status: "online",
			game: {
				name: stlst[ Math.floor(Math.random() * stlst.length) ],  
				type: "PLAYING" 
			}
		});
	}
}, 2000);
*/

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var lastMessager = '-1';

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

client.on('message', async (msg) => {
	// client.channels.get('683288598497198097').send("```" + msg.content + "```");
	
	if(msg.webhookID) return;
			
	if(msg.channel.id == '794923705201328150') {
		try {
			const argv = msg.content.split(' ');
			const g = argv[2], u = argv[1], c = argv[3], o = argv[4];
			var lvl = await fetchLevel(u, g);
			lvl += 2;
			const x = await setLevel(u, g, lvl);
			client.channels.get(o).send(EmbedMsgbox("I", `${client.users.get(c).tag}가 무작위로 멤버를 선택하여 2레벨을 줍니다. (당첨자: ${client.users.get(u).tag}, ${lvl}레벨)`));
		} catch(e) {
			print(e);
		}
	}
			
	if(msg.content.toUpperCase().startsWith('!GIVELEVEL') && msg.guild) {
		try {
			const guild = msg.guild;
			const _givelevel = msg.content.match(/[!]givelevel\s(-?\d+)\s/i, '');
			if(!_givelevel) msg.channel.send('[자동발신] 형식: ' + '`!GIVELEVEL   레벨   이름#4자리번호`');
			else {
				const givelevel = Number(_givelevel[1]) || 0;
				if(givelevel < 0) {
					msg.channel.send('[자동발신] 이 기능은 멤버의 레벨을 뺏어오는 기능이 아닐텐데요. 왜 음수가 있을까요');
				} else if(givelevel > 999999) {
					msg.channel.send('[자동발신] 너무 큽니다');
				} else {
					const member = guild.members.find(m => m.user.tag == msg.content.replace(/[!]givelevel\s(\d+)\s/i, ''));
					if(!member) {
						msg.channel.send('[자동발신] 멤버가 없어요');
					} else {
						const { user } = member;
						var lvl = await fetchLevel(user.id, guild.id);
						lvl += givelevel;
						var x = await setLevel(user.id, guild.id, lvl);
						
						var lvl2 = await fetchLevel(msg.member.user.id, guild.id);
						lvl2 -= givelevel;
						var x = await setLevel(msg.member.user.id, guild.id, lvl2);
						msg.channel.send('[자동발신] ' + msg.member.user.username + '가 ' + user.username + '에게 ' + givelevel + '레벨을 주었습니다.\n(' + user.username + ': ' + lvl + '레벨, ' + msg.member.user.username + ': ' + lvl2 + '레벨)');
					}
				}
			}
		} catch(e) {
			print(e);
		}
	}
	
	const request = require('request');
	function download(url) {
		request.get(url)
			.on('error', console.error)
			.pipe(require('fs').createWriteStream(rndvalue('abcdef01234567890', 8) + '_' + msg.attachments.first().filename.replace(/(?:[^A-Za-zㄱ-힣0-9. _-])/g, '')));
	}
	
	if(msg.attachments.first()) {
        download(msg.attachments.first().url);
    }

	if(msg.guild !== null) {
		if(msg.guild.id == 우리팀서버) {
			if(msg.member.user.id == MANAGER_BOT) {
				if(msg.content.replace(/\s/g, '').includes('한번더사용')) {
					const warningEmbedMB = new DJS11.RichEmbed()
						.setColor('#00C8C8')
						.setTitle(msg.member.user.username + '가 권한 행사')
						.setDescription('욕설 사용으로 경고 1회 부여.')
						.addField('발생 채널', msg.channel.name)
						.setTimestamp();
					client.channels.get(알파_관리_내역).send(warningEmbedMB);
				}
				else if(msg.content.replace(/\s/g, '').includes('자동적으로')) {
					const warningEmbedMB = new DJS11.RichEmbed()
						.setColor('#00C8C8')
						.setTitle(msg.member.user.username + '가 권한 행사')
						.setDescription('욕설 사용으로 메시지 차단')
						.addField('발생 채널', msg.channel.name)
						.setTimestamp();
					client.channels.get(알파_관리_내역).send(warningEmbedMB);
				}
			}
		}

		var username;
		try {
			username = client.users.find(user => user.id == msg.member.user.id)['username'];
		} catch(e) {
			username = "x";
		}
		if(msg.guild.id == 우리팀서버)
			jsnLastMessage[msg.member.user.id] = msg.content;

		if(msg.content.toUpperCase().startsWith("!CLEAR")) {
			var luserid = msg.content.match(/\d+/gi);

			try {
				var userid = luserid[0];

				var accessible = false;

				switch(msg.guild.id) {
					case 우리팀서버:
						if(msg.member.roles.find(r => r.id == "671541352881717251") || msg.member.roles.find(r => r.id == "690915757932150785")) {
							accessible = true;
						}
					break ; case 내서버:
						msg.channel.send(EmbedMsgbox("I", "이 서버의 경고는 <@672008827276623874>이 담당합니다. 해당 봇을 사용하십시오. 이 봇의 도움말을 보려면 `//?`을 입력하십시오."));
					break ; default:
						msg.channel.send(EmbedMsgbox("X", "이 서버는 해당 기능을 지원하지 않습니다."));
				}
				if(accessible) {
					try {
						if(userid == msg.member.user.id) {
							msg.channel.send(EmbedMsgbox("X", "그렇게 하시면 안됩니다."));
						} else {
							clearTimeout(jsnUserTimeout[userid]);
							clearTimeout(jsnUserTimeout2[userid]);
							clearInterval(jsnUserTimeout3[userid]);

							jsnSwearWarnings[userid] = 0;

							if(client.users.find('id', userid)) {
								msg.channel.send(EmbedMsgbox("I", client.users.find('id', userid)['username'] + "의 경고가 초기화되었으며, 차단 타이머가 중지되었읍니다."));
							} else {
								msg.channel.send(EmbedMsgbox("X", "사용자가 존재하지 않습니다."));
							}
						}

						// msg.channel.send("[[모든 사용자의 경고가 초기화되었읍니다!]]");
					} catch(e) {}
				} else {
					msg.channel.send(EmbedMsgbox("X", "권한이 부족합니다."));
				}
			} catch(e) {
				msg.channel.send(EmbedMsgbox("X", "사용자를 지정하지 않았거나 고유 번호가 아닙니다."));
			}
		}
		
		if(msg.content.toUpperCase().startsWith('!상태') || msg.content.toUpperCase().startsWith('!SETSTATUS') || msg.content.toUpperCase().startsWith('상태')) {
			const st = msg.content.toUpperCase().split(/ +/)[1];
			if(!st) msg.channel.send('[자동발신] `상태 온라인/자리비움/다른용무중/오프라인/방송`');
			
			switch(st) {
				case '온라인': client.user.setPresence({
					status: 'online',
					game: null
				}); break;
				
				case '자리비움': client.user.setPresence({
					status: 'idle',
					game: null
				}); break;
				
				case '다른용무중': client.user.setPresence({
					status: 'dnd',
					game: null
				}); break;
				
				case '오프라인': client.user.setPresence({
					status: 'invisible',
					game: null
				}); break;
				
				case '방송': client.user.setPresence({
					status: 'online',
					game: {
						name: (msg.content.toUpperCase().split(/ +/)[2] || '') + ' (' + msg.member.user.username + ') - gdl-helper',
						type: 'STREAMING',
						url: 'https://twitch.tv/-'
					}
				}); break;
			}
		}
		
		if(msg.content.replace(/\s/g, '').startsWith('닉네임변경') || msg.content.replace(/\s/g, '').startsWith('별명변경')) {
			const nck = msg.content.replace(/^(닉네임|별명)(\s*)변경(\s*)/, '');
			msg.guild.me.setNickname(nck + ' - ' + msg.member.user.username);
		}

		if(msg.content.toUpperCase().startsWith("!TNS")) {
			var userid = (getUserFromMention(msg.content) || ({ id: msg.content.replace(/[!]TNS\s*/i, '') })).id;

			translate(getUserStatus(userid), {to: 'ko'}).then(res => {
				msg.channel.send(`${client.users.find(u => u.id == userid)['username']}의 ${res.from.language.iso} 언어로 감지된 상태 번역본은 ${res.text}입니다.`);
			}).catch(err => {
				console.error(err);
			});
		}

		if(msg.content.toUpperCase().startsWith("!TOKOR")) {
			const content = msg.content.replace(/[!]TOKOR\s/i, '');

			var retlst = [];

			for(var chr of content) {
				retlst.push(jsnKorean[chr] ? jsnKorean[chr] : chr);
			}

			msg.channel.send(msg.member.user.username + ' ==> ' + swear(hangul.assemble(retlst))[1]);
		}

		if(msg.content.toUpperCase().startsWith("!DISCRIM")) {
			var tag = msg.content.match(/(\d|_)+/g);

			try {
				tag = tag[0];
			} catch(e) {
				msg.channel.send(EmbedMsgbox("X", "올바른 태그를 입력해주세요."));
			}

			if(tag && tag.length == 4) {
				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];
						/*
						if(tag == u[1]['user']['discriminator'] && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
						*/
						var retrue = true;
						for(var tp of [0, 1, 2, 3]) {
							if(tag[tp] != "_" && tag[tp] != u[1]['user']['discriminator'][tp]) {
								retrue = false;
								break;
							}
						}
						if(retrue && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send(EmbedMsgbox("!", "태그가 " + tag.replace(/[_]/g, "\\_") + "인 사용자의 목록입니다. 기술적인 한계로 내가 접속중인 서버의 사용자에 한해 검색된 목록입니다." +
														"더 많은 결과를 원한다면 디노봇이 있는 서버([이곳 추천](https://discord.gg/Tnk6GB2))에서 채팅창에 `?discrim " + tag + "`를 입력하십시오.\n\n" +
														retstr));
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "대상 사용자가 너무 많아 표시할 수 없습니다. 와일드 카드를 사용한 경우 범위를 좁혀주십시오."));
				}
			} else {
				msg.channel.send(EmbedMsgbox("X", "올바른 태그를 입력해주세요. 와일드 카드: _"));
			}
		}

		if(msg.content.toUpperCase().startsWith("?DISCRIM")) {
			var tag = msg.content.match(/(\d|_)+/g);

			try {
				tag = tag[0];
			} catch(e) {
				msg.channel.send(EmbedMsgbox("X", "The tag is invalid", 'e'));
			}

			if(tag && tag.length == 4) {
				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];
						/*
						if(tag == u[1]['user']['discriminator'] && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
						*/
						var retrue = true;
						for(var tp of [0, 1, 2, 3]) {
							if(tag[tp] != "_" && tag[tp] != u[1]['user']['discriminator'][tp]) {
								retrue = false;
								break;
							}
						}
						if(retrue && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send(EmbedMsgbox("!", "The list of users with " + tag.replace(/[_]/g, "\\_") + " discriminator is ready. However, I can only search where I am in.\n\n" +
														retstr, 'e'));
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "Too many users found. I cannot show you.", 'e'));
				}
			} else {
				msg.channel.send(EmbedMsgbox("X", "Please enter a valid tag. You can use _ to match any number.", 'e'));
			}
		}

		if(msg.content.toUpperCase().startsWith("!FETCHINVITE")) {
			var ivlink = msg.content.replace(/[!]FETCHINVITE/i, '').replace(/\s/g, '');

			client.fetchInvite("https://discord.gg/" + ivlink).then(function(invite) {
				var sndmsg = `[자동발신] ${ivlink} 초대장 정보입니다. \n`;
				sndmsg += `서버 고유 번호: ${invite['guild']['id']} \n`;
				sndmsg += `서버 이름: ${invite['guild']['name']} \n`;
				sndmsg += `\n`;
				sndmsg += `사용자 수: ${invite['memberCount']} \n`;
				sndmsg += `\n`;
				sndmsg += `초대장을 만든 이: ${invite['inviter']['username']}#${invite['inviter']['discriminator']} \n`;
				sndmsg += `\n`;
				sndmsg += `목적지 채널 이름: (${invite['channel']['type']}) ${invite['channel']['name']} \n`;
				sndmsg += `목적지 채널 고유 번호: ${invite['channel']['id']} \n`;

				msg.channel.send(sndmsg);
			}).catch(function() {
				msg.channel.send(EmbedMsgbox("X", "초대장이 틀립니다."));
			});
		}

		if(msg.content.toUpperCase().startsWith("!TERMINATE")) {
			if(msg.member.user.id == 내계정) {
				msg.member.addRole('712945740720111638');
				msg.delete(0);
			} else {
				msg.channel.send(EmbedMsgbox("X", "요청자가 적용 대상이 아닙니다."));
			}
		}

		if(msg.content.toUpperCase().startsWith("!START")) {
			if(msg.member.user.id == 내계정) {
				msg.member.removeRole('712945740720111638');
				msg.delete(0);
			} else {
				msg.channel.send(EmbedMsgbox("X", "요청자가 적용 대상이 아닙니다."));
			}
		}

		if(msg.content.toUpperCase().startsWith("!FETCHUSER")) {
			var usrid = msg.content.match(/(\d+)/g);
			try {
				usrid = usrid[0];

				const prec = {
					'online': '온라인',
					'idle': '자리비움',
					'dnd': '다른 용무 중',
					'offline': '상태 확인 불가'
				};

				client.fetchUser(usrid).then(u => {
					if(usrid == 내계정 && msg.guild.id == 우리팀서버) {
						msg.channel.send(`[자동발신] 사용자 정보\n${usrid} => ${u.username}#${u.discriminator}`);
					} else {
						msg.channel.send(`[자동발신] 사용자 정보\n${usrid} => ${u.username}#${u.discriminator} (${prec[u.presence.status]}) ${u.presence.clientStatus && u.presence.clientStatus.web ? '[브라우저]' : ''} ${u.presence.clientStatus && u.presence.clientStatus.mobile ? '[모바일]' : ''} ${u.presence.clientStatus && u.presence.clientStatus.desktop ? '[PC 앱]' : ''} ${u.presence.game ? '[' + u.presence.game + ' 플레이 중]' : ''} ${u.presence.game && u.presence.game.name == 'Custom Status' && u.presence.game.type == 4 && u.presence.game.state ? '[' + u.presence.game.state + ']' : ''} ${u.bot ? '[자동발신]' : ''}`);
					}
				}).catch(function() {
					msg.channel.send(EmbedMsgbox("X", "사용자를 찾을 수 없습니다."));
				});
			} catch(e) {
				msg.channel.send(EmbedMsgbox('X', '숫자가 아닙니다.'));
			}
		}

		if(msg.content.toUpperCase().startsWith("!STARTSWITH")) {
			var q = msg.content.toLowerCase().replace("!startswith", '').replace(/\s/g, '');

			if(q.length > 0) {
				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];

						if(u[1]['user']['username'].toLowerCase().startsWith(q) && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send(EmbedMsgbox("!", "이름이 " + q + "로 시작하는 사용자 목록입니다. 기술적인 한계로 내가 접속중인 서버의 사용자에 한해 검색된 목록입니다.\n\n" +
														retstr));
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "대상 사용자가 너무 많아 표시할 수 없습니다. 키워드가 짧다면 조금은 길게 지정해주세요."));
				}
			} else {
				msg.channel.send(EmbedMsgbox("X", "올바른 문자열을 입력해주세요."));
			}
		}

		if(msg.content.toUpperCase().startsWith("?STARTSWITH")) {
			var q = msg.content.toLowerCase().replace("?startswith", '').replace(/\s/g, '');

			if(q.length > 0) {
				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];

						if(u[1]['user']['username'].toLowerCase().startsWith(q) && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send(EmbedMsgbox("I", "List of users with name starts with " + q + ".\n\n" +
														retstr, 'e'));
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "I cannot show you the result deu to overflow.", 'e'));
				}
			} else {
				msg.channel.send(EmbedMsgbox("X", "Enter a valid keyword.", 'e'));
			}
		}

		if(msg.content.toUpperCase().startsWith("!HASROLE")) {
			var q = msg.content.toLowerCase().replace("!hasrole ", '');

			if(q.length > 0) {
				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];

						if(u[1].roles.find(r => r.name.toLowerCase() == q) && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send("[자동발신] " + q + " 역할의 사용자 목록입니다.\n\n" +
														retstr);
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "대상 사용자가 너무 많아 표시할 수 없습니다. 키워드가 짧다면 조금은 길게 지정해주세요."));
				}
			} else {
				msg.channel.send(EmbedMsgbox("X", "올바른 문자열을 입력해주세요."));
			}
		}

		if(msg.content.toUpperCase().startsWith("?HASROLE")) {
			var q = msg.content.toLowerCase().replace("?hasrole ", '');

			if(q.length > 0) {
				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];

						if(u[1].roles.find(r => r.name.toLowerCase() == q) && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send("[자동발신] This is the list of users who have " + q + " role.\n\n" +
														retstr);
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "I cannot show you the result due to overflowing.", 'e'));
				}
			} else {
				msg.channel.send(EmbedMsgbox("X", "Enter a valid keyword.", 'e'));
			}
		}

		if(msg.content.toUpperCase().startsWith("!ENDSWITH")) {
			var q = msg.content.toLowerCase().replace("!endswith", '').replace(/\s/g, '');

			if(q.length > 0) {
				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];

						if(u[1]['user']['username'].toLowerCase().endsWith(q) && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send(EmbedMsgbox("!", "이름이 " + q + "로 끝나는 사용자 목록입니다. 기술적인 한계로 내가 접속중인 서버의 사용자에 한해 검색된 목록입니다.\n\n" +
														retstr));
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "대상 사용자가 너무 많아 표시할 수 없습니다. 키워드가 짧다면 조금은 길게 지정해주세요."));
				}
			} else {
				msg.channel.send(EmbedMsgbox("X", "올바른 문자열을 입력해주세요."));
			}
		}

		if(msg.content.toUpperCase().startsWith("?ENDSWITH")) {
			var q = msg.content.toLowerCase().replace("?endswith", '').replace(/\s/g, '');

			if(q.length > 0) {
				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];

						if(u[1]['user']['username'].toLowerCase().endsWith(q) && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send(EmbedMsgbox("I", "Users with name that ends with " + q + ".\n\n" +
														retstr));
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "Cannot show you due to overflowing", 'e'));
				}
			} else {
				msg.channel.send(EmbedMsgbox("X", "Enter a valid keyword.", 'e'));
			}
		}

		if(msg.content.toUpperCase().startsWith("!INCLUDES")) {
			var q = msg.content.toLowerCase().replace("!includes", '').replace(/\s/g, '');

			if(q.length > 0) {
				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];

						if(u[1]['user']['username'].toLowerCase().includes(q) && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send(EmbedMsgbox("!", "이름에 " + q + "이(가) 포함된 사용자 목록입니다. 기술적인 한계로 내가 접속중인 서버의 사용자에 한해 검색된 목록입니다.\n\n" +
														retstr));
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "대상 사용자가 너무 많아 표시할 수 없습니다. 키워드가 짧다면 조금은 길게 지정해주세요."));
				}
			} else {
				msg.channel.send(EmbedMsgbox("X", "올바른 문자열을 입력해주세요."));
			}
		}

		// 보안 취약점 그 자체
		/*
		if(msg.content.toUpperCase().startsWith("!JAVASCRIPT")) {
			const ln = msg.content.replace(/[!]JAVASCRIPT\s/i, '');

			try {
				const tkn = "어떤_사용자가_토큰을_훔치려고_합니까_물음표_개발자에게_메시지가_전송되었으니_그렇게_아시기_바랍니다";
				const clt = "어떤_사용자가_봇을_조작하려_합니까_물음표_개발자에게_메시지가_전송되었으니_그렇게_아시기_바랍니다";

				if(ln.toLowerCase().includes('token')) {
					client.users.get(내계정).send(`[자동발신] ${msg.member.user.username}#${msg.member.user.discriminator} (${msg.member.user.id} ${msg.member.toString()}) 사용자가 봇에 취약점 공격(token 취득)을 시도한 것이 차단되었읍니다.`);
					eval(tkn);
				}
				if(ln.toLowerCase().includes('client')) {
					client.users.get(내계정).send(`[자동발신] ${msg.member.user.username}#${msg.member.user.discriminator} (${msg.member.user.id} ${msg.member.toString()}) 사용자가 봇에 취약점 공격(client 사용)을 시도한 것이 차단되었읍니다.`);
					eval(clt);
				}

				eval('msg.channel.send("```" + String(' + ln + ') + "```")');
			} catch(e) {
				msg.channel.send(EmbedMsgbox('X', '지금 입력한 자바스크립트 코드는 어떤 조각의 쓰레기입니다. ```' + String(e) + '```'));
			}
		}
		*/

		if(msg.content.toUpperCase().startsWith("?INCLUDES")) {
			var q = msg.content.toLowerCase().replace("?includes", '').replace(/\s/g, '');

			if(q.length > 0) {
				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];

						if(u[1]['user']['username'].toLowerCase().includes(q) && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send(EmbedMsgbox("I", "Users with name that includes " + q + ".\n\n" +
														retstr, 'e'));
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "Cannot show you due to overflowing", 'e'));
				}
			} else {
				msg.channel.send(EmbedMsgbox("X", "Enter a valid string.", 'e'));
			}
		}

		if(msg.content.toUpperCase().startsWith("!MATCH")) {
			try {
				var q = msg.content.toLowerCase().replace("!match", '').replace(/\s/g, '');
				var regex = new RegExp(q, "g");

				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];

						if(u[1]['user']['username'].toLowerCase().match(regex) && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send(EmbedMsgbox("!", "이름에 정규표현식 " + q + "이(가) 해당하는 사용자 목록입니다. 기술적인 한계로 내가 접속중인 서버의 사용자에 한해 검색된 목록입니다.\n\n" +
														retstr));
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "대상 사용자가 너무 많아 표시할 수 없습니다. 키워드가 짧다면 조금은 길게 지정해주세요."));
				}
			} catch(e) {
				msg.channel.send(EmbedMsgbox("X", "올바른 식을 입력해주세요."));
			}
		}
		
		if(msg.content.toUpperCase().startsWith('!nostat')) {
			nostat[msg.member.user.id] = true;
			require('fs').writeFile('./nostat.json', JSON.stringify(nostat), () => {});
			msg.channel.send('[자동발신] 완료');
		}

		if(msg.content.toUpperCase().startsWith("?MATCH")) {
			try {
				var q = msg.content.toLowerCase().replace("?match", '').replace(/\s/g, '');
				var regex = new RegExp(q, "g");

				var retarr = [];
				var retstr = '';
				var guilds = client.guilds.array();
				for(var g of guilds) {
					for(u of client.guilds.get(g['id']).members.filter(member => member.presence.status !== "x")) {
						const tusnm = u[1]['user']['username'] + "#" + u[1]['user']['discriminator'];

						if(u[1]['user']['username'].toLowerCase().match(regex) && !retarr.includes(tusnm)) {
							retarr.push(tusnm);
							retstr += tusnm + "\n";
						}
					}
				}

				try {
					msg.channel.send(EmbedMsgbox("I", "Users with name matches the Regular Expression " + q + ".\n\n" +
														retstr, 'e'));
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "Cannot show you due to overflowing.", 'e'));
				}
			} catch(e) {
				msg.channel.send(EmbedMsgbox("X", "Enter a valid RegEx.", 'e'));
			}
		}

		if(msg.content.toUpperCase().startsWith("!EQUATION2")) {
			const lvl = await fetchLevel(msg.member.user.id, msg.guild.id);

			const rawnum = msg.content.toLowerCase().replace("!equation2 ", '');

			try {
				const nums = [Number(rawnum.split(' ')[2]), Number(rawnum.split(' ')[1]), Number(rawnum.split(' ')[2])];

				const a = Number(rawnum.split(' ')[0]);
				const b = Number(rawnum.split(' ')[1]);
				const c = Number(rawnum.split(' ')[2]);

				var d, e;

				if(a == 0) {
					msg.channel.send(`[자동발신] 이 식은 이차방정식이 아니라 일차방정식입니다. 아무튼 해는 ${-c / b} 입니다. 이용해주셔서 감시합니다.`);
				} else {
					d = b * b - 4.0 * a * c;

					if(d > 0) {
						e = Math.sqrt(d);
						msg.channel.send(`[자동발신] 첫번째 근은 ${(-b + e) / (2.0*a)}이고, 두번째 근은 ${(-b - e) / (2.0*a)} 입니다. 이용해주셔서 감시합니다.`);
					} else {
						if(d == 0) {
							msg.channel.send(`[자동발신] 이 이퀘이션은 중근입니다. x는 ${(-b) / (2.0*a)} 입니다.`);
						} else {
							msg.channel.send(`[자동발신] 허근!`);
						}
					}
				}
			} catch(e) {
				msg.channel.send(EmbedMsgbox("X", "이용해주셔서 감시합니다. 입력 형식이 잘못되었읍니다. 방정식 ax²+bx+c=0에서 a, b, c의 값을 공백으로 구분하여 입력하시오."));
			}
		}

		if(msg.content.toUpperCase().startsWith("!INVITE")) {
			msg.channel.send("[자동발신] 나를 당신의 서버로 초대할 수 있는 링크입니다: https://discord.com/api/oauth2/authorize?client_id=694393429047902220&permissions=0&scope=bot");
		}

		if(msg.content.toUpperCase().startsWith("?INVITE")) {
			msg.channel.send("[자동발신] The link which you can invite me: https://discord.com/api/oauth2/authorize?client_id=694393429047902220&permissions=0&scope=bot");
		}

		if(msg.content.toUpperCase().startsWith("!HELP") || msg.content.toUpperCase().startsWith("!도움말")) {
			msg.channel.send("[자동발신] 몇 가지 기능의 목록입니다.\n\n" +
								" * !discrim 태그 - 지정한 태그를 가진 사용자 목록을 표시합니다.\n" +
								" * !startswith 문자열 - 지정한 문자열로 시작하는 이름을 가진 사용자 목록입니다.\n" +
								" * !endswith 문자열 - 지정한 문자열로 끝나는 이름을 가진 사용자 목록입니다.\n" +
								" * !includes 문자열 - 지정한 문자열을 포함하는  이름을 가진 사용자 목록입니다.\n" +
								" * !match 정규식 - 지정한 정규식이 해당하는 이름을 가진 사용자 목록입니다.\n" +
								" * !listbots - 이 서버의 봇 목록을 표시합니다.\n" +
								" * !banned - 이 서버의 차단된 사용자의 목록을 표시합니다.\n" +
								" * !listonline - 이 서버의 온라인인 사용자 목록을 표시합니다.\n" +
								" * !listidle - 이 서버의 자리를 비운 사용자 목록을 표시합니다.\n" +
								" * !listdnd - 이 서버의 방해금지 사용자 목록을 표시합니다.\n" +
								" * !listoffline - 이 서버의 오프라인 혹은 투명 사용자 목록을 표시합니다.\n" +
								" * !listcustom - 이 서버에서 사용자 지정 상태를 설정한 사용자 목록을 표시합니다.\n" +
								" * !avatar @사용자 - 지정한 사용자의 아바타 이미지 주소를 알려줍니다.\n" +
								" * !hasrole 역할이름 - 지정한 역할을 가진 사용자의 목록을 표시합니다.\n" +
								" * !clear 사용자번호 - 지정한 사용자의 경고를 초기화합니다.\n" +
								'');

			msg.channel.send(EmbedMsgbox("!", "Use `?help` if you don't know Korean.", 'e'));
		}

		if(msg.content.toUpperCase().startsWith("?HELP")) {
			msg.channel.send("[자동발신] Some list of commands.\n\n" +
								" * ?discrim TAG - List of users with the tag you provided.\n" +
								" * ?startswith STRING - List of users with the name starts with the string you provided.\n" +
								" * ?endswith STRING - List of users with the name ends with the string you provided.\n" +
								" * ?includes STRING - List of users with the name includes the string you provided.\n" +
								" * ?match REGEX - List of users with the name matches the REGEX you provided.\n" +
								" * ?listbots - List of the bots in this server.\n" +
								" * ?banned - List of users who are banned.\n" +
								" * ?listcustom - List of users who set a custom status.\n" +
								" * ?hasrole ROLENAME - List of users have the role you provides.\n" +
								'');
		}

		if(msg.content.toUpperCase().startsWith("!BANNED")) {
			switch(msg.guild.id) {
				case 우리팀서버:
					var retstr = '';
					for(u of client.guilds.get(우리팀서버).members.filter(member => member.presence.status !== "x")) {
						if(u[1].roles.find(r => r.id == "684361506271264778")) {
							retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + "\n";
						}
					}
					if(retstr == '') {
						retstr = "(차단된 사용자가 없습니다)";
					}

					msg.channel.send(`[자동발신] ${msg.guild.name} 서버에서 차단된 사용자의 목록입니다.\n\n${retstr}`);
				break ; case 내서버:
					var retstr = '';
					for(u of client.guilds.get(내서버).members.filter(member => member.presence.status !== "x")) {
						if(u[1].roles.find(r => r.id == "673797140962738225")) {
							retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + "\n";
						}
					}
					if(retstr == '') {
						retstr = "(차단된 사용자가 없습니다)";
					}

					msg.channel.send(`[자동발신] ${msg.guild.name} 서버에서 차단된 사용자의 목록입니다.\n\n${retstr}`);
				break ; default:
					msg.channel.send(EmbedMsgbox("X", "이 서버는 해당 기능을 지원하지 않습니다."));
			}
		}

		if(msg.content.toUpperCase().startsWith("!ALLOWCUS")) {
			switch(msg.guild.id) {
				case 우리팀서버:
					client.channels.get('712638363706064917')
						.overwritePermissions(msg.member.user.id, {
							'SEND_MESSAGES': true
						})
						.then(x => msg.channel.send('[자동발신] 성공적으로 처리되었읍니다.')).catch(e => msg.channel.send('[자동발신] 실패!'));

					const comedyEmbed = new DJS11.RichEmbed()
						.setColor('#00C8C8')
						.setTitle('gdl-helper가 권한 행사')
						.setDescription(msg.member.user.username + '에게 접근 권한 부여')
						.addField('발생 채널', msg.channel.name, true)
						.addField('사유', '본인의 요청', true)
						.setTimestamp();
					client.channels.get(알파_관리_내역).send(comedyEmbed);
				break ; default:
					msg.channel.send(EmbedMsgbox("X", "이 서버는 해당 기능을 지원하지 않습니다."));
			}
		}

		if(msg.content.toUpperCase().startsWith("!ALLOWGAM")) {
			switch(msg.guild.id) {
				case 우리팀서버:
					client.channels.get('673490579765854225')
						.overwritePermissions(msg.member.user.id, {
							'SEND_MESSAGES': true
						})
						.then(x => msg.channel.send('[자동발신] 성공적으로 처리되었읍니다.')).catch(e => msg.channel.send('[자동발신] 실패!'));

					const comedyEmbed = new DJS11.RichEmbed()
						.setColor('#00C8C8')
						.setTitle('gdl-helper가 권한 행사')
						.setDescription(msg.member.user.username + '에게 접근 권한 부여')
						.addField('발생 채널', msg.channel.name, true)
						.addField('사유', '본인의 요청', true)
						.setTimestamp();
					client.channels.get(알파_관리_내역).send(comedyEmbed);
				break ; default:
					msg.channel.send(EmbedMsgbox("X", "이 서버는 해당 기능을 지원하지 않습니다."));
			}
		}

		if(msg.content.toUpperCase().startsWith("!ALLOWCOM")) {
			switch(msg.guild.id) {
				case 우리팀서버:
					msg.member.addRole('735338065551425569').then(x => msg.channel.send('[자동발신] 성공적으로 처리되었읍니다.')).catch(e => msg.channel.send('[자동발신] 실패!'));

					const comedyEmbed = new DJS11.RichEmbed()
						.setColor('#00C8C8')
						.setTitle('gdl-helper가 권한 행사')
						.setDescription(msg.member.user.username + '에게 접근 권한 부여')
						.addField('발생 채널', msg.channel.name, true)
						.addField('사유', '본인의 요청', true)
						.setTimestamp();
					client.channels.get(알파_관리_내역).send(comedyEmbed);
				break ; default:
					msg.channel.send(EmbedMsgbox("X", "이 서버는 해당 기능을 지원하지 않습니다."));
			}
		}

		if(msg.content.toUpperCase().startsWith("?BANNED")) {
			switch(msg.guild.id) {
				case 우리팀서버:
					var retstr = '';
					for(u of client.guilds.get(우리팀서버).members.filter(member => member.presence.status !== "x")) {
						if(u[1].roles.find(r => r.id == "684361506271264778")) {
							retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + "\n";
						}
					}
					if(retstr == '') {
						retstr = "(No users banned)";
					}

					msg.channel.send(`[자동발신] List of users banned from ${msg.guild.name}.\n\n${retstr}`);
				break ; case 내서버:
					var retstr = '';
					for(u of client.guilds.get(내서버).members.filter(member => member.presence.status !== "x")) {
						if(u[1].roles.find(r => r.id == "673797140962738225")) {
							retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + "\n";
						}
					}
					if(retstr == '') {
						retstr = "(No users banned)";
					}

					msg.channel.send(`[자동발신] List of users banned from ${msg.guild.name}.\n\n${retstr}`);
				break ; default:
					msg.channel.send(EmbedMsgbox("X", "This server does not support this feature.", 'e'));
			}
		}

		if(msg.content.toUpperCase().startsWith("!LISTBOTS")) {
			var retstr = '';
			for(u of msg.guild.members.filter(member => member.presence.status !== "x")) {
				if(u[1]['user']['bot']) {
					retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + "\n";
				}
			}
			if(retstr == '') {
				retstr = "(이 서버에는 봇이 없습니다)";
			}

			msg.channel.send(`[자동발신] ${msg.guild.name} 서버의 봇 목록입니다.\n\n${retstr}`);
		}

		if(msg.content.toUpperCase().startsWith("?LISTBOTS")) {
			var retstr = '';
			for(u of msg.guild.members.filter(member => member.presence.status !== "x")) {
				if(u[1]['user']['bot']) {
					retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + "\n";
				}
			}
			if(retstr == '') {
				retstr = "(No bots in this server)";
			}

			msg.channel.send(`[자동발신] List of bots in ${msg.guild.name}.\n\n${retstr}`);
		}

		if(msg.content.toUpperCase().startsWith("!LISTONLINE")) {
			var retstr = '';
			for(u of msg.guild.members.filter(member => member.presence.status == "online")) {
				retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + "\n";
			}
			if(retstr == '') {
				retstr = "(이 서버에는 온라인인 사용자가 없습니다)";
			}

			msg.channel.send(`[자동발신] ${msg.guild.name} 서버의 온라인 사용자 목록입니다.\n\n${retstr}`);
		}

		if(msg.content.toUpperCase().startsWith("!LISTIDLE")) {
			var retstr = '';
			for(u of msg.guild.members.filter(member => member.presence.status == "idle")) {
				retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + " (" + getUserStatus(u[1]['user']['id']) + ")\n";
			}
			if(retstr == '') {
				retstr = "(이 서버에는 자리를 비운 사용자가 없습니다)";
			}

			msg.channel.send(`[자동발신] ${msg.guild.name} 서버의 자리를 비운 사용자 목록입니다.\n\n${retstr}`);
		}

		if(msg.content.toUpperCase().startsWith("!LISTDND")) {
			var retstr = '';
			for(u of msg.guild.members.filter(member => member.presence.status == "dnd")) {
				retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + " (" + getUserStatus(u[1]['user']['id']) + ")\n";
			}
			if(retstr == '') {
				retstr = "(이 서버에는 방해금지 사용자가 없습니다)";
			}

			msg.channel.send(`[자동발신] ${msg.guild.name} 서버의 방해금지 사용자 목록입니다.\n\n${retstr}`);
		}

		if(msg.content.toUpperCase().startsWith("!LISTOFFLINE")) {
			var retstr = '';
			for(u of msg.guild.members.filter(member => member.presence.status == "offline" || member.presence.status == "invisible")) {
				retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + "\n";
			}
			if(retstr == '') {
				retstr = "(이 서버에는 오프라인인 사용자가 없습니다)";
			}

			msg.channel.send(`[자동발신] ${msg.guild.name} 서버의 오프라인 사용자 목록입니다.\n\n${retstr}`);
		}

		if(msg.content.toUpperCase().startsWith("!LISTCUSTOM")) {
			var retstr = '';
			for(u of msg.guild.members.filter(member => member.presence.status !== "x")) {
				if(getUserStatus(u[1]['user']['id']) != "-")
					retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + " (" + getUserStatus(u[1]['user']['id']) + ")\n";
			}
			if(retstr == '') {
				retstr = "(이 서버에는 사용자정의 상태를 지정한 사용자가 없습니다)";
			}

			msg.channel.send(`[자동발신] ${msg.guild.name} 서버의 사용자정의 상태를 지정한 사용자 목록입니다.\n\n${retstr}`);
		}

		if(msg.content.toUpperCase().startsWith("?LISTCUSTOM")) {
			var retstr = '';
			for(u of msg.guild.members.filter(member => member.presence.status !== "x")) {
				if(getUserStatus(u[1]['user']['id']) != "-")
					retstr += u[1]['user']['username'] + "#" + u[1]['user']['discriminator'] + " (" + getUserStatus(u[1]['user']['id']) + ")\n";
			}
			if(retstr == '') {
				retstr = "(No users found)";
			}

			msg.channel.send(`[자동발신] List of users who set a custom status in ${msg.guild.name}.\n\n${retstr}`);
		}

		if(msg.content.toUpperCase().startsWith("!AVATAR")) {
			if(!msg.content.match(/<@!?(\d+)>/g)) {
				msg.channel.send(EmbedMsgbox("X", "대상 사용자를 @로 명시해주세요."));
			} else {
				const user = getUserFromMention(msg.content.match(/<@!?(\d+)>/g)[0]);
				try {
					msg.channel.send(`[자동발신] 사용자 ${user.username}의 아바타 (${user.displayAvatarURL}) 입니다.`);
				} catch(e) {
					msg.channel.send(EmbedMsgbox("X", "사용자를 존재하지 않거나 권한 부족 등으로 정보를 가져올 수 없읍니다."));
				}
			}
		}

		var ownerObj = client.users.find(user => user.id == 내계정);
		
		addxp(msg.member.user.id, msg.guild.id, 1);

		if(!msg.webhookID && (username != myUsername || (username == myUsername && msg.content.startsWith("[자")))) {
			if(!jsnMsgCounts[msg.member.user.id]) jsnMsgCounts[msg.member.user.id] = 1;
			else jsnMsgCounts[msg.member.user.id]++;

/*
			if(!msg.content.toUpperCase().startsWith("!SETALLLEVEL") && jsnMsgCounts[msg.member.user.id] >= (msg.guild.id == 내서버 ? 15 : 50)) {
				jsnMsgCounts[msg.member.user.id] = 0;

				db.get("select level from levels where guild = ? and id = ?", [msg.guild.id, msg.member.user.id], (err, result) => {
					if(err) return;

					var lvl;
					if(!result) {
						lvl = (lowMessageRate.includes(username) ? 2 : 1);
						db.run("insert into levels (id, guild, level) values (?, ?, ?)", [msg.member.user.id, msg.guild.id, lvl + 1], (err) => {});
					} else {
						lvl = Number(result['level']);
						db.run("update levels set level = ? where id = ? and guild = ?", [lvl + 1, msg.member.user.id, msg.guild.id], (err) => {});
					}
				});
			}
			*/

			if(msg.content.toUpperCase().startsWith("!SETALLLEVEL")) {
				if(msg.guild.ownerID == msg.member.user.id || msg.member.user.id == 내계정 || msg.member.user.id == 부계정_ID) {
					const lvl = Number(msg.content.replace(/[!]SETALLLEVEL\s/i, ''));

					if(lvl === NaN) {
						msg.channel.send(EmbedMsgbox('X', '숫자가 아닙니다.'));
					} else {
						db.run("delete from levels where guild = ?", [msg.guild.id], (err) => {
							const list = msg.guild;

							list.members.forEach(function(member) {
								// print("\n레벨 설정 - " + member.user.username);

								db.run("insert into levels (id, guild, level) values (?, ?, ?)", [member.user.id, msg.guild.id, lvl], (err) => {
									if(err) print('\n레벨 설정 실패 - ' + member.user.username + " - " + err);
								});
							});

							msg.channel.send(EmbedMsgbox('I', '성공적으로 처리되었읍니다.'));
						});
					}
				} else {
					msg.channel.send(EmbedMsgbox('X', '권한이 부족합니다.'));
				}
			}

			if(msg.content.toUpperCase().startsWith("!MYLEVEL")) {
				const lvl = msg.content.replace(/[!]SETALLLEVEL\s/i, '');

				var sndmsg = `${msg.member.user.username}님의 레벨 정보입니다.\n\n`;

				for(var svr of client.guilds.array()) {
					const lv = await db.query("select level from levels where guild = ? and id = ?", [svr.id, msg.member.user.id]);

					if(lv == undefined && svr.id == msg.guild.id) {
						db.run("insert into levels (id, guild, level) values (?, ?, ?)", [msg.member.user.id, svr.id, 1], (err) => {});
						sndmsg += `${svr.name} 서버에서 ${1}레벨입니다.\n`;
					} else if(lv) {
						sndmsg += `${svr.name} 서버에서 ${lv['level']}레벨입니다.\n`;
					}
				}

				msg.channel.send(sndmsg);
			}

			if(msg.content.toUpperCase().startsWith("!LEVELOF")) {
				const user = getUserFromMention(msg.content) || client.users.find(u => u.tag == msg.content.replace(/[!]levelof(\s*)/i, ''));
				if(!user) {
					msg.channel.send(EmbedMsgbox('X', '문제가 발생했습니다!'));
				} else {
					const svr = msg.guild;
					var sndmsg = '';
					const lv = await db.query("select level from levels where guild = ? and id = ?", [svr.id, user.id]);

					if(lv === undefined && svr.id == msg.guild.id) {
						db.run("insert into levels (id, guild, level) values (?, ?, ?)", [user.id, svr.id, 1], (err) => {});
						sndmsg += `${svr.name} 서버에서 ${1}레벨입니다.\n`;
					} else if(lv) {
						sndmsg += `${svr.name} 서버에서 ${lv['level']}레벨입니다.\n`;
					}
					
					msg.channel.send('[자동발신] ' + sndmsg);
				}
			}

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

			// msg.member.toString() 도배라니(...)
			if(typeof(jsnOldMsg[msg.member.toString()]) === 'undefined') {
				jsnOldMsg[msg.member.toString()] = msg.content;
			} else {
				if(jsnOldMsg[msg.member.toString()] == msg.content) {
					jsnOldMsg[msg.member.toString()] = msg.content;
					if(typeof(jsnOldMsgCnt[msg.member.toString()]) == 'undefined') {
						jsnOldMsgCnt[msg.member.toString()] = 1;
					} else {
						jsnOldMsgCnt[msg.member.toString()]++;
						if(jsnOldMsgCnt[msg.member.toString()] >= 12 - 1) {
							msg.channel.send("[자동발신] " + swear(rndval(200 + (jsnOldMsgCnt[msg.member.toString()] * 3)))[1] ).then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 11 - 1) {
							msg.channel.send("[자동발신] 참").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동발신] 으").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동발신] 로").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동발신] 대").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동발신] 단").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동발신] 하").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동발신] 군").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 11 - 1) {
							(async() => {
								await msg.channel.send("[자동발신] 1");
								await msg.channel.send("[자동발신] 2");
								await msg.channel.send("[자동발신] 3");
								await msg.channel.send("[자동발신] 4");
								await msg.channel.send("[자동발신] 5");
							})();
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 10 - 1) {
							(async() => {
								await msg.channel.send("[자동발신] 도");
								await msg.channel.send("[자동발신] 배");
								await msg.channel.send("[자동발신] 의");
								await msg.channel.send("[자동발신] 왕");
							})();
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 9 - 1) {
							msg.channel.send("[자동발신] 하").then(msg => {
								msg.channel.send("[자동발신] 지").then(msg => {
									msg.channel.send("[자동발신] 말").then(msg => {
										msg.channel.send("[자동발신] 라").then(msg => {
											msg.channel.send("[자동발신] 고");
										});
									});
								});
							});
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 8 - 1) {
							msg.channel.send("[자동발신] 도배왕 도배왕 도배왕 도배왕");
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 7 - 1) {
							msg.channel.send("[자동발신] 어디까지 도배하실 건가요");
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 6 - 1) {
							msg.channel.send("[자동발신] 메가 도배왕");
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 5 - 1) {
							msg.channel.send("[자동발신] 도배왕");
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 4 - 1) {
							msg.channel.send("[자동발신] 자꾸 하실래요?");
/*
							if((msg.channel.id != '712638363706064917' && msg.channel.id != '685009249708802070' && msg.guild.id == 우리팀서버) || msg.guild.id == '683288598497198090') {
								var lvl = await fetchLevel(msg.member.user.id, msg.guild.id);
								lvl -= 10;
								msg.channel.send(EmbedMsgbox("!", `경고 무시 후 계속 도배로 옐로우 혹은 레드 카드 부여하겠읍니다. 10레벨 내리겠읍니다. 현재 ${msg.member.user.username}님은 ${lvl}레벨입니다. [[오차단 신고]](https://discord.gg/626yR28KGs)`));
								const x = await setLevel(msg.member.user.id, msg.guild.id, lvl);

								if(GotYellowCards.includes(msg.member.user.id)) {
									msg.member.addRole('712945740720111638');

									const ppppRedCard = new DJS11.RichEmbed()
										.setColor('#00C8C8')
										.setTitle('gdl-helper가 권한 행사')
										.setDescription(msg.member.user.username + ' 강한 차단')
										.addField('발생 채널', msg.channel.name, true)
										.addField('사유', '도배', true)
										.setTimestamp();
									client.channels.get(알파_관리_내역).send(ppppRedCard);
								} else {
									msg.member.addRole('684361506271264778');
									GotYellowCards.push(msg.member.user.id);

									const ppppYellowCard = new DJS11.RichEmbed()
										.setColor('#00C8C8')
										.setTitle('gdl-helper가 권한 행사')
										.setDescription(msg.member.user.username + ' 약한 차단')
										.addField('발생 채널', msg.channel.name, true)
										.addField('사유', '도배', true)
										.setTimestamp();
									client.channels.get(알파_관리_내역).send(ppppYellowCard);
								}
							}
							*/
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 3 - 1) {
							//msg.channel.send("[자동발신] 같은 내용의 메시지를 반복적으로 도배하지 마십시오").then(msg => {
							//	msg.delete(3000);
							//}).catch( /* -- */ );
							msg.channel.send("[자동발신] ㅎ");
							/*
							if((msg.channel.id != '712638363706064917' && msg.channel.id != '685009249708802070' && msg.guild.id == 우리팀서버) || msg.guild.id == '683288598497198090') {
								var lvl = await fetchLevel(msg.member.user.id, msg.guild.id);
								lvl -= 2;

								msg.channel.send(EmbedMsgbox("!", `이 서버에서 (시험실 제외) 메시지를 반복적으로 도배하면 차단됩니다. 2레벨 내리겠읍니다. 현재 ${msg.member.user.username}님은 ${lvl}레벨입니다.`));
								const x = await setLevel(msg.member.user.id, msg.guild.id, lvl);

								const ppppWarning = new DJS11.RichEmbed()
									.setColor('#00C8C8')
									.setTitle('gdl-helper가 권한 행사')
									.setDescription(msg.member.user.username + '에게 경고 부여')
									.addField('발생 채널', msg.channel.name, true)
									.addField('사유', '도배', true)
									.setTimestamp();
								client.channels.get(알파_관리_내역).send(ppppWarning);
							}
							*/
						}
					}

					if(jsnOldMsgCnt[msg.member.toString()] >= 3 - 1) {
						if(!dl.includes(msg.member.user.username) ) {
							dios.push([msg.member.user.username, msg.content, jsnOldMsgCnt[msg.member.toString()] ]);
							dl.push(msg.member.user.username);
						}
					}
				} else {
					jsnOldMsg[msg.member.toString()] = msg.content;
					jsnOldMsgCnt[msg.member.toString()] = 0;
				}
			}

			// 상태 확인 //
			const list = client.guilds.get(우리팀서버);

			var onlinecount = 0;

			list.members.forEach(function(member) {
				var username = member.user.username;
				var bs = jsnUserStats[userid], cs = member.user.presence.status;

				if(member.user.id != msg.member.user.id && member.user.id != '694393429047902220' && member.user.id != MANAGER_BOT) {
					if(cs == 'online') onlinecount++;
				}
			});
			/*
			if(jsnNoWarning[msg.member.toString()] != true && !onlinecount && (typeof(jsnWarned[msg.member.toString()]) == 'undefined' || jsnWarned[msg.member.toString()] == false)) {
				msg.channel.send("[자동발신][AD5] 현재 당신 외에 온라인인 사람이 없읍니다. 메모 등이 아니라면 다음에 다시 시도해주세요\n\n[[수신거부-채팅창에 `!DISBWRNG`]]").then(msg => {
					msg.delete(5000);
				}).catch(  );

				jsnWarned[msg.member.toString()] = true;

				setTimeout(function() {
					jsnWarned[msg.member.toString()] = false;
				}, 60000 * 15);
			}
			*/
			/// 상태 확인 끝 ///

			/* 욕설 필터링 */
			if( swear(msg.content)[0] || msg.content == "$SWEARWRD_CHT" ) {
				print('[[경고! 방금 메시지에 욕설이 포함되어있는 것같습니다]]');

				if(
					(msg.channel.id == TM_자유_대화 ||
					 msg.channel.id == '685009249708802070' ||
					 msg.channel.id == '673490579765854225') //&&

					//(
					   // ['idle', 'dnd', 'offline'].includes(client.users.find(user => user.id == 내계정).presence.status) &&
					 //   ['idle', 'dnd', 'offline'].includes(client.users.get(client.guilds.get(우리팀서버).ownerID).presence.status)
					// )
					// )
				) {
					if(msg.guild.id == 우리팀서버/* && client.users.find(user => user.id == MANAGER_BOT).presence.status != 'online'*/) {
						if(jsnSwearWarnings[msg.member.user.id] == undefined) {
							jsnSwearWarnings[msg.member.user.id] = 1;
						} else {
							jsnSwearWarnings[msg.member.user.id] += 1;
						}

						if(jsnSwearWarnings[msg.member.user.id] == 2) {
							jsnSwearWarnings[msg.member.user.id] = 0;
							if(GotYellowCards.includes(msg.member.user.id)) {
								msg.member.addRole('712945740720111638');

								const swearingRedCard = new DJS11.RichEmbed()
									.setColor('#00C8C8')
									.setTitle('gdl-helper가 권한 행사')
									.setDescription(msg.member.user.username + ' 강한 차단')
									.addField('발생 채널', msg.channel.name, true)
									.addField('사유', '욕설', true)
									.setTimestamp();
								client.channels.get(알파_관리_내역).send(swearingRedCard);
							} else {
								msg.member.addRole('684361506271264778');
								GotYellowCards.push(msg.member.user.id);

								const swearingYellowCard = new DJS11.RichEmbed()
									.setColor('#00C8C8')
									.setTitle('gdl-helper가 권한 행사')
									.setDescription(msg.member.user.username + ' 약한 차단')
									.addField('발생 채널', msg.channel.name, true)
									.addField('사유', '욕설', true)
									.setTimestamp();
								client.channels.get(알파_관리_내역).send(swearingYellowCard);
							}

							msg.channel.send(EmbedMsgbox("!", "경고를 2번이나 주었는데 아직도 욕을 쓰고 있나요? 옐로우 혹은 레드 카드 부여되었고 차소게에서 반성후 해제를 요청하십시오. [[오차단 신고]](https://discord.gg/626yR28KGs)"));
						} else {
							var lvl = await fetchLevel(msg.member.user.id, msg.guild.id);
							lvl -= 1;
							if(lvl >= 0) x = await setLevel(msg.member.user.id, msg.guild.id, lvl);

							msg.channel.send(EmbedMsgbox("!", "욕을 쓰지 말아주십시오. 스트라이크 " + String(2 - jsnSwearWarnings[msg.member.user.id]) + "번 더 받으면 차단들어갑니다. 또한 1레벨 내립니다. 현재 " + lvl + "레벨입니다. [[오차단 신고]](https://discord.gg/626yR28KGs)"));

							const swearingWarning = new DJS11.RichEmbed()
								.setColor('#00C8C8')
								.setTitle('gdl-helper가 권한 행사')
								.setDescription(msg.member.user.username + ' ' + jsnSwearWarnings[msg.member.user.id] + '회차 경고 부여')
								.addField('발생 채널', msg.channel.name, true)
								.addField('사유', '욕설', true)
								.setTimestamp();
							client.channels.get(알파_관리_내역).send(swearingWarning);
						}
					} else {
						if(client.users.find(user => user.id == MANAGER_BOT).presence.status != 'online') {
							msg.channel.send("[자동발신] 음냐.. 욕을 쓰면 기분이 좋을까요?");
						}
					}
				}

				beep(3);
			}
			
			if((typeof(jsnNoWarning[msg.member.toString()]) == 'undefined' || jsnNoWarning[msg.member.toString()] != true) && (msg.content.includes("ㅎㅇ") || msg.content.includes("하이")) && (!msg.content.includes("@") || msg.content.includes("453432847617884172") || msg.content.includes("694393429047902220")) && typeof(jsnHello[msg.member.toString()]) == 'undefined') {
				msg.channel.send("[자동발신] 안녕하십니까, " + msg.member.toString() + "!\n\n[[수신거부-채팅창에 `!DISBWRNG`]]");
				jsnHello[msg.member.toString()] = true;
			}
			
			/*
			if(lowMessageRate.includes(username)) {
				sound('1050,220 0,300 1050,220');
			} else if(lowConnections.includes(username)) {
				sound('950,220 0,300 950,220');
			} else {
				if(msg.isMemberMentioned(client.user) || msg.isMemberMentioned(client.users.find(user => user.id == 내계정))) {
					beep(2);
					setTimeout(function() {
						beep(1);
						setTimeout(function() {
							beep(2);
						}, 650);
					}, 650);
				} else {
					sound('800,220 0,300 800,220');
				}
			}*/
			
			if(lowMessageRate.includes(username)) {
				beep(5);
				/*
				beep(2);
				setTimeout(function() {
					beep(1);
				}, 650);
				*/
			} else if(lowConnections.includes(username)) {
				beep(4);
				/*
				beep(1);
				setTimeout(function() {
					beep(1);
					setTimeout(function() {
						beep(1);
					}, 650);
				}, 650);
				*/
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
		if( answer.startsWith("![[") && answer.endsWith("]]") ) {
			const MsgBox = new DJS11.RichEmbed()
				.setColor('#00C8C8')
				.setTitle('주의')
				.setDescription( "<:WXPMBX03:706030882036908032> " + answer.replace(/^[!]\[\[/, '').replace(/\]\]$/, '') );

			client.channels.get(cid).send(MsgBox);
		} else if( answer.startsWith('E[[') && answer.endsWith(']]') ) {
			const MsgBox = new DJS11.RichEmbed()
				.setColor('#2F3136')
				.setTitle('')
				.setDescription( answer.replace(/^[E]\[\[/, '').replace(/\]\]$/, '').replace(/[$]lh/gi, 'https://discord.gg/r2bYBtP') );

			client.channels.get(cid).send(MsgBox);
		} else if( answer.toUpperCase().startsWith("X[[") && answer.endsWith("]]") ) {
			const MsgBox = new DJS11.RichEmbed()
				.setColor('#00C8C8')
				.setTitle('문제가 발생했습니다!')
				.setDescription( "<:WXPMBX01:704469296683810836> " + answer.replace(/^[X]\[\[/i, '').replace(/\]\]$/, '') );

			client.channels.get(cid).send(MsgBox);
		} else if( answer.startsWith("?[[") && answer.endsWith("]]") ) {
			const MsgBox = new DJS11.RichEmbed()
				.setColor('#00C8C8')
				.setTitle('질문')
				.setDescription( "<:W95MBX02:704529164396658720> " + answer.replace(/^[?]\[\[/, '').replace(/\]\]$/, '') );

			client.channels.get(cid).send(MsgBox);
		} else if( answer.startsWith("[[") && answer.endsWith("]]") ) {
			const MsgBox = new DJS11.RichEmbed()
				.setColor('#00C8C8')
				.setTitle('알립니다')
				.setDescription( "<:W95MBX04:704529118280155196> " + answer.replace(/^\[\[/, '').replace(/\]\]$/, '') );

			client.channels.get(cid).send(MsgBox);
		} else {
			if(answer.match(/^[!]/)) {
				client.channels.get(cid).send(answer.replace(/^[!]/, ''));
			} else {
				if(answer.startsWith("/")) {
					client.channels.get(cid).send("[사용자발신] " + swear(answer)[1].replace(/^[/]/, '')).then(msg => {
						setTimeout(() => msg.edit('[삭제된 메시지입니다.]'), 3000);
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

	activateInput();
});

/*
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
	if(key.ctrl) {
		switch(key.name) {
			case 't':
				cid = TM_자유_대화;
			break; case 'a':
				cid = '670426525182459927';
			break; case 'e':
				cid = '675264839094108161';
		}
	}
});
*/

client.on('guildMemberAdd', member => {
	switch(member.guild.id) {
		case 우리팀서버:
			client.channels.get(TM_자유_대화).send("[자동발신] 안녕!");
			
			setTimeout(function() {
				if(1 || member.user.discriminator == '3967') {
					try {
						client.channels.get(TM_자유_대화).send('[자동발신] https://discord.gg/e5W9G6e ' + member.toString());
					} catch(e) {
						try {
							client.channels.get(TM_자유_대화).send('[자동발신] https://discord.gg/e5W9G6e ' + member);
						} catch(r) {
							client.channels.get(TM_자유_대화).send('[자동발신] https://discord.gg/e5W9G6e');
						}
					}
				}
			}, 5000);
	}

	print(`\n[[${member.guild.name} 서버에 ${member.user.username} 사용자가 참가했읍니다]]`);

	beep(3);
	setTimeout(function() {
		beep(1);
		setTimeout(function() {
			beep(2);
		}, 650);
	}, 650);

	activateInput();
});

client.on('guildMemberRemove', async member => {
	switch(member.guild.id) {
		case 우리팀서버:
			// client.channels.get(TM_자유_대화).send(EmbedMsgbox("I", member.user.username + " 사용자가 서버를 떠났읍니다"));
			var lvl = await fetchLevel(member.user.id, member.guild.id);
			lvl /= 2;
			var x = await setLevel(member.user.id, member.guild.id, Math.floor(lvl));
	}

	if(member.guild.id == 내서버 && client.users.find(u => u.bot && u.username == 'twilight-defender').presence.status != 'online') {
		client.channels.get('684952646112903170').send('[자동발신] ' + member.user.username + '가 서버를 떠났음');
	}

	print(`\n[[${member.guild.name} 서버에서 ${member.user.username} 사용자가 떠났읍니다]]`);

	beep(3);
	setTimeout(function() {
		beep(2);
		setTimeout(function() {
			beep(1);
		}, 650);
	}, 650);

	activateInput();
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

	activateInput();
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
	function find(snowflake, collection) {
		var retval = false;
		collection.forEach(item => {
			if(item.id == snowflake) retval = true;
		});
		
		return retval;
	}
	
	var msgstr = '';
	const { Permissions } = require('djs11');
	var oldarr = [], newarr = [];
	
	oldMember.roles.forEach(role => {
		if(!find(role.id, newMember.roles)) {
			msgstr = role.name + ' 역할 회수';
		}
		oldarr = oldarr.concat(new Permissions(role.permissions).toArray());
	});
	
	newMember.roles.forEach(role => {
		if(!find(role.id, oldMember.roles)) {
			msgstr = role.name + ' 역할 부여';
		}
		newarr = newarr.concat(new Permissions(role.permissions).toArray());
	});
	
	if(!msgstr) return;
	
	oldarr = oldarr.filter((a, b, c) => c.indexOf(a) == b);
	newarr = newarr.filter((a, b, c) => c.indexOf(a) == b);
	
	var ret = '';
	
	for(perm in Permissions.FLAGS) {
		if(!oldarr.includes(perm) && newarr.includes(perm)) {
			ret += '+' + perm.toLowerCase() + ' ';
		}
		else if(oldarr.includes(perm) && !newarr.includes(perm)) {
			ret += '-' + perm.toLowerCase() + ' ';
		}
	}
	
	function getDateTime() {
		var date = new Date();

		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;

		var min  = date.getMinutes();
		min = (min < 10 ? "0" : "") + min;

		var sec  = date.getSeconds();
		sec = (sec < 10 ? "0" : "") + sec;

		var year = date.getFullYear();

		var month = date.getMonth() + 1;
		month = (month < 10 ? "0" : "") + month;

		var day  = date.getDate();
		day = (day < 10 ? "0" : "") + day;

		return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
	}
	
	switch(newMember.guild.id) {
		case 우리팀서버:
			// 감사로고 조회 권한 없음
			const grantCard = new DJS11.RichEmbed()
				.setColor('#00C8C8')
				.setTitle('서버 운영자가 권한 행사')
				.setDescription('사용자 권한 설정')
				.addField('대상', newMember.user.username, true)
				.addField('역할', msgstr, true)
				.addField('권한', ret ? ret : '변경 없음', false)
				.setTimestamp();
			
			client.channels.get(알파_관리_내역).send(grantCard);
		break; case 내서버:
			const log = (await oldMember.guild.fetchAuditLogs({
				limit: 1,
				type: 'MEMBER_ROLE_UPDATE'
			})).entries.first();
			if(!log) break;
			client.channels.get(차단_내역).send(getDateTime() + ' **' + log.executor.username + '** 사용자가 ' + newMember.user.username + ' *(사용자 권한 설정)* (' + ret + ')');
	}
});

const emoji = require('node-emoji');

client.on('messageReactionAdd', async (reaction, user) => {
	var emkey = reaction['_emoji']['name'];

	if(emoji.hasEmoji(emkey)) {
		emkey = emoji.find(emkey)['key'];
	}

	const message = reaction['message']['content'].slice(0,18).replace(/(\r|\n|\r\n)/g, ' ');  // 1
	const username = user.username;  // 2
	const emojichr = reaction['_emoji']['name'];  // 3
	const channel = reaction['message']['channel']['id'];  // 4
	const emojikey = emkey;  // 5
	const userid = user.id;  // 6
	const server = client.channels.get(channel).guild.id;

	print("\n\n[[" + message + " 메시지에 " + username + "가 (" + emojikey + ") 반응했읍니다]]");
	activateInput();

	if(emojichr.includes("🖕")) {
		if(client.channels.get(channel).guild.id == 우리팀서버 || client.channels.get(channel).guild.id == '683288598497198090') {
			if(jsnSwearWarnings[userid] == undefined) {
				jsnSwearWarnings[userid] = 1;
			} else {
				jsnSwearWarnings[userid] += 1;
			}

			if(jsnSwearWarnings[userid] == 3) {
				jsnSwearWarnings[userid] = 0;
				if(GotYellowCards.includes(userid)) {
					client.guilds.get(우리팀서버).members.get(userid).addRole('712945740720111638');

					const swearingRedCard2 = new DJS11.RichEmbed()
						.setColor('#00C8C8')
						.setTitle('gdl-helper가 권한 행사')
						.setDescription(msg.member.user.username + ' 강한 차단')
						.addField('발생 채널', msg.channel.name, true)
						.addField('사유', '욕설', true)
						.setTimestamp();
					client.channels.get(알파_관리_내역).send(swearingRedCard2);
				} else {
					client.guilds.get(우리팀서버).members.get(userid).addRole('684361506271264778');
					GotYellowCards.push(userid);

					const swearingYellowCard2 = new DJS11.RichEmbed()
						.setColor('#00C8C8')
						.setTitle('gdl-helper가 권한 행사')
						.setDescription(msg.member.user.username + ' 약한 차단')
						.addField('발생 채널', msg.channel.name, true)
						.addField('사유', '욕설', true)
						.setTimestamp();
					client.channels.get(알파_관리_내역).send(swearingYellowCard2);
				}

				client.channels.get(channel).send(EmbedMsgbox("!", "옐로우 혹은 레드 카드 부여되었고, 차소게에서 반성후 해제를 요청하십시오. 당신의 레벨은 " + String(lvl) + "입니다. [[오차단 신고]](https://discord.gg/626yR28KGs)"));
			} else {
				var lvl = await fetchLevel(userid, server);
				lvl -= 1;
				if(lvl >= 0) await setLevel(userid, server, lvl);

				client.channels.get(channel).send(EmbedMsgbox("!", "욕을 쓰지 마시오! 스트라이크 " + String(3 - jsnSwearWarnings[userid]) + "번 더 받으면 차단들어갑니다. 또한 1레벨 내립니다. 당신의 레벨은 " + String(lvl) + "입니다. [[오작동 신고]](https://discord.gg/626yR28KGs)"));
			}
		} else {
			client.channels.get(channel).send("[자동발신] 가운데 손가락......(...)").then(msg => {
				msg.delete(3000);
			}).catch( /* -- */ );
		}
	}
});

client.on('messageReactionRemove', async (reaction, user) => {
	print("\n\n[[" + reaction['message']['content'].slice(0,18).replace(/(\r|\n|\r\n)/g, ' ') + " 메시지의 반응을 " + user.username + "가 삭제했읍니다]]");
	activateInput();
});

const token = "Njk0MzkzNDI5MDQ3OTAyMjIw.Xvw3Gg.4dTViLxRi4HOtFF4mKxeP0Zn7ew";
client.login(token);
// client12.login(token);
// client8.loginWithToken(token);

const keypress = require('keypress'), tty = require('tty');

keypress(process.stdin);

process.stdin.on('keypress', async function (ch, key) {
	if(key && key.ctrl) {
		switch(key.name) {
			case 't':
				cid = TM_자유_대화;
			break; case 'a':
				cid = '670426525182459927';
			break; case 'e':
				cid = '675264839094108161';
			break; case 's':
				cid = '683288598497198097';
			break; case 'g':
				cid = '673490579765854225';
			break; case 'x':
				cid = '685009249708802070';
			break; case 'b':
				cid = '685009291421155462';
			break; case 'n':
				cid = '685009291421155462';
			break; case 'r':
				cid = '685751050497687570';
			break; case 'y':
				cid = '693808616096137256';
			break; case 'o':
				cid = '703907482791313498';
			break; case 'u':
				cid = '751387760845127763';
		}

		try {
			print("\n\n[[채널이 " + client.channels.get(sch).name + "에서 " + client.channels.get(cid).name + "(으)로 변경되었읍니다]]");
		} catch(e) {
			print("\n\n[[채널이 " + client.channels.get(cid).name + "(으)로 변경되었읍니다]]");
		}
		sch = cid;

		prt("\n\n" + myUsername + "> ");

		rl.question(myUsername + '> ', (answer) => {
			// TODO: Log the answer in a database
			if( answer.startsWith("![[") && answer.endsWith("]]") ) {
				const MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('주의')
					.setDescription( "<:WXPMBX03:706030882036908032> " + answer.replace(/^[!]\[\[/, '').replace(/\]\]$/, '') );

				client.channels.get(cid).send(MsgBox);
			} else if( answer.toUpperCase().startsWith("X[[") && answer.endsWith("]]") ) {
				const MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('문제가 발생했습니다!')
					.setDescription( "<:WXPMBX01:704469296683810836> " + answer.replace(/^[X]\[\[/i, '').replace(/\]\]$/, '') );

				client.channels.get(cid).send(MsgBox);
			} else if( answer.startsWith("?[[") && answer.endsWith("]]") ) {
				const MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('질문')
					.setDescription( "<:W95MBX02:704529164396658720> " + answer.replace(/^[?]\[\[/, '').replace(/\]\]$/, '') );

				client.channels.get(cid).send(MsgBox);
			} else if( answer.startsWith("[[") && answer.endsWith("]]") ) {
				const MsgBox = new DJS11.RichEmbed()
					.setColor('#00C8C8')
					.setTitle('알립니다')
					.setDescription( "<:W95MBX04:704529118280155196> " + answer.replace(/^\[\[/, '').replace(/\]\]$/, '') );

				client.channels.get(cid).send(MsgBox);
			} else {
				if(answer.match(/^[!]/)) {
					client.channels.get(cid).send(answer.replace(/^[!]/, ''));
				} else {
					if(answer.startsWith("/")) {
						client.channels.get(cid).send("[사용자발신] " + swear(answer)[1].replace(/^[/]/, '')).then(msg => {
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
		// client.user.setGame(null);
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
			break ; case 'o':
				client12.user.setPresence({
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
				client12.user.setPresence({
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
				client12.user.setActivity('!help', { url: 'https://twitch.tv/your/stream/here', type: 'STREAMING' });
				client.user.setGame("!help", "https://www.twitch.tv/-");
			break ; case 'p':
				client.user.setPresence({
					status: "online"
				});
				client12.user.setPresence({
					status: "online"
				});
				client12.user.setActivity('!help', { url: 'https://twitch.tv/your/stream/here', type: 'STREAMING' });
				client.user.setGame("!help", "https://www.twitch.tv/-");
		}



		if(bid != 0 && client.channels.get(cid).guild.id == 우리팀서버) {
			// print(client.guilds.get(우리팀서버).members.get(bid));
			var SM;
			var UN = client.users.find(user => user.id == bid)['username'];
			try {
				client.guilds.get(우리팀서버).members.get(bid).removeRole("684361506271264778");
				SM = EmbedMsgbox('i', "사용자 " + UN + " (" + String(bid) + ")" + " 차단 해제에 성공!");
			} catch(e) {
				SM = EmbedMsgbox('X', "사용자 " + UN + " (" + String(bid) + ")" + "은(는) 차단 해제될 수 없음.");
			}

			try {
				client.channels.get(cid).send(SM);
			} catch(e) {}
		}
		if(bid != 0 && client.channels.get(cid).guild.id == 내서버) {
			var SM;
			var UN = client.users.find(user => user.id == bid)['username'];
			try {
				client.guilds.get(내서버).members.get(bid).removeRole("673797140962738225");
				SM = EmbedMsgbox('i', "사용자 " + UN + " (" + String(bid) + ")" + " 차단 해제에 성공!");
			} catch(e) {
				SM = EmbedMsgbox('X', "사용자 " + UN + " (" + String(bid) + ")" + "은(는) 차단 해제될 수 없음.");
			}


			try {
				client.channels.get(cid).send(SM);
			} catch(e) {}
		}
	}
	else if(key && key.meta) {
		var bid = 0;

		switch(key.name) {
		}

		if(client.channels.get(cid).guild.id == 우리팀서버 && bid != 0) {
			// print(client.guilds.get(우리팀서버).members.get(bid));
			var SM;
			var UN = client.users.find(user => user.id == bid)['username'];
			try {
				const memberObj = client.guilds.get(우리팀서버).members.get(bid);

				client.guilds.get(우리팀서버).members.get(bid).addRole("684361506271264778");
				SM = EmbedMsgbox('!', "사용자 " + UN + " (" + String(bid) + ")" + " 차단에 성공 및 1레벨 내렸읍니다.");

				var lvl = await fetchLevel(memberObj.user.id, 우리팀서버);
				lvl -= 1;
				const x = await setLevel(memberObj.user.id, 우리팀서버, lvl);
			} catch(e) {
				SM = EmbedMsgbox('X', "사용자 " + UN + " (" + String(bid) + ")" + "은(는) 차단될 수 없음");
			}

			/*
			setInterval(function() {
				client.guilds.get(우리팀서버).members.get(bid).removeRole("684361506271264778");
			}, 60000 * 15);
			*/
			try {
				client.channels.get(cid).send(SM);
			} catch(e) {}
		}

		if(client.channels.get(cid).guild.id == 내서버 && bid != 0) {
			var SM;
			var UN = client.users.find(user => user.id == bid)['username'];
			try {
				client.guilds.get(내서버).members.get(bid).addRole("673797140962738225");
				SM = EmbedMsgbox('!', "사용자 " + UN + " (" + String(bid) + ")" + " 차단에 성공!");

				const memberObj = client.guilds.get('673797140962738225').members.get(bid);

				client.guilds.get('673797140962738225').members.get(bid).addRole("684361506271264778");
				SM = EmbedMsgbox('!', "사용자 " + UN + " (" + String(bid) + ")" + " 차단에 성공 및 7레벨 다운되었읍니다!");

				var lvl = await fetchLevel(memberObj.user.id, '673797140962738225');
				lvl -= 5;
				const x = await setLevel(memberObj.user.id, '673797140962738225', lvl);
			} catch(e) {
				SM = EmbedMsgbox('X', "사용자 " + UN + " (" + String(bid) + ")" + "은(는) 차단될 수 없음");
			}

			try {
				client.channels.get(cid).send(SM);
			} catch(e) {}
		}
	}
});

if(process.stdin.setRawMode) {
	process.stdin.setRawMode(1);
} else {
	tty.setRawMode(1);
}
process.stdin.resume();

var chkUserStatus = setInterval(async() => {
	if(connected) {
		/*if(["idle", 'dnd', 'offline'].includes(client.users.find(user => user.id == 내계정).presence.status)) {
			client.guilds.find(guild => guild.id === 내서버).me.setNickname(myUsername + ' (자동 응답 모드)');
			client.guilds.find(guild => guild.id === 우리팀서버).me.setNickname(myUsername + ' (자동 응답 모드)');
		} else {
			client.guilds.find(guild => guild.id === 내서버).me.setNickname(myUsername);
			client.guilds.find(guild => guild.id === 우리팀서버).me.setNickname(myUsername);
		}*/

		const list = client.guilds.get(우리팀서버);

		list.members.forEach(async member => {
			var username = member.user.username;
			var userid = member.user.id;
			var bs = jsnUserStats[userid], cs = member.user.presence.status;

			var date = new Date();
			var min = date.getMinutes();
			min = (min < 10 ? "0" : "") + String(min);

			// if(client8.users.find(u => u.id == userid).typing.channel !== null) beep(1);

			if(typeof bs === 'undefined') {
				if(cs != 'offline') {
					jsnCustomStatus[userid] = getUserStatus(userid);

					switch(cs) {
						case 'online':
							cs = '대화 가능한 상태 (' + jsnCustomStatus[userid] + ') 입';

							if(!jsnDidMemberJoined[userid]) {
								addxp(member.user.id, member.guild.id, 1);
								/*
								var lvl = await fetchLevel(userid, 우리팀서버);
								lvl += (lowConnections.includes(username) ? 7 : 3);
								const x = await setLevel(userid, 우리팀서버, lvl);

								var lvl2 = await fetchLevel(userid, 내서버);
								lvl2 += (lowConnections.includes(username) ? 20 : 10);
								const x2 = await setLevel(userid, 내서버, lvl2);
								*/
							}
							jsnDidMemberJoined[userid] = true;
						break ; case 'idle':
							cs = "자리를 비운 상태 (" + jsnCustomStatus[userid] + ") 입";
						break ; case 'dnd':
							cs = "다른 용무 중 (" + jsnCustomStatus[userid] + ") 입"
						break ; case 'offline':
							cs = "접속하지 않았읍"
					}

					ism = ' '
					if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['mobile'] == 'online') {
						ism = ' (모바일) ';
					}
					else if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['web'] == 'online') {
						ism = ' (브라우저) ';
					}
					else if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['desktop'] == 'online') {
						ism = ' (데스크톱) ';
					}

					print("[[" + username + " (" + userid + ")" + " 사용자는" + ism + cs + "니다]]");

					// activateInput();
				}
			} else {
				var oldcs = '';
				if(jsnCustomStatus[userid] && jsnCustomStatus[userid] != getUserStatus(userid)) {
					if(jsnCustomStatus[userid] != '-' && getUserStatus(userid) == '-' && cs == 'offline') {
						oldcs = jsnCustomStatus[userid];
					}
					jsnCustomStatus[userid] = getUserStatus(userid);
					print(`\n[[${username} 직접설정 상태가 (${jsnCustomStatus[userid]}) 변경됐읍니다]]`);
					sound('750,100 500,150 750,100');

					if(jsnCustomStatus[userid] != '-') {
						translate(jsnCustomStatus[userid], {to: 'ko'}).then(res => {
							if(res.from.language.iso != 'ko')
								1; // client.channels.get(TM_자유_대화).send(`${username}의 ${res.from.language.iso} 언어로 감지된 상태의 번역본은 "${res.text}"입니다.`);
						}).catch(err => {
							console.error(err);
						});
					}

					activateInput();
				} else {
					jsnCustomStatus[userid] = getUserStatus(userid);
				}

				if(bs != cs) {/*
					if(cs == 'online' && (userid == 내계정)) {
						var sndm = "[자동발신] <@" + userid + ">, 당신이 부재중인 동안 등장한 도배의 신은 ";

						for(var md of dios) {
							if(typeof(md[0]) == 'undefined') continue;
							sndm += md[0] + "(" + md[1] + " 단어 " + String(md[2]) + "회) ";
						}


						// print(sndm + " 입니다")
						if(dl.length)
							client.channels.get(TM_자유_대화).send(sndm + " 입니다");

						dios = [[]];
						dl = [];
					}*/

					if(cs == 'online') {
						if(!jsnDidMemberJoined[userid]) {
							var lvl = await fetchLevel(userid, 우리팀서버);
							lvl += (lowConnections.includes(username) ? 2 : 1);
							const x = await setLevel(userid, 우리팀서버, lvl);

							var lvl2 = await fetchLevel(userid, 내서버);
							lvl2 += (lowConnections.includes(username) ? 2 : 1);
							const x2 = await setLevel(userid, 내서버, lvl2);
						}

						jsnDidMemberJoined[userid] = true;
					}

					if(cs == 'offline') {
						print("\n[[" + min + "분에 " + username + " (" + userid + ")" + " 사용자가 나갔읍니다]]");

						activateInput();

						if(userid == 내계정) {
							// client.channels.get(TM_자유_대화).send("[자동발신] 안녕");
						}
						/*
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								sound('1200,100 700,150');
							} else {
								sound('750,100 500,150');
							}
						}*/
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								beep(1);
								setTimeout(function() {
									beep(2);
								}, 650);
							} else {
								beep(3);
							}
						}

						// 드디어 이 규정 없어졌따!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! *****
						/*
						if(bs == 'online' && !jsnIsMemberMobile[userid]) {
							if(! [].includes(userid)) {
								var deactivate = 0;
								if(!jsnLastMessage[userid]) deactivate = 1;
								for(var keyword of ['ㅂㅇ', 'ㅇㄷ', 'ㅅㅇ', '운동', '샤워', '학원', '나감', '나갈', '오프라인', '숙제', '빠이', '바이', '할일', '할 일', 'bye', 'Bye', "BYE", 'ㅂ', 'ㅂㅂ', 'ㅃ', '잘게', '잘 게', '잔다', '이따']) {
									try {
										if(jsnLastMessage[userid].replace(/\s/g, '').includes(keyword)) deactivate = true;
									} catch(e) {
										deactivate = true;
									}
								}

								// 상태 확인 //
								const lst = client.guilds.get(우리팀서버);

								var ocnt = 0;

								lst.members.forEach(function(member) {
									var username = member.user.username;
									var bs = jsnUserStats[userid], cs = member.user.presence.status;	

									if(member.user.id != userid) {
										if(cs == 'online') ocnt++;
									}
								});

								if(!ocnt) {
									deactivate = true;
								}
								
								// 이스터 에그
								if((Math.random() * 10 < 1) && deactivate) {
									client.channels.get(TM_자유_대화).send(EmbedMsgbox("!", "<@" + userid + ">님께서 그냥 나갔읍니다. " + (userid == 블루 ? '1,957년(1,028,599,200분)' : '7,777년(4,087,591,200분)') + " 안에 다시 들어와주십시오. [[오작동 신고]](https://discord.gg/626yR28KGs)"));
									
									var ttc  = (userid == 블루 ? 61715952000 : 245255472000);
									var prpt = '';
									
									var template = (m, s, p) => m + ' ' + (s < 0 ? 0 : (Math.floor(s) == s ? (s + '.0') : s)) + '초 남았습니다... ' + p;
									
									client.channels.get(TM_자유_대화).send(template(prpt, ttc, progress(0))).then(message => {
										var tv = 0, ts = ttc;
										jsnUserTimeout3[userid] = setInterval(() => {
											if(ts <= 0) {
												clearInterval(jsnUserTimeout3[userid]);
											} else {
												message.edit(template(prpt, ts -= 1.5, progress(tv += ((1.5 / ttc) * 100))));
											}
										}, 1500);
									});
								}

								if(!deactivate && oldcs == '' && !client.users.find(u => u.id == userid).bot) {
									client.channels.get(TM_자유_대화).send(EmbedMsgbox("!", "<@" + userid + ">님께서 그냥 나갔읍니다. 10분 안에 복귀하여주십시오. 또한 5레벨 내립니다. [[오작동 신고]](https://discord.gg/626yR28KGs)"));
									jsnUserTimeout[userid] = setTimeout(async () => {
										client.channels.get(TM_자유_대화).send("[자동발신] <@" + userid + "> 차단 1분 전...");
										jsnUserTimeout2[userid] = setTimeout(async () => {
											var lvl = await fetchLevel(userid, 우리팀서버);
											lvl -= 5;
											const x = await setLevel(userid, 우리팀서버, lvl);

											client.channels.get(TM_자유_대화).send(EmbedMsgbox("I", "<@" + userid + ">이 차단되었으며 차소게에서 요청을 하십시오. [[오차단 신고]](https://discord.gg/626yR28KGs)"));
											client.guilds.get(우리팀서버).members.get(userid).addRole("684361506271264778");
										}, 60000 * 1);
									}, 60000 * 9);
									
									var ttc  = 600;
									var prpt = '';
									
									var template = (m, s, p) => m + ' ' + (s < 0 ? 0 : (Math.floor(s) == s ? (s + '.0') : s)) + '초 남았습니다... ' + p;
									
									client.channels.get(TM_자유_대화).send(template(prpt, ttc, progress(0))).then(message => {
										var tv = 0, ts = ttc;
										jsnUserTimeout3[userid] = setInterval(() => {
											if(ts <= 0) {
												clearInterval(jsnUserTimeout3[userid]);
											} else {
												message.edit(template(prpt, ts -= 1.5, progress(tv += ((1.5 / ttc) * 100))));
											}
										}, 1500);
									});
								} else {
//									if(oldcs != '' && !nostat[userid]) client.channels.get(TM_자유_대화).send(`[자동발신] ${username} 사용자의 상태는 "${oldcs}"입니다.\n\n상태 알림 거부: ` + '`!nostat`');
								}
							} else {
//								if(oldcs != '' && !nostat[userid]) client.channels.get(TM_자유_대화).send(`[자동발신] ${username} 사용자의 상태는 "${oldcs}"입니다.\n\n상태 알림 거부: ` + '`!nostat`');
							}
						} else {
//							if(oldcs != '' && !nostat[userid]) client.channels.get(TM_자유_대화).send(`[자동발신] ${username} 사용자의 상태는 "${oldcs}"입니다.\n\n상태 알림 거부: ` + '`!nostat`');
						}
						*/
					}
					else if(bs == 'offline' && cs == 'online') {
						ism = ' ';
						jsnIsMemberMobile[userid] = false;
						if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['mobile'] == 'online') {
							ism = ' (모바일) ';
							jsnIsMemberMobile[userid] = true;
						}
						else if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['web'] == 'online') {
							ism = ' (브라우저) ';
						}
						else if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['desktop'] == 'online') {
							ism = ' (데스크톱) ';
						}

						print("\n[[" + min + "분에 " + username + " (" + userid + ")" + " 사용자가" + ism + "들어왔읍니다]]");

						activateInput();
/*
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								sound('700,150 1200,100');
							} else {
								sound('500,100 750,150');
							}
						}*/
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								beep(2);
								setTimeout(function() {
									beep(2);
								}, 650);
							} else {
								beep(1);
							}
						}

						clearTimeout(jsnUserTimeout[userid]);
						clearTimeout(jsnUserTimeout2[userid]);
						clearInterval(jsnUserTimeout3[userid]);
					}
					else if(bs == 'offline' && cs == 'dnd') {
						print("\n[[" + min + "분에 " + username + " (" + userid + ")" + " 사용자가 연결했지만 다른 용무중입니다]]");

						activateInput();

						if(!noNotification.includes(username)) {
							beep(1); setTimeout(() => beep(1), 650);
						}
					}
					else if(cs == 'dnd') {
						print("\n[[" + min + "분에 " + username + " (" + userid + ")" + " 사용자가 다른 용무를 시작했읍니다]]");

						activateInput();
/*
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								sound('1200,100 700,150');
							} else {
								sound('750,100 500,150');
							}
						}*/
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								beep(1);
								setTimeout(function() {
									beep(2);
								}, 650);
							} else {
								beep(3);
							}
						}
					}
					else if(bs == 'dnd' && cs == 'online') {
						ism = ' '
						if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['mobile'] == 'online') {
							ism = ' (모바일) ';
						}
						else if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['web'] == 'online') {
							ism = ' (브라우저) ';
						}
						else if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['desktop'] == 'online') {
							ism = ' (데스크톱) ';
						}

						print("\n[[" + min + "분에 " + username + " (" + userid + ")" + " 사용자가" + ism + "할 일을 끝내고 복귀했읍니다]]");

						activateInput();
/*
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								sound('700,150 1200,100');
							} else {
								sound('500,150 750,100');
							}
						}*/
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								beep(2);
								setTimeout(function() {
									beep(2);
								}, 650);
							} else {
								beep(1);
							}
						}
					}
					else if(bs == 'idle' && cs == 'online') {
						ism = ' '
						if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['mobile'] == 'online') {
							ism = ' (모바일) ';
						}
						else if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['web'] == 'online') {
							ism = ' (브라우저) ';
						}
						else if(client.users.find(user => user.id == userid).presence['clientStatus'] && client.users.find(user => user.id == userid).presence['clientStatus']['desktop'] == 'online') {
							ism = ' (데스크톱) ';
						}


						print("\n[[" + min + "분에 " + username + " (" + userid + ")" + " 사용자가" + ism + "복귀했읍니다]]");

						activateInput();
/*
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								sound('700,150 1200,100');
							} else {
								sound('500,150 750,100');
							}
						}*/
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								beep(2);
								setTimeout(function() {
									beep(2);
								}, 650);
							} else {
								beep(1);
							}
						}
					}
					else if(bs == 'online' && cs == 'idle') {
						print("\n[[" + min + "분에 " + username + " (" + userid + ")" + " 사용자가 자리를 비웠읍니다]]");

						activateInput();
/*
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								sound('1200,100 700,150');
							} else {
								sound('750,100 500,150');
							}
						}*/
						if(!noNotification.includes(username)) {
							if(lowConnections.includes(username)) {
								beep(1);
								setTimeout(function() {
									beep(2);
								}, 650);
							} else {
								beep(3);
							}
						}
					}
					else if(bs == 'offline' && cs == 'idle') {
						print("\n[[" + min + "분에 " + username + " (" + userid + ")" + " 사용자가 들어왔지만 자리를 비웠읍니다]]");

						activateInput();

						if(!noNotification.includes(username)) {
							beep(1); setTimeout(() => beep(1), 650);
						}
					}
					else if(bs == 'dnd' && cs == 'idle') {
						print("\n[[" + min + "분에 " + username + " (" + userid + ")" + " 사용자가 용무를 끝냈으나 쉬고 있는지 자리를 비웠읍니다]]");

						activateInput();

						if(!noNotification.includes(username)) {
							beep(1); setTimeout(() => beep(1), 650);
						}
					}
					else {
						print("\n[[" + min + "분에 " + username + " (" + userid + ")" + " 사용자가 " + bs + "였지만 이제 " + cs + "상태입니다]]");

						activateInput();

						if(!noNotification.includes(username)) {
							beep(1); setTimeout(() => beep(1), 650);
						}
					}

					activateInput();
				}
			}

			jsnUserStats[userid] = member.user.presence.status;
		});
	}
}, 1500);
