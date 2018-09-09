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
    var _srcArr = []
    imgs.forEach(function(img){
        var src = img.getAttribute('src')

        if(src && _srcArr.indexOf(src) == -1) {
            _srcArr.push(src)
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

        var _detail = document.createElement('a')
        _detail.classList.add('detail')
        _detail.href = 'javascript:;'
        _detail.setAttribute('data-src', img.src)
        _detail.setAttribute('download','')
        _detail.innerText = _width + '✕' + _height
        imgBox.appendChild(_detail)

        _detail.addEventListener('click', downloadImage)
    })
}

function addStyle(){
    // style 代码块
    var _style = document.createElement('style')

    var style = '.page-finder-add-wrap {' + 
        'z-index: 9999; box-sizing: border-box; position:fixed; width:auto; right: 32px; bottom: 32px; border: none; border-radius: 2px;' + 
        'border: 1px solid #ccc; background: #009688; padding: 5px; max-height: 35%; max-width:75%; display: flex;' + 
        '}\n'
    style += '.page-finder-add {' + 
        'display: flex; flex-wrap: wrap; overflow: auto ' + 
        '}\n'
    style += '.page-finder-operation {' +
        'position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #fff; text-align: center;' +
        'font-size: 20px; line-height: 30px; opacity: .85; cursor: pointer' +
        '}\n'
    style += '.page-finder-add .page-img {' +
        'padding:5px; height: 64px; width: auto; max-width: 100%; overflow: hidden; position: relative; ' + 
        '}\n'
    style += '.page-finder-add .page-img img {' +
        'height: 100%; background: #ccc; cursor:pointer; ' + 
        '}\n'
    style += '.page-finder-add-wrap .show-box {' +
        'position: absolute; left: 0; top: -266px; height: 256px; width: auto; background: #009688; overflow: hidden;' + 
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


function getBlob(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
        };

        xhr.send();
    });
}

function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        const body = document.querySelector('body');

        link.href = window.URL.createObjectURL(blob);
        link.download = filename || '';

        link.style.display = 'none';
        body.appendChild(link);
        
        link.click();
        link.remove();

        window.URL.revokeObjectURL(link.href);
    }
}

function downloadImage(){
    var url = this.getAttribute('data-src')
    getBlob(url).then(blob => {
        saveAs(blob);
    });
}

domAdd()
addDetail()
addStyle()