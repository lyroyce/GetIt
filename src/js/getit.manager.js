function receiveRequest(request, sender, sendResponse) {
    var tabId = sender.tab.id,
        key = request['key'],
        value = request['value'];
    switch(key){
        case 'set':
            tabStatusMap[tabId]=value;
            break;
        case 'query':
            sendResponse(status(tabId));
            break;
        case 'toogle':
            toogleStatus(tabId);
            sendResponse(status(tabId));
            break;
    }
}
chrome.extension.onRequest.addListener(receiveRequest);

// remember the status for each tab
var tabStatusMap = {};
function status(tabId){
    return {
        'key': 'status',
        'value': tabStatusMap[tabId]
    };
}
function toogleStatus(tabId){
    if(tabStatusMap[tabId]) newStatus=false;
    else newStatus = true;
    tabStatusMap[tabId] = newStatus;
}