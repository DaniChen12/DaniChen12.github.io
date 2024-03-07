const displayConfirmWrap = document.querySelector('.confirm-wrap');
const $btnConfirm = document.querySelector('.action-bar :nth-child(3)');
const $btnRwdConfirm = document.querySelector('.rwd-fixed-btns :nth-child(2)');
$btnConfirm.addEventListener('click', btnConfirmOnClicked);
$btnRwdConfirm.addEventListener('click', btnConfirmOnClicked);
function btnConfirmOnClicked() {
    displayConfirmWrap.style.display = (displayConfirmWrap.style.display === 'none') ? '' : 'none';
}