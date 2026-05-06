let alarmTime = null;
const alarmAudio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = (hours % 12 || 12).toString().padStart(2, "0");

    document.getElementById("hours").textContent = displayHours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("ampm").textContent = ampm;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("date-display").textContent = now.toLocaleDateString('en-US', options);

    if (alarmTime) {
        const current24Time = `${now.getHours().toString().padStart(2, "0")}:${minutes}`;
        if (current24Time === alarmTime) {
            alarmAudio.play().catch(e => console.log("Click on page to enable sound"));
            document.getElementById('alarmStatus').textContent = "⏰ Time's Up!";
        }
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
updateClock();