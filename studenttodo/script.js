document.getElementById('addBtn').addEventListener('click', addTask);
const reminderSound = document.getElementById('reminderSound');
const rewardSound = document.getElementById('rewardSound');
const quoteBox = document.getElementById('quote');
let reminders = [];

const quotes = [
  "💪 Stay positive, work hard, make it happen!",
  "🌟 Believe you can and you're halfway there!",
  "🚀 Every small step counts toward success!",
  "🎯 Don’t watch the clock — do what it does. Keep going!",
  "🔥 Push yourself, because no one else is going to do it for you!",
  "📘 Learn something new every day!",
  "🏆 Success starts with self-discipline!",
  "🌻 Stay focused and never give up!"
];

function addTask() {
  const input = document.getElementById('taskInput');
  const timeInput = document.getElementById('reminderTime');
  const taskText = input.value.trim();
  const reminderTime = timeInput.value;

  if (taskText === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;

  if (reminderTime) {
    const span = document.createElement('span');
    span.textContent = ` ⏰ ${reminderTime}`;
    span.style.color = 'black';
    span.style.fontSize = '14px';
    li.appendChild(span);
    reminders.push({ task: taskText, time: reminderTime });
  }

  li.addEventListener('click', function () {
    li.classList.toggle('completed');
    if (li.classList.contains('completed')) {
      showReward();
      launchConfetti();
    }
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => li.remove();

  li.appendChild(delBtn);
  document.getElementById('taskList').appendChild(li);
  input.value = '';
  timeInput.value = '';
  showMotivation();
}

function showReward() {
  const reward = document.getElementById('reward');
  reward.classList.remove('hidden');
  rewardSound.play();
  setTimeout(() => reward.classList.add('hidden'), 3000);
}

function showMotivation() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = randomQuote;
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  document.getElementById('clock').textContent = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  document.getElementById('date').textContent = now.toDateString();

  const greeting = document.getElementById('greeting');
  if (hours < 12) greeting.textContent = '🌞 Good Morning, Student!';
  else if (hours < 18) greeting.textContent = '🌤️ Good Afternoon!';
  else greeting.textContent = '🌙 Good Evening!';

  const currentTime = `${hours.toString().padStart(2, '0')}:${minutes}`;
  reminders.forEach(reminder => {
    if (reminder.time === currentTime) {
      alert(`⏰ Reminder: ${reminder.task}`);
      reminderSound.play();
      reminders = reminders.filter(r => r !== reminder);
    }
  });
}

setInterval(updateClock, 1000);
updateClock();

/* 🎉 Confetti Animation */
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];

function launchConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      size: Math.random() * 8 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: Math.random() * 4 + 2
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((c, i) => {
    c.y += c.speed;
    if (c.y > confettiCanvas.height) confetti.splice(i, 1);
    ctx.fillStyle = c.color;
    ctx.fillRect(c.x, c.y, c.size, c.size);
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();