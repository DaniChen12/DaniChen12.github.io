let shopObj = {};
let ipadObj = {};
let macbookObj={};
let selectedColor, selectedModel, selectedStorage, selectedWifi;
// let a = console.log();
window.onload = (url) => {
    fetch("./data/iphone-14-pro.json")
        .then(Response => Response.json())
        .then((shopData) => {
            // console.log(shopData);
            shopObj = shopData;
            renderingShop(shopData);
        })
        .catch((err) => {
            alert(`error:${err}`);
            // console.warn(err);
        });
};
const iphone = document.getElementById('iphone')
// console.log(iphone);
iphone.addEventListener('click', function () {
    resetSummaryArea()
    fetch("./data/iphone-14-pro.json")
        .then(Response => Response.json())
        .then((shopData) => {
            // console.log(shopData);
            shopObj = shopData;
            renderingShop(shopData);
        })
        .catch((err) => {
            alert(`error:${err}`);
            // console.warn(err);
        });
})

const ipad = document.getElementById('ipad')
ipad.addEventListener('click', function () {
    resetSummaryArea()
    fetch("./data/ipad.json")
        .then(Response => Response.json())
        .then((ipadData) => {
            ipadObj = ipadData;
            renderingShopForIPad(ipadData);
        })
        .catch((err) => {
            alert(`error:${err}`);
        });
});
const macbook = document.getElementById('mac')
macbook.addEventListener('click', function () {
    resetSummaryArea()
    fetch("./data/macbook.json")
        .then(Response => Response.json())
        .then((macbookData) => {
            macbookObj = macbookData;
            renderingMacShop(macbookData);
        })
        .catch((err) => {
            alert(`error:${err}`);
        });
})

// --------------iphone-----------------------------

function renderingShop(shop) {

    const priceArr = shop.specifications.map((spec) => spec.price);
    const minPrice = Math.min(...priceArr);
    const title = shop.title;

    document.querySelector(".shop-content .title-area").innerHTML = `<h1>
                ${title}
            </h1>
            <div class="total-price">
                NT$ ${minPrice} 起
            </div>`;


    // const defaultImages = Object.values(shop.images).reduce(
    //     (acc, curr) => acc.concat(curr),
    //     []);
    const defaultImages = Object.values(shop.images)[0]

    // console.log('defaultImages', defaultImages)

    createCarousel(defaultImages);

    //widgets處理(機型、顏色、儲存裝置)
    let widgetsHTML = "";
    shop.widgets.forEach((widget) => {
        widgetsHTML += createWidgetHTML(widget);
    });
    document.querySelector(".spec-widget").innerHTML = widgetsHTML;

};

// ----------幻燈片------------------
function createCarousel(images) {
    const mainImgArea = document.querySelector(".main-img-area");

    const carouselIndicatorsHTML = createCarouselIndicatorsHTML(images);

    const carouselInnerHTML = createCarouselHTML(images);

    mainImgArea.innerHTML = `
    <div id="carouselExampleAutoplaying" class="carousel slide  sticky-top" data-bs-ride="carousel">
        <div class="carousel-indicators">
            ${carouselIndicatorsHTML}
        </div>
        <div class="carousel-inner">
            ${carouselInnerHTML}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `;
};
/**
 * 幻燈片指標區塊
 * @param {String[]} images
 * @returns Indicators Area HTML
 */
function createCarouselIndicatorsHTML(images) {
    let html = "";
    images.forEach((img, idx) => {
        html += `<button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="${idx}"
        class="${idx === 0 ? "active" : ""
            }" aria-current="true" aria-label="Slide ${idx + 1}"></button>`;
    });
    return html;
}

/**
 * 幻燈片主圖區區塊
 * @param {String[]} images
 * @returns Carousel Img Area HTML
 */
function createCarouselHTML(images) {

    let html = "";
    images.forEach((img, idx) => {
        html += `<div class="carousel-item ${idx === 0 ? "active" : ""}">
                        <img src="${img}" class="d-block w-100" alt="...">
                    </div>`;
    });
    return html;
}

// ------------Widget區塊-------------
function createWidgetHTML(widget) {
    const items = getWidgetItem(widget.type);
    let itemsHTML = "";

    items.forEach((item) => {
        // console.log(item);
        if (widget.type === "color") {
            const theColorObj = shopObj.colors.find(c => c.colorCode === item)
            itemsHTML += `
        <div class="col">
        <div class="border border-secondary-subtle rounded-3 p-4 text-center" role="button" onclick="clickHandler(this,'${widget.type}')" data-color="${item}">
        <img class="w-25" src="${theColorObj.colorImg}"
            alt="${theColorObj.colorName}">
        </div>
        </div>
        `;
        } else if (widget.type === "model") {

            itemsHTML += `
        <div class="col">
            <div class="border border-secondary-subtle rounded-3 p-4" role="button" onclick="clickHandler(this,'${widget.type}')" data-model="${item}">${item}</div>
        </div>
        `
        } else if (widget.type === "storage") {
            itemsHTML += `
        <div class="col">
        <div class="border border-secondary-subtle rounded-3 p-4 d-flex justify-content-between"
            role="button" onclick="clickHandler(this,'${widget.type}')" data-storage="${item}">
            <div class="storage-spec">${item}</div>
            <div class="price"></div>
        </div>
        </div>`
        } else {
            itemsHTML += `
        <div class="col">
            <div class="border rounded-3 p-4" role="button">${item}</div>
        </div>
        `;
        }
    });

    const html = `
    <section class="widget-item mb-4 mx-lg-3">
    <h2 class="fs-4">${widget.title} <span class="text-black-50">${widget.subTitle}</span></h2>
    ${widget.type === 'color' ? `<p><span class="picked-color fw-medium">顏色</span> </p>` : ''}
    <div class="row row-cols-${widget.col} gy-3">
        ${itemsHTML}
    </div>
</section>`;
    return html;
};

function getWidgetItem(type) {
    // console.log(shopObj);
    //從specifications內取得符合的items:
    //model => "iPhone 14 Pro","iPhone 14 Pro Max"
    //color => "","","",""
    //storage => "128G", "256G", "512G", "1TB"

    return new Set(shopObj.specifications.map((spec) => spec[type]));
}

function createCarousel(images) {
    const mainImgArea = document.querySelector(".main-img-area");

    const carouselIndicatorsHTML = createCarouselIndicatorsHTML(images);

    const carouselInnerHTML = createCarouselHTML(images);

    mainImgArea.innerHTML = `
    <div id="carouselExampleAutoplaying" class="carousel slide  sticky-top" data-bs-ride="carousel">
        <div class="carousel-indicators">
            ${carouselIndicatorsHTML}
        </div>
        <div class="carousel-inner">
            ${carouselInnerHTML}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `;
};
// ---------商品客製化區塊點擊動態樣式----------
/**
 * @param {DOMElement} element 
 */
function specSelectActiveHandler(element) {
    element.parentElement.parentElement.querySelectorAll('[role="button"]').forEach(el => {
        el.classList.remove('border-primary')
    })
    element.classList.remove('border-secondary-subtle')
    element.classList.add('border-primary')
}
// ---------選取要的類別Handler----------

function clickHandler(element, type) {

    specSelectActiveHandler(element)

    const specWidget = document.querySelector('.spec-widget')
    if (type === 'color') {
        const color = shopObj.colors.find(c => c.colorCode === element.dataset.color)
        selectedColor = color.colorCode

        //新增顏色文字
        specWidget.querySelector('.picked-color').textContent = `顏色 - ${color.colorName}`

        //換主圖幻燈片
        const imgs = shopObj.images[color.colorCode]
        createCarousel(imgs)

    }
    if (type === 'model') {
        selectedModel = element.dataset.model
        //處理儲存裝置區價錢
        const specs = shopObj.specifications.filter(s => s.model === selectedModel)
        specWidget.querySelectorAll('[data-storage]').forEach(el => {
            const spec = specs.find(s => s.storage === el.dataset.storage)
            console.log("spec", spec)
            el.querySelector('.price').textContent = `NT$ ${spec.price.toLocaleString()}`
        })

    }
    if (type === 'storage') {
        selectedStorage = element.dataset.storage
    }
    getSummary()

};
// -----------重設選取要的類別----------
function resetSummaryArea() {
    selectedModel = ''
    selectedColor = ''
    selectedStorage = ''
    document.querySelector('.summary-area').classList.add('d-none')
}
function getSummary() {
    console.log('selectedColor', selectedColor, 'selectedModel', selectedModel, 'selectedStorage', selectedStorage);
    if (selectedColor && selectedModel && selectedStorage) {
        const spec = shopObj.specifications.find(spec => spec.model === selectedModel && spec.color === selectedColor && spec.storage === selectedStorage)

        const price = spec.price.toLocaleString()
        const colorObj = shopObj.colors.find(c => c.colorCode === selectedColor)
        const title = `${selectedModel} ${selectedStorage} ${colorObj.colorName}`
        document.querySelector('.summary-area .product-item').innerHTML = `<div class="title">${title}</div>
    <div class="price fw-bold">NT$ ${price}</div>`
    }
    document.querySelector('.summary-area').classList.remove('d-none');
}






// ------------------------ipad--------------------------------
function renderingShopForIPad(shop) {
    const priceArr = shop.specifications.map((spec) => spec.price);
    const minPrice = Math.min(...priceArr);
    const title = shop.title;

    document.querySelector(".shop-content .title-area").innerHTML = `<h1>
                ${title}
            </h1>
            <div class="total-price">
                NT$ ${minPrice} 起
            </div>`;


    const defaultImages = Object.values(shop.images)[0]
    createCarousel(defaultImages);

    //widgets處理(儲存裝置、顏色、wifi裝置)
    let ipadwidgetsHTML = "";
    shop.widgets.forEach((widget) => {
        ipadwidgetsHTML += createIpadWidgetHTML(widget);
    });
    document.querySelector(".spec-widget").innerHTML = ipadwidgetsHTML;
};


// ------------Widget區塊-------------
function createIpadWidgetHTML(widget) {
    const items = getIpadWidgetItem(widget.type);
    let itemsHTML = "";

    items.forEach((item) => {
        // console.log(item);
        if (widget.type === "color") {
            const theColorObj = ipadObj.colors.find(c => c.colorCode === item)
            itemsHTML += `
        <div class="col">
        <div class="border border-secondary-subtle rounded-3 p-4 text-center" role="button" onclick="clickIpadHandler(this,'${widget.type}')" data-color="${item}">
        <img class="w-25" src="${theColorObj.colorImg}"
            alt="${theColorObj.colorName}">
        </div>
        </div>
        `;
        } else if (widget.type === "wifi") {
            // const theWifiObj = ipadObj.specifications.find(s=>s.wiFi===item)
            itemsHTML += `
        <div class="col">
            <div class="border border-secondary-subtle rounded-3 p-4" role="button" onclick="clickIpadHandler(this,'${widget.type}')" data-wifi="${item}">${item}</div>
        </div>
        `
            // console.log("item",item)
            // console.log("widget.type",widget.type)
        } else if (widget.type === "storage") {
            itemsHTML += `
        <div class="col">
        <div class="border border-secondary-subtle rounded-3 p-4 d-flex justify-content-between"
            role="button" onclick="clickIpadHandler(this,'${widget.type}')" data-storage="${item}">
            <div class="storage-spec">${item}</div>
            <div class="ipad_price"></div>
        </div>
        </div>`
        } else {
            itemsHTML += `
        <div class="col">
            <div class="border rounded-3 p-4" role="button">${item}</div>
        </div>
        `;
        }
    });

    const html = `
    <section class="widget-item mb-4 mx-lg-3">
    <h2 class="fs-4">${widget.title} <span class="text-black-50">${widget.subTitle}</span></h2>
    ${widget.type === 'color' ? `<p><span class="picked-color fw-medium">顏色</span> </p>` : ''}
    <div class="row row-cols-${widget.col} gy-3">
        ${itemsHTML}
    </div>
</section>`;
    return html;
};

function getIpadWidgetItem(type) {
    return new Set(ipadObj.specifications.map((spec) => spec[type]));
}


// ---------選取要的類別Handler----------

function clickIpadHandler(element, type) {

    specSelectActiveHandler(element)

    const specWidget = document.querySelector('.spec-widget')
    if (type === 'color') {
        const color = ipadObj.colors.find(c => c.colorCode === element.dataset.color)
        selectedColor = color.colorCode

        //新增顏色文字
        specWidget.querySelector('.picked-color').textContent = `顏色 - ${color.colorName}`

        //換主圖幻燈片
        const imgs = ipadObj.images[color.colorCode]
        createCarousel(imgs)

    }
    if (type === 'wifi') {
        selectedWifi = element.dataset.wifi
        //處理wifi裝置區價錢
        const specs = ipadObj.specifications.filter(s => s.wifi === selectedWifi)
        specWidget.querySelectorAll('[data-storage]').forEach(el => {
            const ipadspec = specs.find(s => s.storage === el.dataset.storage);
            console.log("el", el ,'ipadspec.price',ipadspec.price);
            el.querySelector('.ipad_price').textContent = `NT$ ${ipadspec.price.toLocaleString()}`
        })
        // specWidget.querySelectorAll('[data-storage]').forEach(function (dani) {
        //     const ipadspec = specs.find(s => s.storage === dani.dataset.storage);
        //     console.log("dani", dani, 'ipadspec.price', ipadspec.price);
        //     dani.querySelector('.ipad_price').textContent = `NT$ ${ipadspec.price.toLocaleString()}`
        // })
    }
    if (type === 'storage') {
        selectedStorage = element.dataset.storage
    }
    getIpadSummary()
};



function getIpadSummary() {
    console.log('selectedColor', selectedColor, 'selectedWifi', selectedWifi, 'selectedStorage', selectedStorage);
    if (selectedColor && selectedWifi && selectedStorage) {
        const spec = ipadObj.specifications.find(spec => spec.wifi === selectedWifi && spec.color === selectedColor && spec.storage === selectedStorage)

        console.log('spec', spec);


        const price = spec.price.toLocaleString(); console.log('price', price);
        const colorObj = ipadObj.colors.find(c => c.colorCode === selectedColor)
        const title = `iPad 10代 ${selectedWifi} ${selectedStorage} ${colorObj.colorName}`
        document.querySelector('.summary-area .product-item').innerHTML = `<div class="title">${title}</div>
    <div class="price fw-bold">NT$ ${price}</div>`
    }
    document.querySelector('.summary-area').classList.remove('d-none');
}

// --------------macBook-----------------------------

function renderingMacShop(shop) {

    const priceArr = shop.specifications.map((spec) => spec.price);
    const minPrice = Math.min(...priceArr);
    const title = shop.title;
    console.log(priceArr)

    document.querySelector(".shop-content .title-area").innerHTML = `<h1>
                ${title}
            </h1>
            <div class="total-price">
                NT$ 54900 起
            </div>`;

    const defaultImages = Object.values(shop.images)[0]
    createCarousel(defaultImages);

    //widgets處理(機型、顏色、儲存裝置)
    let macBookwidgetsHTML = "";
    shop.widgets.forEach((widget) => {
        macBookwidgetsHTML += createMacBookWidgetHTML(widget);
    });
    document.querySelector(".spec-widget").innerHTML = macBookwidgetsHTML;

};

function createMacBookWidgetHTML(widget) {
    const items = getMacbookWidgetItem(widget.type);
    let itemsHTML = "";

    items.forEach((item) => {
        // console.log(item);
        if (widget.type === "color") {
            const theColorObj = shopObj.colors.find(c => c.colorCode === item)
            itemsHTML += `
        <div class="col">
        <div class="border border-secondary-subtle rounded-3 p-4 text-center" role="button" onclick="clickMacbookHandler(this,'${widget.type}')" data-color="${item}">
        <img class="w-25" src="${theColorObj.colorImg}"
            alt="${theColorObj.colorName}">
        </div>
        </div>
        `;
        } else if (widget.type === "model") {

            itemsHTML += `
        <div class="col">
            <div class="border border-secondary-subtle rounded-3 p-4" role="button" onclick="clickMacbookHandler(this,'${widget.type}')" data-model="${item}">${item}</div>
        </div>
        `
        } else if (widget.type === "storage") {
            itemsHTML += `
        <div class="col">
        <div class="border border-secondary-subtle rounded-3 p-4 d-flex justify-content-between"
            role="button" onclick="clickMacbookHandler(this,'${widget.type}')" data-storage="${item}">
            <div class="storage-spec">${item}</div>
            <div class="macbookPrice"></div>
        </div>
        </div>`
        } else {
            itemsHTML += `
        <div class="col">
            <div class="border rounded-3 p-4" role="button">${item}</div>
        </div>
        `;
        }
    });

    const html = `
    <section class="widget-item mb-4 mx-lg-3">
    <h2 class="fs-4">${widget.title} <span class="text-black-50">${widget.subTitle}</span></h2>
    ${widget.type === 'color' ? `<p><span class="picked-color fw-medium">顏色</span> </p>` : ''}
    <div class="row row-cols-${widget.col} gy-3">
        ${itemsHTML}
    </div>
</section>`;
    return html;
};
function getMacbookWidgetItem(type) {
    return new Set(macbookObj.specifications.map((spec) => spec[type]));
};

function clickMacbookHandler(element, type) {

    specSelectActiveHandler(element)

    const specWidget = document.querySelector('.spec-widget')
    if (type === 'color') {
        const color = macbookObj.colors.find(c => c.colorCode === element.dataset.color)
        selectedColor = color.colorCode

        //新增顏色文字
        specWidget.querySelector('.picked-color').textContent = `顏色 - ${color.colorName}`

        //換主圖幻燈片
        const imgs = macbookObj.images[color.colorCode]
        createCarousel(imgs)

    }
    if (type === 'model') {
        selectedModel = element.dataset.model
        //處理儲存裝置區價錢
        const specs = macbookObj.specifications.filter(s => s.model === selectedModel)
        specWidget.querySelectorAll('[data-storage]').forEach(el => {
            const macbookSpec = specs.find(s => s.storage === el.dataset.storage)
            console.log("spec", macbookSpec)
            el.querySelector('.macbookPrice').textContent = `NT$ ${ macbookSpec.price.toLocaleString()}`
        })

    }
    if (type === 'storage') {
        selectedStorage = element.dataset.storage
    }
    getMacbookSummary()

};

function getMacbookSummary() {
    console.log('selectedColor', selectedColor, 'selectedModel', selectedModel, 'selectedStorage', selectedStorage);
    if (selectedColor && selectedModel && selectedStorage) {
        const spec = macbookObj.specifications.find(spec => spec.model === selectedModel && spec.color === selectedColor && spec.storage === selectedStorage)

        const price = spec.price.toLocaleString()
        const colorObj = macbookObj.colors.find(c => c.colorCode === selectedColor)
        const title = `${selectedModel} ${selectedStorage} ${colorObj.colorName}`
        document.querySelector('.summary-area .product-item').innerHTML = `<div class="title">${title}</div>
    <div class="price fw-bold">NT$ ${price}</div>`
    }
    document.querySelector('.summary-area').classList.remove('d-none');
}
