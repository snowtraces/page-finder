/**
 * msg 监听
 */
chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    // message.innerText = request.source;
  }
});

/**
 * 获取页面内容
 */
function getPage(){
  message = document.querySelector('#main');
  chrome.tabs.executeScript(null, {
    file: "js/getPagesSource.js"
  }, function () {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
}

function init() {
  getPage()
}

window.onload = init;