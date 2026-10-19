// Ulasan pembeli

/* ===== 10. ULASAN PEMBELI ===== */
function rvUI() {  // Ringkasan rating & daftar ulasan
  const n = RV.length, a = n ? RV.reduce((s, r) => s + r.r, 0) / n : 0;
  $('rs').innerHTML = n ? `<div class="av"><b>${a.toFixed(1)}</b><span class="stx">${st(Math.round(a))}</span><small>dari ${n} ulasan</small></div>` : '';
  $('rg').innerHTML = RV.map((r, i) => `<article class="rc"><div class="rh"><i>${esc((r.n[0]||'?').toUpperCase())}</i><div><b>${esc(r.n)}</b><small>${new Date(r.d).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}</small></div></div><span class="stx">${st(r.r)}</span><p>${esc(r.t)}</p><small class="rp">${esc((P.find(x=>x.id==r.pid)||{}).t||r.p)}</small>${isAdmin()?`<button class="rx" onclick="delR(${i})">Hapus</button>`:''}</article>`).join('')
    || '<p class="em">Belum ada ulasan. Jadilah yang pertama menulis.</p>'
}
const sRate = n => { RS = n; stars('stp', n, 'sRate') };
function openRv() {  // Buka popup tulis ulasan (wajib login)
  if (!user) { M('auth', 1); return toast('Masuk dulu untuk menulis ulasan.') }
  $('rpd').innerHTML = P.map(p => `<option value="${p.id}">${esc(p.t)}</option>`).join('');
  $('rt').value = '';
  sRate(5); M('rvm', 1)
}
function saveR(e) { e.preventDefault(); if (putR(+$('rpd').value, RS, $('rt').value.trim())) { rvUI(); M('rvm', 0); toast('Terima kasih atas ulasannya!') } }
function delR(i) { if (isAdmin() && confirm('Hapus ulasan ini?')) { RV.splice(i, 1); sv('aul_r', RV); rvUI() } }  // Hapus ulasan (admin)

/* ===== 11. SIMPAN ULASAN ===== */
function putR(pid, rate, t) {  // Simpan ulasan: satu per pengguna per produk (menimpa yang lama)
  const p = P.find(x => x.id == pid);
  if (!p || !user) return false;
  const o = {n: user.n, e: user.e, r: rate, pid: p.id, p: p.t, t, d: Date.now()}, k = RV.findIndex(r => r.pid == p.id && r.e == user.e);
  k >= 0 ? RV[k] = o : RV.unshift(o);
  return sv('aul_r', RV)
}
