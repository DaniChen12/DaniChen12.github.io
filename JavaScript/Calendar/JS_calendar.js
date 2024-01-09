// --------------------DOM的家園-------------------------
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const month = document.getElementById("month");
const year = document.getElementById("year");
const today = document.getElementsByClassName("today");


// --------------------產生日期函式-----------------------
// 取得當前的年份和月份
let now = new Date();
let currentYear = now.getFullYear();
let currentMonth = now.getMonth();
let currentDay = now.getDate();

function generateCalendar(year, month) {
    var obj = {'2014-12-20':"aaaaa"}
    console.log("obj->2014-12-20:"+obj[2014+"-"+12+"-"+20]);
    // 取得指定年份和月份的第一天是星期幾
    let startingDay = new Date(year, month, 1).getDay();

    // 取得指定年份和月份的最後一天的日期
    let endingDate = new Date(year, month + 1, 0).getDate();
    //獲取上個月的最後一天的日期，以便在日曆中呈現上個月的尾數日期
    let prevMonthEndingDate = new Date(year, month, 0).getDate();

    let calendar = '';
    let day = 1;
    // for (let i = 0; i < 6; i++) {

    //取得日期資料需要幾Row
    let rowAmount = Math.ceil((endingDate+startingDay)/7); //console.log("rowAmount:"+rowAmount+" , endingDate:"+endingDate);
    for (let i = 0; i < rowAmount; i++) {
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
                calendar += '<td>' + day;
                let dateKey = currentYear + "-" + String(currentMonth + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
                let events = calendarData[dateKey];
                if (events) {
                    console.log("had data->" + dateKey + ":" + calendarData[dateKey]);
                    calendar += '<ul id="list" class="list-unstyled gap-2 d-flex flex-column  overflow-y-auto; ps-0">';
                    for (let k = 0; k < events.length; k++) {
                        let classStr = '"btn btn-primary event-list text-start text-truncate"';
                        let styleStr = '"--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem; "';
                        let evo = events[k]; //把資料暫時塞在Attribute中
                        calendar += '<li class=' + classStr + ' style=' + styleStr + ' key="' + k + '" desc="' + evo.desc + '" time="' + evo.time + '" date="' + dateKey + '" color="' + evo.color + '">' + evo.title + '</li>';
                    }

                    calendar += '</ul>';
                }
                calendar += '</td>';
                day++;
            }
        }
        calendar += '</tr>';
    }
    // 將日曆添加到頁面中
    document.getElementById('days').innerHTML = calendar;
    addListEvent();
}


month.textContent = (currentMonth + 1) + "月";
year.textContent = currentYear;


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
    year.textContent = (currentYear);
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
btnNext.addEventListener("click", nextMonth);


// --------------------當天日期-----------------


function highlightToday() {
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
                    cells[j].style.backgroundColor = "#FFECD2"; // 突出顯示今天的日期
                }
            }
        }
    }
}
initData();
// 生成當前年份和月份的日曆
generateCalendar(currentYear, currentMonth);
// 生成日曆然後突出顯示今天
highlightToday();
