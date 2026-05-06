let alarmTime = null;
const alarmAudio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');

function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ampm = h >= 12 ? "PM" : "AM";

    const minutes = m < 10 ? "0" + m : m;
    const current24Time = `${now.getHours().toString().padStart(2, "0")}:${minutes}`;

    h = h % 12 || 12;
    h = h < 10 ? "0" + h : h;
    s = s < 10 ? "0" + s : s;

    document.getElementById("hours").innerText = h;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = s;
    document.getElementById("ampm").innerText = ampm;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (document.getElementById("date-display")) {
        document.getElementById("date-display").textContent = now.toLocaleDateString('en-US', options);
    }

    if (alarmTime && current24Time === alarmTime) {
        alarmAudio.play().catch(e => console.log("Click on page to enable sound"));
        document.getElementById('alarmStatus').textContent = "⏰ Time's Up!";
        document.getElementById("alarm-popup").style.display = "flex";
    }
}

document.getElementById('setAlarmBtn').addEventListener('click', () => {
    const input = document.getElementById('alarmTime');
    if (input.value) {
        alarmTime = input.value;
        document.getElementById('alarmStatus').textContent = `Alarm set for: ${alarmTime}`;
    } else {
        alert("Please select a time!");
    }
});

function stopAlarm() {
    document.getElementById('alarm-popup').style.display = 'none';
    alarmTime = null;
    document.getElementById('alarmStatus').textContent = "No Alarm Set";
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeToggle.textContent = '🌙 Dark Mode';
    } else {
        themeToggle.textContent = '☀️ Light Mode';
    }
});

setInterval(updateClock, 1000);