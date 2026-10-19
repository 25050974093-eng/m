// Popup detail produk

/* ===== 7. DETAIL PRODUK ===== */
function openP(id) { const p = P.find(x => x.id == id); D = {id, c: p.col[0], z: p.sz[0], q: 1}; rD(); M('pd', 1) }
const dset = (k, v) => { D[k] = v; rD() };  // Ubah pilihan warna ('c') atau ukuran ('z')
// Ubah jumlah beli (tidak melebihi stok)
function dq(d) { D.q = Math.max(1, Math.min(P.find(x => x.id == D.id).stock || 1, D.q + d)); rD() }
function rD() {
  const p = P.find(x => x.id == D.id);
  $('pdc').innerHTML = `<button class="xx" onclick="M('pd',0)" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button><div class="dg">${pic(p, D.c)}
 <div><span class="lab" style="font-size:13px">${cn(p.c)}</span><h3 style="margin:4px 0 6px;font-size:30px">${esc(p.t)}</h3>
 <p style="font-size:13px;color:var(--mut)"><i class="fa-solid fa-star" style="color:#e0a43a"></i> ${p.r} · ${p.s.toLocaleString('id-ID')} terjual · stok ${p.stock||'habis'}</p>
 <p class="pr" style="margin:12px 0;font-size:26px">${rp(p.p)}${p.old?`<s>${rp(p.old)}</s>`:''}</p><p style="color:#6b5448;font-size:14px">${esc(p.d||'')}</p>
 <p style="margin-top:18px;font-size:14px">Warna: <b>${esc(D.c)}</b></p><div class="sw">${p.col.map(x=>`<button class="${x==D.c?'on':''}" style="background:${col(x)}" title="${esc(x)}" aria-label="${esc(x)}" onclick="dset('c','${esc(x)}')"></button>`).join('')}</div>
 <p style="margin-top:18px;font-size:14px">Ukuran (cm)</p><div class="sw sz">${p.sz.map(z=>`<button class="${z==D.z?'on':''}" style="width:auto;height:auto;border-radius:12px" onclick="dset('z','${esc(z)}')">${esc(z)}</button>`).join('')}</div>
 <div class="q">Jumlah <button onclick="dq(-1)" aria-label="Kurangi">−</button>${D.q}<button onclick="dq(1)" aria-label="Tambah">+</button></div>
 <button class="sub" ${p.stock?'':'disabled'} onclick="add()">Tambah ke keranjang</button></div></div>`
}
