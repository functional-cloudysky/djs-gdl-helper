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

function swear(content) {
	var sw = ['FUCK', 'SHIT', '!ASSHOLE', '!PISSOFF', '!DICKHEAD', 'BITCH', 'BASTARD', '씨발', '병신', 
				'지랄', 'ㅅㅂ', 'ㅆㅂ', 'ㅄ', 'ㅂㅅ', '젠장', '개새끼', '존나', '좆나', '뻑유', 
				'!왓더퍼킹', '쉽새끼', '양아치'];
				
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

var lowConnections = ['틀* **보', 'S*********r', 'b**********7']; // 접속율 낮은사람
var lowMessageRate = ['틀* **보', 'S*********r']; // 말 거의 없는사람

print("Discord-on-Console 시작 중. . .\n");

const readline = require('readline');

const Discord = require('discord.js');
const Constants = require('discord.js/src/util/Constants.js');

Constants.DefaultOptions.ws.properties.$browser = `Discord Android`;
const client = new Discord.Client({
	disableEveryone: false
});

myUsername = "gdl-helper";

var sch, cid, ns, nc;

var jsnUserStats = {}, jsnOldMsg = {}, jsnOldMsgCnt = {}, jsnHello = {}, jsnWarned = {}, jsnNoWarning = { "<@123456789012345678>": true, "<@!123456789012345678>": true };
var dios = [[]], dl = [];

var connected = false;

prt("Discordapp.com 대화 서버에 접속 중입니다. . . ");

client.on('ready', () => {
	print('완료!\n\n   -*- Ctrl+글자로 채널을 고르십시오. -*-\n' + 
			'┌──────────────────────────┐ \n' + 
			'│T-자유대화       A-고급대화실       R-AlphaGeneral  │ \n' + 
			'│E-개인실험실     S-test server 2    Y-AlphaYT       │ \n' + 
			'│X-시험실         G-게임방           O-회의실        │ \n' + 
			'└──────────────────────────┘ ');
			
	connected = true;
		
	client.user.setPresence({
		status: "online",  //You can show online, idle....
		game: {
			name: "겁나조은게임",  //The message shown
			type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
		}
	});
});

/*
var setStatus = setInterval(function() {
	if(connected) {
		var stlst = [
			"욕을 쓰지 마십시오.",
			"개발자 문의: 길쭉고양이#1315",
			"본계가 부재면 자동응답이 가능합니다."
		];
		
		client.user.setPresence({
			status: "online",  //You can show online, idle....
			game: {
				name: stlst[ Math.floor(Math.random() * stlst.length) ],  //The message shown
				type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
			}
		});
	}
}, 2000);
*/

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

client.on('message', (msg) => {
	if(msg.guild !== null) {
		var username;
		try {
			username = client.users.find(user => user.id == msg.member.toString().replace(/^[<][@]/i, '').replace(/[>]$/i, ''))['username'];
		} catch(e) {
			username = "gdl-888";
		}
		
		var ownerObj = client.users.find(user => user.id == '123456789012345678');
		
		if(username != myUsername || (username == myUsername && msg.content.startsWith('[자동'))) {
			cid = msg.channel.id;
			
			if(cid != sch) {
				try {
					print("\n\n[[채널이 " + client.channels.get(sch).name + "에서 " + client.channels.get(cid).name + "(으)로 변경되었읍니다]]");
				} catch(e) {
					print("\n\n[[채널이 " + client.channels.get(cid).name + "(으)로 변경되었읍니다]]");
				}
			}
			
			sch = cid;
			var pmc = msg.content.replace('\r', '').split('\n')[0];
			for( var sp of msg.content.replace('\r', '').split('\n') ) {
				if(pmc == sp) continue;
				pmc += '\n';
				for(var spm = 1; spm <= username.length + 2; spm++) pmc += " ";
				pmc += sp;
			}
			print("\n" + username + "> " + pmc);
			
			var imsg = msg.content.toUpperCase();
			var ismsg = imsg.replace(/\s/gi, '');
			
			if(imsg == '!DISBWRNG') {
				jsnNoWarning[msg.member.toString()] = true;
				
				msg.channel.send("[자동 발신] 성공적으로 처리되었읍니다");
			}
			
			var message = msg.content.toUpperCase().replace(/\s/gi, '');
			
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
							msg.channel.send("[자동 발신][AD3] " + rndval(200 + (jsnOldMsgCnt[msg.member.toString()] * 3))).then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 11 - 1) {
							msg.channel.send("[자동 발신][AD3] 참").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 으").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 로").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 대").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 단").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 하").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 군").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 11 - 1) {
							msg.channel.send("[자동 발신][AD3] 도").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 배").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 의").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 신").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 인").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 가").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 요").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] ?").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 10 - 1) {
							msg.channel.send("[자동 발신][AD3] 차").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 단").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 들").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 어").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 갑").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 니").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 다").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 9 - 1) {
							msg.channel.send("[자동 발신][AD3] 하").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 지").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 말").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 라").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
							msg.channel.send("[자동 발신][AD3] 고").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 8 - 1) {
							msg.channel.send("[자동 발신][AD3] 차단해도 괜찮다 이거져?").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 7 - 1) {
							msg.channel.send("[자동 발신][AD3] 흠... 관리자에게 메시지를 보낼까..").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 6 - 1) {
							msg.channel.send("[자동 발신][AD3] 아니.. 아직도? 끝까지 가시겠다 이거요?").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 5 - 1) {
							msg.channel.send("[자동 발신][AD3] 그.만.하.시.오").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 4 - 1) {
							msg.channel.send("[자동 발신][AD3] 자꾸 하실래요?").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
						}
						else if(jsnOldMsgCnt[msg.member.toString()] >= 3 - 1) {
							msg.channel.send("[자동 발신][AD3] 같은 내용의 메시지를 반복적으로 도배하지 마십시오").then(msg => {
								msg.delete(3000);
							}).catch( /* -- */ );
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
			
			/// 상태 확인 ///
			const list = client.guilds.get("123456789012345678"); 
			
			var onlinecount = 0;
		
			list.members.forEach(function(member) {
				var username = member.user.username;
				var bs = jsnUserStats[username], cs = member.user.presence.status;
				
				if(member.user.id != msg.member.user.id && member.user.id != '123456789012345678' && member.user.id != '123456789012345678') {
					if(cs == 'online') onlinecount++;
				}
			});
			
			/*
			if(jsnNoWarning[msg.member.toString()] != true && !onlinecount && (typeof(jsnWarned[msg.member.toString()]) == 'undefined' || jsnWarned[msg.member.toString()] == false)) {
				msg.channel.send("[자동 발신][AD5] 현재 당신 외에 온라인인 사람이 없읍니다. 메모 등이 아니라면 다음에 다시 시도해주세요\n\n[[수신거부-채팅창에 `!DISBWRNG`]]").then(msg => {
					msg.delete(5000);
				}).catch( /* -- * );*/
				
				jsnWarned[msg.member.toString()] = true;
				
				setTimeout(function() {
					jsnWarned[msg.member.toString()] = false;
				}, 60000 * 15);
			}
			/// 상태 확인 끝 ///
			
			/* 욕설 필터링 */
			if( swear(msg.content)[0] ) {
				print('[[경고! 방금 메시지에 욕설이 포함되어있는 것같습니다]]');
				
				if(
					(msg.channel.id == '123456789012345678' ||
					 msg.channel.id == '123456789012345678' ||
					 msg.channel.id == '123456789012345678') &&
					 
					(
					    ['idle', 'dnd', 'offline'].includes(client.users.find(user => user.id == '123456789012345678').presence.status) &&
					    ['idle', 'dnd', 'offline'].includes(client.users.find(user => user.id == '123456789012345678').presence.status)
					)
				) {
					msg.channel.send("[자동 발신][AD3] 음냐.. 팀장이나 부팀장이 부재중이여도 욕은 쓰지 말아주세요").then(msg => {
						msg.delete(3000);
					}).catch( /* -- */ );
				}
				
				beep(3);
			}
			/*
			if((msg.content.includes("123456789012345678") || msg.content.includes("(본명)아") || msg.content.includes('123456789012345678')) && ['dnd', 'offline', 'idle'].includes(ownerObj.presence.status)) {
				msg.channel.send("[[죄송합니다. 이 사용자는 현재 " + ownerObj.presence.status + " 상태이므로 응답할 수 없사오니 다음에 다시 시도해주십시오.]] \n\n" + 
								"(이 메시지는 자동으로 전송된 메시지이며 10초 후 자동 삭제됩니다)").then(msg => {
					msg.delete(10000);
				}).catch();
			}
			else *//*if((typeof(jsnNoWarning[msg.member.toString()]) == 'undefined' || jsnNoWarning[msg.member.toString()] != true) && (msg.content.includes("ㅎㅇ") || msg.content.includes("하이")) && (!msg.content.includes("@") || msg.content.includes("123456789012345678") || msg.content.includes("123456789012345678")) && typeof(jsnHello[msg.member.toString()]) == 'undefined') {
				msg.channel.send("[자동 발신] 안녕하십니까, " + msg.member.toString() + "!\n\n[[수신거부-채팅창에 `!DISBWRNG`]]");
				jsnHello[msg.member.toString()] = true;
			}
			else */if((typeof(jsnNoWarning[msg.member.toString()]) == 'undefined' || jsnNoWarning[msg.member.toString()] != true) && ((msg.content.includes("123456789012345678") || msg.content.includes("(본명)") || msg.content.includes('123456789012345678')) && (ismsg.includes("윈도우몇") || ismsg.includes("윈도우버전")))) {
				msg.channel.send("[자동 발신] 데스크탑에는 Windows 7, XP이 있으며 노트북에는 Windows 7, Vista(Server 2008)이 있읍니다\n\n[[수신거부-채팅창에 `!DISBWRNG`]]");
			}/*
			else if((typeof(jsnNoWarning[msg.member.toString()]) == 'undefined' || jsnNoWarning[msg.member.toString()] != true) && ((msg.content.includes("123456789012345678") || msg.content.includes("(본명)") || msg.content.includes("다들") || msg.content.includes('123456789012345678')) && (ismsg.includes("뭐해") || ismsg.includes("뭐하")))) {
				var ocs;
				try {
					ocs = ownerObj.presence.game.state;
				} catch(e) {
					ocs = "(상태 확인 불가)";
				}
				msg.channel.send("[자동 발신] 현재 " + ownerObj.presence.status + " - " + ocs + "하는 중입니다\n\n[[수신거부-채팅창에 `!DISBWRNG`]]");
			}
			else if((typeof(jsnNoWarning[msg.member.toString()]) == 'undefined' || jsnNoWarning[msg.member.toString()] != true) && msg.content.toUpperCase().replace(/\s/g, '').includes("EVERYBODYHERE") || (msg.content.includes("응답") && (msg.content.includes("다들") || msg.content.includes("(본명)") || msg.content.includes("123456789012345678") || msg.content.includes('123456789012345678')) )) {
				if(['dnd', 'offline', 'idle'].includes(ownerObj.presence.status)) {
					msg.channel.send("[자동 발신] 응답의 값은 false 입니다\n\n[[수신거부-채팅창에 `!DISBWRNG`]]");
				} else {
					msg.channel.send("[자동 발신] 응답의 값은 true 입니다\n\n[[수신거부-채팅창에 `!DISBWRNG`]]");
				}
			}
			else if((typeof(jsnNoWarning[msg.member.toString()]) == 'undefined' || jsnNoWarning[msg.member.toString()] != true) && (msg.content.includes("123456789012345678") || msg.content.includes("(본명)아") || msg.content.includes('123456789012345678')) && ['dnd', 'offline', 'idle'].includes(ownerObj.presence.status)) {
				msg.channel.send("[자동 발신] 상대방이 비-온라인 상태인 " + ownerObj.presence.status + " 상태인경우 일부질문은 자동응답이 가능하지만 전송하신 메시지는 자동 답변이 불가능합니다. 사용자의 복귀를 대기해주십시오. 아니면 휴대폰으로 문의하십시오." + 
								"\n\n[[수신거부-채팅창에 `!DISBWRNG`]]").then(msg => {
					msg.delete(10000);
				}).catch( /* -- *);
			}*/
			
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
			
			if(msg.isMemberMentioned(client.user) || msg.isMemberMentioned(client.users.find(user => user.id == '123456789012345678'))) {
				setTimeout(function() {
					beep(1);
					setTimeout(function() {
						beep(2);
					}, 650);
				}, 650);
			}
			
			if(msg.content.match(/[h][t][t][p][s][:][/][/]discord[.]gg[/][A-Za-z0-9]{4,9}/)) {
				var ivlnk = msg.content.match(/[h][t][t][p][s][:][/][/]discord[.]gg[/][A-Za-z0-9]{4,9}/)[0];
				
				print(ivlnk);
				
				client.fetchInvite(ivlnk).then((invite) => {
					print("\n[[서버에 초대받았어요]]");
					print("[[이름: " + invite.guild['name'] + "]]");
					print("[[사용자 수: " + invite.guild['memberCount'] + "]]");
				});
				
				beep(3);
			}
		}
	
	
	rl.question(myUsername + '> ', (answer) => {
		// TODO: Log the answer in a database
		if(answer.match(/^[!]/)) {
			client.channels.get(cid).send(swear(answer)[1].replace(/^[!]/, ''));
		} else {
			if(answer.startsWith("/")) {
				client.channels.get(cid).send("[사용자 입력][AD3] " + swear(answer)[1].replace(/^[/]/, '')).then(msg => {
					msg.delete(3000);
				}).catch( /* -- */ );
			} else {
				client.channels.get(cid).send("[사용자 입력] " + swear(answer)[1]);
			}
		}
		
		// rl.close();
	});
});

/*
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
	if(key.ctrl) {
		switch(key.name) {
			case 't':
				cid = '123456789012345678';
			break; case 'a':
				cid = '123456789012345678';
			break; case 'e':
				cid = '123456789012345678';
		}
	}
});
*/

client.on('guildMemberAdd', member => {
	beep(3);
	setTimeout(function() {
		beep(1);
		setTimeout(function() {
			beep(2);
		}, 650);
	}, 650);
});

client.on('guildMemberRemove', member => {
	beep(3);
	setTimeout(function() {
		beep(2);
		setTimeout(function() {
			beep(1);
		}, 650);
	}, 650);
});

try {
	client.login("dsfnadfj");
} catch(e) {
	print("실패!");
	setTimeout(function() {
		while(1);
	}, 5000);
}

const keypress = require('keypress'), tty = require('tty');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
	if(key && key.ctrl) {
		switch(key.name) {
			case 't':
				cid = '123456789012345678';
			break; case 'a':
				cid = '123456789012345678';
			break; case 'e':
				cid = '123456789012345678';
			break; case 's':
				cid = '123456789012345678';
			break; case 'g':
				cid = '123456789012345678';
			break; case 'x':
				cid = '123456789012345678';
			break; case 'b':
				cid = '123456789012345678';
			break; case 'n':
				cid = '123456789012345678';
			break; case 'r':
				cid = '123456789012345678';
			break; case 'y':
				cid = '123456789012345678';
			break; case 'o':
				cid = '123456789012345678';
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
			if(answer.match(/^[!]/)) {
				client.channels.get(cid).send(swear(answer)[1].replace(/^[!]/, ''));
			} else {
				if(answer.startsWith("/")) {
					client.channels.get(cid).send("[사용자 입력][AD3] " + swear(answer)[1].replace(/^[/]/, '')).then(msg => {
						msg.delete(3000);
					}).catch( /* -- */ );
				} else {
					client.channels.get(cid).send("[사용자 입력] " + swear(answer)[1]);
				}
			}
			
			// rl.close();
		});
	}
	if(key && key.meta && key.shift) {
		var bid = 0;
		
		switch(key.name) {
			case 's':
				bid = '123456789012345678';
			break; case 'b':
				bid = '123456789012345678';
			break; case 'z':
				bid = '123456789012345678';
			break; case 't':
				bid = '123456789012345678';
			break; case 'w':
				bid = '123456789012345678';
			break; case 'a':
				bid = '123456789012345678';
		}
		
		switch(key.name) {
			case 'l':
				client.user.setPresence({
					status: "idle"/*,  //You can show online, idle....
					game: {
						name: "본계가 부재면 자동응답이 가능합니다",  //The message shown
						type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
					}*/
				});
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
		}
		
		
		
		if(bid != 0 && ['123456789012345678', '123456789012345678', '123456789012345678', '123456789012345678'].includes(cid)) {
			// print(client.guilds.get('123456789012345678').members.get(bid));
			try {
				client.guilds.get('123456789012345678').members.get(bid).removeRole("123456789012345678");
			} catch(e) {}
		
			var UN = client.users.find(user => user.id == bid)['username'];
			
			var SM = "[자동 발신] 성공 - 사용자 " + UN + " (" + String(bid) + ")" + "이 차단 해제됐읍니다";
			print(SM);
			
			try {
				client.channels.get(cid).send(SM);
			} catch(e) {}
		}
	}
	else if(key && key.meta) {
		var bid;
		
		switch(key.name) {
			case 's':
				bid = '123456789012345678';
			break; case 'b':
				bid = '123456789012345678';
			break; case 'z':
				bid = '123456789012345678';
			break; case 't':
				bid = '123456789012345678';
			break; case 'w':
				bid = '123456789012345678';
			break; case 'a':
				bid = '123456789012345678';
		}
		
		if(cid == '123456789012345678' || cid == '123456789012345678' || cid == '123456789012345678' || cid == '123456789012345678') {
			// print(client.guilds.get('123456789012345678').members.get(bid));
			
			try {
				client.guilds.get('123456789012345678').members.get(bid).addRole("123456789012345678");
			} catch(e) {}
		
			var UN = client.users.find(user => user.id == bid)['username'];
			
			var SM = "[자동 발신] 성공 - 사용자 " + UN + " (" + String(bid) + ")" + "이 차단되었읍니다. 반성후 해제를 요청하십시오";
			print(SM);
			
			setInterval(function() {
				client.guilds.get('123456789012345678').members.get(bid).removeRole("123456789012345678");
			}, 60000 * 15);
			
			try {
				client.channels.get(cid).send(SM);
			} catch(e) {}
		}
	}
});

if(typeof process.stdin.setRawMode == 'function') {
	process.stdin.setRawMode(true);
} else {
// 	tty.setRawMode(true);
}
process.stdin.resume();

var chkUserStatus = setInterval(function() {
	if(connected) {
		/*if(["idle", 'dnd', 'offline'].includes(client.users.find(user => user.id == '123456789012345678').presence.status)) {
			client.guilds.find(guild => guild.id === '123456789012345678').me.setNickname(myUsername + ' (자동 응답 모드)');
			client.guilds.find(guild => guild.id === '123456789012345678').me.setNickname(myUsername + ' (자동 응답 모드)');
		} else {
			client.guilds.find(guild => guild.id === '123456789012345678').me.setNickname(myUsername);
			client.guilds.find(guild => guild.id === '123456789012345678').me.setNickname(myUsername);
		}*/
	
		const list = client.guilds.get("123456789012345678"); 
		
		list.members.forEach(function(member) {
			var username = member.user.username;
			var userid = member.user.id;
			var bs = jsnUserStats[username], cs = member.user.presence.status;
			
			if(typeof bs === 'undefined') {
				if(cs != 'offline') {
					switch(cs) {
						case 'online':
							cs = '대화 가능한 상태입';
						break ; case 'idle':
							cs = "자리를 비운 상태입";
						break ; case 'dnd':
							cs = "다른 용무 중입"
						break ; case 'offline':
							cs = "접속하지 않았읍"
					}
					print("[[" + username + " (" + userid + ")" + " 사용자는 " + cs + "니다]]");
				}
			} else {
				if(bs != cs) {
					if(cs == 'online' && (userid == '123456789012345678' || userid == '123456789012345678')) {
						var sndm = "[자동 발신] <@" + userid + ">, 당신이 부재중인 동안 등장한 도배의 신은 ";
						
						for(var md of dios) {
							if(typeof(md[0]) == 'undefined') continue;
							sndm += md[0] + "(" + md[1] + " 단어 " + String(md[2]) + "회) ";
						}
						
						
						// print(sndm + " 입니다")
						if(dl.length)
				//			client.channels.get('123456789012345678').send(sndm + " 입니다");
						
						dios = [[]];
						dl = [];
					}
					
					if(cs == 'offline') {
						print("\n[[" + username + " (" + userid + ")" + " 사용자가 나갔읍니다]]");
						
						if(lowConnections.includes(username)) {
							beep(1);
							setTimeout(function() {
								beep(2);
							}, 650);
						} else {
							beep(3);
						}
					}
					else if(bs == 'offline' && cs == 'online') {
						print("\n[[" + username + " (" + userid + ")" + " 사용자가 들어왔읍니다]]");
						
						if(lowConnections.includes(username)) {
							beep(2);
							setTimeout(function() {
								beep(2);
							}, 650);
						} else {
							beep(1);
						}
					}
					else if(bs == 'offline' && cs == 'dnd') {
						print("\n[[" + username + " (" + userid + ")" + " 사용자가 연결했지만 다른 용무중입니다]]");
						
						beep(1);
						setTimeout(function() {
							beep(1);
						}, 650);
					}
					else if(cs == 'dnd') {
						print("\n[[" + username + " (" + userid + ")" + " 사용자가 다른 용무를 시작했읍니다]]");
						
						if(lowConnections.includes(username)) {
							beep(1);
							setTimeout(function() {
								beep(2);
							}, 650);
						} else {
							beep(3);
						}
					}
					else if(bs == 'dnd' && cs == 'online') {
						print("\n[[" + username + " (" + userid + ")" + " 사용자가 할 일을 끝내고 복귀했읍니다]]");
						
						if(lowConnections.includes(username)) {
							beep(2);
							setTimeout(function() {
								beep(2);
							}, 650);
						} else {
							beep(1);
						}
					}
					else if(bs == 'idle' && cs == 'online') {
						print("\n[[" + username + " (" + userid + ")" + " 사용자가 복귀했읍니다]]");
						
						if(lowConnections.includes(username)) {
							beep(2);
							setTimeout(function() {
								beep(2);
							}, 650);
						} else {
							beep(1);
						}
					}
					else if(bs == 'online' && cs == 'idle') {
						print("\n[[" + username + " (" + userid + ")" + " 사용자가 자리를 비웠읍니다]]");
						
						if(lowConnections.includes(username)) {
							beep(1);
							setTimeout(function() {
								beep(2);
							}, 650);
						} else {
							beep(3);
						}
					}
					else if(bs == 'offline' && cs == 'idle') {
						print("\n[[" + username + " (" + userid + ")" + " 사용자가 들어왔지만 자리를 비웠읍니다]]");
						
						beep(1);
						setTimeout(function() {
							beep(1);
						}, 650);
					}
					else if(bs == 'dnd' && cs == 'idle') {
						print("\n[[" + username + " (" + userid + ")" + " 사용자가 용무를 끝냈으나 쉬고 있는지 자리를 비웠읍니다]]");
						
						beep(1);
						setTimeout(function() {
							beep(1);
						}, 650);
					}
					else {
						print("\n[[" + username + " (" + userid + ")" + " 사용자가 " + bs + "였지만 이제 " + cs + "상태입니다]]");
						
						beep(1);
						setTimeout(function() {
							beep(1);
						}, 650);
					}
				}
			}
			
			jsnUserStats[username] = member.user.presence.status;
		});
	}
}, 1500);
