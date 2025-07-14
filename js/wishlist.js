document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('wishlist-container');
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  function showMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = text;
    msgDiv.style.backgroundColor = '#d4edda';
    msgDiv.style.color = '#155724';
    msgDiv.style.padding = '12px 20px';
    msgDiv.style.border = '1px solid #c3e6cb';
    msgDiv.style.borderRadius = '6px';
    msgDiv.style.margin = '10px auto';
    msgDiv.style.width = 'fit-content';
    msgDiv.style.fontWeight = 'bold';
    msgDiv.style.textAlign = 'center';
    document.body.prepend(msgDiv);

    setTimeout(() => {
      msgDiv.style.transition = 'opacity 0.5s ease';
      msgDiv.style.opacity = '0';
      setTimeout(() => msgDiv.remove(), 500);
    }, 3000);
  }

  function renderWishlist() {
    container.innerHTML = '';

    if (wishlist.length === 0) {
      container.innerHTML = `<p class="empty-msg">Your wishlist is empty.</p>`;
      return;
    }

    wishlist.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'wishlist-card';
      card.innerHTML = `
        <div class="image-container">
          <img src="assests/Wproduct1.jpg" alt="Floral Midi Dress" />
        </div>
        <h3>Floral Midi Dress</h3>
        <p class="price">Rs.2390</p>
        <div class="wishlist-actions">
          <button class="add-to-cart-btn" data-index="${index}">Add to cart</button>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;
      container.appendChild(card);
    });

    // Attach event listeners
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const index = parseInt(this.dataset.index);
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        renderWishlist(); // Refresh UI
      });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const index = parseInt(this.dataset.index);
        const item = wishlist[index];

        const cartItem = {
          name: item.name,
          price: item.price,
          img: item.image,
          desc: item.name,
          qty: 1
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(ci => ci.name === cartItem.name);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showMessage('Item added to cart successfully!');
      });
    });
  }

  // Show message if exists
  const message = localStorage.getItem('wishlistMessage');
  if (message) {
    showMessage(message);
    localStorage.removeItem('wishlistMessage');
  }

  renderWishlist();
});
