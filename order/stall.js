const categoryButtons = document.querySelectorAll(".menu-category");
const foodCards = document.querySelectorAll(".food-card");

const modal = document.querySelector("#meal-modal");
const modalName = document.querySelector("#modal-name");
const modalDescription = document.querySelector("#modal-description");
const modalPrice = document.querySelector("#modal-price");

const mealSize = document.querySelector("#meal-size");
const mealAddon = document.querySelector("#meal-addon");

const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

let selectedMeal = null;
let cart = [];

// Filter menu categories

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        foodCards.forEach(card => {
            card.style.display = category === "all" || card.dataset.category === category ? "flex" : "none";
        });
    });
});

// Open meal options

foodCards.forEach(card => {
    card.querySelector(".add-btn").addEventListener("click", () => {
        selectedMeal = card;

        modalName.textContent = card.dataset.name;
        modalDescription.textContent = card.querySelector(".food-info p").textContent;

        mealSize.value = "0";
        mealAddon.value = "0";

        updateModalPrice();
        modal.hidden = false;
    });
});

// Calculate meal price

function updateModalPrice() {
    if (!selectedMeal) return;

    const basePrice = Number(selectedMeal.dataset.price);
    const sizePrice = Number(mealSize.value);
    const addonPrice = Number(mealAddon.value);

    const total = basePrice + sizePrice + addonPrice;

    modalPrice.textContent = `Price: $${total.toFixed(2)}`;
}

mealSize.addEventListener("change", updateModalPrice);
mealAddon.addEventListener("change", updateModalPrice);

// Close modal

document.querySelector("#modal-close").addEventListener("click", () => {
    modal.hidden = true;
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.hidden = true;
    }
});

// Add selected meal to cart

document.querySelector("#confirm-add").addEventListener("click", () => {
    if (!selectedMeal) return;

    const name = selectedMeal.dataset.name;
    const basePrice = Number(selectedMeal.dataset.price);
    const sizePrice = Number(mealSize.value);
    const addonPrice = Number(mealAddon.value);

    const price = basePrice + sizePrice + addonPrice;

    const sizeName = mealSize.selectedOptions[0].textContent;
    const addonName = mealAddon.selectedOptions[0].textContent;

    const details = `${sizeName}, ${addonName}`;

    const existingItem = cart.find(item => item.name === name && item.details === details);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name, details, price, quantity: 1
        });
    }

    modal.hidden = true;
    renderCart();
});

// Update cart display

function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your order is currently empty.</p>';
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const name = document.createElement("strong");
        name.textContent = item.name;

        const details = document.createElement("small");
        details.textContent = item.details;

        info.append(name, details);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const decrease = document.createElement("button");
        decrease.type = "button";
        decrease.textContent = "−";
        decrease.setAttribute("aria-label", "Decrease quantity");

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increase = document.createElement("button");
        increase.type = "button";
        increase.textContent = "+";
        increase.setAttribute("aria-label", "Increase quantity");

        decrease.addEventListener("click", () => {
            item.quantity--;

            if (item.quantity <= 0) {
                cart.splice(index, 1);
            }

            renderCart();
        });

        increase.addEventListener("click", () => {
            item.quantity++;
            renderCart();
        });

        controls.append(decrease, quantity, increase);
        row.append(info, controls);

        cartItems.appendChild(row);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const stallName = document.body.dataset.stallName;

    localStorage.setItem(
        "paymentCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "paymentStall",
        stallName
    );

    window.location.href = "payment.html";
}

// Simulated checkout
document.querySelector(".checkout-btn").addEventListener("click", () => {
    const message = document.querySelector("#checkout-message");

    if (cart.length === 0) {
        message.textContent = "Please add an item to your order first.";
        return;
    }

    checkout();
});
