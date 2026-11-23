
/* Load cart information */

const orderItems = document.querySelector("#order-items");
const subtotalElement = document.querySelector("#subtotal");
const totalElement = document.querySelector("#total");

const payButton = document.querySelector("#pay-button");
const paymentOverlay = document.querySelector("#payment-overlay");
const confirmationMessage = document.querySelector("#confirmation-message");
const doneButton = document.querySelector("#done-button");

const pickupLocation = document.querySelector("#pickup-location");

const cart = JSON.parse(localStorage.getItem("paymentCart")) || [];
const stallName = localStorage.getItem("paymentStall") || "Cafeteria";

pickupLocation.textContent = stallName;

let subtotal = 0;

/* Display cart */

function displayOrder() {
    orderItems.innerHTML = "";
    subtotal = 0;

    if (cart.length === 0) {
        orderItems.innerHTML = "<p>Your cart is empty.</p>";
        payButton.disabled = true;
        payButton.style.opacity = "0.5";
        payButton.style.cursor = "not-allowed";
    }

    cart.forEach(item => {
        const quantity = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;
        const itemTotal = price * quantity;

        subtotal += itemTotal;

        const itemElement = document.createElement("div");
        itemElement.className = "order-item";

        const itemDetails = document.createElement("div");
        itemDetails.className = "item-details";

        const name = document.createElement("p");
        name.className = "item-name";
        name.textContent = item.name;

        const customization = document.createElement("p");
        customization.className = "item-description";
        customization.textContent = item.details || "No customizations";

        const quantityText = document.createElement("p");
        quantityText.className = "item-description";
        quantityText.textContent = `Quantity: ${quantity}`;

        itemDetails.append(name, customization, quantityText);

        const priceElement = document.createElement("span");
        priceElement.className = "item-price";
        priceElement.textContent = `$${itemTotal.toFixed(2)}`;

        itemElement.append(itemDetails, priceElement);

        orderItems.appendChild(itemElement);
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${subtotal.toFixed(2)}`;
}

displayOrder();

displayOrder();

/* Simulated payment */

payButton.addEventListener("click", () => {
    const selectedMethod = document.querySelector(
        'input[name="payment-method"]:checked'
    );

    if (!selectedMethod) {
        alert("Please select a payment method.");
        return;
    }

    confirmationMessage.textContent =
        `Your order has been placed using ${selectedMethod.value}.`;

    paymentOverlay.hidden = false;

    // Clear the saved payment cart
    localStorage.removeItem("paymentCart");
    localStorage.removeItem("paymentStall");
});

/* Finish */

doneButton.addEventListener("click", () => {
    window.location.href = "../order.html";
});
