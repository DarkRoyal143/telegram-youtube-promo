const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe.user.id;

let time = 60;

fetch('/api/watch-start', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ telegramId: userId })
});

const timerInterval = setInterval(() => {
  time--;
  document.getElementById('timer').innerText = time;

  if (time <= 0) {
    clearInterval(timerInterval);
    const btn = document.getElementById('watchBtn');
    btn.disabled = false;
    btn.innerText = "Claim Coins";
    btn.onclick = claimCoins;
  }
}, 1000);

function claimCoins() {
  fetch('/api/watch-complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegramId: userId })
  })
  .then(res => res.json())
  .then(data => alert("Coins: " + data.coins));
}

function promote() {
  const url = document.getElementById('videoUrl').value;

  fetch('/api/promote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegramId: userId, videoUrl: url })
  })
  .then(() => alert("Video promoted"));
}
