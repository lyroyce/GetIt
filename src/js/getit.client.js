
$(document.body).keydown(function(event){
	// on F2 pressed
	if(event.keyCode==113){
		sendRequest('toogle');
	}
	// on ESC pressed
	else if(event.keyCode==27){
		task.stop();
	}
});

function sendRequest(key, value){
	var request = {};
	request['key'] = key;
	request['value'] = value;
	chrome.extension.sendRequest(request, receiveRequest);
}

function receiveRequest(request) {
	var key = request['key'],
		value = request['value'];
	switch(key){
		case 'status':
			if(value) task.start();
			else task.stop();
			break;
	}
}
function log(message) {
	console.log(message);
}

chrome.extension.onRequest.addListener(receiveRequest); //passive
sendRequest('query'); // query status on page refresh