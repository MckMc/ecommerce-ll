if (!window.__rtLoaded) {
  window.__rtLoaded = true;

  console.log('[rt] script loaded');
  const socket = io();

  socket.on('connect', () => console.log('[rt] connected'));

  const listEl = document.getElementById('list');

  socket.on('products', (items) => {
    console.log('[rt] products received:', items.length);
    listEl.innerHTML = items.map(p =>
      `<li><b>${p.title}</b> — $${p.price} — id: ${p.id}</li>`
    ).join('');
  });

  document.getElementById('createForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.status = true;
    data.thumbnails = [];
    data.price = Number(data.price);
    data.stock = Number(data.stock);
    console.log('[rt] emit createProduct', data);
    socket.emit('createProduct', data, (resp) => {
      console.log('[rt] createProduct resp:', resp);
      if (!resp?.ok) alert(resp?.error || 'Error al crear');
      e.target.reset();
    });
  });

  document.getElementById('deleteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const { pid } = Object.fromEntries(new FormData(e.target));
    console.log('[rt] emit deleteProduct', pid);
    socket.emit('deleteProduct', pid, (resp) => {
      console.log('[rt] deleteProduct resp:', resp);
      if (!resp?.ok) alert(resp?.error || 'Error al eliminar');
      e.target.reset();
    });
  });
}
