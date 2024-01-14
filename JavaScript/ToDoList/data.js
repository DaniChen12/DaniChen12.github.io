// let toDoListData = [
//     {
//         "task": "遛狗",
//         "done": false
//     },
//     {
//         "task": "散步",
//         "done": true
//     },
//     {
//         "task": "看病",
//         "done": false
//     },
//     {
//         "task": "跑步",
//         "done": true
//     }
// ];
let toDoListData = [];
const localStorageKey ='toDoListData';

// ----------------新增資料處理---------------
function addData(obj) {
    toDoListData.push(obj);
    saveDataToStorage();
}

// -----------------刪除資料--------------------
function deleleDataByIndex(index) {
    toDoListData.splice(index, 1);
    saveDataToStorage();
}

//-----------------儲存資料-----------------------------
function saveData(editIndex, obj) {
    if (!toDoListData[editIndex]) {
        return;
    }

    console.log(editIndex)
    toDoListData[editIndex] = obj;
    saveDataToStorage();

}
//-----------------重新整理資料-----------------------------
function initData(){
    let localStorageData = localStorage.getItem(localStorageKey);
    if(localStorageData) toDoListData=JSON.parse(localStorageData);
}
// ----------------存資料進localStorage---------------------
function saveDataToStorage(){
    localStorage.setItem(localStorageKey, JSON.stringify(toDoListData));
}


//const storedData = JSON.parse(localStorage.getItem(localStorageKey));