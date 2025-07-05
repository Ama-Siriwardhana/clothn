// js/pay.js

function submitShipping(e) {
  e.preventDefault();

  // Show confirmation box
  document.getElementById('shipping-form-wrapper').style.display = 'none';
  document.getElementById('confirm-box').style.display = 'block';

  // Change payment button
  const payBtn = document.getElementById('pay-btn');
  payBtn.innerText = 'Pay Now';
  payBtn.classList.remove('btn-outline-success');
  payBtn.classList.add('btn-success');
}

function editShipping() {
  // Reopen form
  document.getElementById('shipping-form-wrapper').style.display = 'block';
  document.getElementById('confirm-box').style.display = 'none';

  // Optional: reset payment button if needed
  const payBtn = document.getElementById('pay-btn');
  payBtn.innerText = 'Continue to Pay';
  payBtn.classList.remove('btn-success');
  payBtn.classList.add('btn-outline-success');
}

function submitShipping(event) {
  event.preventDefault();

  // Hide shipping form
  document.getElementById('shipping-form-wrapper').style.display = 'none';

  // Show confirmation box
  document.getElementById('confirm-box').style.display = 'block';

  // Show payment form
  document.getElementById('payment-box').style.display = 'block';
}
function showPaymentBox() {
  const paymentBox = document.getElementById("payment-box");
  paymentBox.style.display = "block";
  paymentBox.scrollIntoView({ behavior: "smooth" });
}

function revealPaymentForm() {
  document.getElementById("show-payment-form-container").style.display = "none";
  document.getElementById("payment-form").style.display = "block";
}

function submitShipping(event) {
  event.preventDefault();
  document.getElementById("shipping-form-wrapper").style.display = "none";
  document.getElementById("confirm-box").style.display = "block";
  showPaymentBox(); // Automatically show payment box when shipping submitted
}

function editShipping() {
  document.getElementById("shipping-form-wrapper").style.display = "block";
  document.getElementById("confirm-box").style.display = "none";
  document.getElementById("payment-box").style.display = "none";
  document.getElementById("show-payment-form-container").style.display = "block";
  document.getElementById("payment-form").style.display = "none";
}

function submitPayment(event) {
  event.preventDefault();
  alert("Payment submitted successfully!");
}
