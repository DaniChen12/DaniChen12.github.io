$(document).ready(function () {
    //1.取得城市資料
    //2.渲染第一層下拉選單(#city_select)
    //3.註冊(#city_select) change事件 => 切換city的時候，改變area選單(#area_select)內容
    $.ajax({
        url: "https://raw.githubusercontent.com/apprunner/FileStorage/master/TaiwanAddress_Simple.json",
        dataType: "JSON",
    }).done((cityData) => {
        // console.log(cityData);
        //<option value="">選擇縣市</option>
        cityData.forEach((item) => {
            const option = $(
                `<option value=${item.City}>${item.City}</option>`
            );
            $("#city_select").append(option);
        });

        $("#city_select").on("change", function (e) {
            $("#area_select").empty();
            //$("#area_select").detach();
            const citySelectVal = e.target.value;
            console.log(citySelectVal);
            if (citySelectVal === "") {
                $("#area_select").html('<option value="">請先選擇縣市</option>');
                return;
            }

            const theAreaData = cityData.find(
                (item) => item.City === citySelectVal
            ).Districts;
            // console.log(theAreaData);

            theAreaData.forEach((item) => {
                //<option value="">請先選擇縣市</option>
                const option = `<option value=${item.District}>${item.District}</option>`;
                $("#area_select").append(option);
            });

            $("#area_select").on('change', function (e) {
                selectedArea = e.target.value;
                getYouBikeData(citySelectVal, 'area');
            });

            getYouBikeData(citySelectVal, 'city');

        });
    });

    //設定marker(現在位置)

});

let selectedArea = "中山區";

function getYouBikeData(cityName, ta) {
    const url = youBikeDataSet[cityName];
    console.log('cityName', cityName);
    console.log('url', youBikeDataSet[cityName]);
    console.log('taget', ta)
    $.getJSON(url)
        .done((data) => {
            //console.log(data);
            //渲染表格資料
            renderingTable(data);
        })
        .fail((err) => {
            console.log(err);
            //TODO: 取不到youBike資料錯誤流程
            alert("找不到youBike資料");
        });
}

function renderingTable(touBikeDataArr) {
    //[{
    //     "sno": "500101001",
    //     "sna": "YouBike2.0_捷運科技大樓站",
    //     "tot": 28,
    //     "sbi": 19,
    //     "sarea": "大安區",
    //     "mday": "2024-01-16 18:02:49",
    //     "lat": 25.02605,
    //     "lng": 121.5436,
    //     "ar": "復興南路二段235號前",
    //     "sareaen": "Daan Dist.",
    //     "snaen": "YouBike2.0_MRT Technology Bldg. Sta.",
    //     "aren": "No.235， Sec. 2， Fuxing S. Rd.",
    //     "bemp": 9,
    //     "act": "1",
    //     "srcUpdateTime": "2024-01-16 18:05:26",
    //     "updateTime": "2024-01-16 18:05:43",
    //     "infoTime": "2024-01-16 18:02:49",
    //     "infoDate": "2024-01-16"
    // },]
    // sno(站點代號)、sna(場站中文名稱)、tot(場站總停車格)、sbi(場站目前車輛數量)、sarea(場站區域)、mday(資料更新時間)、lat(緯度)、lng(經度)、ar(地點)、sareaen(場站區域英文)、snaen(場站名稱英文)、aren(地址英文)、bemp(空位數量)、act(全站禁用狀態)、srcUpdateTime(YouBike2.0系統發布資料更新的時間)、updateTime(大數據平台經過處理後將資料存入DB的時間)、infoTime(各場站來源資料更新時間)、infoDate(各場站來源資料更新時間)
    //  <tr>
    //   <td></td>
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //         <td><i class="fa-solid fa-map-location-dot"></i></td>
    //         <td><i class="fa-solid fa-circle-info"></i></td>
    //       </tr>
    let a = console.log;
    touBikeDataArr = touBikeDataArr.filter((item) => item.sarea == selectedArea);


    $("#my_table").find("tbody").empty();
    touBikeDataArr.forEach((station) => {
        const tr = $("<tr></tr>")
            .append(`<td>${station.sarea}</td>`)
            .append(`<td>${station.sna}</td>`)
            .append(
                `<td>${station.sbi} / ${station.bemp} / ${station.tot}</td>`
            )
            .append(`<td><i class="fa-solid fa-map-location-dot"></i></td>`)
            .append(`<td><i class="fa-solid fa-circle-info"></i></td>`);
        $("#my_table").find("tbody").append(tr);
        //TODO: 新增click事件(地圖的地方，點了的時候，移動到地圖位置)
    });

    setMarker(touBikeDataArr);
    //TODO: 設定marker
}

function setMarker(touBikeDataArr) {
    if (markers) {
        markers.clearLayers();
    }
    //const marker = L.marker([25.042074, 121.536555], { title: "現在位置" });
    /*marker.bindPopup(
        `你看到我了！`
    );
    markers.addLayer(marker);
    */

    touBikeDataArr.forEach((station) => {
        const tr = $("<tr></tr>")
        const marker = L.marker([station.lat, station.lng], { title: "現在位置" });
        marker.bindPopup(
            station.sna
        );
        markers.addLayer(marker);
    });

    map.addLayer(markers);
}