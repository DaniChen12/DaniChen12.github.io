// --------------------DOM的家園-------------------------
const title = document.getElementById("title");
const dateInput = document.getElementById("date");
const time = document.getElementById("time");
const desc = document.getElementById("desc");
const color = document.getElementById("color");
const keyInput = document.getElementById('key-input');

const plusModal = document.getElementById('plus-modal');
const addEvent = document.getElementById("addEvent");
const addButton = document.getElementById('btnAdd');
const save = document.getElementById("btnSave");
const Delete = document.getElementById("btnDelete");


// ----------------新增List內容---------------
let modal = new bootstrap.Modal(plusModal);

addEvent.addEventListener('click', popupAddDataModalHandler);
addButton.addEventListener('click', addDateDataHandler);
save.addEventListener('click', modifyDateDataHandler);
Delete.addEventListener('click', DeleteDataModalHandler);

function addListEvent() {
    const eventLists = document.getElementsByClassName('event-list');
    for (let i = 0; i < eventLists.length; i++) {
        console.log(eventLists[i]);
        eventLists[i].addEventListener('click', popupModifyDataModalHandler)
    }
};

// ----------------顯示modal---------------
function popupAddDataModalHandler(e) {
    console.log('popupModal Start');
    clear();
    //let data = calendarData['2014-1-6'];

    save.style.display = 'none';
    Delete.style.display = 'none';
    addButton.style.display = 'block';
    modal.show();

};

// ----------------新增資料處理---------------
function addDateDataHandler(e) {
    console.log('add DATA Start');

    //判斷欄位是否有填
    if (title.value == "") { alert("請輸入事項內容"); return };
    if (dateInput.value == "") { alert("請設定事項日期"); return };
    if (time.value == "") { alert("請設定事項時間"); return };

    let obj = {
        title: title.value,
        time: time.value,
        desc: desc.value,
        color: color.value
    }
    let date = dateInput.value;

    for (const key in obj) {
        console.log(key, obj[key]);
    }
    console.log(date);


    //return;
    addData(date, obj)
    //畫面更新
    generateCalendar(currentYear, currentMonth);
    highlightToday();

    modal.hide();
};

// -----------------顯示Modidy Data--------------------
function popupModifyDataModalHandler(e) {
    console.log('popupModal Start');
    //clear();
    //let data = calendarData['2014-1-6'];


    let liTarget = e.target;
    console.log(liTarget);

    //從li中的Attribute取得日歷資料
    title.value = liTarget.innerText;
    dateInput.value = liTarget.getAttribute('date');
    time.value = liTarget.getAttribute('time');
    desc.value = liTarget.getAttribute('desc');
    color.value = liTarget.getAttribute('color');
    keyInput.value = liTarget.getAttribute('key');

    save.style.display = 'block';
    Delete.style.display = 'block';
    addButton.style.display = 'none';
    modal.show();
}

// ----------------修改資料---------------
function modifyDateDataHandler(e) {
    console.log('modify DATA Start');

    //判斷欄位是否有填
    if (title.value == "") { alert("請輸入事項內容"); return };
    if (dateInput.value == "") { alert("請輸入事項日期"); return };
    if (time.value == "") { alert("請輸入事項時間"); return };

    let obj = {
        title: title.value,
        time: time.value,
        desc: desc.value,
        color: color.value
    }

    let date = dateInput.value;
    let key = keyInput.value;


    //return;
    modifyData(date, key, obj);
    //畫面更新
    generateCalendar(currentYear, currentMonth);
    highlightToday();

    modal.hide();
}

// -----------------刪除資料--------------------
function DeleteDataModalHandler(e) {
    console.log('Delete DATA');

    // 獲取要刪除的資料的鍵值
    let key = keyInput.value;
    let date = dateInput.value;

    // 呼叫刪除資料的函式
    deleteData(date, key);
    // 畫面更新
    generateCalendar(currentYear, currentMonth);
    highlightToday();

    modal.hide();
}
function deleteData(date, key) {
   // 假設資料是以日期和鍵值的組合作為localStorage中的鍵存儲
    let storageKey = date + '_' + key;

    // 刪除localStorage中的特定項目
    localStorage.removeItem(storageKey);
}

// -----------------清空欄位資炓--------------------
function clear() {
    title.value = "";
    dateInput.value = "";
    time.value = "";
    desc.value = "";
    color.value = "#000000";
    keyInput.value = "";
}

// -----------------------Data範例------------------
let calendarData =
{
    '2023-12-06': [
        {
            title: "Tie",
            time: "21:00",
            desc: "Description",
            color: "#000000"
        },
        {
            title: "Title",
            time: "2100",
            desc: "Description",
            color: "#000000"
        }
    ],
    '2024-01-06': [
        {
            title: "Title",
            time: "21:00",
            desc: "Description",
            color: "#000000"
        },
        {
            title: "Title",
            time: "2:00",
            desc: "Description",
            color: "#000000"
        }
    ],
    '2024-01-30': [
        {
            title: "Title",
            time: "21:00",
            desc: "Description",
            color: "#00FF00"
        },
        {
            title: "Title",
            time: "22:00",
            desc: "Description",
            color: "#FF0000"
        }
    ]
};

// ----------------建立物件資料---------------
const localStorageKey = "CalanderData";

function addData(date, obj) {
    if (calendarData[date]) {
        calendarData[date].push(obj);
        calendarData[date].sort(function (t1, t2) {
            return t1.time.localeCompare(t2.time);
        });
    } else {
        calendarData[date] = [obj];
    }
    saveDataToStorage();
}

// ----------------存資料進localStorage---------------
function saveDataToStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(calendarData));
}
// ----------------localStorage拿取資料---------------

function initData() {
    let localStorageData = localStorage.getItem(localStorageKey);
    if (localStorageData) {
        calendarData = JSON.parse(localStorageData);
    } else {
        calendarData = {};
    }

}
function getData(date, key) {
    return calendarData = [date][key];
}
// ----------------修改資料---------------
function modifyData(date, key, obj) {
    /*if(calendarData[date]){
        calendarData[date].push(obj);
        calendarData[date].sort(function(t1, t2) {
            return t1.time.localeCompare(t2.time);
        });
    }else{
        calendarData[date] = [obj];
    }*/

    calendarData[date][key] = obj;
    saveDataToStorage();
}