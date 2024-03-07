//切換行事曆按鈕
document.addEventListener('DOMContentLoaded', function () {
    // 取切换按钮
    var calendarButton = document.querySelector('.Calendar');

    // 添加事件監聽
    calendarButton.addEventListener('click', function (event) {
        event.preventDefault(); // 阻止跳轉連結

        // 選擇切換
        var blockToHide = document.getElementById('eventList');
        var calendarBlock = document.getElementById('calendar');

        // 切換區塊顯示狀態
        if (blockToHide.style.display !== 'none') {
            blockToHide.style.display = 'none';         // 隐藏近期活動區塊
            calendarBlock.style.display = 'block';      // 顯示日曆區塊
        } else {
            blockToHide.style.display = 'block';        // 顯示近期活動區塊
            calendarBlock.style.display = 'none';       // 隐藏日曆區塊
        }
    });
});


//套用FullCalendar
document.addEventListener('click', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();
});