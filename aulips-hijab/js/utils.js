// Fungsi bantu: localStorage, format, warna, toast

/* ===== 2. FUNGSI BANTU ===== */
// $ = ambil elemen | rp = format Rupiah | M = buka (1) / tutup (0) popup | esc = amankan teks | st = bintang teks
const $ = id => document.getElementById(id),
  rp = n => 'Rp ' + Number(n).toLocaleString('id-ID'),
  M = (id, o) => $(id).classList.toggle('on', !!o),
  esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c])),
  st = n => '★'.repeat(n) + '☆'.repeat(5 - n);
function toast(m) {  // Pesan melayang selama 3 detik
  const t = $('tt');
  t.textContent = m; t.style.display = 'block';
  clearTimeout(t.h);
  t.h = setTimeout(() => t.style.display = 'none', 3000)
}
// Baca / simpan localStorage (nilai bawaan jika kosong atau rusak; peringatan jika penuh)
const ld = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v } catch (e) { return d } };
const sv = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); return true }
  catch (e) { toast('Penyimpanan penuh. Pakai foto yang lebih kecil.'); return false }
};
// Hash kata sandi (SHA-256) sebelum disimpan
const H = async s => {
  if (!(window.crypto && crypto.subtle)) return btoa(unescape(encodeURIComponent(s)));
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('aul:' + s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('')
};
const wa = t => window.open('https://wa.me/6285606017891' + WA + '?text=' + encodeURIComponent(t), '_blank');  // Buka WhatsApp dengan pesan terisi
// Kode warna tiap nama warna produk
const COL = {Hitam: '#222', Putih: '#f5f3ee', Cream: '#e8d9c0', Mocca: '#a47c5c', Coklat: '#6b4a35', 'Dusty Pink': '#d8a7b1', Mauve: '#9d7081', Sage: '#9caf88',
  Olive: '#6b7345', Navy: '#243b5c', 'Dusty Blue': '#8fa6bf', Maroon: '#7a2a3a', Abu: '#9a9a9a', Lilac: '#b9a6cf', Peach: '#f2b8a0', Mint: '#b5d8c7'};
const col = n => COL[n] || COL[Object.keys(COL).find(k => k.toLowerCase() == String(n).toLowerCase())] || '#c9b8ac';
function sh(h, a) {  // Terangkan (a positif) atau gelapkan (a negatif) warna hex
  const n = parseInt(h.slice(1), 16), t = a < 0 ? 0 : 255, k = Math.abs(a), f = v => Math.round(v + (t - v) * k);
  return '#' + [n >> 16, n >> 8 & 255, n & 255].map(f).map(v => v.toString(16).padStart(2, '0')).join('')
}
// Latar gradien dari satu warna (untuk produk tanpa foto) & blok gambar produk
const bgOf = c => {
  let h = col(c);
  if (h.length == 4) h = '#' + [...h.slice(1)].map(x => x + x).join('');
  return `background:linear-gradient(120deg,${sh(h,.18)} 0%,${h} 38%,${sh(h,-.15)} 62%,${h} 100%)`
};
const pic = (p, c, inner = '') => `<div class="pic" style="${im(p)?'':bgOf(c||p.col[0])}">${im(p)?`<img src="${im(p)}" alt="${esc(p.t)}" loading="lazy">`:''}${inner}</div>`;
// Bintang yang bisa diklik di form ulasan
const stars = (id, v, fn) => $(id).innerHTML = [1, 2, 3, 4, 5].map(i => `<button type="button" class="${i<=v?'on':''}" onclick="${fn}(${i})" aria-label="${i} bintang">★</button>`).join('');
