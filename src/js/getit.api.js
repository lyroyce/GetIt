var ActionApi = function(){
}
ActionApi.prototype.click = function(selector) {
	var element = $(selector);
	if(!element.length){
		log('Element "'+selector+'" is not found');
		return false;
	}
	if(!element.is(':visible')){
		log('Element "'+selector+'" is not visible');
		return false;
	}
	element[0].click();
	log('Element "'+selector+'" is clicked');
	return true;
}