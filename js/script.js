function validateCheckout() {
    event.preventDefault();     
    let form = document.getElementById("checkoutForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("fullName").value.trim();
        let phone = document.getElementById("phoneNum").value.trim();
        let address = document.getElementById("deliveryAddress").value.trim();
        let pincode = document.getElementById("pincode").value.trim();

        // Message box
        let msg = document.getElementById("orderMessage");

        // Validation
        if (name.length < 3) {
            msg.style.color = "red";
            msg.innerText = "Name must be at least 3 characters.";
            return;
        }

        if (!/^[6-9]\d{9}$/.test(phone)) {
            msg.style.color = "red";
            msg.innerText = "Phone number must be 10 digits.";
            return;
        }

        if (address.length < 10) {
            msg.style.color = "red";
            msg.innerText = "Address must be at least 10 characters.";
            return;
        }

        if (!/^\d{6}$/.test(pincode)) {
            msg.style.color = "red";
            msg.innerText = "Pincode must be 6 digits.";
            return;
        }

        // SUCCESS MESSAGE
        msg.style.color = "green";
        msg.innerText = "🎉 Your order has been placed successfully!";
      

        // Clear form + cart
       // form.reset();
       

        console.log("test")
    });
}
function filterCategory(category) {
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let productCategory = product.getAttribute("data-category");

        if (category === "All" || productCategory === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });

    // Highlight active button
    let buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");
}

