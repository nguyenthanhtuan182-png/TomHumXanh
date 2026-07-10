let riskHistory = [];

let chart;

window.onload = function () {

const ctx =
document.getElementById('myChart');

chart = new Chart(ctx, {

type: 'line',

data: {

labels: [],

datasets: [{

label: 'Chỉ số rủi ro',

data: []

}]

},

options: {

responsive: true

}

});

};

function phanTich() {

let nhietDo =
Math.floor(Math.random() * 10) + 25;

let doDuc =
Math.floor(Math.random() * 100);

let doMan =
Math.floor(Math.random() * 15) + 20;

document.getElementById("nhietdo").innerHTML =
nhietDo + "°C";

document.getElementById("doduc").innerHTML =
doDuc + " NTU";

document.getElementById("doman").innerHTML =
doMan + "‰";

let diemNhietDo = 100;
let diemDoDuc = 100;
let diemDoMan = 100;

if (nhietDo > 32) {

diemNhietDo = 30;

}
else if (nhietDo > 30) {

diemNhietDo = 70;

}

if (doDuc > 80) {

diemDoDuc = 20;

}
else if (doDuc > 60) {

diemDoDuc = 60;

}

if (doMan < 24) {

diemDoMan = 20;

}
else if (doMan < 28) {

diemDoMan = 60;

}

let risk =

0.4 * diemNhietDo +
0.3 * diemDoDuc +
0.3 * diemDoMan;

risk = Math.round(risk);

document.getElementById("risk").innerHTML =
risk;

document.getElementById("thanhRisk").style.width =
risk + "%";

riskHistory.push(risk);

if (riskHistory.length > 20) {

riskHistory.shift();

}

chart.data.labels =
riskHistory.map((_, i) => i + 1);

chart.data.datasets[0].data =
riskHistory;

chart.update();

let ketQua = "";

if (risk < 60) {

ketQua = "🔴 NGUY HIỂM";

document.getElementById("den").style.background =
"red";

document.getElementById("den").style.boxShadow =
"0 0 20px red";

document.getElementById("textTrangThai").innerHTML =
"NGUY HIỂM";

document.getElementById("thanhRisk").style.background =
"red";

document.getElementById("khuyennghi").innerHTML =

"• Nâng lồng 0,5m<br>" +
"• Giảm 20% lượng thức ăn<br>" +
"• Theo dõi lại sau 6 giờ";

}

else if (risk < 80) {

ketQua = "🟡 CẢNH BÁO";

document.getElementById("den").style.background =
"gold";

document.getElementById("den").style.boxShadow =
"0 0 20px gold";

document.getElementById("textTrangThai").innerHTML =
"CẢNH BÁO";

document.getElementById("thanhRisk").style.background =
"gold";

document.getElementById("khuyennghi").innerHTML =

"• Theo dõi độ đục<br>" +
"• Kiểm tra nguồn nước<br>" +
"• Đo lại sau 3 giờ";

}

else {

ketQua = "🟢 AN TOÀN";

document.getElementById("den").style.background =
"limegreen";

document.getElementById("den").style.boxShadow =
"0 0 20px limegreen";

document.getElementById("textTrangThai").innerHTML =
"AN TOÀN";

document.getElementById("thanhRisk").style.background =
"limegreen";

document.getElementById("khuyennghi").innerHTML =

"• Môi trường ổn định<br>" +
"• Tiếp tục nuôi bình thường";

}

document.getElementById("ketqua").innerHTML =
ketQua;

}