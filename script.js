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

            datasets: [

                {

                    label: "Chỉ số rủi ro",

                    data: [],

                    borderColor: "#0077cc",

                    backgroundColor: "rgba(0,119,204,0.15)",

                    borderWidth: 3,

                    fill: true,

                    tension: 0.3,

                    pointRadius: 4

                }

            ]

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
function capNhatDuLieu() {

    // =========================
    // ĐỌC DỮ LIỆU FIREBASE
    // =========================

    nhietDo = Number(window.nhietDo || 0);

    doDuc = Number(window.turbidity || 0);

    if (doDuc < 0) doDuc = 0;
    if (doDuc > 1000) doDuc = 1000;

    doMan = Number(window.tds || 32);

// Nếu chưa có cảm biến độ mặn
// hoặc Firebase chưa gửi dữ liệu
// thì dùng giá trị chuẩn giả lập

if (doMan <= 0) {

    doMan = 32;

}

    // =========================
    // HIỂN THỊ CHỈ SỐ
    // =========================

    document.getElementById("nhietdo").innerHTML =
        nhietDo.toFixed(1) + "°C";

    document.getElementById("doduc").innerHTML =
        doDuc + " NTU";

    document.getElementById("doman").innerHTML =
        doMan.toFixed(1) + "‰";

    // =========================
    // TÍNH RISK INDEX
    // =========================

    let diemNhietDo = 100;

    if (nhietDo > 34)
        diemNhietDo = 10;
    else if (nhietDo > 32)
        diemNhietDo = 30;
    else if (nhietDo > 30)
        diemNhietDo = 70;

    let diemDoDuc = 100;

    if (doDuc >= 800)
        diemDoDuc = 10;
    else if (doDuc >= 600)
        diemDoDuc = 30;
    else if (doDuc >= 400)
        diemDoDuc = 50;
    else if (doDuc >= 200)
        diemDoDuc = 70;

    let diemDoMan = 100;

    if (doMan < 22)
        diemDoMan = 10;
    else if (doMan < 25)
        diemDoMan = 30;
    else if (doMan < 28)
        diemDoMan = 70;

   let riskRaw = Math.round(

    diemNhietDo * 0.4 +

    diemDoDuc * 0.3 +

    diemDoMan * 0.3

);

// Đảo chiều Risk:
// 0 = An toàn
// 100 = Nguy hiểm

risk = 100 - riskRaw;
    document.getElementById("risk").innerHTML = risk;

    // =========================
    // CẬP NHẬT ĐỒNG HỒ
    // =========================

    updatePointer(
        "tempPointer",
        nhietDo,
        20,
        40
    );

    updatePointer(
        "turbidityPointer",
        doDuc,
        0,
        1000
    );

    updatePointer(
        "salinityPointer",
        doMan,
        20,
        40
    );

    updatePointer(
    "riskPointer",
    risk,
    0,
    100
);

updatePointer(
    "riskBarPointer",
    risk,
    0,
    100
);

document.getElementById("riskValueBar").innerHTML =
    risk;
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

    if (nhietDo > 34) {

        nguyenNhan.push(
            "Nhiệt độ nước vượt ngưỡng an toàn"
        );

    }
    else if (nhietDo > 32) {

        nguyenNhan.push(
            "Nhiệt độ nước đang ở mức rất cao"
        );

    }
    else if (nhietDo > 30) {

        nguyenNhan.push(
            "Nhiệt độ nước đang tăng"
        );

    }

    // =========================
// ĐỘ ĐỤC
// =========================

if (doDuc >= 800) {

    nguyenNhan.push(
        "Nước trong bất thường, nguy cơ môi trường tăng"
    );

}
else if (doDuc >= 600) {

    nguyenNhan.push(
        "Nước khá trong, cần theo dõi"
    );

}
else if (doDuc >= 400) {

    nguyenNhan.push(
        "Chất lượng nước ở mức trung bình"
    );

}
else if (doDuc >= 200) {

    nguyenNhan.push(
        "Nước đục, môi trường ổn định"
    );

}

    // =========================
    // ĐỘ MẶN
    // =========================

    if (doMan < 22) {

        nguyenNhan.push(
            "Độ mặn giảm mạnh"
        );

    }
    else if (doMan < 25) {

        nguyenNhan.push(
            "Độ mặn thấp"
        );

    }
    else if (doMan < 28) {

        nguyenNhan.push(
            "Độ mặn có xu hướng giảm"
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

if (risk <= 20) {

    ketQua = "🟢 RẤT TỐT";

    document.getElementById("den").style.background =
        "limegreen";

    document.getElementById("textTrangThai").innerHTML =
        "RẤT TỐT";

}
else if (risk <= 40) {

    ketQua = "🟢 AN TOÀN";

    document.getElementById("den").style.background =
        "green";

    document.getElementById("textTrangThai").innerHTML =
        "AN TOÀN";

}
else if (risk <= 65) {

    ketQua = "🟡 THEO DÕI";

    document.getElementById("den").style.background =
        "gold";

    document.getElementById("textTrangThai").innerHTML =
        "THEO DÕI";

}
else if (risk <= 82) {

    ketQua = "🟠 CẢNH BÁO";

    document.getElementById("den").style.background =
        "orange";

    document.getElementById("textTrangThai").innerHTML =
        "CẢNH BÁO";

}
else {

    ketQua = "🔴 NGUY HIỂM";

    document.getElementById("den").style.background =
        "red";

    document.getElementById("textTrangThai").innerHTML =
        "NGUY HIỂM";

}
        // =========================
    // KHUYẾN NGHỊ AI
    // =========================

    const dsKhuyenNghi = [

        "Nâng lồng nuôi khoảng 0,5 m",

        "Giảm 20% lượng thức ăn",

        "Kiểm tra nguồn nước",

        "Tăng cường lưu thông nước",

        "Theo dõi lại sau 3 giờ",

        "Theo dõi lại sau 6 giờ",

        "Kiểm tra tầng đáy",

        "Vệ sinh lồng nuôi",

        "Quan sát hoạt động bắt mồi",

        "Chuẩn bị phương án di chuyển lồng",

        "Kiểm tra hệ thống neo đậu"

    ];

    while (khuyenNghi.length < 4) {

        let item = dsKhuyenNghi[
            Math.floor(
                Math.random() *
                dsKhuyenNghi.length
            )
        ];

        if (!khuyenNghi.includes(item)) {

            khuyenNghi.push(item);

        }

    }

    // =========================
    // DỰ BÁO
    // =========================

    const dsDuBao = [

        "Môi trường có xu hướng ổn định.",

        "Nguy cơ độ đục tiếp tục tăng.",

        "Nguy cơ giảm độ mặn do mưa lớn.",

        "Điều kiện môi trường thuận lợi.",

        "Nguy cơ xuất hiện nước bạc.",

        "Nguy cơ bùng phát rong tảo.",

        "Nguy cơ thiếu oxy hòa tan.",

        "Chất lượng nước có dấu hiệu suy giảm.",

        "Nhiệt độ có xu hướng tăng.",

        "Môi trường đang cải thiện."

    ];

    document.getElementById("ketqua").innerHTML =
        ketQua;

    document.getElementById("khuyennghi").innerHTML =

        "• " +

        khuyenNghi.join("<br>• ");

    document.getElementById("nguyennhan").innerHTML =

        nguyenNhan.length === 0

        ? "Không phát hiện yếu tố rủi ro."

        : "• " +

        nguyenNhan.join("<br>• ");

    document.getElementById("dubao").innerHTML =

        dsDuBao[
            Math.floor(
                Math.random() *
                dsDuBao.length
            )
        ];

}
//=====================================
// Cập nhật vị trí con trỏ Gauge
//=====================================

function updatePointer(id, value, min, max) {

    const pointer = document.getElementById(id);

    if (!pointer) {
        console.error("Không tìm thấy:", id);
        return;
    }

    let percent = (value - min) / (max - min) * 100;

    percent = Math.max(0, Math.min(100, percent));

    pointer.style.left = percent + "%";

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