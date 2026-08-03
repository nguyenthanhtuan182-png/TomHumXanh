// ===============================
// TÔM HÙM XANH AI
// script.js
// ===============================

let riskHistory = [];
let dataHistory = [];
let chart = null;

// ===============================
// DỮ LIỆU HIỆN TẠI
// ===============================

let nhietDo = 0;
let doDuc = 0;
let doMan = 0;
let risk = 0;

// ===============================
// DỮ LIỆU NHẬN TỪ FIREBASE
// ===============================

window.nhietDo = 0;
window.turbidity = 0;
window.tds = 0;

// ===============================
// KHỞI TẠO
// ===============================

window.onload = function () {

    showPage("home");

    const ctx = document.getElementById("myChart");

    chart = new Chart(ctx, {

        type: "line",

        data: {

            labels: [],

            datasets: [{

                label: "Chỉ số rủi ro",

                data: [],

                borderColor: "#0077cc",

                backgroundColor: "rgba(0,119,204,0.15)",

                borderWidth: 3,

                fill: true,

                tension: 0.3,

                pointRadius: 4

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: true,

            scales: {

                y: {

                    min: 0,

                    max: 100

                }

            }

        }

    });

};

// ===============================
// CHUYỂN TRANG
// ===============================

function showPage(page) {

    document.getElementById("homePage").style.display = "none";
    document.getElementById("aboutPage").style.display = "none";
    document.getElementById("mapPage").style.display = "none";
    document.getElementById("dataPage").style.display = "none";

    switch (page) {

        case "home":
            document.getElementById("homePage").style.display = "block";
            break;

        case "about":
            document.getElementById("aboutPage").style.display = "block";
            break;

        case "map":
            document.getElementById("mapPage").style.display = "block";
            break;

        case "data":
            document.getElementById("dataPage").style.display = "block";
            break;

    }

}

// ===============================
// CẬP NHẬT DỮ LIỆU
// ===============================

function capNhatDuLieu() {

    nhietDo = Number(window.nhietDo || 0);

    doDuc = Number(window.turbidity || 0);

    if (doDuc < 0) doDuc = 0;
    if (doDuc > 1000) doDuc = 1000;

    doMan = Number(window.tds || 32);

    if (doMan <= 0) {

        doMan = 32;

    }

    document.getElementById("nhietdo").innerHTML =
        nhietDo.toFixed(1) + "°C";

    document.getElementById("doduc").innerHTML =
        doDuc + " NTU";

    document.getElementById("doman").innerHTML =
        doMan.toFixed(1) + "‰";

    // =========================
// NHẬN RISK TỪ ESP32
// =========================

risk = Number(window.risk || 0);

    document.getElementById("risk").innerHTML = risk;

    updatePointer("tempPointer", nhietDo, 20, 40);
    updatePointer("turbidityPointer", doDuc, 0, 1000);
    updatePointer("salinityPointer", doMan, 20, 40);
    updatePointer("riskPointer", risk, 0, 100);

}
// ===============================
// PHÂN TÍCH MÔI TRƯỜNG
// ===============================

function phanTich() {

    // Luôn lấy dữ liệu mới nhất

    capNhatDuLieu();

    let nguyenNhan = [];

    let khuyenNghi = [];

    // =========================
// NHIỆT ĐỘ
// =========================

if (nhietDo < 26) {

    nguyenNhan.push(
        "Nhiệt độ nước thấp hơn ngưỡng tối ưu."
    );

}
else if (nhietDo > 34) {

    nguyenNhan.push(
        "Nhiệt độ nước ở mức rất cao."
    );

}
else if (nhietDo > 32) {

    nguyenNhan.push(
        "Nhiệt độ nước đang cao hơn mức tối ưu."
    );

}
else if (nhietDo > 30) {

    nguyenNhan.push(
        "Nhiệt độ nước có xu hướng tăng."
    );

}
  // =========================
// ĐỘ ĐỤC
// =========================

if (doDuc > 750) {

    nguyenNhan.push(
        "Độ đục ở mức rất cao."
    );

}
else if (doDuc > 500) {

    nguyenNhan.push(
        "Độ đục cao, môi trường nước đang suy giảm."
    );

}
else if (doDuc > 250) {

    nguyenNhan.push(
        "Độ đục tăng, cần theo dõi."
    );

}
   // =========================
// ĐỘ MẶN
// =========================

if (doMan < 24) {

    nguyenNhan.push(
        "Độ mặn rất thấp."
    );

}
else if (doMan < 28) {

    nguyenNhan.push(
        "Độ mặn thấp hơn mức tối ưu."
    );

}
else if (doMan > 35) {

    nguyenNhan.push(
        "Độ mặn cao hơn mức tối ưu."
    );

}
    // =========================
    // THÊM NGUYÊN NHÂN
    // =========================

    const nguyenNhanBoSung = [

        "Ảnh hưởng nước lũ",
        "Nguy cơ nước bạc",
        "Rong tảo phát triển mạnh",
        "Thức ăn dư thừa tích tụ",
        "Bùn đáy tích tụ",
        "Xuất hiện khí độc tầng đáy",
        "Nắng nóng kéo dài",
        "Mưa lớn liên tục",
        "Thủy triều bất thường",
        "Thiếu lưu thông nước",
        "Ô nhiễm hữu cơ cục bộ",
        "Chất lượng nước suy giảm",
        "Nguy cơ thiếu oxy hòa tan"

    ];

    if (Math.random() > 0.3) {

        nguyenNhan.push(

            nguyenNhanBoSung[
                Math.floor(
                    Math.random() *
                    nguyenNhanBoSung.length
                )
            ]

        );

    }

    // =========================
    // LƯU LỊCH SỬ
    // =========================

    riskHistory.push(risk);

    dataHistory.push({

        nhietDo,
        doDuc,
        doMan,
        risk

    });

    if (riskHistory.length > 20)
        riskHistory.shift();

    if (dataHistory.length > 20)
        dataHistory.shift();

    chart.data.labels =

        riskHistory.map(

            (item, index) => index + 1

        );

    chart.data.datasets[0].data =

        riskHistory;

    chart.update();

    capNhatBang();

    // =========================
    // PHÂN LOẠI
    // =========================

    let ketQua = "";

    if (risk <= 50) {

    ketQua = "🟢 BÌNH THƯỜNG";

    document.getElementById("den").style.background = "limegreen";

    document.getElementById("textTrangThai").innerHTML =
        "BÌNH THƯỜNG";

}
else if (risk < 70) {

    ketQua = "🟡 CẢNH BÁO";

    document.getElementById("den").style.background = "gold";

    document.getElementById("textTrangThai").innerHTML =
        "CẢNH BÁO";

}
else {

    ketQua = "🔴 NGUY HIỂM";

    document.getElementById("den").style.background = "red";

    document.getElementById("textTrangThai").innerHTML =
        "NGUY HIỂM";

}
// =========================
// KHUYẾN NGHỊ AI
// =========================

let dsKhuyenNghi = [];

if (risk <= 50) {

    dsKhuyenNghi = [

        "Môi trường đang ở mức an toàn.",
        "Tiếp tục duy trì chế độ chăm sóc hiện tại.",
        "Cho ăn theo khẩu phần bình thường.",
        "Theo dõi các chỉ số môi trường định kỳ."

    ];

}
else if (risk < 70) {

    dsKhuyenNghi = [

        "Giảm 10–20% lượng thức ăn.",
        "Kiểm tra chất lượng nước và vệ sinh lồng nuôi.",
        "Theo dõi diễn biến môi trường trong 2–3 giờ tới.",
        "Chuẩn bị phương án xử lý nếu chỉ số Risk tiếp tục tăng."

    ];

}
else {

    dsKhuyenNghi = [

        "Ngừng cho ăn tạm thời.",
        "Nâng lồng nuôi hoặc di chuyển đến vùng nước an toàn nếu cần.",
        "Tăng cường lưu thông nước và kiểm tra tầng đáy.",
        "Triển khai ngay các biện pháp xử lý môi trường."

    ];

}

khuyenNghi = dsKhuyenNghi;
// =========================
// DỰ BÁO
// =========================

let duBao = "";

if (risk <= 50) {

    duBao =
        "Môi trường đang ổn định, các chỉ số dự kiến tiếp tục duy trì trong ngưỡng an toàn nếu điều kiện thời tiết không có biến động lớn.";

}
else if (risk < 70) {

    duBao =
        "Một hoặc nhiều chỉ số môi trường đang có xu hướng bất lợi. Nếu không được theo dõi và xử lý kịp thời, chỉ số Risk có thể tiếp tục tăng trong thời gian tới.";

}
else {

    duBao =
        "Nguy cơ môi trường tiếp tục xấu đi ở mức cao. Nếu không triển khai biện pháp xử lý ngay, tôm hùm có thể bị sốc môi trường, giảm bắt mồi và tăng nguy cơ phát sinh dịch bệnh.";

}

document.getElementById("dubao").innerHTML =
    duBao;
// =========================
// HIỂN THỊ KẾT QUẢ
// =========================

document.getElementById("ketqua").innerHTML =
    ketQua;

document.getElementById("nguyennhan").innerHTML =
    nguyenNhan.join("<br>");

document.getElementById("khuyennghi").innerHTML =
    khuyenNghi.join("<br>");

}
//=====================================
// Cập nhật vị trí con trỏ Gauge
//=====================================

function updatePointer(id, value, min, max) {

    const pointer = document.getElementById(id);

    if (!pointer) return;

    let percent =

        (value - min) /

        (max - min) * 100;

    percent =

        Math.max(
            0,
            Math.min(100, percent)
        );

    pointer.style.left =
        percent + "%";

}

// ===============================
// CẬP NHẬT BẢNG DỮ LIỆU
// ===============================

function capNhatBang() {

    const table =
        document.getElementById("tableData");

    table.innerHTML = "";

    dataHistory.forEach((item, index) => {

        let row = table.insertRow();

        row.insertCell(0).innerHTML =
            index + 1;

        row.insertCell(1).innerHTML =
            item.nhietDo.toFixed(1) + "°C";

        row.insertCell(2).innerHTML =
            item.doDuc + " NTU";

        row.insertCell(3).innerHTML =
            Number(item.doMan).toFixed(1) + "‰";

        row.insertCell(4).innerHTML =
            item.risk;

    });

}
