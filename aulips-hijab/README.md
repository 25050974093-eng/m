# Aulips Hijab

Buka `index.html` (klik dua kali, atau Go Live di VS Code). Tidak perlu install apa pun.

## Struktur folder

```
aulips-hijab/
├── index.html            Kerangka halaman (HTML saja)
├── css/                  Tampilan, dipecah per bagian
│   ├── base.css          Variabel warna, reset, komponen umum, modal
│   ├── layout.css        Bar promo & header
│   ├── home.css          Hero & fitur unggulan
│   ├── catalog.css       Katalog produk
│   ├── sections.css      Ulasan, FAQ, footer
│   ├── modals.css        Popup login & detail produk
│   ├── cart.css          Keranjang, checkout, pembayaran
│   ├── admin.css         Panel admin
│   └── responsive.css    Tampilan HP & tablet
├── js/                   Logika, dipecah per fitur
│   ├── config.js         Email admin & nomor WhatsApp  <- ganti di sini
│   ├── utils.js          Fungsi bantu
│   ├── data.js           Daftar produk & foto bawaan   <- tambah produk di sini
│   ├── algoritma.js      Struct, Array, Pointer, Bubble Sort, Linear Search + log
│   ├── header.js         Pencarian, notifikasi, akun
│   ├── auth.js           Login / daftar
│   ├── catalog.js        Katalog produk
│   ├── product-detail.js Popup detail produk
│   ├── cart.js           Keranjang
│   ├── checkout.js       Checkout & pembayaran
│   ├── reviews.js        Ulasan
│   ├── admin.js          Kelola produk & gambar
│   └── main.js           Start aplikasi (harus paling akhir)
└── images/
    ├── hero.jpg          Foto beranda
    └── products/         Foto tiap produk
```

## Yang sering diubah

| Mau ubah | Buka file |
|---|---|
| Email admin / nomor WhatsApp | `js/config.js` |
| Tambah / ubah produk, harga, stok | `js/data.js` |
| Ganti foto produk | timpa file di `images/products/` (nama sama) |
| Warna utama website | `css/base.css` (bagian `:root`) |

## Catatan

- Semua file `.js` dimuat berurutan lewat `<script>` di `index.html`. Kalau menambah file JS baru, daftarkan di sana dan letakkan sebelum `main.js`.
- Saat upload ke hosting atau dikirim ke orang lain, **kirim satu folder utuh** supaya foto tetap muncul.
