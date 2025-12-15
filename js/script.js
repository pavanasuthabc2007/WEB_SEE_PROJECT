/* =========================
   CHECKOUT FORM VALIDATION
========================= */

function validateCheckout() {

    let name = document.getElementById("fullName").value.trim();
    let phone = document.getElementById("phoneNum").value.trim();
    let address = document.getElementById("deliveryAddress").value.trim();
    let pincode = document.getElementById("pincode").value.trim();
    let msg = document.getElementById("orderMessage");

    if (name.length < 3) {
        msg.style.color = "red";
        msg.innerText = "Name must be at least 3 characters.";
        return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
        msg.style.color = "red";
        msg.innerText = "Phone number must be 10 digits.";
        return false;
    }

    if (address.length < 10) {
        msg.style.color = "red";
        msg.innerText = "Address must be at least 10 characters.";
        return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
        msg.style.color = "red";
        msg.innerText = "Pincode must be 6 digits.";
        return false;
    }

    // ✅ SUCCESS
    msg.style.color = "green";
    msg.innerText = "🎉 Your order has been placed successfully!";

    // Clear cart AFTER order
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTotal");

    return false; // stop actual submit (for project)
}

/* =========================
   CATEGORY FILTER
========================= */

function filterCategory(category, btn) {
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let productCategory = product.getAttribute("data-category");
        product.style.display =
            category === "All" || productCategory === category ? "block" : "none";
    });

    document.querySelectorAll(".filter-btn")
        .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
}

/* =========================
   ADD TO CART
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".product").forEach(product => {

    let btn = document.createElement("button");
    btn.innerText = "Add to Cart";
    btn.className = "add-cart-btn";

    btn.onclick = () => {
        let name = product.querySelector("h3").innerText;
        let price = parseInt(product.querySelector("p").innerText.replace(/\D/g, ""));
        let img = product.querySelector("img").src;

        let existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1, img });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(name + " added to cart");
    };

    product.appendChild(btn);
});

/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts() {
    const input = document.getElementById("searchBar").value.toLowerCase();
    const products = document.querySelectorAll(".product");
    const msg = document.getElementById("no-products-msg");

    let found = false;

    products.forEach(product => {
        let name = product.querySelector("h3").innerText.toLowerCase();
        if (name.includes(input)) {
            product.style.display = "block";
            found = true;
        } else {
            product.style.display = "none";
        }
    });

    msg.style.display = found ? "none" : "block";
}

/* =========================
   SHOW TOTAL IN CHECKOUT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const total = localStorage.getItem("cartTotal");
    const totalDiv = document.getElementById("checkoutTotal");

    if (totalDiv && total) {
        totalDiv.innerText = "Total Amount to Pay: ₹" + total;
    }
});
