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

    // -------------------------
    // Dữ liệu giả lập
    // -------------------------

    let nhietDo =
        Math.floor(Math.random() * 10) + 25;

    let doDuc =
        Math.floor(Math.random() * 100);

    let doMan =
        Math.floor(Math.random() * 15) + 20;

    // -------------------------
    // Hiển thị
    // -------------------------

    document.getElementById("nhietdo").innerHTML =
        nhietDo + "°C";

    document.getElementById("doduc").innerHTML =
        doDuc + " NTU";

    document.getElementById("doman").innerHTML =
        doMan + "‰";

    // =========================
    // AI RISK INDEX
    // =========================

    let diemNhietDo = 100;
    let diemDoDuc = 100;
    let diemDoMan = 100;

    let nguyenNhan = [];

    // -------------------------
    // Nhiệt độ
    // -------------------------

    if (nhietDo > 32) {

        diemNhietDo = 30;

        nguyenNhan.push(
            "Nhiệt độ vượt ngưỡng 32°C"
        );

    }
    else if (nhietDo > 30) {

        diemNhietDo = 70;

        nguyenNhan.push(
            "Nhiệt độ đang ở mức cảnh báo"
        );

    }

    // -------------------------
    // Độ đục
    // -------------------------

    if (doDuc > 80) {

        diemDoDuc = 20;

        nguyenNhan.push(
            "Độ đục vượt 80 NTU"
        );

    }
    else if (doDuc > 40) {

        diemDoDuc = 60;

        nguyenNhan.push(
            "Độ đục đang ở mức cảnh báo"
        );

    }

    // -------------------------
    // Độ mặn
    // -------------------------

    if (doMan < 24) {

        diemDoMan = 20;

        nguyenNhan.push(
            "Độ mặn thấp dưới 24‰"
        );

    }
    else if (doMan < 28) {

        diemDoMan = 60;

        nguyenNhan.push(
            "Độ mặn đang giảm"
        );

    }

    // -------------------------
    // Risk Index
    // -------------------------

    let risk = Math.round(

        0.4 * diemNhietDo +

        0.3 * diemDoDuc +

        0.3 * diemDoMan

    );

    // -------------------------
    // Hiển thị Risk
    // -------------------------

    document.getElementById("risk").innerHTML =
        risk;

    document.getElementById("thanhRisk").style.width =
        risk + "%";

    // =========================
    // LƯU LỊCH SỬ
    // =========================

    riskHistory.push(risk);

    dataHistory.push({

        nhietDo: nhietDo,

        doDuc: doDuc,

        doMan: doMan,

        risk: risk

    });

    if (riskHistory.length > 20)
        riskHistory.shift();

    if (dataHistory.length > 20)
        dataHistory.shift();

    // =========================
    // CẬP NHẬT BIỂU ĐỒ
    // =========================

    chart.data.labels =

        riskHistory.map(

            (item, index) => index + 1

        );

    chart.data.datasets[0].data =
        riskHistory;

    chart.update();

    // =========================
    // CẬP NHẬT BẢNG
    // =========================

    capNhatBang();

    // =========================
    // AI KẾT LUẬN
    // =========================

    let ketQua = "";
    let khuyenNghi = "";

    if (risk < 60) {

        ketQua = "🔴 NGUY HIỂM";

        document.getElementById("den").style.background =
            "red";

        document.getElementById("den").style.boxShadow =
            "0 0 25px red";

        document.getElementById("textTrangThai").innerHTML =
            "NGUY HIỂM";

        document.getElementById("thanhRisk").style.background =
            "red";

        khuyenNghi =

            "• Nâng lồng nuôi khoảng 0,5 m.<br>" +

            "• Giảm khoảng 20% lượng thức ăn.<br>" +

            "• Kiểm tra nguồn nước.<br>" +

            "• Theo dõi lại sau 6 giờ.";

    }

    else if (risk < 80) {

        ketQua = "🟡 CẢNH BÁO";

        document.getElementById("den").style.background =
            "gold";

        document.getElementById("den").style.boxShadow =
            "0 0 25px gold";

        document.getElementById("textTrangThai").innerHTML =
            "CẢNH BÁO";

        document.getElementById("thanhRisk").style.background =
            "gold";

        khuyenNghi =

            "• Theo dõi các thông số môi trường.<br>" +

            "• Kiểm tra nguồn nước.<br>" +

            "• Đo lại sau 3 giờ.";

    }

    else {

        ketQua = "🟢 AN TOÀN";

        document.getElementById("den").style.background =
            "limegreen";

        document.getElementById("den").style.boxShadow =
            "0 0 25px limegreen";

        document.getElementById("textTrangThai").innerHTML =
            "AN TOÀN";

        document.getElementById("thanhRisk").style.background =
            "limegreen";

        khuyenNghi =

            "• Môi trường ổn định.<br>" +

            "• Tiếp tục nuôi bình thường.<br>" +

            "• Theo dõi định kỳ.";

    }

    // =========================
    // HIỂN THỊ NGUYÊN NHÂN
    // =========================

    if (nguyenNhan.length === 0) {

        document.getElementById("nguyennhan").innerHTML =

            "Không phát hiện yếu tố rủi ro.";

    }
    else {

        document.getElementById("nguyennhan").innerHTML =

            "• " +

            nguyenNhan.join("<br>• ");

    }

    // =========================
    // AI DỰ BÁO XU HƯỚNG
    // =========================

    let duBao =

        "Chưa đủ dữ liệu để dự báo.";

    if (dataHistory.length >= 3) {

        let n = dataHistory.length;

        let t1 = dataHistory[n - 3].nhietDo;
        let t2 = dataHistory[n - 2].nhietDo;
        let t3 = dataHistory[n - 1].nhietDo;

        if (t1 < t2 && t2 < t3) {

            duBao =

                "Nhiệt độ đang tăng liên tục. " +

                "Nguy cơ môi trường xấu đi trong thời gian tới.";

        }
        else if (t1 > t2 && t2 > t3) {

            duBao =

                "Nhiệt độ đang giảm. " +

                "Môi trường có xu hướng ổn định hơn.";

        }
        else {

            duBao =

                "Các thông số đang tương đối ổn định.";

        }

    }

    document.getElementById("dubao").innerHTML =
        duBao;

    // =========================
    // HIỂN THỊ KẾT QUẢ
    // =========================

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