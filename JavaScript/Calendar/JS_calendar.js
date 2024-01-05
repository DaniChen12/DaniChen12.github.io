// --------------------DOM的家園-------------------------
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const btnPlus = document.getElementById("plus");
const month = document.getElementById("month");
const year = document.getElementById("year");
const today = document.getElementsByClassName("today");


// --------------------產生日期函式-----------------------
// 取得當前的年份和月份
let now = new Date();
let currentYear = now.getFullYear();
let currentMonth = now.getMonth();

function generateCalendar(year, month) {
    // 取得指定年份和月份的第一天是星期幾
    let startingDay = new Date(year, month, 1).getDay();

    // 取得指定年份和月份的最後一天的日期
    let endingDate = new Date(year, month + 1, 0).getDate();
    //獲取上個月的最後一天的日期，以便在日曆中呈現上個月的尾數日期
    let prevMonthEndingDate = new Date(year, month, 0).getDate();

    let calendar = '';
    let day = 1;
    for (let i = 0; i < 6; i++) {
        calendar += '<tr>'; // 開始一個新的行
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startingDay) {
                // 如果是第一行的話，並且 j 小於指定月份的第一天是星期幾的話
                // 將顯示上個月的一些日期（以灰色呈現）
                calendar += '<td style="color: #999;">' + (prevMonthEndingDate - startingDay + j + 1) + '</td>';
            } else if (day > endingDate) {
                // 如果當前日期已經大於本月的最後一天的日期，我們將顯示下個月的一些日期（以灰色呈現）
                calendar += '<td style="color: #999;">' + (day - endingDate) + '</td>';
                day++;
            } else {
                // 否則，我們顯示本月的日期
                calendar += '<td>' + day + '</td>';
                day++;
            }
        }
        calendar += '</tr>';
    }
    // 將日曆添加到頁面中
    document.getElementById('days').innerHTML = calendar;
}

// 生成當前年份和月份的日曆
generateCalendar(currentYear, currentMonth);
month.textContent=(currentMonth + 1) + "月";
year.textContent=currentYear;


// --------------------上個月與下個月切換-----------------
function previousMonth() {
    currentMonth--;  // 減少一個月
    if (currentMonth < 0) {
        currentMonth = 11;  // 如果月份小於 0，則設為 11（12 月）
        currentYear--;  // 同時減少一年
    }
    generateCalendar(currentYear, currentMonth);
    // 更新顯示當前的年份和月份
    month.textContent = (currentMonth + 1) + "月";
    year.textContent = (currentYear );
    highlightToday();

}
btnPrev.addEventListener("click", previousMonth);

function nextMonth() {
    currentMonth++;  // 增加一個月
    if (currentMonth > 11) {
        currentMonth = 0;  // 如果月份大於 11，則設為 0（1 月）
        currentYear++;  // 同時增加一年
    }
    generateCalendar(currentYear, currentMonth);
    month.textContent = (currentMonth + 1) + "月";
    year.textContent = (currentYear);
    highlightToday();
}
btnNext.addEventListener("click",nextMonth);


// --------------------當天日期-----------------


function highlightToday() {
    let currentDay = now.getDate();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();

    let table = document.getElementById('calendarTable');
    let rows = table.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
            let cellText = cells[j].textContent;
            // 檢查單元格文本不是空的，且不是來自上個或下個月的（灰色的）
            if (cellText && cells[j].style.color !== 'rgb(153, 153, 153)') {
                let cellDay = parseInt(cellText);
               // 檢查單元格是否表示今天的日期
                if (cellDay === currentDay && currentYear === now.getFullYear() && currentMonth === now.getMonth()) {
                    cells[j].classList.add('today');
                    cells[j].style.backgroundColor = "#9CEFFF"; // 突出顯示今天的日期
                }
            }
        }
    }
}
// 生成日曆然後突出顯示今天
generateCalendar(currentYear, currentMonth);
highlightToday();
