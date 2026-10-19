// Header: pencarian, notifikasi, akun

/* ===== 4. HEADER: pencarian, notifikasi, akun ===== */
function tg(id) {  
  const e = $(id), o = !e.classList.contains('on');
  ['np', 'pp', 'sb'].forEach(i => $(i).classList.remove('on'));
  if (o) { e.classList.add('on'); if (id == 'sb') $('q').focus() }
}
// Klik di luar dropdown menutup notifikasi & menu akun
document.addEventListener('click', e => { if (!e.target.closest('.dw,.ib')) ['np', 'pp'].forEach(i => $(i).classList.remove('on')) });
const prof = () => user ? tg('pp') : M('auth', 1);  // Ikon akun: sudah login -> menu akun, belum -> popup login
function ago(t) {  // Waktu relatif, mis. '5 menit lalu'
  const m = Math.floor((Date.now() - t) / 60000);
  return m < 1 ? 'Baru saja' : m < 60 ? m + ' menit lalu' : m < 1440 ? Math.floor(m / 60) + ' jam lalu' : Math.floor(m / 1440) + ' hari lalu'
}
// Tambah notifikasi (maks. 20) & tandai semua dibaca
function notif(t, m) { NT.unshift({t, m, d: Date.now(), r: 0}); NT = NT.slice(0, 20); sv('aul_n', NT); nUI() }
function nRead() { NT.forEach(n => n.r = 1); sv('aul_n', NT); nUI() }
function nUI() {  // Gambar ulang badge & daftar notifikasi
  const u = NT.filter(n => !n.r).length;
  $('nb').style.display = u ? '' : 'none';
  $('nb').textContent = u;
  $('np').innerHTML = `<div class="dh"><b>Notifikasi</b><button onclick="nRead()">Tandai dibaca</button></div>` +
    (NT.map(n => `<div class="ni ${n.r?'':'nw'}"><b>${esc(n.t)}</b><span>${esc(n.m)}</span><small>${ago(n.d)}</small></div>`).join('') || '<p class="em">Belum ada notifikasi.</p>')
}
