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
        /*cityData.forEach((item) => {
            const option = $(
                `<option value=${item.City}>${item.City}</option>`
            );
            $("#city_select").append(option);
        });*/

        //直接顯示有資料的縣市，沒資料就不顯示了
        Object.keys(youBikeDataSet).forEach((item) => {
            const option = $(
                `<option value=${item}>${item}</option>`
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
            if (cityName === '高雄市') data = data.data.retVal;
            if (cityName === '桃園市') data = data.result.records;
            renderingTable(data);
        })
        .fail((err) => {
            console.log(err);
            //TODO: 取不到youBike資料錯誤流程
            alert("找不到youBike資料");
        });
}

function renderingTable(touBikeDataArr) {

    
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
function icon(){
    youBikeDataSet.forEach((obj) => {
    const tempRow = document.createElement("tr");

    appendTableCell(tempRow, obj.sarea);
    appendTableCell(tempRow, obj.sna);
    appendTableCell(tempRow, `${obj.sbi}/${obj.bemp}/${obj.tot}`);
    //地圖按鈕(font awesome)
    const mapIcon = document.createElement("td");
    mapIcon.setAttribute("role", "button");
    mapIcon.innerHTML = '<i class="fa-solid fa-map-location-dot"></i>';
    mapIcon.addEventListener("click", () => {
        map.panTo([obj.lat, obj.lng], 15);
    });
    tempRow.append(mapIcon);
    //經緯度提示(font awesome)
    const infoIcon = document.createElement("td");
    infoIcon.setAttribute("role", "button");
    infoIcon.setAttribute("data-bs-toggle", "tooltip");
    infoIcon.setAttribute("data-bs-title", `${obj.lat} / ${obj.lng}`);
    infoIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    tempRow.append(infoIcon);

    tBody.appendChild(tempRow);
});
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
        const mapIcon = $(`<td><i class="fa-solid fa-map-location-dot"></i></td>`);
        mapIcon.css("cursor", "pointer");
        mapIcon.on("click", function (e) {
            map.flyTo([station.lat, station.lng], { title: "現在位置" }, 1);
        });

        const tr = $("<tr></tr>")
            .append(`<td>${station.sarea}</td>`)
            .append(`<td>${station.sna}</td>`)
            .append(
                `<td>${station.sbi} / ${station.bemp} / ${station.tot}</td>`
            )
            .append(mapIcon)
            .append(`<td><i class="fa-solid fa-circle-info"></i></td>`);
        $("#my_table").find("tbody").append(tr);
        const marker = L.marker([station.lat, station.lng], { title: station.sna });
        marker.bindPopup(`
        <p>${station.sna}</p>
        <ul>
        <li>可租借數量:${station.sbi} </li>
            <li>剩餘空位:${station.bemp}</li>
            </ul>
            `);
        markers.addLayer(marker);
    });

    map.addLayer(markers);
    map.flyTo([touBikeDataArr[0].lat, touBikeDataArr[0].lng], 15);

}