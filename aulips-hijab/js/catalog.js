// Katalog produk

/* ===== 6. KATALOG PRODUK ===== */
function draw() {  // Gambar ulang chip kategori, grid produk (filter, cari, urutan) dan kartu hero
  $('chips').innerHTML = [['', 'Semua Hijab'], ...CATS].map(c => `<button class="${C==c[0]?'on':''}" onclick="cat('${c[0]}')">${c[1]}</button>`).join('');
  const s = $('so').value;
  // Urutan & kunci tampil di log: s == 'l' harga termurah, 'h' harga tertinggi, selain itu rating lalu terjual
  const cmp = s == 'l' ? (a, b) => a.p - b.p : s == 'h' ? (a, b) => b.p - a.p : (a, b) => b.r - a.r || b.s - a.s,
    key = s == 'l' || s == 'h' ? x => rp(x.p) : x => `rating ${x.r}, terjual ${x.s}`;
  ALG.search = []; ALG.sort = [];
  // 1) SEARCHING (Linear Search) -> 2) SORTING (Bubble Sort), log tersimpan di ALG
  const hasil = linearSearch(P, x => (!C || x.c == C) && (x.t + ' ' + x.col.join(' ') + ' ' + cn(x.c)).toLowerCase().includes(Q), Q, C && cn(C), ALG.search),
    l = bubbleSort(hasil, cmp, key, ALG.sort);
  showLog();
  $('empty').style.display = l.length ? 'none' : 'block';
  $('grid').innerHTML = l.map(p => `<article class="card" onclick="openP(${p.id})">${pic(p, 0, `${p.tag?`<span class="tag">${esc(p.tag)}</span>`:''}<button class="plus" aria-label="Pilih ${esc(p.t)}">+</button>`)}
 <div class="mt"><span>${esc(cn(p.c).split(' ')[0])}</span><s><i class="fa-solid fa-star" style="color:#e0a43a"></i> ${p.r}</s></div>
 <h3>${esc(p.t)}</h3>${p.d?`<p class="d">${esc(p.d)}</p>`:''}
 <p class="pr">${rp(p.p)}${p.old?`<s>${rp(p.old)}</s>`:''}</p>
 ${isAdmin()?`<div class="ad"><button onclick="event.stopPropagation();openAdm(${p.id})">Edit</button><button class="x" onclick="event.stopPropagation();delP(${p.id})">Hapus</button></div>`:''}</article>`).join('');
  const f = P[0];
  $('hp').innerHTML = (HERO || HERO0 ? `<img src="${HERO || HERO0}" alt="Koleksi Aulips Hijab">` : `<div style="position:absolute;inset:0;${f?bgOf(f.col[0]):''}"></div>`)
}
const cat = k => { C = k; draw() };
