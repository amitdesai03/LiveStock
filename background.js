
// Global accessor that the popup uses.
var selectedId = null;
var tabSiteHTMLMapping = {};
var currentSiteHTML = null;
var stockSymbolsDownloaded;

function updateCurrentSiteHTML(tabId) {
  chrome.tabs.sendMessage(tabId, {fetchCurrentSiteHTML:true},
  function(response) {
    tabSiteHTMLMapping[tabId] = response;
    if (!response) {
      chrome.pageAction.hide(tabId);
    } else {
      chrome.pageAction.show(tabId);
      if (selectedId == tabId) {
        updateSelected(tabId);
      }
    }
  }
 );
}

function updateSelected(tabId) {
  currentSiteHTML = tabSiteHTMLMapping[tabId];
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {;
  if (change.status == "complete") {
    updateCurrentSiteHTML(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateCurrentSiteHTML(tabs[0].id);
});

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    alert('Oops! Local storage is not supported by your browser. Please uninstall this extension or upgrade to modern browser.');
    return false;
  }
}

function downloadSymbols(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://raw.githubusercontent.com/amitdesai03/LiveStock/master/symbols.txt", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // innerText does not let the attacker inject HTML elements.
      stockSymbolsDownloaded = xhr.responseText.split(",");
    }
  }
  xhr.send();
}

function initialize(){
  if(supports_html5_storage() != false){
    downloadSymbols();
  }
}

initialize();
