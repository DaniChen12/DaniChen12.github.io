  // 亂碼產生
  let randomNumber = Math.floor(Math.random() * 100) + 1;

  const minguess = 1;
  const maxguess = 100;
  

  //  輸入數字
  // 獲取所有的按鈕元素
const buttons = document.querySelectorAll('.btnGroup');

// 獲取輸入框元素
const input = document.getElementById('guess-input');

// 為每個按鈕添加點擊事件監聽器
buttons.forEach(button => {
button.addEventListener('click', function() {
// 在輸入框中追加按鈕的值
input.value += this.value;
});


// 清除按鈕

// 獲取清除按鈕元素
const clearButton = document.querySelector('input[value="清除"]')
// 獲取輸入框元素
const input = document.getElementById('guess-input');
// 設定清除按鈕的點擊事件監聽器
clearButton.addEventListener('click',function(){
// 清空輸入框的值
input.value='';
});
});

// 獲取輸入框元素和提交按鈕元素
const EnterButton = document.querySelector('input[value="確認"]')
const resultNum = document.getElementById('result');
// 設定提交按鈕的點擊事件監聽器
submitButton.addEventListener('click', function() {
// 獲取輸入框中的數字
const guessedNumber = input.value;
// 將獲取的數字顯示在畫面上
resultNum.innerText = `您猜的數字是：${guessedNumber}`;
});
if (NaN) {
function notnumber() {
    alert("拜託輸入數字，謝謝!");
}

} 

else if(guessedNumber<randomNumber){
function less() {
    alert(`請猜猜${minguess}-${guessedNumber}之間的數字`);
}}
else if (guessedNumber>randomNumber){
function more() {
    alert(`請猜猜${maxguess}-${guessedNumber}之間的數字`);
}}
else if (guessedNumber=randomNumber) {
function winner() {
    alert("恭喜猜對");
}

}


  // const button = document.getElementById("buttons");
  // const info = document.querySelector("result");

  //   const btn = document.getElementById('#game-container');
  //   button.addEventListener("click", function() {
  //   let inputValue = input.value;
  //   console.log({inputValue});
  //   });
  


    // let inputValue = input.value;
    // console.log(inputValue);

    // info.innerText = inputValue;
