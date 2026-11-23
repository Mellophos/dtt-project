const cafeteriaButtons = document.querySelectorAll(".cafeteria-btn");
const categoryButtons = document.querySelectorAll(".category-btn");
const stallCards = document.querySelectorAll(".stall-card");
const searchInput = document.querySelector("#food-search");

let selectedCafeteria = "all";
let selectedCategory = "all";

function filterStalls() {
    const search = searchInput.value.toLowerCase();

    stallCards.forEach(card => {
        const cafeteria = card.dataset.cafeteria;
        const categories = card.dataset.category.split(" ");
        const text = card.textContent.toLowerCase();

        const matchesCafeteria = selectedCafeteria === "all" || cafeteria === selectedCafeteria;

        const matchesCategory = selectedCategory === "all" || categories.includes(selectedCategory);

        const matchesSearch = text.includes(search);

        card.style.display = matchesCafeteria && matchesCategory && matchesSearch ? "flex" : "none";
    });
}

// Cafeteria selection
cafeteriaButtons.forEach(button => {
    button.addEventListener("click", () => {
        cafeteriaButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedCafeteria = button.dataset.cafeteria;

        filterStalls();
    });
});

// Category selection
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterStalls();
    });
});

// Search
searchInput.addEventListener("input", filterStalls);


/* Voice ordering simulation */

const voiceButton = document.querySelector("#voice-btn");
const voiceOverlay = document.querySelector("#voice-overlay");
const voiceClose = document.querySelector("#voice-close");

const voiceStatus = document.querySelector("#voice-status");
const micAnimation = document.querySelector("#mic-animation");

const voiceResult = document.querySelector("#voice-result");
const recognizedOrder = document.querySelector("#recognized-order");

const voiceActions = document.querySelector("#voice-actions");
const retryVoice = document.querySelector("#retry-voice");
const confirmVoice = document.querySelector("#confirm-voice");

const voiceInstruction = document.querySelector(".voice-instruction");

let listeningTimeout;

function startListening() {
    voiceStatus.textContent = "Listening for your order...";
    micAnimation.classList.add("listening");

    voiceResult.hidden = true;
    voiceActions.hidden = true;
    voiceInstruction.hidden = false;

    clearTimeout(listeningTimeout);

    // Simulate speech recognition
    listeningTimeout = setTimeout(() => {
        micAnimation.classList.remove("listening");

        voiceStatus.textContent = "Order recognised!";
        voiceInstruction.hidden = true;

        recognizedOrder.textContent = "1 Chicken Rice and 1 Iced Lemon Tea";

        voiceResult.hidden = false;
        voiceActions.hidden = false;
    }, 2500);
}

// Open overlay
voiceButton.addEventListener("click", () => {
    voiceOverlay.hidden = false;
    startListening();
});

// Retry simulated recognition
retryVoice.addEventListener("click", () => {
    startListening();
});

// Close overlay
function closeVoiceOverlay() {
    clearTimeout(listeningTimeout);
    voiceOverlay.hidden = true;
    micAnimation.classList.remove("listening");
}

voiceClose.addEventListener("click", closeVoiceOverlay);

// Close when clicking outside the modal
voiceOverlay.addEventListener("click", event => {
    if (event.target === voiceOverlay) {
        closeVoiceOverlay();
    }
});

// Simulated confirmation
confirmVoice.addEventListener("click", () => {
    const voiceCart = [
        {
            name: "Chicken Rice",
            details: "Regular, No Add-on",
            price: 4.50,
            quantity: 1
        },
        {
            name: "Iced Tea",
            details: "Regular, No Add-on",
            price: 1.50,
            quantity: 1
        }
    ];

    localStorage.setItem(
        "paymentCart",
        JSON.stringify(voiceCart)
    );

    localStorage.setItem(
        "paymentStall",
        "Rice Corner"
    );

    window.location.href = "order/payment.html";
});

// Initial filtering
filterStalls();
