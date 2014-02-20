$(document).ready(function(){

var checksumUsers = 0;
var checksumChat = 0;
var username;
var currentDate = new Date();
var formattedDate = ('<br>'+(currentDate.getMonth()+1) + '/' + currentDate.getDate() + '/' +currentDate.getFullYear());
var timeStamp = (currentDate.getHours() + ':' + currentDate.getMinutes());

$("#mainTitle").append(formattedDate);
	
	$(window).load(function(){

	var i = 1;

	var name = prompt("What's your name?", "Nameless Tech Service Drone");
	// default name is 'Nameless Tech Service Drone'
	if (!name || name == ' ' || name == 'Nameless Tech Service Drone') {
		name = "Nameless Tech Service Drone " + i;
		i++;  
	}
  
	// We get rid of any tags that might screw with our html.
	name = name.replace(/(<([^>]+)>)/ig,"");
 
	// Send name to server
	logIn(name);

	username = name;

	pollChat();

	})

	$(window).on('beforeunload', function(){

	logOut(name);

	});


$('#chatSendArea').focus(function(){
	$(window).keypress(function(e){
		if (e.which == 13) {
			//fire event to submit text
			$("#chatSendButton").click();
		return false; //this prevents linebreak from enter press.
		}
	});
});


$("#chatSendButton").click(function(){
	var chatVal = $('#chatSendArea').val();
	if (chatVal.length > 0){
		var messagetoSend = username + ' |' + timeStamp + '|: ' + chatVal;
		console.log(messagetoSend);
		//send message
		send(messagetoSend);


		$('#chatSendArea').val("");
		$('#chatSendArea').blur();
		$('#chatSendArea').delay(1000).focus();
	}	
});


function pollChat(){	
		$.ajax({
		type: 'GET',
		url:"chatAtNight.php?updateChat",
		data: checksumChat,
		success: function(data){
		var tmp = jQuery.parseJSON(data);
		console.log(tmp);
		checksumChat = tmp[0];
		$('#chatDisplay').append();
		},
		dataType: "json",
		complete: pollChat,
		timeout:30000
		});
}

function pollUsers(checksum){

	setTimeout(function(){
		$.ajax({
		type: 'GET',
		url:"chatAtNight.php?updateUsers="+checksum,
		data: checksum,
		success: function(data){
		var tmp = jQuery.parseJSON(data);
		checksumUsers = 
		$('#chatDisplay').append(tmp);
		},
		dataType: "json",
		});
	}, 30000);
	pollUsers(checksumUsers);
}



function send(message){
	$.ajax({
		url:"chatAtNight.php?addMessage=" +message,
		async:true,
		success:function(data){
			console.log('success');
		},
		error:function(){
			console.log('error');
		}
	});
}

function logIn(username){
	$.ajax({
		url:"chatAtNight.php?adduser=" +username,
		success:function(){
			console.log('success')
		},
		error:function(){
			console.log('error')
		}
	});

}

function logOut(username){
	$.ajax({
		url:"chatAtNight.php"
	})
}



});	