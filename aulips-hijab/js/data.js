// Data produk, foto bawaan & state aplikasi

/* ===== 3. DATA & STATE ===== */
// Kategori: [kode, nama tampil]
const CATS = [['pashmina', 'Pashmina'], ['voal', 'Voal Premium'], ['instant', 'Instant & Bergo'], ['segiempat', 'Segi Empat']],
  cn = k => (CATS.find(c => c[0] == k) || [0, k])[1];
// Pembuat data produk: id, nama, kategori, harga, harga coret, terjual, stok, rating, label, keterangan, warna, ukuran
const mk = (id, t, c, p, old, s, stock, r, tag, d, cl, sz) => ({id, t, c, p, old, s, stock, r, tag, d, col: cl.split(', '), sz: sz.split(', '), img: ''});
// Produk awal (setelah diubah admin tersimpan di localStorage)
let P = ld('aul_p', null) || [
  mk(1, 'Pashmina Silk Plisket', 'pashmina', 49000, 70000, 1240, 48, 4.9, 'Populer', '100% Premium Silk Material', 'Hitam, Cream, Mocca, Dusty Pink, Sage, Navy', '75x175, 90x185'),
  mk(2, 'Voal Ultrafine Laser Cut', 'voal', 39000, 55000, 980, 60, 4.9, 'Limited', 'Ringan, adem, tidak menerawang', 'Putih, Cream, Dusty Pink, Mint, Peach, Dusty Blue', '110x110, 120x120'),
  mk(3, 'Bergo Jersey Daily', 'instant', 32000, 0, 1530, 75, 5, 'Favorit', 'Tinggal pakai, nyaman seharian', 'Hitam, Abu, Coklat, Navy, Olive, Maroon', 'All size'),
  mk(4, 'Segi Empat Cotton Polos', 'segiempat', 25000, 35000, 610, 90, 4.8, 'Terlaris', 'Mudah dibentuk, jatuh rapi', 'Putih, Cream, Sage, Dusty Blue, Peach, Mauve', '110x110, 120x120'),
  mk(5, 'Pashmina Ceruty Baby Doll', 'pashmina', 45000, 0, 1110, 30, 4.9, '', 'Lembut dan tidak mudah kusut', 'Hitam, Mocca, Mauve, Olive, Dusty Pink, Navy', '75x175, 90x185'),
  mk(6, 'Voal Motif Elegance', 'voal', 65000, 80000, 420, 22, 4.7, 'Baru', 'Motif eksklusif, tegak di dahi', 'Maroon, Navy, Olive, Mauve, Cream, Coklat', '110x110, 120x120')
];
// Foto bawaan: file ada di folder images/ (path relatif ke index.html)
const IMG = {
  1: 'images/products/pashmina-silk-plisket.jpg',
  2: 'images/products/voal-ultrafine-laser-cut.jpg',
  3: 'images/products/bergo-jersey-daily.jpg',
  4: 'images/products/segi-empat-cotton-polos.jpg',
  5: 'images/products/pashmina-ceruty-baby-doll.jpg',
  6: 'images/products/voal-motif-elegance.jpg'
},
  HERO0 = 'images/hero.jpg';
const im = p => p.img || IMG[p.id] || '';  // foto unggahan admin > foto bawaan
const day = 86400000; // satu hari (ms), untuk tanggal contoh ulasan
let HERO = ld('aul_hero', ''),                       // foto beranda (data URL)
  QR = ld('aul_qris', ''),                           // gambar QRIS toko (data URL)
  USERS = ld('aul_u', []),                           // akun terdaftar
  cart = ld('aul_c', []),                            // isi keranjang
  user = USERS.find(u => u.e == ld('aul_s', '')),    // akun yang sedang login
  NT = ld('aul_n', [{t: 'Selamat datang di Aulips Hijab', m: 'Pakai kode AULIPS10 untuk diskon 10%. Gratis ongkir min. Rp 150.000.', d: Date.now(), r: 0}]),
  RV = ld('aul_r', [
    {n: 'Nadia', r: 5, p: 'Pashmina Silk Plisket', t: 'Bahannya adem dan jatuhnya rapi. Tidak menerawang sama sekali.', d: Date.now() - 3 * day},
    {n: 'Sinta', r: 5, p: 'Voal Ultrafine Laser Cut', t: 'Tegak di dahi dan mudah dibentuk. Warnanya sesuai foto.', d: Date.now() - 9 * day},
    {n: 'Rahma', r: 4, p: 'Bergo Jersey Daily', t: 'Nyaman dipakai seharian. Pengiriman cepat dan packing aman.', d: Date.now() - 16 * day}
  ]),
  C = '', Q = '',        // kategori aktif, kata kunci pencarian
  D = {},                // pilihan di popup detail produk
  RS = 5,                // bintang terpilih di form ulasan
  O = null,              // pesanan yang sedang diproses
  NI = '';               // foto produk yang disiapkan di form admin
const isAdmin = () => user && user.e == ADMIN_EMAIL.trim().toLowerCase();
// Hubungkan ulasan lama ke produknya lewat id
RV.forEach(r => { if (r.pid == null) { const p = P.find(x => x.t == r.p); if (p) r.pid = p.id } });
