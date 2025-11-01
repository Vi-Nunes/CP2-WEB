// script.js — loja simples (renderiza produtos, carrinho, busca, persistência local)
document.addEventListener("DOMContentLoaded", () => {
  // catálogo básico (id, nome, gênero, preço, cor de thumbnail)
  const products = [
    { id: "p1", name: "Aventura Épica", genre: "Aventura", price: 129.90, color: "#2563eb" },
    { id: "p2", name: "Construção & Pixel", genre: "Sandbox", price: 49.90, color: "#16a34a" },
    { id: "p3", name: "Corrida Turbo", genre: "Corrida", price: 79.90, color: "#ef4444" },
    { id: "p4", name: "RPG Sombrio", genre: "RPG", price: 99.90, color: "#7c3aed" },
    { id: "p5", name: "Indie Emocionante", genre: "Indie", price: 29.90, color: "#f59e0b" }
  ];

  // elementos
  const gamesEl = document.getElementById("games");
  const q = document.getElementById("q");
  const cartBtn = document.getElementById("cartBtn");
  const cart = document.getElementById("cart");
  const overlay = document.getElementById("overlay");
  const closeCart = document.getElementById("closeCart");
  const cartItemsEl = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const clearCart = document.getElementById("clearCart");
  const checkout = document.getElementById("checkout");

  // carregar carrinho do localStorage
  const STORAGE_KEY = "loja_simples_cart_v1";
  let cartState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); // {productId: qty}

  // util
  const formatBRL = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const findProduct = id => products.find(p => p.id === id);

  // renderiza catálogo (filtra por texto)
  function renderCatalog(filter = "") {
    gamesEl.innerHTML = "";
    const f = filter.trim().toLowerCase();
    products
      .filter(p => p.name.toLowerCase().includes(f) || p.genre.toLowerCase().includes(f))
      .forEach(p => {
        const li = document.createElement("li");
        li.className = "game";
        li.innerHTML = `
          <div class="thumb" style="background:${p.color}"></div>
          <div style="flex:1">
            <p class="g-title">${p.name}</p>
            <p class="g-genre">${p.genre}</p>
          </div>
          <div class="row" style="margin-top:8px">
            <div class="price">${formatBRL(p.price)}</div>
            <button data-id="${p.id}" class="btn add">Adicionar</button>
          </div>
        `;
        gamesEl.appendChild(li);
      });
  }

  // atualiza contador e total
  function updateCartUI() {
    const ids = Object.keys(cartState);
    const count = ids.reduce((s, id) => s + cartState[id], 0);
    cartCount.textContent = count;
    // total
    const total = ids.reduce((s, id) => {
      const p = findProduct(id);
      return s + (p ? p.price * cartState[id] : 0);
    }, 0);
    cartTotal.textContent = formatBRL(total);
  }

  // renderiza items do carrinho
  function renderCartItems() {
    cartItemsEl.innerHTML = "";
    const ids = Object.keys(cartState);
    if (ids.length === 0) {
      cartItemsEl.innerHTML = `<p style="color:var(--muted);padding:12px;text-align:center">Carrinho vazio</p>`;
      return;
    }

    ids.forEach(id => {
      const qty = cartState[id];
      const p = findProduct(id);
      if (!p) return;
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <div class="c-thumb" style="background:${p.color}"></div>
        <div class="c-info">
          <p class="c-title">${p.name}</p>
          <div class="c-meta">
            <div class="qty">
              <button class="dec" data-id="${id}">−</button>
              <span>${qty}</span>
              <button class="inc" data-id="${id}">+</button>
            </div>
            <div style="margin-left:auto;font-weight:700">${formatBRL(p.price * qty)}</div>
            <button class="remove" data-id="${id}" title="Remover">✕</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(li);
    });
  }

  // persistir carrinho
  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
    renderCartItems();
    updateCartUI();
  }

  // adicionar produto
  function addToCart(id, amount = 1) {
    cartState[id] = (cartState[id] || 0) + amount;
    saveCart();
  }

  // alterar quantidade (pode remover)
  function changeQty(id, delta) {
    if (!cartState[id]) return;
    cartState[id] += delta;
    if (cartState[id] <= 0) delete cartState[id];
    saveCart();
  }

  // remover item
  function removeItem(id) {
    delete cartState[id];
    saveCart();
  }

  // limpar carrinho
  function clearAll() {
    cartState = {};
    saveCart();
  }

  // abrir/fechar carrinho
  function openCart() {
    cart.setAttribute("aria-hidden", "false");
    overlay.hidden = false;
  }
  function closeCartFn() {
    cart.setAttribute("aria-hidden", "true");
    overlay.hidden = true;
  }

  // eventos
  gamesEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button.add");
    if (!btn) return;
    const id = btn.dataset.id;
    addToCart(id, 1);
  });

  cartBtn.addEventListener("click", openCart);
  closeCart.addEventListener("click", closeCartFn);
  overlay.addEventListener("click", closeCartFn);

  cartItemsEl.addEventListener("click", (e) => {
    const inc = e.target.closest("button.inc");
    const dec = e.target.closest("button.dec");
    const rem = e.target.closest("button.remove");
    if (inc) changeQty(inc.dataset.id, 1);
    if (dec) changeQty(dec.dataset.id, -1);
    if (rem) removeItem(rem.dataset.id);
  });

  clearCart.addEventListener("click", () => {
    if (confirm("Deseja limpar o carrinho?")) clearAll();
  });

  checkout.addEventListener("click", () => {
    const ids = Object.keys(cartState);
    if (ids.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }
    // Simulação de checkout — aqui você integraria pagamento/servidor
    const total = ids.reduce((s, id) => s + findProduct(id).price * cartState[id], 0);
    alert(`Compra simulada!\nItens: ${ids.length}\nTotal: ${formatBRL(total)}\n\nObrigado!`);
    clearAll();
    closeCartFn();
  });

  // busca
  q.addEventListener("input", () => renderCatalog(q.value));

  // inicial
  renderCatalog();
  updateCartUI();
  renderCartItems();
});
