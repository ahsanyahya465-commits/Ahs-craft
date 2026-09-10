/* =========================================================
   AHS CRAFT - SCRIPT.JS
   All website functions
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("AHS Craft JS Loaded");


    /* =====================================================
       1. MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const mainNav = document.getElementById("mainNav");

    if (menuBtn && mainNav) {

        menuBtn.addEventListener("click", function () {

            mainNav.classList.toggle("active");

            const isOpen = mainNav.classList.contains("active");

            menuBtn.textContent = isOpen ? "✕" : "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        // Close menu after clicking a link

        mainNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");

                menuBtn.textContent = "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       2. SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       3. CART
    ===================================================== */

    let cart = [];

    try {

        cart =
            JSON.parse(
                localStorage.getItem("ahsCraftCart")
            ) || [];

    } catch (error) {

        cart = [];

    }


    function saveCart() {

        localStorage.setItem(
            "ahsCraftCart",
            JSON.stringify(cart)
        );

    }


    function getCartCount() {

        return cart.reduce(function (total, item) {

            return total + item.quantity;

        }, 0);

    }


    function updateCartCount() {

        const count = getCartCount();

        const desktopCart =
            document.querySelector(".desktop-cart");

        const mobileCart =
            document.querySelector(".mobile-cart");


        if (desktopCart) {

            desktopCart.innerHTML =
                "🛒 Add to Cart" +
                (count > 0 ? " (" + count + ")" : "");

        }


        if (mobileCart) {

            mobileCart.innerHTML =
                "🛒 Add to Cart" +
                (count > 0 ? " (" + count + ")" : "");

        }

    }


    /* =====================================================
       4. CART MODAL HTML
    ===================================================== */

    const cartModal =
        document.createElement("div");

    cartModal.id = "ahs-cart-modal";

    cartModal.innerHTML = `

        <div class="ahs-cart-overlay"></div>

        <div class="ahs-cart-box">

            <button
                type="button"
                class="ahs-cart-close">
                ✕
            </button>

            <h2>🛒 Your Cart</h2>

            <div class="ahs-cart-items"></div>

            <div class="ahs-cart-footer">

                <button
                    type="button"
                    class="ahs-clear">
                    Clear Cart
                </button>

                <button
                    type="button"
                    class="ahs-whatsapp">
                    Order on WhatsApp
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(cartModal);


    /* =====================================================
       5. CART CSS
    ===================================================== */

    const cartStyle =
        document.createElement("style");

    cartStyle.textContent = `

        #ahs-cart-modal {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 99999;
        }

        #ahs-cart-modal.active {
            display: block;
        }

        .ahs-cart-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.75);
        }

        .ahs-cart-box {
            position: relative;
            z-index: 2;

            width: 92%;
            max-width: 520px;
            max-height: 85vh;

            overflow-y: auto;

            margin: 7vh auto;
            padding: 30px;

            background: #11100e;
            color: #fff;

            border-radius: 18px;
            border: 1px solid rgba(255,255,255,0.15);

            box-sizing: border-box;
        }

        .ahs-cart-box h2 {
            margin: 0 0 20px;
        }

        .ahs-cart-close {
            position: absolute;
            top: 15px;
            right: 15px;

            width: 38px;
            height: 38px;

            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 50%;

            background: transparent;
            color: white;

            cursor: pointer;
        }

        .ahs-cart-item {
            padding: 18px 0;
            border-bottom: 1px solid rgba(255,255,255,0.12);
        }

        .ahs-cart-item-name {
            font-weight: 600;
            margin-bottom: 12px;
        }

        .ahs-cart-controls {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .ahs-cart-controls button {
            padding: 7px 12px;

            background: transparent;
            color: white;

            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px;

            cursor: pointer;
        }

        .ahs-cart-qty {
            min-width: 25px;
            text-align: center;
        }

        .ahs-remove {
            margin-left: auto;
        }

        .ahs-cart-empty {
            text-align: center;
            padding: 35px 10px;
        }

        .ahs-cart-footer {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }

        .ahs-cart-footer button {
            flex: 1;
            padding: 13px;

            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }

        .ahs-clear {
            background: transparent;
            color: white;
            border: 1px solid rgba(255,255,255,0.2);
        }

        .ahs-whatsapp {
            background: #25D366;
            color: white;
            border: none;
        }

        @media (max-width: 600px) {

            .ahs-cart-box {
                margin: 5vh auto;
                padding: 22px;
            }

            .ahs-cart-footer {
                flex-direction: column;
            }

        }

    `;

    document.head.appendChild(cartStyle);


    /* =====================================================
       6. RENDER CART
    ===================================================== */

    function renderCart() {

        const container =
            cartModal.querySelector(".ahs-cart-items");


        if (cart.length === 0) {

            container.innerHTML = `

                <div class="ahs-cart-empty">

                    <div style="font-size:50px;">
                        🛒
                    </div>

                    <h3>Your cart is empty</h3>

                    <p>
                        Add a service from our Services section.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML = "";


        cart.forEach(function (item, index) {

            const itemBox =
                document.createElement("div");

            itemBox.className =
                "ahs-cart-item";


            itemBox.innerHTML = `

                <div class="ahs-cart-item-name">
                    ${escapeHTML(item.name)}
                </div>

                <div class="ahs-cart-controls">

                    <button
                        type="button"
                        data-action="minus"
                        data-index="${index}">
                        −
                    </button>

                    <span class="ahs-cart-qty">
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        data-action="plus"
                        data-index="${index}">
                        +
                    </button>

                    <button
                        type="button"
                        class="ahs-remove"
                        data-action="remove"
                        data-index="${index}">
                        Remove
                    </button>

                </div>

            `;


            container.appendChild(itemBox);

        });

    }


    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    /* =====================================================
       7. OPEN / CLOSE CART
    ===================================================== */

    function openCart() {

        renderCart();

        cartModal.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeCart() {

        cartModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    const desktopCart =
        document.querySelector(".desktop-cart");

    const mobileCart =
        document.querySelector(".mobile-cart");


    if (desktopCart) {

        desktopCart.addEventListener("click", function (event) {

            event.preventDefault();

            openCart();

        });

    }


    if (mobileCart) {

        mobileCart.addEventListener("click", function (event) {

            event.preventDefault();

            openCart();

        });

    }


    cartModal
        .querySelector(".ahs-cart-close")
        .addEventListener("click", closeCart);


    cartModal
        .querySelector(".ahs-cart-overlay")
        .addEventListener("click", closeCart);


    /* =====================================================
       8. CART + / - / REMOVE
    ===================================================== */

    cartModal
        .querySelector(".ahs-cart-items")
        .addEventListener("click", function (event) {

            const button =
                event.target.closest("button");

            if (!button) {
                return;
            }


            const action =
                button.dataset.action;

            const index =
                Number(button.dataset.index);


            if (!cart[index]) {
                return;
            }


            if (action === "plus") {

                cart[index].quantity++;

            }


            if (action === "minus") {

                cart[index].quantity--;

                if (cart[index].quantity <= 0) {

                    cart.splice(index, 1);

                }

            }


            if (action === "remove") {

                cart.splice(index, 1);

            }


            saveCart();

            updateCartCount();

            renderCart();

        });


    /* =====================================================
       9. CLEAR CART
    ===================================================== */

    cartModal
        .querySelector(".ahs-clear")
        .addEventListener("click", function () {

            if (cart.length === 0) {
                return;
            }


            if (
                confirm(
                    "Are you sure you want to clear the cart?"
                )
            ) {

                cart = [];

                saveCart();

                updateCartCount();

                renderCart();

            }

        });


    /* =====================================================
       10. ADD TO CART BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".add-to-cart")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const name =
                    this.dataset.name;


                if (!name) {
                    return;
                }


                const existing =
                    cart.find(function (item) {

                        return item.name === name;

                    });


                if (existing) {

                    existing.quantity++;

                } else {

                    cart.push({

                        name: name,

                        quantity: 1

                    });

                }


                saveCart();

                updateCartCount();


                const oldText =
                    this.textContent;


                this.textContent =
                    "✓ Added";


                this.disabled = true;


                const currentButton = this;


                setTimeout(function () {

                    currentButton.textContent =
                        oldText;

                    currentButton.disabled =
                        false;

                }, 1000);

            });

        });


    /* =====================================================
       11. CART → WHATSAPP
    ===================================================== */

    cartModal
        .querySelector(".ahs-whatsapp")
        .addEventListener("click", function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            let message =
                "Hello AHS Craft!\n\n" +
                "I would like to enquire about:\n\n";


            cart.forEach(function (item, index) {

                message +=
                    (index + 1) +
                    ". " +
                    item.name +
                    " x " +
                    item.quantity +
                    "\n";

            });


            message +=
                "\nPlease send me the details and quotation.";


            const url =
                "https://wa.me/94764829993?text=" +
                encodeURIComponent(message);


            window.open(
                url,
                "_blank"
            );

        });


    /* =====================================================
       12. PORTFOLIO FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const portfolioItems =
        document.querySelectorAll(".portfolio-item");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const filter =
                this.dataset.filter;


            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            this.classList.add("active");


            portfolioItems.forEach(function (item) {

                const categories =
                    (
                        item.dataset.category || ""
                    ).toLowerCase();


                if (
                    filter === "all" ||
                    categories.includes(
                        filter.toLowerCase()
                    )
                ) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });


    /* =====================================================
       13. SERVICE → GET A QUOTE
    ===================================================== */

    document
        .querySelectorAll(".service-actions a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                const card =
                    this.closest(".service-card");

                if (!card) {
                    return;
                }


                const heading =
                    card.querySelector("h3");

                const select =
                    document.getElementById("service");


                if (!heading || !select) {
                    return;
                }


                const serviceName =
                    heading.textContent
                        .trim()
                        .toLowerCase();


                Array.from(select.options)
                    .forEach(function (option) {

                        if (
                            option.textContent
                                .trim()
                                .toLowerCase() ===
                            serviceName
                        ) {

                            select.value =
                                option.value;

                        }

                    });

            });

        });


    /* =====================================================
       14. CONTACT FORM → WHATSAPP
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById("phone")
                        .value
                        .trim();


                const serviceSelect =
                    document.getElementById("service");


                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();


                if (
                    !name ||
                    !phone ||
                    !message
                ) {

                    alert(
                        "Please fill in all required fields."
                    );

                    return;

                }


                let service =
                    "Not selected";


                if (
                    serviceSelect &&
                    serviceSelect.value
                ) {

                    service =
                        serviceSelect
                            .options[
                                serviceSelect.selectedIndex
                            ]
                            .textContent
                            .trim();

                }


                const whatsappMessage =

                    "Hello AHS Craft!\n\n" +

                    "Name: " +
                    name +
                    "\n" +

                    "Phone: " +
                    phone +
                    "\n" +

                    "Service: " +
                    service +
                    "\n" +

                    "Project Details: " +
                    message;


                const whatsappURL =
                    "https://wa.me/94764829993?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       15. ESC KEY CLOSE CART
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeCart();

            }

        }
    );


    /* =====================================================
       16. INITIAL LOAD
    ===================================================== */

    updateCartCount();

    console.log(
        "AHS Craft - All JavaScript functions are ready."
    );

});


