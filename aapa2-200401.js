const readline = require('readline');

const Discord = require('discord.js');
const client = new Discord.Client();

function print(x) {
	console.log(x);
}

function prt(x) {
	process.stdout.write(x);
}

myUsername = "길고-A";

var sch, cid, ns, nc;

var jsnUserStats = {};

var connected = false;

prt("서버에 접속 중입니다... ");

client.on('ready', () => {
	print('완료!\n\n   -*- Ctrl+글자로 채널을 고르십시오. -*-\n' + 
			'┌──────────────────────────┐ \n' + 
			'│T-판다의 자유대화           A-길고의 대화실         │ \n' + 
			'│E-길고의 개인실험실         S-test server 2         │ \n' + 
			'│X-판다의 시험실                                     │ \n' + 
			'└──────────────────────────┘ ');
			
	connected = true;
});

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

client.on('message', (msg) => {
	var username = client.users.find(user => user.id == msg.member.toString().replace(/^[<][@]/i, '').replace(/[>]$/i, ''))['username'];
	
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
		
		if(msg.content.includes("453432847617884172")) {
			msg.channel.send("[[죄송합니다. 이 사용자는 현재 " + msg.member.user.presence.status + " 상태이므로 메시지를 받을 수 없사오니 다음에 다시 시도해주십시오. (이 메시지는 자동으로 전송된 메시지이며 답장을 받지 않습니다.)]]");
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
				// if(cs != 'offline')
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
			} else {
				if(bs != cs) {
					if(cs == 'offline') {
						print("\n[[" + username + " 사용자가 나갔읍니다]]");
					}
					else if(bs == 'offline' && cs == 'online') {
						print("\n[[" + username + " 사용자가 들어왔읍니다]]");
					}
					else if(bs == 'offline' && cs == 'dnd') {
						print("\n[[" + username + " 사용자가 연결했지만 다른 용무중입니다]]");
					}
					else if(cs == 'dnd') {
						print("\n[[" + username + " 사용자가 다른 용무를 시작했읍니다]]");
					}
					else if(bs == 'dnd' && cs == 'online') {
						print("\n[[" + username + " 사용자가 할 일을 끝내고 복귀했읍니다]]");
					}
					else if(bs == 'idle' && cs == 'online') {
						print("\n[[" + username + " 사용자가 복귀했읍니다]]");
					}
					else if(bs == 'online' && cs == 'idle') {
						print("\n[[" + username + " 사용자가 자리를 비웠읍니다]]");
					}
					else if(bs == 'offline' && cs == 'idle') {
						print("\n[[" + username + " 사용자가 들어왔지만 자리를 비웠읍니다]]");
					}
					else if(bs == 'dnd' && cs == 'idle') {
						print("\n[[" + username + " 사용자가 용무를 끝냈으나 쉬고 있는지 자리를 비웠읍니다]]");
					}
					else {
						print("\n[[" + username + " 사용자가 " + bs + "였지만 이제 " + cs + "상태입니다]]");
					}
				}
			}
			
			jsnUserStats[username] = member.user.presence.status;
		});
	}
}, 1500);
