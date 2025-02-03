// Simpan data di localStorage
const COOLDOWN_TIME = 300; // 5 menit (dalam detik)
let lastClaim = localStorage.getItem('lastClaim') || 0;
let balance = localStorage.getItem('balance') || 0;

document.getElementById('balance').textContent = balance;

// Update timer
function updateTimer() {
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = COOLDOWN_TIME - (currentTime - lastClaim);

    if (remainingTime > 0) {
        document.getElementById('claimBtn').disabled = true;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        document.getElementById('countdown').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        document.getElementById('claimBtn').disabled = false;
        document.getElementById('countdown').textContent = '00:00';
    }
}

// Klaim faucet
document.getElementById('claimBtn').addEventListener('click', () => {
    const currentTime = Math.floor(Date.now() / 1000);
    lastClaim = currentTime;
    balance = Number(balance) + 100; // Tambah 100 SAT per klaim

    localStorage.setItem('lastClaim', lastClaim);
    localStorage.setItem('balance', balance);

    document.getElementById('balance').textContent = balance;
    document.getElementById('claimBtn').disabled = true;
    alert('Klaim berhasil! +100 SAT');
});

// Update timer setiap detik
setInterval(updateTimer, 1000);
updateTimer(); // Jalankan saat pertama kali
