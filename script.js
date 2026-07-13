// ===============================
// TÔM HÙM XANH AI
// script.js
// ===============================

let riskHistory = [];
let dataHistory = [];
let chart = null;

// ===============================
// Khởi tạo
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
// Chuyển trang
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
// PHÂN TÍCH AI
// ===============================

function phanTich() {

    // =========================
    // DỮ LIỆU GIẢ LẬP THỰC TẾ HƠN
    // =========================

    let nhietDo =
        (24 + Math.random() * 12).toFixed(1);

    let doDuc =
        Math.floor(Math.random() * 120);

    let doMan =
        (18 + Math.random() * 18).toFixed(1);

    document.getElementById("nhietdo").innerHTML =
        nhietDo + "°C";

    document.getElementById("doduc").innerHTML =
        doDuc + " NTU";

    document.getElementById("doman").innerHTML =
        doMan + "‰";

    // =========================
    // AI PHÂN TÍCH
    // =========================

    let diemNhietDo = 100;
    let diemDoDuc = 100;
    let diemDoMan = 100;

    let nguyenNhan = [];

    // -------- NHIỆT ĐỘ --------

    if (nhietDo > 34) {

        diemNhietDo = 10;

        nguyenNhan.push(
            "Nhiệt độ nước vượt ngưỡng an toàn"
        );

    } else if (nhietDo > 32) {

        diemNhietDo = 30;

        nguyenNhan.push(
            "Nhiệt độ nước đang ở mức rất cao"
        );

    } else if (nhietDo > 30) {

        diemNhietDo = 70;

        nguyenNhan.push(
            "Nhiệt độ nước đang tăng"
        );

    }

    // -------- ĐỘ ĐỤC --------

    if (doDuc > 100) {

        diemDoDuc = 10;

        nguyenNhan.push(
            "Độ đục vượt ngưỡng nghiêm trọng"
        );

    } else if (doDuc > 80) {

        diemDoDuc = 30;

        nguyenNhan.push(
            "Độ đục rất cao"
        );

    } else if (doDuc > 50) {

        diemDoDuc = 70;

        nguyenNhan.push(
            "Độ đục đang ở mức cảnh báo"
        );

    }

    // -------- ĐỘ MẶN --------

    if (doMan < 22) {

        diemDoMan = 10;

        nguyenNhan.push(
            "Độ mặn giảm mạnh"
        );

    } else if (doMan < 25) {

        diemDoMan = 30;

        nguyenNhan.push(
            "Độ mặn thấp"
        );

    } else if (doMan < 28) {

        diemDoMan = 70;

        nguyenNhan.push(
            "Độ mặn có xu hướng giảm"
        );

    }

    // =========================
    // THÊM NGUYÊN NHÂN NGẪU NHIÊN
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
    // AI RISK INDEX
    // =========================

    let risk = Math.round(

        0.4 * diemNhietDo +

        0.3 * diemDoDuc +

        0.3 * diemDoMan

    );

    document.getElementById("risk").innerHTML =
        risk;

    document.getElementById("thanhRisk").style.width =
        risk + "%";

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
    // PHÂN LOẠI MỨC ĐỘ
    // =========================

    let ketQua = "";
    let khuyenNghi = "";

    if (risk >= 90) {

        ketQua = "🟢 RẤT TỐT";

        document.getElementById("den").style.background =
            "limegreen";

        document.getElementById("textTrangThai").innerHTML =
            "RẤT TỐT";

        document.getElementById("thanhRisk").style.background =
            "limegreen";

    }
    else if (risk >= 80) {

        ketQua = "🟢 AN TOÀN";

        document.getElementById("den").style.background =
            "green";

        document.getElementById("textTrangThai").innerHTML =
            "AN TOÀN";

        document.getElementById("thanhRisk").style.background =
            "green";

    }
    else if (risk >= 70) {

        ketQua = "🟡 THEO DÕI";

        document.getElementById("den").style.background =
            "gold";

        document.getElementById("textTrangThai").innerHTML =
            "THEO DÕI";

        document.getElementById("thanhRisk").style.background =
            "gold";

    }
    else if (risk >= 50) {

        ketQua = "🟠 CẢNH BÁO";

        document.getElementById("den").style.background =
            "orange";

        document.getElementById("textTrangThai").innerHTML =
            "CẢNH BÁO";

        document.getElementById("thanhRisk").style.background =
            "orange";

    }
    else {

        ketQua = "🔴 NGUY HIỂM";

        document.getElementById("den").style.background =
            "red";

        document.getElementById("textTrangThai").innerHTML =
            "NGUY HIỂM";

        document.getElementById("thanhRisk").style.background =
            "red";

    }

    // =========================
    // KHUYẾN NGHỊ NGẪU NHIÊN
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

    let khuyenNghiDaChon = [];

    while (khuyenNghiDaChon.length < 4) {

        let item =
            dsKhuyenNghi[
                Math.floor(
                    Math.random() *
                    dsKhuyenNghi.length
                )
            ];

        if (!khuyenNghiDaChon.includes(item)) {

            khuyenNghiDaChon.push(item);

        }
    }

    khuyenNghi =
        "• " +
        khuyenNghiDaChon.join("<br>• ");

    // =========================
    // DỰ BÁO NGẪU NHIÊN
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

    document.getElementById("dubao").innerHTML =

        dsDuBao[
            Math.floor(
                Math.random() *
                dsDuBao.length
            )
        ];

    // =========================
    // HIỂN THỊ
    // =========================

    document.getElementById("nguyennhan").innerHTML =

        nguyenNhan.length === 0

            ? "Không phát hiện yếu tố rủi ro."

            : "• " +
            nguyenNhan.join("<br>• ");

    document.getElementById("ketqua").innerHTML =
        ketQua;

    document.getElementById("khuyennghi").innerHTML =
        khuyenNghi;

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
            item.nhietDo + "°C";

        row.insertCell(2).innerHTML =
            item.doDuc + " NTU";

        row.insertCell(3).innerHTML =
            item.doMan + "‰";

        row.insertCell(4).innerHTML =
            item.risk;

    });

}