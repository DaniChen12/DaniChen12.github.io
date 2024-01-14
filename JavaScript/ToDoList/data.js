let toDoListData = [
    {
        "task": "遛狗",
        "done": false
    },
    {
        "task": "散步",
        "done": true
    },
    {
        "task": "看病",
        "done": false
    },
    {
        "task": "跑步",
        "done": true
    }
];

// ----------------新增資料處理---------------
function addData(obj) {
    toDoListData.push(obj)
}


function deleleDataByIndex(index) {
    toDoListData.splice(index, 1);
}

const localStorageKey ='todoList';

localStorage.setItem('localStorageKey', JSON.stringify(toDoListData));
// const storedData = JSON.parse(localStorage.getItem(localStorageKey));