function Task(){
	this.handle = null;
}
Task.prototype.start = function(){
	sendRequest('set', true);
	if(!this.handle){
		this.handle = setInterval(run, 50);
		run();
	}
}
Task.prototype.stop = function(){
	sendRequest('set', false);
	if(this.handle){
		clearTimeout(this.handle);
		this.handle = null;
	}
}

var task = new Task(),
	api = new ActionApi(),
	registration = {};
function run(){
	var href = location.href;
	for(var name in registration){
		var pattern = registration[name]['pattern'],
			actionFunc = registration[name]['action']
			failFast = registration[name]['failFast'];
		if(pattern.test(href) && typeof actionFunc == 'function'){
			var success = actionFunc(api);
			if(failFast && !success){
				task.stop();
			}
			return;
		}
	}
	log('This page is not supported.');
	task.stop();
}
function register(name, pattern, action, failFast){
	if(typeof action == 'string'){
		var actionFunc = function(api){
			return api.click(action);
		};
	}else{
		actionFunc = action;
	}
	registration[name] = {pattern: pattern, action: actionFunc, failFast: failFast};
}