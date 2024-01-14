// --------------------DOM的家園-------------------------
const input_Text = document.getElementById("input");
const btnAddList = document.getElementById("btnAddList");
const ul = document.getElementById("list-group");

// const toDoInfo = document.getElementById("toDoInfo");
// const btnEdit = document.getElementById("btnEdit");
// const btnSave = document.getElementById("btnSave");
// const btnDelete = document.getElementById("btnDelete");
//---------------------------------------------------------

//-----------------建立資料--------------------------------
function createList() {
    ul.innerHTML = "";
    for (let index = 0; index < toDoListData.length; index++) {
        let todoData = toDoListData[index];
        let li = document.createElement("li");
        li.classList.add("todoList", "d-flex", "mb-2");
        li.setAttribute('index', index)

        //div-inputGroup
        let inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        //div-input-group-text
        let div = document.createElement("div");
        div.classList.add("input-group-text");

        //input-Checkbox
        let Checkbox = document.createElement("input");
        Checkbox.classList.add("form-check-input");
        Checkbox.type = "checkbox";
        Checkbox.id = "checkbox";
        Checkbox.checked = todoData.done;
        Checkbox.addEventListener('click', checkbox_display);

        //input-key_input
        let key_input = document.createElement("input");
        key_input.id = "key-input";
        key_input.value = index;
        key_input.type = "hidden";

        //input-toDoInfo
        let toDoInfo = document.createElement("input");
        toDoInfo.type = "text";
        toDoInfo.classList.add("form-control");
        toDoInfo.id = "toDoInfo";
        toDoInfo.value = todoData.task.trim();//input_Text.value;
        toDoInfo.disabled = true;

        //button-Edit
        let buttonEdit = document.createElement("button");
        buttonEdit.classList.add("btn", "btn-primary");
        buttonEdit.id = "btnEdit";
        buttonEdit.type = "button";
        buttonEdit.textContent = "Edit";
        buttonEdit.onclick = function () {
            toDoInfo.disabled = false;
            toDoInfo.focus();
            buttonEdit.style.display = 'none';
            buttonSave.style.display = 'block';
        }

        //button-Save
        let buttonSave = document.createElement("button");
        buttonSave.classList.add("btn", "btn-success");
        buttonSave.id = "btnSave";
        buttonSave.type = "button";
        buttonSave.textContent = "Save";
        buttonSave.style.display = 'none';
        buttonSave.onclick = function (e) {
            let editIndex = e.target.parentNode.parentNode.getAttribute('index');
            saveData(editIndex);
            toDoInfo.disabled = true;
            buttonEdit.style.display = 'block';
            buttonSave.style.display = 'none';
        };

        //button-Delete
        let buttonDelete = document.createElement("button");
        buttonDelete.classList.add("btn", "btn-danger");
        buttonDelete.type = "button";
        buttonDelete.id = "btnDelete";
        buttonDelete.textContent = "Delete";
        buttonDelete.addEventListener('click', deleteDataClickHandler);

        //append all
        li.appendChild(inputGroup);
        inputGroup.appendChild(div)
        div.appendChild(Checkbox);
        inputGroup.appendChild(key_input);
        inputGroup.appendChild(toDoInfo);
        inputGroup.appendChild(buttonEdit);
        inputGroup.appendChild(buttonSave);
        inputGroup.appendChild(buttonDelete);

        ul.appendChild(li);
    }
}
//------------------------------------------------------

//-----------------刪除按鈕-----------------------------
function deleteDataClickHandler(e) {
    let delIndex = e.target.parentNode.parentNode.getAttribute('index');
    console.log('index:', delIndex);
    deleleDataByIndex(delIndex);
    createList();
}
//------------------------------------------------------
function checkbox_display(e) {
    let index = e.target.parentNode.parentNode.parentNode.getAttribute('index');
    console.log(index);
    let todoData = toDoListData[index];
    let checkbox = e.target;
    let toDoInfo = e.target.parentNode.parentNode.querySelector(".form-control");
    
    if (checkbox.checked) {
        console.log('done is true')
        toDoInfo.classList.add("text-decoration-line-through","text-body-tertiary","text-opacity-25");
    } else {
        console.log('done is false')
        toDoInfo.classList.remove("text-decoration-line-through", "text-opacity-25","text-body-tertiary");
    }
}
// //-----------------編輯按鈕-----------------------------
function modifyDataClickHandler(e) {
    let obj = {
        "task": input_Text.value,
        "done": false
    }
    let editIndex = e.target.parentNode.parentNode.getAttribute('index');
    console.log('index:', editIndex)
    saveData(editIndex, obj);
    createList();
}
//------------------------------------------------------

//-----------------儲存按鈕-----------------------------
function saveData(editIndex, obj) {
    if (!toDoListData[editIndex]) {
        return;
    }

    console.log(editIndex)
    toDoListData[editIndex].task = obj;

}
//------------------------------------------------------

//-----------------建立list畫面-----------------------------
btnAddList.addEventListener('click', addDataClickHanlder);
function addDataClickHanlder() {
    if (input_Text.value === '') {
        alert("必須寫點東西"); return
    }
    else {
        let obj = {
            "task": input_Text.value,
            "done": false
        }
        addData(obj);
        input_Text.value = "";
        createList();

        /*buttonEdit.addEventListener('click', function() {
                toDoInfo.disabled = false; 
                toDoInfo.focus(); 
            });*/


        //---------------------------------------------------------
        //建立監聽事件去判斷是否是編輯狀態
        /*buttonEdit.addEventListener('click', function() {
            toDoInfo.disabled = false; 
            toDoInfo.focus();
            buttonEdit.style.display = 'none'; 
            buttonSave.style.display = 'block'; 
        });

        buttonSave.addEventListener('click', function() {
            toDoInfo.disabled = true;
            buttonEdit.style.display = 'block'; 
            buttonSave.style.display = 'none'; 
        });*/
        //----------------------------------------------------------


        /**/
    }
    input_Text.value = "";
}
//---------------------------------------------------------



//--------------------完成事項---------------------------
// checkbox.addEventListener("change", function(event) {
//     // 檢查 checkbox 是否被選中
//     if (event.target.checked) {
//         // 如果被選中，執行相應的操作
//         console.log("Checkbox is checked");
//         // 在這裡可以添加其他你想要執行的代碼
//     } else {
//         // 如果沒有被選中，執行其他操作
//         console.log("Checkbox is unchecked");
//         // 在這裡可以添加其他你想要執行的代碼
//     }
// });


createList();