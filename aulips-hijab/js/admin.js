// Admin: kelola produk & gambar

/* ===== 12. ADMIN: kelola produk & gambar ===== */
function openAdm(id) {  // Buka form tambah / edit produk (tanpa id = produk baru)
  const p = P.find(x => x.id == id) || {};
  $('a2').innerHTML = CATS.map(c => `<option value="${c[0]}">${c[1]}</option>`).join('');
  $('ei').value = p.id || '';
  $('at').textContent = p.id ? 'Edit produk' : 'Tambah produk';
  $('imn').textContent = p.img ? 'Foto sudah ada. Pilih file baru untuk mengganti.' : '';
  $('a11').value = '';
  NI = p.img || '';
  [['a1', p.t], ['a2', p.c || 'pashmina'], ['a3', p.tag], ['a4', p.p], ['a5', p.old || ''], ['a6', p.stock], ['a7', p.r ?? 4.9], ['a8', p.d], ['a9', p.col && p.col.join(', ')], ['a10', p.sz && p.sz.join(', ')]]
    .forEach(([i, v]) => $(i).value = v ?? '');
  M('adm', 1)
}
function shrink(f, max, type, cb) {  // Perkecil gambar lalu kirim hasilnya (data URL) ke callback
  const r = new FileReader();
  r.onload = x => {
    const im = new Image();
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = im.width * k; c.height = im.height * k;
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      cb(c.toDataURL(type, .82))
    };
    im.src = x.target.result
  };
  r.readAsDataURL(f)
}
function up(e, w) {  // Unggah gambar: 'hero' (foto beranda), 'qris', atau foto produk
  const f = e.target.files[0];
  if (!f) return;
  shrink(f, {hero: 1200, qris: 700}[w] || 800, w == 'qris' ? 'image/png' : 'image/jpeg', d => {
    if (w == 'hero') { HERO = d; if (sv('aul_hero', HERO)) { draw(); toast('Foto beranda diganti.') } }
    else if (w == 'qris') { QR = d; if (sv('aul_qris', QR)) toast('QRIS tersimpan.') }
    else { NI = d; $('imn').textContent = 'Foto siap disimpan.' }
  })
}
function saveP(e) {  // Simpan produk (baru / hasil edit)
  e.preventDefault();
  if (!isAdmin()) return;
  const sp = s => s.split(',').map(x => x.trim()).filter(Boolean), id = +$('ei').value;
  const d = {t: $('a1').value.trim(), c: $('a2').value, tag: $('a3').value.trim(), p: +$('a4').value, old: +$('a5').value || 0, stock: +$('a6').value || 0, r: +$('a7').value || 5,
    d: $('a8').value.trim(), col: sp($('a9').value).length ? sp($('a9').value) : ['Hitam'], sz: sp($('a10').value).length ? sp($('a10').value) : ['All size'], img: NI};
  if (id) Object.assign(P.find(p => p.id == id), d); else P.unshift({id: Date.now(), s: 0, ...d});
  if (sv('aul_p', P)) { draw(); cUI(); M('adm', 0); toast('Produk tersimpan.') }
}
function delP(id) {  // Hapus produk beserta isi keranjang & ulasannya
  if (isAdmin() && confirm('Hapus produk ini dari katalog?')) {
    P = P.filter(p => p.id != id); cart = cart.filter(i => i.id != id); RV = RV.filter(r => r.pid != id);
    sv('aul_p', P); sv('aul_r', RV);
    draw(); cUI(); rvUI(); mgUI()
  }
}
// Popup Kelola katalog
function openMg() { if (!isAdmin()) return; $('pp').classList.remove('on'); mgUI(); M('mng', 1) }
function mgUI() {
  $('mgl').innerHTML = P.map(p => `<div class="mr">${pic(p, 0)}<div class="mi"><b>${esc(p.t)}</b><small>${esc(cn(p.c))}</small></div><label>Harga (Rp)<input type="number" min="0" value="${p.p}" class="f" onchange="qe(${p.id},'p',this.value)"></label><label>Stok<input type="number" min="0" value="${p.stock||0}" class="f" onchange="qe(${p.id},'stock',this.value)"></label><div class="ma"><label class="pill up">Ganti foto<input type="file" accept="image/*" hidden onchange="upP(event,${p.id})"></label><button onclick="M('mng',0);openAdm(${p.id})">Edit</button><button class="x" onclick="delP(${p.id})">Hapus</button></div></div>`).join('')
    || '<p class="em">Belum ada produk. Klik Tambah produk.</p>'
}
function qe(id, k, v) {  // Ubah cepat harga / stok dari daftar kelola
  if (!isAdmin()) return;
  P.find(x => x.id == id)[k] = Math.max(0, +v || 0);
  if (sv('aul_p', P)) { draw(); cUI(); toast('Tersimpan.') }
}
function upP(e, id) {  // Ganti foto produk dari daftar kelola
  const f = e.target.files[0];
  if (!f || !isAdmin()) return;
  shrink(f, 800, 'image/jpeg', d => {
    const p = P.find(x => x.id == id), o = p.img;
    p.img = d;
    if (sv('aul_p', P)) { draw(); cUI(); mgUI(); toast('Foto diganti.') } else p.img = o
  })
}
