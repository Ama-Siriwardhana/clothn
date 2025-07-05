document.addEventListener('DOMContentLoaded', function() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartDiv = document.getElementById('cart-items');
  if (!cart.length) {
    cartDiv.innerHTML = `
      <div class="cart-empty-box">
        <p>You do not have any products in your cart yet! <span style="font-size:2rem;">😕</span></p>
        <a href="womens.html" class="btn">Browse Products</a>
      </div>
    `;
    return;
  }
  let total = 0;
  let html = `
    <table class="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Description</th>
          <th>Color</th>
          <th>Size</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
  `;
  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    html += `
      <tr>
        <td><img src="${item.img}" class="img-thumbnail" style="max-width:80px;" alt="${item.name}"></td>
        <td>${item.name}<br>${item.desc}</td>
        <td>${item.color || '-'}</td>
        <td>${item.size || '-'}</td>
        <td>${item.qty}</td>
        <td>Rs. ${item.price.toLocaleString()}</td>
        <td>Rs. ${subtotal.toLocaleString()}</td>
      </tr>
    `;
  });
  html += `
      </tbody>
    </table>
    <div class="text-end fw-bold fs-4">Total: Rs. ${total.toLocaleString()}</div>
  `;
  cartDiv.innerHTML = html;
});