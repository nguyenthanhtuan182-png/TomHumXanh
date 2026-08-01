import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBEFRWCo3dPa9ZDEFJJpGpvVACLod45TDE",
    authDomain: "tomhumai.firebaseapp.com",
    databaseURL: "https://tomhumai-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tomhumai",
    storageBucket: "tomhumai.firebasestorage.app",
    messagingSenderId: "891810093046",
    appId: "1:891810093046:web:797b7c876da1b5b05159d7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const sensorRef = ref(db, "TomHumAI");

onValue(sensorRef, (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    window.nhietDo = Number(data.temperature || 0);

    document.getElementById("nhietdo").innerHTML =
        window.nhietDo.toFixed(2) + " °C";

    console.log("Nhiệt độ:", window.nhietDo);
    updatePointer(
    "tempPointer",
    window.nhietDo,
    20,
    40
);
//==============================
// ĐỘ ĐỤC
//==============================

window.turbidity = Number(data.turbidity || 0);

document.getElementById("doduc").innerHTML =
    window.turbidity + " NTU";

console.log("Độ đục:", window.turbidity);

updatePointer(
    "turbidityPointer",
    window.turbidity,
    0,
    1000
);

// Chỉ cập nhật chỉ số.
// Không tự động phân tích môi trường.

capNhatDuLieu();

});

