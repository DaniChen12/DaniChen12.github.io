// ----------------------------DOM的家園--------------------------------------------
// 建立Start按鈕
const startBtn = document.querySelector('button:nth-of-type(1)');
console.log(startBtn)
// 建立Restart按鈕
const restartBtn = document.querySelector('button:nth-of-type(2)');
console.log(restartBtn)
// 建立Answer按鈕
const answerBtn = document.querySelector('button:nth-of-type(3)');
console.log(answerBtn)
//建立enter按鈕
const enterBtn = document.getElementById('enter')
console.log(enterBtn)
//輸入框元素
const input = document.querySelector('input');
console.log(input)
//選取OL元素
const ol = document.getElementById('list')

// ----------------------------亂碼的含式=>--------------------------------------------

let answer;
function randomUniqueNum(range, outputCount) {
    // 創建一個空陣列來存放範圍內的所有數字。
    let arr = []

    //建立一個迴圈，數字初始是0，每一回圈增加1
    for (let i = 0; i <= range; i++) {
        arr.push(i)
    }
    // 創建一個空陣列來存放最終的結果。
    let result = []
    // 開始一個迴圈，這個迴圈將選擇指定數量的隨機且唯一的數字。
    for (let i = 0; i < outputCount; i++) {
        const random = Math.floor(Math.random() * arr.length);
        //將選擇的隨機數添加到結果陣列中。
        result.push(arr[random])
        //answer.concat(arr[random]);
        //splice 方法來移除已經選擇的數字，以確保不會選到重複的數字。
        arr.splice(random, 1);

    }
    // 返回包含指定數量隨機且唯一的數字的結果陣列
    return result;
    //answer = result;
    //console.log(answer);
}


// function getRandomNumber(){
//     answer = randomUniqueNum(9, 4);
//     console.log(answer);
// }

//const uniqueNumbers = randomUniqueNum(9, 4);
//console.log(uniqueNumbers);

// ----------------------------按下開始鍵後=>--------------------------------------------

startBtn.addEventListener('click', () => {
    answer = randomUniqueNum(9, 4);
    //randomUniqueNum(9, 4);
    console.log(answer);

    //document.getElementById("answerBtn").disabled = false;
    startBtn.disabled = true;
    answerBtn.disabled = false;
    enterBtn.disabled = false;
})
// console.dir(startBtn);


// ----------------------------按下重置鍵後=>--------------------------------------------
restartBtn.addEventListener('click', () => {
    location.reload()
})

// ----------------------------按下Answer鍵後=>--------------------------------------------
answerBtn.addEventListener('click', () => {
    alert(`答案是:${answer}`)
})

// ----------------------------按下輸入鍵後=>--------------------------------------------
enterBtn.disabled = true;
enterBtn.addEventListener('click', () => {
    if (input.value.length != 4) {
        alert(`請輸入四個數字`)
        return
    }
    gameRules();
    createList();



})

// ----------------------------新的DOM元素函式=>--------------------------------------------
let aCount = 0
let bCount = 0
function createList() {

    let li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('d-flex');
    li.classList.add('align-items-center');

    if (aCount != 4) {
        li.classList.add('border-danger');
    }
    else {
        li.classList.add('border-primary');
    }
    // ol.appendChild(li);
    let span = document.createElement('span');
    span.classList.add('badge');
    if (aCount == 4) {
        span.classList.add('bg-success');
    }
    else{
      span.classList.add('bg-danger');  
    }
    
    span.classList.add('px-3');
    span.textContent = (`${aCount}A${bCount}B`);
    let div = document.createElement(`div`);
    div.classList.add('ms-2');
    div.classList.add('me-auto');
    if (aCount != 4) {
        div.classList.add('text-danger')
    }
    else {
        div.classList.add('text-primary')
    }

    div.textContent = (`${input.value}`);
    li.appendChild(span);
    li.appendChild(div);


    console.log(ol);
    ol.appendChild(li);
    input.value = '';
    aCount=bCount=0;
}

// ----------------------------判斷數字函式=>--------------------------------------------

function gameRules() {
    let inputArr = input.value.split('');
    /*
    1.使用map方法對inputArr中的每個元素應用一個函數。
    2.這個函數(x)=>parseInt(x)是一個箭頭函數，它的作用是將字串轉換為整數。parseInt是JavaScript中的內建函數，用於將字串轉換為整數。
    3.map方法處理完每個元素後，返回一個新的包含整數的陣列。
    */
    inputArr = inputArr.map((x)=>parseInt(x));
    console.log(inputArr)
    for (let i =0 ;i<4;i++){
        console.log(inputArr.includes(answer[i])+':'+answer[i])
        if (inputArr[i] == answer[i]) {
            aCount++;
        }
        else if (answer.includes(inputArr[i])) {
            
            bCount++;
        }
        if (aCount == 4){
            alert('恭喜過關!')
        }
    }

}
