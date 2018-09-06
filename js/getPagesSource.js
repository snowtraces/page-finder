var log = console.log.bind(console)
log('goooooooooooooooo')
function DOMtoString() {
    var html = document.querySelector('html').innerHTML
    return html;
}

function DOMadd() {
    var body = document.querySelector('body')
    var _old = document.querySelector('.page-finder-add-wrap')
    if (_old) {
        _old.remove()
    }

    var _addWrap = document.createElement('div')
    _addWrap.classList.add('page-finder-add-wrap')
    var _add = document.createElement('div')
    _add.classList.add('page-finder-add')
    _addWrap.appendChild(_add)
    
    // 读取图片
    var imgs = document.querySelectorAll('img')
    var flag = false
    imgs.forEach(function(img){
        var src = img.getAttribute('src')
        if(src) {
            flag = true
            var _div = document.createElement('div')
            _div.classList.add('page-img')
    
            var _img = document.createElement('img')
            _img.setAttribute('src', src)
            _div.appendChild(_img)
    
            _add.appendChild(_div)
        }
    })
    
    if(flag){
        // 删除按钮
        var operation = document.createElement('div')
        operation.classList.add('page-finder-operation')
        operation.innerText = '✕'
        _add.appendChild(operation)
       

        // style 代码块
        var _style = document.createElement('style')

        var style = '.page-finder-add-wrap {' + 
            'z-index: 9999; box-sizing: border-box; position:fixed; width:auto; right: 10px; bottom: 10px;' + 
            'border: 1px solid #ccc; background: #278; padding: 5px; max-height: 35%; max-width:50%; display: flex; box-shadow: 4px 3px 10px #aaa' + 
            '}\n'
        style += '.page-finder-add {' + 
            'display: flex; flex-wrap: wrap; overflow: auto ' + 
            '}\n'
        style += '.page-finder-operation {' +
            'position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #fff; text-align: center;' +
            'font-size: 20px; line-height: 30px; opacity: .85; cursor: pointer' +
            '}\n'
        style += '.page-finder-add .page-img {' +
            'padding:5px; height: 64px; width: auto; max-width: 192px; overflow: hidden' + 
            '}\n'
        style += '.page-finder-add .page-img img {' +
            'height: 100%; background: #fff' + 
            '}\n'

        _style.innerText = style
        _addWrap.appendChild(_style)

        body.appendChild(_addWrap)

        operation.addEventListener('click', function(){
            _addWrap.remove()
        } , false)
    }
}

DOMadd()