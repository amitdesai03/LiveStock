function map() {
  var stockSymbolsDownloaded = chrome.extension.getBackgroundPage().stockSymbolsDownloaded;
  var currentSiteHTML = chrome.extension.getBackgroundPage().currentSiteHTML;
  if(currentSiteHTML!=undefined && currentSiteHTML!=null
    && stockSymbolsDownloaded!=undefined && stockSymbolsDownloaded!=null){
   document.getElementById('result').innerHTML = search(currentSiteHTML,stockSymbolsDownloaded);
  }
}

function search(currentSiteHTML,stockSymbolsDownloaded){
  var result = [];
  for(i = 0;i < stockSymbolsDownloaded.length; i++){

    if(currentSiteHTML.search(stockSymbolsDownloaded[i]) != -1 ){
      result.push(stockSymbolsDownloaded[i]);
    }
  }
  return result;
}

window.onload = map;
