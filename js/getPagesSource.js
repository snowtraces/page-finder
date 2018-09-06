var log = console.log.bind(console)
function DOMtoString() {
    var html = document.querySelector('html').innerHTML
    return html;
}

function removeOld(){
    var _old = document.querySelector('.page-finder-add-wrap')
    if (_old) {
        _old.remove()
    }
}

function domAdd() {
    removeOld()

    // 创建外层div
    var _addWrap = document.createElement('div')
    _addWrap.classList.add('page-finder-add-wrap')

    // 创建展示div
    var _show = document.createElement('div')
    _show.classList.add('show-box')
    var _showImg = document.createElement('img')
    _show.appendChild(_showImg)
    _addWrap.appendChild(_show)

    // 创建内层列表div
    var _add = document.createElement('div')
    _add.classList.add('page-finder-add')
    _addWrap.appendChild(_add)
    
    // 读取图片，写入内层div
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

            _img.addEventListener('click', function(){
                _showSrc = _showImg.getAttribute('src')
                if(_showSrc == src){
                    _showImg.removeAttribute('src')
                } else {
                    _showImg.setAttribute('src',src)
                }
            }, false)
        }
    })
    
    if(flag){
        // 删除按钮
        var operation = document.createElement('div')
        operation.classList.add('page-finder-operation')
        operation.innerText = '✕'
        _add.appendChild(operation)
       


        document.querySelector('body').appendChild(_addWrap)

        operation.addEventListener('click', function(){
            _addWrap.remove()
        } , false)
    }
}

function addDetail(){
    var imgBoxs = document.querySelectorAll('.page-finder-add-wrap .page-img')
    imgBoxs.forEach(function(imgBox){
        var img = imgBox.querySelector('img')
        var _height = img.naturalHeight
        var _width = img.naturalWidth

        var _detail = document.createElement('div')
        _detail.classList.add('detail')
        _detail.innerText = _width + '✕' + _height
        imgBox.appendChild(_detail)

    })
}

function addStyle(){
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
        'padding:5px; height: 64px; width: auto; max-width: 192px; overflow: hidden; position: relative; ' + 
        '}\n'
    style += '.page-finder-add .page-img img {' +
        'height: 100%; background: #fff; cursor:pointer; ' + 
        '}\n'
    style += '.page-finder-add-wrap .show-box {' +
        'position: absolute; left: 0; top: -128px; height: 128px; width: auto; max-width: 384px; background: #999; overflow: hidden; ' + 
        '}\n'
    style += '.page-finder-add-wrap .show-box img {' +
        'height: 100%;' + 
        '}\n'
    style += '.page-finder-add-wrap .detail {' +
        'position: absolute; right: 5px; bottom: 5px; background: rgba(64, 64, 64, .7); color: #ddd; font-size: 8px' + 
        '}\n'

    _style.innerText = style
    document.querySelector('.page-finder-add-wrap').appendChild(_style)
}

domAdd()
addDetail()
addStyle()