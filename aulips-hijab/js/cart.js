// Keranjang

/* ===== 8. KERANJANG ===== */
// lines = isi keranjang + data produknya | total = total harga
const lines = () => cart.map(i => ({...i, p: P.find(p => p.id == i.id)})).filter(i => i.p),
  total = () => lines().reduce((s, i) => s + i.p.p * i.q, 0);
function add() {  // Tambah ke keranjang (item sama digabung)
  const f = cart.find(i => i.id == D.id && i.c == D.c && i.z == D.z);
  f ? f.q += D.q : cart.push({id: D.id, c: D.c, z: D.z, q: D.q});
  M('pd', 0); cUI(); toast('Masuk keranjang')
}
// Ubah jumlah item (dihapus jika kurang dari 1)
function qty(k, d) { cart[k].q += d; if (cart[k].q < 1) cart.splice(k, 1); cUI() }
function cUI() {  // Simpan & gambar ulang keranjang (badge, daftar item, total)
  sv('aul_c', cart);
  const l = lines();
  $('cb').textContent = l.reduce((s, i) => s + i.q, 0);
  $('ct').textContent = rp(total());
  $('cbtn').disabled = !l.length;
  $('cl').innerHTML = l.map((i, k) => `<div class="ci">${pic(i.p, i.c)}<div class="m"><b style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(i.p.t)}</b><span style="color:var(--mut)">${esc(i.c)} · ${esc(i.z)}</span><b style="display:block;color:var(--tc2)">${rp(i.p.p)}</b></div><div class="q" style="margin:0"><button onclick="qty(${k},-1)" aria-label="Kurangi">−</button>${i.q}<button onclick="qty(${k},1)" aria-label="Tambah">+</button></div></div>`).join('')
    || '<p style="text-align:center;color:var(--mut);padding:50px 0">Keranjang masih kosong. Pilih hijab, tentukan warna, lalu tambahkan.</p>'
}
