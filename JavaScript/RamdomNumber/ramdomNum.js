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
EnterButton.addEventListener('click', function (e) {
    if((isNaN(inputValue.value) || inputValue.value > max || inputValue.value < min)){
        alert("拜託輸入數字，謝謝!");
    }
    
    else if ((inputValue.value == randomNumber)){
        alert("恭喜!!!恭喜過關!!不過沒有錢~~")
        location.reload()
    }
    else if((inputValue.value > randomNumber)){
        text.textContent=`請輸入'${min}'~'${inputValue.value}'之間的數字`
    }
    
    else{text.textContent=`請輸入'${inputValue.value}'~'${max}'之間的數字'`}
        
    })

// ----------------------------清除按鈕--------------------------------------------


// 設定清除按鈕的點擊事件監聽器
clearButton.addEventListener('click', function () {
    // 清空輸入框的值
    inputValue.value = '';
});