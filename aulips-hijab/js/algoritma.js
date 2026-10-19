// Algoritma Struktur Data: Struct, Array, Pointer, Sorting (Bubble Sort), Searching (Linear Search) + LOG

/* ===== 0. STRUCT, ARRAY & POINTER =====
   STRUCT  : satu produk = satu struct "Produk" (dibuat oleh mk() di data.js):
             { id, t (nama), c (kategori), p (harga), old, s (terjual), stock,
               r (rating), tag, d, col[] (warna), sz[] (ukuran), img }
   ARRAY   : P = array of struct Produk  -> P[0], P[1], ... P[n-1]
   POINTER : JavaScript tidak punya pointer eksplisit seperti C. Variabel yang berisi
             objek menyimpan REFERENSI (alamat) ke objek itu, bukan salinannya.
             Jadi p = arr[i] artinya p "menunjuk" ke struct yang sama dengan arr[i],
             dan menukar elemen array = menukar pointer, bukan menyalin struct.     */

const ALG = {sort: [], search: []};   // log terakhir untuk ditampilkan di halaman & console
const LOG_MAX = 300;                  // batas baris log yang ditampilkan di halaman
const nm = p => p.t.length > 24 ? p.t.slice(0, 23) + '…' : p.t;

/* ===== 1. SORTING: BUBBLE SORT =====
   arr = array of struct | cmp(a,b) > 0 artinya a harus ditukar ke belakang b
   key(p) = nilai yang diurutkan (hanya untuk ditulis di log) | log = array penampung log */
function bubbleSort(arr, cmp, key, log) {
  const a = [...arr];                 // salin ARRAY-nya saja (isinya tetap pointer ke struct yang sama)
  const n = a.length;
  let banding = 0, tukar = 0;
  log.push(`Bubble Sort | n = ${n} elemen`);
  log.push(`Awal  : ${a.map(p => p.id).join(', ')}   (id produk)`);
  for (let i = 0; i < n - 1; i++) {
    let adaTukar = false;
    log.push(`-- Pass ${i + 1} --`);
    for (let j = 0; j < n - 1 - i; j++) {
      banding++;
      const swap = cmp(a[j], a[j + 1]) > 0;
      log.push(`  a[${j}] ${nm(a[j])} (${key(a[j])})  vs  a[${j + 1}] ${nm(a[j + 1])} (${key(a[j + 1])})  -> ${swap ? 'TUKAR' : 'tetap'}`);
      if (swap) { const tmp = a[j]; a[j] = a[j + 1]; a[j + 1] = tmp; tukar++; adaTukar = true }   // tukar pointer
    }
    log.push(`  Hasil pass ${i + 1}: ${a.map(p => p.id).join(', ')}`);
    if (!adaTukar) { log.push('  Tidak ada penukaran -> berhenti lebih awal'); break }
  }
  log.push(`Selesai: ${banding} perbandingan, ${tukar} penukaran`);
  return a;
}

/* ===== 2. SEARCHING: LINEAR SEARCH =====
   Periksa elemen satu per satu dari indeks 0 sampai n-1.
   cocok(p) = true jika struct p memenuhi kata kunci / kategori */
function linearSearch(arr, cocok, kata, kategori, log) {
  const hasil = [];
  log.push(`Linear Search | n = ${arr.length} elemen`);
  log.push(`Kata kunci: "${kata}" | Kategori: ${kategori || 'semua'}`);
  for (let i = 0; i < arr.length; i++) {
    const p = arr[i];                 // p = pointer (referensi) ke struct arr[i]
    const ok = cocok(p);
    log.push(`  [${i}] ${nm(p)}  -> ${ok ? 'COCOK' : 'tidak cocok'}`);
    if (ok) hasil.push(p);
  }
  log.push(`Selesai: ${arr.length} elemen diperiksa, ${hasil.length} ditemukan`);
  return hasil;
}

/* ===== 3. TAMPILKAN LOG ===== */
function showLog() {
  const cut = l => l.length > LOG_MAX ? l.slice(0, LOG_MAX).concat(`... (${l.length - LOG_MAX} baris lagi disembunyikan, lihat Console)`) : l;
  $('algS').textContent = cut(ALG.search).join('\n');
  $('algO').textContent = cut(ALG.sort).join('\n');
  console.log('%c[LOG SEARCH]\n%s', 'color:#b0614f;font-weight:bold', ALG.search.join('\n'));
  console.log('%c[LOG SORT]\n%s', 'color:#b0614f;font-weight:bold', ALG.sort.join('\n'));
}
