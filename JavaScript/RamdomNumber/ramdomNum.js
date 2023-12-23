// ----------------------------DOM的家園--------------------------------------------
// 所有的按鈕元素
const buttons = document.querySelectorAll('.btnGroup');
console.log(buttons)
// 確認按鈕元素
const EnterButton = document.querySelector('input[value="確認"]')
console.log(EnterButton)
//輸入框的數值內容
const inputValue = document.getElementById('guess-input');
console.dir(inputValue);
// 清除按鈕元素
const clearButton = document.querySelector('input[value="清除"]')
console.dir(clearButton);
// 字串顯示元素
const text = document.getElementById('result')
console.dir(text)


// ----------------------------亂碼產生--------------------------------------------
let min = 1;
let max = 100;
let randomNumber = Math.floor(Math.random() * max) + min;
console.log(randomNumber)

// ----------------------------輸入數字--------------------------------------------
buttons.forEach(button => {
    button.addEventListener('click', function () {
        // 在輸入框中追加按鈕的值
        inputValue.value += this.value;
    })
});

// ----------------------------點擊確認後的邏輯--------------------------------------------
// var steps = 0;
// var guesses = [];

EnterButton.addEventListener('click', function (e) {
    //var guess = Number(inputValue.value);

    // 無論猜測是否正確，都增加步驟計數並記錄猜測
    //steps++;
    //guesses.push(guess);
    // let temp = Number(inputValue.value);

    if((isNaN(inputValue.value) || inputValue.value > 100 || inputValue.value < 1)){
        alert("不識字?!請輸入範圍數字，謝謝!");
    }
    
    else if ((inputValue.value == randomNumber)){
        alert("恭喜!!!恭喜過關!!不過沒有錢~~")
        location.reload()
    }
    else if((inputValue.value > randomNumber)){
        max = Number(inputValue.value);
        text.textContent=`請輸入'${min}'~'${max}'之間的數字`
    }
    
    else{
        min = Number(inputValue.value);
        text.textContent=`請輸入'${min}'~'${max}'之間的數字'`
    }
        
    })

// ----------------------------清除按鈕--------------------------------------------


// 設定清除按鈕的點擊事件監聽器
clearButton.addEventListener('click', function () {
    // 清空輸入框的值
    inputValue.value = '';
});