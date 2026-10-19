// Checkout & pembayaran

/* ===== 9. CHECKOUT & PEMBAYARAN ===== */
function checkout() {  // Buka checkout (wajib login) dan isi otomatis data pembeli terakhir
  if (!user) { M('cart', 0); M('auth', 1); return toast('Masuk dulu untuk checkout.') }
  const b = ld('aul_b', {});
  [['bn', b.n || user.n], ['bp', b.p], ['be', b.e || user.e], ['ba', b.a], ['bk', b.k], ['bv', b.v], ['bz', b.z], ['bc', '']].forEach(([i, v]) => $(i).value = v || '');
  coSum(); M('cart', 0); M('co', 1)
}
function calc() {  // Subtotal, diskon kode AULIPS10 (10%) dan total bayar
  const v = $('cv').value.trim().toUpperCase(), t = total(), d = v == 'AULIPS10' ? Math.round(t * .1) : 0;
  return {v, t, d, g: t - d}
}
function coSum() {  // Ringkasan pesanan di checkout
  const c = calc();
  $('cos').innerHTML = `<b>Ringkasan pesanan</b><div style="margin-top:10px">` +
    lines().map(i => `<div class="ci">${pic(i.p, i.c)}<div class="m"><b style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(i.p.t)}</b><span style="color:var(--mut)">${esc(i.c)} · ${esc(i.z)} · ${i.q}x</span></div><b>${rp(i.p.p*i.q)}</b></div>`).join('') +
    `</div><p class="sr"><span>Subtotal</span><span>${rp(c.t)}</span></p>${c.d?`<p class="sr"><span>Promo AULIPS10</span><span>-${rp(c.d)}</span></p>`:''}<p class="sr tot"><span>Total</span><span>${rp(c.g)}</span></p>${c.g>=150000?'<small style="color:var(--tc)">Gratis ongkir</small>':''}`
}
function pay(e) {  // Simpan data pembeli, lalu lanjut ke QRIS atau WhatsApp
  e.preventDefault();
  const c = calc(), g = i => $(i).value.trim();
  if (c.v && !c.d) toast('Kode promo tidak dikenali, lanjut tanpa promo.');
  const b = {n: g('bn'), p: g('bp'), e: g('be'), a: g('ba'), k: g('bk'), v: g('bv'), z: g('bz'), c: g('bc')};
  sv('aul_b', b);
  O = {no: 'AUL' + Date.now().toString().slice(-6), b, c, L: lines(), pm: document.querySelector('[name=pm]:checked').value};
  O.pm == 'qris' ? qrisView() : send()
}
function qrisView() {  // Tampilan pembayaran QRIS
  $('cos').innerHTML = `<div class="qr"><b>Bayar dengan QRIS</b><small>Pesanan ${O.no}</small>${QR?`<img src="${QR}" alt="QRIS Aulips Hijab">`:'<div class="qn">QRIS toko belum diunggah. Admin bisa mengunggahnya lewat tombol Tambah produk.</div>'}<p class="sr tot"><span>Total bayar</span><span>${rp(O.c.g)}</span></p><small>Scan dengan aplikasi bank atau e-wallet, lalu kirim bukti bayar lewat WhatsApp.</small><button class="sub" onclick="send()"><i class="fa-brands fa-whatsapp"></i> Saya sudah bayar</button><button class="pill" style="width:100%;margin-top:10px" onclick="coSum()">Kembali ke ringkasan</button></div>`
}
function send() {  // Kirim pesanan lewat WhatsApp, buat notifikasi, kosongkan keranjang
  const {no, b, c, pm, L} = O;
  wa(`Halo Aulips Hijab, saya mau pesan (No. ${no}):\n\n` + L.map((i, n) => `${n+1}. ${i.p.t} - ${i.c}, ${i.z} (${i.q}x) = ${rp(i.p.p*i.q)}`).join('\n') +
    `\n\n${c.d?'Promo AULIPS10: -'+rp(c.d)+'\n':''}Total: ${rp(c.g)}${c.g>=150000?' (gratis ongkir)':''}\nPembayaran: ${pm=='qris'?'QRIS (bukti bayar saya lampirkan)':'Konfirmasi via WhatsApp'}\n\nData pembeli\nNama: ${b.n}\nWhatsApp: ${b.p}\nEmail: ${b.e}\nAlamat: ${b.a}, ${b.k}, ${b.v} ${b.z}${b.c?'\nCatatan: '+b.c:''}`);
  notif('Pesanan ' + no + ' dibuat', pm == 'qris' ? 'Menunggu verifikasi pembayaran QRIS dari admin.' : 'Lanjutkan di WhatsApp untuk konfirmasi pesanan.');
  cart = []; cUI(); M('co', 0)
}
