function showOrderSummary() {

    // ===== FORM VALIDATION =====
    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phoneNum").value.trim();
    const address = document.getElementById("deliveryAddress").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    if (name.length < 3) {
        alert("Please enter a valid name");
        return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number");
        return;
    }

    if (address.length < 10) {
        alert("Please enter a valid address");
        return;
    }

    if (!/^\d{6}$/.test(pincode)) {
        alert("Please enter a valid 6-digit pincode");
        return;
    }

    // ===== ORDER SUMMARY =====
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("summary-total-price");
    const deliveryDateEl = document.getElementById("delivery-date");

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

    // Total price
    orderTotal.innerText = `₹${total}`;

    // Delivery date (+3 days)
    const today = new Date();
    const delivery = new Date(today);
    delivery.setDate(today.getDate() + 3);

    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    deliveryDateEl.innerHTML =
        `📦 Estimated Delivery: <strong>${delivery.toLocaleDateString('en-IN', options)}</strong>`;

    // Success message
    orderItems.innerHTML += `
        <p class="success-msg">
            ✅ Your order is successfully placed
        </p>
    `;
}
