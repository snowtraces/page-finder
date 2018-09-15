var log = console.log.bind(console)
function DOMtoString() {
    var html = document.querySelector('html').innerHTML
    return html;
}

/**
 * 移除旧数据
 */
function removeOld() {
    var oldContainer = document.querySelector('.page-finder-add-wrap')
    if (oldContainer) {
        oldContainer.remove()
    }
}

/**
 * 添加内容
 */
function addDom() {
    removeOld()

    // 创建外层div
    var container = document.createElement('div')
    container.classList.add('page-finder-add-wrap')

    // 创建展示div
    var zoomShow = document.createElement('div')
    zoomShow.classList.add('show-box')
    var showImg = document.createElement('img')
    zoomShow.appendChild(showImg)
    container.appendChild(zoomShow)

    // 创建内层列表div
    var innerContainer = document.createElement('div')
    innerContainer.classList.add('page-finder-add')
    container.appendChild(innerContainer)

    // 读取图片，写入内层div
    var imgs = document.querySelectorAll('img')
    var flag = false
    var srcArr = []
    var downdList = []
    imgs.forEach(function (img) {
        var src = img.src
        var name = getImageName(img)

        if (src && srcArr.indexOf(src) == -1) {
            var o = {}
            o.src = src
            o.name = name
            downdList.push(o)
            srcArr.push(src)

            flag = true
            var single = document.createElement('div')
            single.classList.add('page-img')

            var singleImg = document.createElement('img')
            singleImg.setAttribute('src', src)
            singleImg.setAttribute('alt', name)
            single.appendChild(singleImg)

            innerContainer.appendChild(single)

            singleImg.addEventListener('click', function () {
                showSrc = showImg.src
                if (showSrc == src) {
                    showImg.removeAttribute('src')
                } else {
                    showImg.setAttribute('src', src)
                }
            }, false)
        }
    })

    if (flag) {
        // 删除按钮
        var operation = document.createElement('div')
        operation.classList.add('page-finder-operation')
        operation.innerText = '✕'
        innerContainer.appendChild(operation)

        document.querySelector('body').appendChild(container)

        operation.addEventListener('click', function () {
            container.remove()
        }, false)

        // 批量下载按钮
        var batchDownload = document.createElement('div')
        batchDownload.classList.add('page-finder-batchDownload')
        batchDownload.innerText = '⇥'
        innerContainer.appendChild(batchDownload)

        batchDownload.addEventListener('click', function () {
            downdList.forEach(function (item) {
                getBlob(item.src).then(blob => {
                    saveAs(blob, item.name);
                });
            })
        }, false)
    }
}

/**
 * 添加详情
 */
function addDetail() {
    var imgBoxs = document.querySelectorAll('.page-finder-add-wrap .page-img')
    imgBoxs.forEach(function (imgBox) {
        var img = imgBox.querySelector('img')
        var height = img.naturalHeight
        var width = img.naturalWidth
        var name = img.alt
        var src = img.src

        var detail = document.createElement('a')
        detail.classList.add('detail')
        detail.href = 'javascript:;'
        detail.setAttribute('data-src', src)
        detail.setAttribute('title', name)
        detail.setAttribute('download', '')
        detail.innerText = width + '✕' + height
        imgBox.appendChild(detail)

        detail.addEventListener('click', downloadImage)
    })
}

function addStyle() {
    // style 代码块
    var styleBlock = document.createElement('style')

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
    style += '.page-finder-batchDownload {' +
        'position: absolute; bottom: 0; right: 0; width: 30px; height: 30px; background: #fff; text-align: center;' +
        'font-size: 24px; line-height: 30px; opacity: .85; cursor: pointer; transform: rotate(90deg);' +
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

        styleBlock.innerText = style
    document.querySelector('.page-finder-add-wrap').appendChild(styleBlock)
}

function getImageName(img) {
    var name = ''
    var src = img.src
    var alt = img.alt
    if (src && !src.startsWith('data:')) {
        var lastIndex = src.lastIndexOf('/')
        if (lastIndex > 0) {
            name = src.substring(lastIndex + 1, src.length)
        } else {
            name = src
        }
    } else if (alt) {
        name = alt
    }
    return name
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
    filename = filename || ''
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        const body = document.querySelector('body');

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        link.style.display = 'none';
        body.appendChild(link);

        link.click();
        link.remove();

        window.URL.revokeObjectURL(link.href);
    }
}

function downloadImage() {
    var url = this.getAttribute('data-src')
    var name = this.getAttribute('title')
    getBlob(url).then(blob => {
        saveAs(blob, name);
    });
}

addDom()
addDetail()
addStyle()