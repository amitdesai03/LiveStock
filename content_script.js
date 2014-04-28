
var fetchCurrentSiteHTML = function() {
  return document.body.innerText;
}

function onExtensionMessage(request, sender, sendResponse) {
  if (request['fetchCurrentSiteHTML'] != undefined) {
    sendResponse(fetchCurrentSiteHTML());
  }
}

function initContentScript() {
  chrome.runtime.onMessage.addListener(onExtensionMessage);
}

initContentScript();
