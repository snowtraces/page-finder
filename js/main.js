/**
 * 获取页面内容
 */
function getPage(){
  chrome.tabs.executeScript(null, {
    file: "js/getPagesSource.js"
  }, function () {
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
}

getPage()