// --------------------DOM的家園-------------------------
const input_Text = document.getElementById("input");
const btnAddList = document.getElementById("btnAddList");
const ul = document.getElementById("list-group");
const checkbox = document.getElementById("checkbox");
const toDoInfo = document.getElementById("toDoInfo");
const btnEdit = document.getElementById("btnEdit");
const btnSave = document.getElementById("btnSave");
const btnDelete = document.getElementById("btnDelete");
//---------------------------------------------------------

//-----------------建立待辦事項-----------------------------
// let events = toDoListData[index];
btnAddList.addEventListener('click', createList);
function createList() {
    if (input_Text.value === '') {
        alert("必須寫點東西");
    }
    else {
        let li = document.createElement("li");
        li.classList.add("todoList", "d-flex", "mb-2");

        let inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        let div = document.createElement("div");
        div.classList.add("input-group-text");

        let inputCheckbox = document.createElement("input");
        inputCheckbox.classList.add("form-check-input");
        inputCheckbox.type = "checkbox";
        inputCheckbox.id = "checkbox";

        let key_input = document.createElement("input");
        key_input.id = "key-input";
        key_input.type = "hidden";

        let toDoInfo = document.createElement("input");
        toDoInfo.type = "text";
        toDoInfo.classList.add("form-control");
        toDoInfo.value = input_Text.value;
        toDoInfo.disabled = true;

        let buttonEdit = document.createElement("button");
        buttonEdit.classList.add("btn", "btn-primary");
        buttonEdit.id = "btnEdit";
        buttonEdit.type = "button";
        buttonEdit.textContent = "Edit";

        buttonEdit.addEventListener('click', function() {
            toDoInfo.disabled = false; 
            toDoInfo.focus(); 
        });

        let buttonSave = document.createElement("button");
        buttonSave.classList.add("btn", "btn-success");
        buttonSave.id = "btnSave";
        buttonSave.type = "button";
        buttonSave.textContent = "Save";
        buttonSave.style.display = 'none';
//---------------------------------------------------------
        //建立監聽事件去判斷是否是編輯狀態
        buttonEdit.addEventListener('click', function() {
            toDoInfo.disabled = false; 
            toDoInfo.focus();
            buttonEdit.style.display = 'none'; 
            buttonSave.style.display = 'block'; 
        });

        buttonSave.addEventListener('click', function() {
            toDoInfo.disabled = true;
            buttonEdit.style.display = 'block'; 
            buttonSave.style.display = 'none'; 
        });
//----------------------------------------------------------
        let buttonDelete = document.createElement("button");
        buttonDelete.classList.add("btn", "btn-danger");
        buttonDelete.type = "button";
        buttonDelete.id = "btnDelete";
        buttonDelete.textContent = "Delete";

        li.appendChild(inputGroup);
        inputGroup.appendChild(div)
        div.appendChild(inputCheckbox);
        inputGroup.appendChild(key_input);
        inputGroup.appendChild(toDoInfo);
        inputGroup.appendChild(buttonEdit);
        inputGroup.appendChild(buttonSave);
        inputGroup.appendChild(buttonDelete);
        


        ul.appendChild(li);

        buttonDelete.addEventListener('click', function() {
            ul.removeChild(li);
        });
    }
    input_Text.value="";
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