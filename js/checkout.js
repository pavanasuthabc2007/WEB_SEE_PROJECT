function showOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("summary-total-price");
    const deliveryDateEl = document.getElementById("delivery-date");

    if (!orderItems || !orderTotal || !deliveryDateEl) {
        console.error("Required HTML elements not found!");
        return;
    }

    orderItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        orderItems.innerHTML = "<p>Your cart is empty!</p>";
        orderTotal.innerText = "₹0";
        deliveryDateEl.innerHTML = "";
        return;
    }

    cart.forEach(item => {
        total += Number(item.price) * Number(item.qty);

        orderItems.innerHTML += `
            <div class="order-item">
                <img src="${item.img}" width="50">
                <div>
                    <p><strong>${item.name}</strong></p>
                    <p>₹${item.price} × ${item.qty}</p>
                </div>
            </div>
        `;
    });

    // Show total on same line
    orderTotal.innerText = `₹${total}`;

    // Show delivery date below total
    const today = new Date();
    const delivery = new Date(today);
    delivery.setDate(today.getDate() + 1); // 3 days delivery

    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    deliveryDateEl.innerHTML = `📦 Estimated Delivery: <strong>${delivery.toLocaleDateString('en-IN', options)}</strong>`;

    // Success message
    orderItems.innerHTML += `
        <p class="success-msg">
            ✅ Your order is successfully placed
        </p>
    `;
}
