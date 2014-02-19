<?php








var $messageArray = array("Chat Status: LIVE");
var $userArray = [];
var $userCheckSum = 0;
var $messageCheckSum = 1;


set_time_limit(0);

function addUser($userName){
	array_push($userArray, $userName);
	$userCheckSum += 1;
}

function removeUser($userName){
	while(($key = array_search($userName, $userArray)) !== false) {
	    unset($userArray[$key]);
		$userCheckSum += 1;
	}
	if (count($userArray == 0)) {
			$messageArray =  ["Chat Status: LIVE"];
			$messageCheckSum = 1;
	}
}

function addMessage($message){
	array_push($messageArray, $message);
	$messageCheckSum += 1;
}


function updateChat(){
	var $messages = [];
	var $j = 0;
	while(true){
	if($_GET['checksumChat'] != $messageCheckSum;)
		for ($i=$_GET['checksumChat'); $i < ; $i++) { 
			$messages[$j] = $messageArray[$i];
		}
		echo json_encode(array($userCheckSum, $messages))	
	}
}


?>
