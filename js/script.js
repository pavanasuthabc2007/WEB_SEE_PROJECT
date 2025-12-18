// Get category from URL
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get('category');

if (selectedCategory) {
    filterCategory(selectedCategory); // show only selected category
    // Highlight the selected button
    const buttons = document.querySelectorAll('#category-filters .filter-btn');
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.textContent === selectedCategory);
    });
}
/*--checkout---*/
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

       

      
       // form.reset();
       

        console.log("test")
    });
}
/*----filter category ----*/
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
/* =========================
   AUTO ADD ADD-TO-CART BUTTONS
========================= */let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".product").forEach(product => {
    let btn = document.createElement("button");
    btn.innerText = "Add to Cart";
    btn.className = "add-cart-btn";

   btn.onclick = () => {
    let name = product.querySelector("h3").innerText;
    let priceText = product.querySelector("p").innerText;
    let price = parseInt(priceText.replace(/\D/g, ""));
    let img = product.querySelector("img").src;  // ← ADD THIS

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1, img });  // ← ADD IMAGE HERE
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart");
};

    product.appendChild(btn);
});
/*------------------banner--------------------*/

let index = 0;
const track = document.querySelector(".banner-track");
const dots = document.querySelectorAll(".dot");
const total = dots.length;

function moveSlide(i) {
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach(d => d.classList.remove("active"));
    dots[i].classList.add("active");
    index = i;
}

// Auto slide
setInterval(() => {
    let next = (index + 1) % total;
    moveSlide(next);
}, 3500);

// Dot click
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => moveSlide(i));
});

function searchProducts() {
    const searchInput = document.getElementById("searchBar").value.toLowerCase();
    const products = document.querySelectorAll(".product");
    const noProductsMsg = document.getElementById("no-products-msg");

    let found = false;

    products.forEach(product => {
        const productName = product.querySelector("h3").innerText.toLowerCase();

        if (productName.includes(searchInput)) {
            product.style.display = "block";
            found = true;
        } else {
            product.style.display = "none";
        }
    });

    // Show "Product not available" message if nothing matches
    if (!found) {
        noProductsMsg.style.display = "block";
    } else {
        noProductsMsg.style.display = "none";
    }
}




