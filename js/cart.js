
function formatLKR(amount) {
  return "Rs. " + amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function cleanPrice(priceString) {
  let cleaned = priceString.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    const dec = parts.pop();
    cleaned = parts.join('') + '.' + dec;
  }
  return cleaned;
}

function calculateCart() {
  let subtotal = 0;
  let itemCount = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const qtyInput = item.querySelector('.cart-qty');
    const qty = parseInt(qtyInput && qtyInput.value ? qtyInput.value : "1", 10) || 1;
    const priceDiv = item.querySelector('.fw-bold.fs-5.text-danger');
    let priceText = priceDiv ? priceDiv.textContent : "0";
    priceText = cleanPrice(priceText);
    const price = parseFloat(priceText) || 0;
    subtotal += price * qty;
    itemCount += qty;
  });
  document.getElementById('cart-subtotal').textContent = formatLKR(subtotal);
  document.getElementById('cart-total').textContent = formatLKR(subtotal);
  document.getElementById('cart-count').textContent = itemCount + (itemCount > 1 ? " items" : " item");
}

document.addEventListener('DOMContentLoaded', function() {
  calculateCart();
  document.querySelectorAll('.cart-item').forEach(item => {
    const qtyInput = item.querySelector('.cart-qty');
    const plusBtn = item.querySelector('.plus-btn');
    const minusBtn = item.querySelector('.minus-btn');
    const removeBtn = item.querySelector('.remove-btn');

    if (plusBtn) {
      plusBtn.addEventListener('click', function() {
        qtyInput.value = parseInt(qtyInput.value, 10) + 1;
        calculateCart();
      });
    }
    if (minusBtn) {
      minusBtn.addEventListener('click', function() {
        if (parseInt(qtyInput.value, 10) > 1) {
          qtyInput.value = parseInt(qtyInput.value, 10) - 1;
          calculateCart();
        }
      });
    }
    if (qtyInput) {
      qtyInput.addEventListener('input', function() {
        if (parseInt(qtyInput.value, 10) < 1 || isNaN(parseInt(qtyInput.value, 10))) qtyInput.value = 1;
        calculateCart();
      });
    }
    if (removeBtn) {
      removeBtn.addEventListener('click', function() {
        item.remove();
        calculateCart();
      });
    }
  });
});