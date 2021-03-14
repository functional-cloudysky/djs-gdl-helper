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

var lowConnections = []; // 접속율 낮은사람

print("Discord-on-Console 시작 중. . .\n");

const readline = require('readline');

const Discord = require('discord.js');
const client = new Discord.Client();

myUsername = "길고-A";

var sch, cid, ns, nc;

var jsnUserStats = {};

var connected = false;

prt("Discordapp.com 대화 서버에 접속 중입니다. . . ");

client.on('ready', () => {
	print('완료!\n\n   -*- Ctrl+글자로 채널을 고르십시오. -*-\n' + 
			'┌──────────────────────────┐ \n' + 
			'│T-자유대화       A-고급대화실       R-AlphaGeneral  │ \n' + 
			'│E-개인실험실     S-test server 2    Y-AlphaYT       │ \n' + 
			'│X-시험실         G-게임방                           │ \n' + 
			'└──────────────────────────┘ ');
			
	connected = true;
});

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

client.on('message', (msg) => {
	if(msg.guild !== null) {
		var username = client.users.find(user => user.id == msg.member.toString().replace(/^[<][@]/i, '').replace(/[>]$/i, ''))['username'];
		var ownerObj = client.users.find(user => user.id == '453432847617884172')
		
		if(username != myUsername) {
			cid = msg.channel.id;
			
			if(cid != sch) {
				try {
					print("\n\n[[채널이 " + client.channels.get(sch).name + "에서 " + client.channels.get(cid).name + "(으)로 변경되었읍니다]]");
				} catch(e) {
					print("\n\n[[채널이 " + client.channels.get(cid).name + "(으)로 변경되었읍니다]]");
				}
			}
			
			sch = cid;
			var isfile = '';
			if(msg.attachments) {
				// isfile = '[파일을 첨부함]';
			}
			print("\n" + username + "> " + isfile + msg.content);
			
			var imsg = msg.content.toUpperCase();
			var ismsg = imsg.replace(/\s/gi, '');
			
			var message = msg.content.toUpperCase().replace(/\s/gi, '');
			
			/* 욕설 필터링 */
			if( 
				imsg.includes('FUCK') || imsg.includes('SHIT') || ismsg.includes('ASSHOLE') || ismsg.includes('PISSOFF') ||
				ismsg.includes('DICKHEAD') || imsg.includes('BITCH') || ismsg.includes('BASTARD') ||
				imsg.includes('씨발') || imsg.includes('병신') || imsg.includes('지랄') || imsg.includes('ㅅㅂ') || imsg.includes('ㅆㅂ') || 
				imsg.includes('ㅄ') || imsg.includes('ㅂㅅ') || imsg.includes('젠장') || imsg.includes('개새끼') || 
				imsg.includes('존나') || imsg.includes('좆나') || imsg.includes('뻑유') || imsg.includes('씨발') || ismsg.includes('왓더퍼킹') || msg.content == "$SWRWRD"
			) {
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
					msg.channel.send("[[음냐.. 팀장이나 부팀장이 부재중이여도 욕은 쓰지 말아주세요]]" + 
									  "\n\n(이 메시지는 자동 전송 메시지이며 10초 후 자동삭제됩니다.)").then(msg => {
						msg.delete(10000);
					}).catch( /* -- */ );
				}
				
				beep(3);
			}
			
			if((msg.content.includes("453432847617884172") || msg.content.includes('123456789012345678')) && ['dnd', 'offline', 'idle'].includes(ownerObj.presence.status)) {
				msg.channel.send("[[죄송합니다. 이 사용자는 현재 " + ownerObj.presence.status + " 상태이므로 응답할 수 없사오니 다음에 다시 시도해주십시오.]] \n\n" + 
								"(이 메시지는 자동으로 전송된 메시지이며 15초 후 자동 삭제됩니다)").then(msg => {
					msg.delete(15000);
				}).catch( /* -- */ );
			}
			
			if(((msg.content.includes("453432847617884172") || msg.content.includes('123456789012345678')) && (ismsg.includes("윈도우몇") || ismsg.includes("윈도우버전"))) && ['dnd', 'offline', 'idle'].includes(ownerObj.presence.status)) {
				msg.channel.send("[[데스크탑에는 Windows 7, XP이 있으며 노트북에는 Windows 7, Vista(Server 2008)이 있읍니다]] \n\n" + 
								"(이 메시지는 자동으로 전송된 메시지이며 답장을 받지않습니다)");
			}
			
			if(lowConnections.includes(username)) {
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
			
			if(msg.isMemberMentioned(client.user) || msg.isMemberMentioned(client.users.find(user => user.id == '453432847617884172'))) {
				setTimeout(function() {
					beep(1);
					setTimeout(function() {
						beep(2);
					}, 650);
				}, 650);
			}
		}
	}
	
	rl.question(myUsername + '> ', (answer) => {
		// TODO: Log the answer in a database
		if(answer == '') client.channels.get(cid).send('-');
		else client.channels.get(cid).send(answer);
		
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
				cid = '669855794220630030';
			break; case 'a':
				cid = '670426525182459927';
			break; case 'e':
				cid = '675264839094108161';
		}
	}
});
*/

try {
	client.login("토큰");
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
			
			if(answer == '') print("[[오류! 메시지가 없습니다.]]");
			else client.channels.get(cid).send(answer);
			
			// rl.close();
		});
	}
	if(key && key.meta && key.shift) {
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
		
		if(['123456789012345678', '123456789012345678', '123456789012345678', '123456789012345678'].includes(cid)) {
			// print(client.guilds.get('669855794220630027').members.get(bid));
			try {
				client.guilds.get('123456789012345678').members.get(bid).removeRole("123456789012345678");
			} catch(e) {}
		
			var UN = client.users.find(user => user.id == bid)['username'];
			
			var SM = "[[사용자 " + UN + "이 차단 해제됐읍니다]]";
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
			// print(client.guilds.get('669855794220630027').members.get(bid));
			
			try {
				client.guilds.get('123456789012345678').members.get(bid).addRole("123456789012345678");
			} catch(e) {}
		
			var UN = client.users.find(user => user.id == bid)['username'];
			
			var SM = "[[사용자 " + UN + "이 차단되었읍니다. 자동차단해제는 아직 만들어지지 않았으므로 15분 후에 직접 요청하십시오]]";
			print(SM);
			
			try {
				client.channels.get(cid).send(SM);
			} catch(e) {}
		}
	}
	
	if(key && key.ctrl && key.name == 'c') {
		process.stdin.pause();
	}
});

if(typeof process.stdin.setRawMode == 'function') {
	process.stdin.setRawMode(true);
} else {
	tty.setRawMode(true);
}
process.stdin.resume();

var chkUserStatus = setInterval(function() {
	if(connected) {
		const list = client.guilds.get("123456789012345678"); 
		
		list.members.forEach(function(member) {
			var username = member.user.username;
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
					print("[[" + username + " 사용자는 " + cs + "니다]]");
				}
			} else {
				if(bs != cs) {
					if(cs == 'offline') {
						print("\n[[" + username + " 사용자가 나갔읍니다]]");
						
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
						print("\n[[" + username + " 사용자가 들어왔읍니다]]");
						
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
						print("\n[[" + username + " 사용자가 연결했지만 다른 용무중입니다]]");
						
						beep(1);
						setTimeout(function() {
							beep(1);
						}, 650);
					}
					else if(cs == 'dnd') {
						print("\n[[" + username + " 사용자가 다른 용무를 시작했읍니다]]");
						
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
						print("\n[[" + username + " 사용자가 할 일을 끝내고 복귀했읍니다]]");
						
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
						print("\n[[" + username + " 사용자가 복귀했읍니다]]");
						
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
						print("\n[[" + username + " 사용자가 자리를 비웠읍니다]]");
						
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
						print("\n[[" + username + " 사용자가 들어왔지만 자리를 비웠읍니다]]");
						
						beep(1);
						setTimeout(function() {
							beep(1);
						}, 650);
					}
					else if(bs == 'dnd' && cs == 'idle') {
						print("\n[[" + username + " 사용자가 용무를 끝냈으나 쉬고 있는지 자리를 비웠읍니다]]");
						
						beep(1);
						setTimeout(function() {
							beep(1);
						}, 650);
					}
					else {
						print("\n[[" + username + " 사용자가 " + bs + "였지만 이제 " + cs + "상태입니다]]");
						
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
