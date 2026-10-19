// Login / daftar

/* ===== 5. LOGIN / DAFTAR ===== */
function tab(t) {  // Pindah tab Masuk / Daftar
  $('fin').style.display = t == 'in' ? 'block' : 'none';
  $('fup').style.display = t == 'up' ? 'block' : 'none';
  $('er').style.display = 'none';
  $('ti').className = t == 'in' ? 'on' : '';
  $('tu').className = t == 'up' ? 'on' : ''
}
const err = m => { $('er').textContent = m; $('er').style.display = 'block' };
async function doIn(e) {
  e.preventDefault();
  const em = $('li').value.trim().toLowerCase(), h = await H($('lp').value), u = USERS.find(x => x.e == em && x.h == h);
  u ? login(u) : err('Email atau kata sandi salah. Belum punya akun? Buka tab Daftar.')
}
async function doUp(e) {
  e.preventDefault();
  const em = $('ri').value.trim().toLowerCase();
  if (USERS.some(x => x.e == em)) return err('Email ini sudah terdaftar. Silakan masuk.');
  const u = {n: $('rn').value.trim(), e: em, h: await H($('rp').value)};
  USERS.push(u);
  if (sv('aul_u', USERS)) login(u)
}
function login(u) { user = u; sv('aul_s', u.e); M('auth', 0); ui(); toast('Halo, ' + u.n + '!') }
function logout() { user = null; sv('aul_s', ''); ui(); toast('Kamu sudah keluar.') }
function ui() {  // Perbarui tampilan sesuai status login (tombol admin, avatar, menu akun)
  $('addb').style.display = isAdmin() ? '' : 'none';
  $('pp').classList.remove('on');
  $('pb').innerHTML = user ? `<span>${esc(user.n[0].toUpperCase())}</span>` : '<i class="fa-regular fa-user"></i>';
  $('pp').innerHTML = user
    ? `<div class="dh"><b style="overflow:hidden;text-overflow:ellipsis">${esc(user.n)}</b></div><p class="em" style="text-align:left;padding:10px 16px;word-break:break-all">${esc(user.e)}${isAdmin()?' · Admin':''}</p>` +
      `${isAdmin()?'<button class="lo" style="color:var(--ink)" onclick="openMg()"><i class="fa-solid fa-store"></i> Kelola katalog</button>':''}` +
      `<button class="lo" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Keluar</button>`
    : '';
  rvUI(); draw()
}
