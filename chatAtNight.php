<?php








$messageArray = array("Chat Status: LIVE");
$userArray = [];
$userCheckSum = 0;
$messageCheckSum = 1;


set_time_limit(0);

function addUser($userName){
	array_push($userArray, $userName);
	$userCheckSum += 1;
}

function removeUser($userName){
	while(($key = array_search($userName, $userArray)) != false) {
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
	echo "good job";
}


function updateChat(){
	$messages = [];
	$j = 0;
	while(true){
	if($_GET['checksumChat'] != $messageCheckSum)
		for ($i=$_GET['checksumChat']; $i < sizeof($messageArray); $i++) { 
			$messages[$j] = $messageArray[$i];
		}
		echo json_encode(array($userCheckSum, $messages));
		break;	
	}
}


?>
