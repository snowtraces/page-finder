var log = console.log.bind(console)

function DOMtoString() {
    var html = document.querySelector('html').innerHTML
    DOMadd();
    return html;
}


function DOMadd() {
    var body = document.querySelector('body')
    var _old = document.querySelector('.page-finder-add')
    if (_old) {
        _old.remove()
    }

    var _add = document.createElement('div')
    _add.classList.add('page-finder-add')
    _add.setAttribute('style', 'z-index: 9999; box-sizing: border-box; position:fixed; max-width:50%; display: flex; flex-wrap: wrap; right: 10px; bottom: 10px; border: 1px solid #ccc; background: #278; padding: 5px')
    
    // 读取图片
    var imgs = document.querySelectorAll('img')
    var flag = false
    imgs.forEach(function(img){
        var src = img.getAttribute('src')
        if(src) {
            flag = true
            var _div = document.createElement('div')
            _div.classList.add('page-img')
            _div.setAttribute('style', 'padding:5px; height: 64px; width: auto; overflow: hidden')
    
            var _img = document.createElement('img')
            _img.setAttribute('src', src)
            _img.setAttribute('style', 'height: 100%; background: #fff')
            _div.appendChild(_img)
    
            _add.appendChild(_div)
        }
    })
    
    if(flag){
        body.appendChild(_add)
    }
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString()
});

