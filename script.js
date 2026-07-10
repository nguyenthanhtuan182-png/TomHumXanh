function phanTich(){

    // Sinh dữ liệu giả lập cảm biến

    let nhietDo =
    Math.floor(Math.random()*10)+25;

    let doDuc =
    Math.floor(Math.random()*100);

    let doMan =
    Math.floor(Math.random()*15)+20;

    // Hiển thị dữ liệu lên giao diện

    document.getElementById("nhietdo").innerHTML =
    nhietDo + "°C";

    document.getElementById("doduc").innerHTML =
    doDuc + " NTU";

    document.getElementById("doman").innerHTML =
    doMan + "‰";

    // Chấm điểm từng thông số

    let diemNhietDo = 100;
    let diemDoDuc = 100;
    let diemDoMan = 100;

    // Nhiệt độ

    if(nhietDo > 32){

        diemNhietDo = 30;

    }
    else if(nhietDo > 30){

        diemNhietDo = 70;

    }

    // Độ đục

    if(doDuc > 80){

        diemDoDuc = 20;

    }
    else if(doDuc > 60){

        diemDoDuc = 60;

    }

    // Độ mặn

    if(doMan < 24){

        diemDoMan = 20;

    }
    else if(doMan < 28){

        diemDoMan = 60;

    }

    // Tính Risk Index

    let risk =

    0.4 * diemNhietDo +

    0.3 * diemDoDuc +

    0.3 * diemDoMan;

    risk = Math.round(risk);

    // Hiển thị Risk Index

    document.getElementById("risk").innerHTML =
    risk;

    // Cập nhật thanh Risk

    document.getElementById("thanhRisk").style.width =
    risk + "%";

    let ketQua = "";

    let den =
    document.getElementById("den");

    let textTrangThai =
    document.getElementById("textTrangThai");

    // Đánh giá trạng thái

    if(risk < 60){

        ketQua =
        "NGUY HIỂM - Cần xử lý ngay";

        den.style.background =
        "red";

        den.style.boxShadow =
        "0 0 30px red";

        textTrangThai.innerHTML =
        "NGUY HIỂM";

        document.getElementById("thanhRisk").style.background =
        "red";

    }

    else if(risk < 80){

        ketQua =
        "CẢNH BÁO - Theo dõi";

        den.style.background =
        "gold";

        den.style.boxShadow =
        "0 0 30px gold";

        textTrangThai.innerHTML =
        "CẢNH BÁO";

        document.getElementById("thanhRisk").style.background =
        "gold";

    }

    else{

        ketQua =
        "AN TOÀN";

        den.style.background =
        "limegreen";

        den.style.boxShadow =
        "0 0 30px limegreen";

        textTrangThai.innerHTML =
        "AN TOÀN";

        document.getElementById("thanhRisk").style.background =
        "limegreen";

    }

    // Hiển thị kết quả

    document.getElementById("ketqua").innerHTML =
    ketQua;

}