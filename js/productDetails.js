function changeMainImage(src) {
    document.getElementById('mainImage').src = src;
}

// Ensure only one .selected per group
function setupOptionButtons() {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            btn.parentElement.querySelectorAll('.option-btn').forEach(sib => sib.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
}

function getSelectedOptionText(group) {
    const selected = group.querySelector('.selected');
    return selected ? selected.textContent.trim() : '';
}

document.addEventListener('DOMContentLoaded', function () {
    setupOptionButtons();

    // Quantity validation
    const qtyInput = document.querySelector('.qty-input');
    if (qtyInput) {
        qtyInput.addEventListener('input', function () {
            if (this.value < 1) this.value = 1;
        });
    }

    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (!addToCartBtn) return;

    addToCartBtn.addEventListener('click', function () {
        const name = document.querySelector('h1').textContent.trim();
        const priceText = document.querySelector('.price').textContent.replace(/[^\d]/g, '');
        const price = Number(priceText);
        const img = document.getElementById('mainImage')?.src || '';
        const desc = name;

        // Get color/size
        const optionGroups = Array.from(document.querySelectorAll('.mb-4 .d-flex.gap-2.flex-wrap'));
        const color = optionGroups[0] ? getSelectedOptionText(optionGroups[0]) : '';
        const size = optionGroups[1] ? getSelectedOptionText(optionGroups[1]) : '';

        const qty = parseInt(qtyInput?.value, 10) || 1;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item =>
            item.name === name && item.color === color && item.size === size
        );
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ name, price, img, desc, color, size, qty });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'cart.html';
    });
});