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

        const isOpen =
            mainNav.classList.contains("active");

        menuBtn.textContent =
            isOpen ? "✕" : "☰";

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        /* Right-side mobile menu */
        if (isOpen) {
            mainNav.style.left = "auto";
            mainNav.style.right = "15px";
            mainNav.style.textAlign = "right";
            mainNav.style.alignItems = "flex-end";
        } else {
            mainNav.style.left = "";
            mainNav.style.right = "";
            mainNav.style.textAlign = "";
            mainNav.style.alignItems = "";
        }

    });


    /* Close menu after clicking a link */

    mainNav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            mainNav.classList.remove("active");

            menuBtn.textContent = "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            mainNav.style.left = "";
            mainNav.style.right = "";
            mainNav.style.textAlign = "";
            mainNav.style.alignItems = "";

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


/* =====================================================
   AHS CRAFT — 300 FRAME CINEMATIC INTRO
===================================================== */

const cinematicIntro = document.getElementById("cinematicIntro");
const canvas = document.getElementById("ahsFrameCanvas");
const currentFrameText = document.getElementById("currentFrame");
const progressBar = document.getElementById("cinematicProgress");

if (cinematicIntro && canvas) {

    const ctx = canvas.getContext("2d");

    const TOTAL_FRAMES = 100;

    const images = [];
    let loadedFrames = 0;

    let targetFrame = 0;
    let displayedFrame = 0;

    function framePath(frame) {
        const number = String(frame).padStart(3, "0");
        return `./assets/3D_scroll_animation_for_website_20261006100225_${number}.webp`;
    }

    /* ---------------------------------------------
       PRELOAD ALL 300 FRAMES
    --------------------------------------------- */

    for (let i = 1; i <= TOTAL_FRAMES; i++) {

        const img = new Image();

        img.src = framePath(i);

        img.onload = () => {
            loadedFrames++;

            if (i === 1) {
                drawFrame(0);
            }
        };

        images.push(img);
    }


    /* ---------------------------------------------
       CANVAS RESIZE
    --------------------------------------------- */

    function resizeCanvas() {

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        drawFrame(Math.round(displayedFrame));
    }


    /* ---------------------------------------------
       DRAW FRAME
    --------------------------------------------- */

    function drawFrame(index) {

        const image = images[index];

        if (!image || !image.complete || !image.naturalWidth) {
            return;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;

        ctx.clearRect(0, 0, width, height);

        const imageRatio =
            image.naturalWidth / image.naturalHeight;

        const screenRatio =
            width / height;

        let drawWidth;
        let drawHeight;

        /*
         * CONTAIN
         * Keeps the original frame completely visible.
         */

        if (imageRatio > screenRatio) {

            drawWidth = width;
            drawHeight = width / imageRatio;

        } else {

            drawHeight = height;
            drawWidth = height * imageRatio;
        }

        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;

        ctx.drawImage(
            image,
            x,
            y,
            drawWidth,
            drawHeight
        );
    }


    /* ---------------------------------------------
       SCROLL → FRAME
    --------------------------------------------- */

    function updateCinematicFrame() {

        const rect = cinematicIntro.getBoundingClientRect();

        const scrollDistance =
            cinematicIntro.offsetHeight -
            window.innerHeight;

        const travelled =
            Math.min(
                Math.max(-rect.top, 0),
                scrollDistance
            );

        const progress =
            scrollDistance > 0
                ? travelled / scrollDistance
                : 0;

        targetFrame =
            progress * (TOTAL_FRAMES - 1);

        /*
         * Smooth frame movement
         */

        displayedFrame +=
            (targetFrame - displayedFrame) * 0.12;

        const frameIndex =
            Math.round(displayedFrame);

        drawFrame(frameIndex);

        /* Counter */

        if (currentFrameText) {

            currentFrameText.textContent =
                String(frameIndex + 1).padStart(3, "0");
        }

        /* Progress */

        if (progressBar) {

            progressBar.style.width =
                `${progress * 100}%`;
        }

        requestAnimationFrame(
            updateCinematicFrame
        );
    }


    window.addEventListener(
        "resize",
        resizeCanvas
    );

    resizeCanvas();

    requestAnimationFrame(
        updateCinematicFrame
    );
}

/* =========================================
   AHS CRAFT — SUBTLE 3D CURSOR
   Add at the very bottom of scrip.js
========================================= */

(function () {

    if (!window.matchMedia("(pointer: fine)").matches) {
        return;
    }

    if (document.querySelector(".ahs-3d-cursor")) {
        return;
    }

    const cursor = document.createElement("div");

    cursor.className = "ahs-3d-cursor";

    cursor.innerHTML = `
        <div class="ahs-cursor-trail"></div>

        <div class="ahs-cursor-ring ahs-ring-one">
            <div class="ahs-ring-inner">
                <span></span>
            </div>
        </div>

        <div class="ahs-cursor-ring ahs-ring-two">
            <div class="ahs-ring-inner">
                <span></span>
            </div>
        </div>

        <div class="ahs-cursor-orb">
            <div class="ahs-orb-core"></div>
            <div class="ahs-orb-light"></div>
        </div>
    `;

    document.body.appendChild(cursor);

    const style = document.createElement("style");

    style.textContent = `

        .ahs-3d-cursor {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999999;
        }

        /* Soft glow trail */
        .ahs-cursor-trail {
            position: fixed;
            left: 0;
            top: 0;
            width: 95px;
            height: 95px;
            border-radius: 50%;

            transform:
                translate3d(-50%, -50%, 0);

            background:
                radial-gradient(
                    circle,
                    rgba(0, 229, 255, 0.08),
                    rgba(124, 77, 255, 0.035) 45%,
                    transparent 72%
                );

            filter: blur(8px);
            opacity: 0;

            transition:
                opacity 0.35s ease;
        }


        /* Main orb */
        .ahs-cursor-orb {
            position: fixed;
            left: 0;
            top: 0;

            width: 22px;
            height: 22px;

            border-radius: 50%;

            transform:
                translate3d(-50%, -50%, 0);

            background:
                radial-gradient(
                    circle at 30% 25%,
                    #ffffff 0%,
                    #dfffff 10%,
                    #55eaff 25%,
                    #00d9ff 42%,
                    #586cff 65%,
                    #7c35ff 82%,
                    transparent 100%
                );

            box-shadow:
                0 0 7px rgba(255,255,255,0.9),
                0 0 15px rgba(0,229,255,0.7),
                0 0 28px rgba(0,229,255,0.35),
                0 0 40px rgba(124,77,255,0.22);

            opacity: 0;

            transition:
                width 0.3s ease,
                height 0.3s ease,
                opacity 0.35s ease;
        }


        /* Small white center */
        .ahs-orb-core {
            position: absolute;

            width: 7px;
            height: 7px;

            left: 5px;
            top: 5px;

            border-radius: 50%;

            background: #ffffff;

            filter: blur(0.7px);

            box-shadow:
                0 0 7px #ffffff,
                0 0 14px rgba(0,229,255,0.8);
        }


        /* Very soft pulse */
        .ahs-orb-light {
            position: absolute;
            inset: -6px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle,
                    transparent 45%,
                    rgba(0,229,255,0.14) 50%,
                    transparent 65%
                );

            animation:
                ahsOrbPulse 4s ease-in-out infinite;
        }


        /* Rings */
        .ahs-cursor-ring {
            position: fixed;

            left: 0;
            top: 0;

            border-radius: 50%;

            transform:
                translate3d(-50%, -50%, 0);

            opacity: 0;

            transition:
                opacity 0.35s ease,
                width 0.35s ease,
                height 0.35s ease;
        }


        .ahs-ring-one {
            width: 42px;
            height: 42px;

            border:
                1px solid rgba(0,229,255,0.5);

            box-shadow:
                0 0 12px rgba(0,229,255,0.08);
        }


        .ahs-ring-two {
            width: 58px;
            height: 58px;

            border:
                1px dashed rgba(124,77,255,0.4);
        }


        /* Inner elements handle rotation */
        .ahs-ring-inner {
            position: absolute;
            inset: -1px;

            border-radius: 50%;
        }


        .ahs-ring-one .ahs-ring-inner {
            animation:
                ahsRingRotate 8s linear infinite;
        }


        .ahs-ring-two .ahs-ring-inner {
            animation:
                ahsRingReverse 12s linear infinite;
        }


        /* Small ring points */
        .ahs-cursor-ring span {
            position: absolute;

            width: 4px;
            height: 4px;

            border-radius: 50%;

            background: #00e5ff;

            box-shadow:
                0 0 7px #00e5ff;
        }


        .ahs-ring-one span {
            top: -2px;
            left: 50%;

            transform:
                translateX(-50%);
        }


        .ahs-ring-two span {
            right: -2px;
            top: 50%;

            transform:
                translateY(-50%);

            background: #8b6cff;

            box-shadow:
                0 0 7px #8b6cff;
        }


        /* Hover effect */
        .ahs-3d-cursor.hover
        .ahs-cursor-orb {
            width: 17px;
            height: 17px;
        }


        .ahs-3d-cursor.hover
        .ahs-ring-one {
            width: 50px;
            height: 50px;
        }


        .ahs-3d-cursor.hover
        .ahs-ring-two {
            width: 66px;
            height: 66px;
        }


        /* Slow rotation */
        @keyframes ahsRingRotate {

            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }

        }


        @keyframes ahsRingReverse {

            from {
                transform: rotate(360deg);
            }

            to {
                transform: rotate(0deg);
            }

        }


        /* Soft pulse */
        @keyframes ahsOrbPulse {

            0%,
            100% {
                transform: scale(0.9);
                opacity: 0.45;
            }

            50% {
                transform: scale(1.08);
                opacity: 0.8;
            }

        }


        /* Mobile / touch devices */
        @media (pointer: coarse) {

            .ahs-3d-cursor {
                display: none !important;
            }

        }

    `;

    document.head.appendChild(style);


    const orb =
        cursor.querySelector(".ahs-cursor-orb");

    const ringOne =
        cursor.querySelector(".ahs-ring-one");

    const ringTwo =
        cursor.querySelector(".ahs-ring-two");

    const trail =
        cursor.querySelector(".ahs-cursor-trail");


    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let orbX = mouseX;
    let orbY = mouseY;

    let ringX = mouseX;
    let ringY = mouseY;

    let ring2X = mouseX;
    let ring2Y = mouseY;

    let trailX = mouseX;
    let trailY = mouseY;


    window.addEventListener(
        "mousemove",
        function (event) {

            mouseX = event.clientX;
            mouseY = event.clientY;

            orb.style.opacity = "1";
            ringOne.style.opacity = "1";
            ringTwo.style.opacity = "1";
            trail.style.opacity = "1";

        },
        { passive: true }
    );


    window.addEventListener(
        "mouseout",
        function (event) {

            if (!event.relatedTarget) {

                orb.style.opacity = "0";
                ringOne.style.opacity = "0";
                ringTwo.style.opacity = "0";
                trail.style.opacity = "0";

                cursor.classList.remove("hover");

            }

        }
    );


    /* Hover */
    document.addEventListener(
        "mouseover",
        function (event) {

            const target =
                event.target.closest(
                    "a, button, input, textarea, select"
                );

            if (target) {
                cursor.classList.add("hover");
            }

        }
    );


    document.addEventListener(
        "mouseout",
        function (event) {

            const target =
                event.target.closest(
                    "a, button, input, textarea, select"
                );

            if (target) {
                cursor.classList.remove("hover");
            }

        }
    );


    /* Smooth movement */
    function animate() {

        orbX +=
            (mouseX - orbX) * 0.22;

        orbY +=
            (mouseY - orbY) * 0.22;


        ringX +=
            (mouseX - ringX) * 0.10;

        ringY +=
            (mouseY - ringY) * 0.10;


        ring2X +=
            (mouseX - ring2X) * 0.065;

        ring2Y +=
            (mouseY - ring2Y) * 0.065;


        trailX +=
            (mouseX - trailX) * 0.035;

        trailY +=
            (mouseY - trailY) * 0.035;


        orb.style.transform =
            `translate3d(
                ${orbX}px,
                ${orbY}px,
                0
            ) translate3d(-50%, -50%, 0)`;


        ringOne.style.transform =
            `translate3d(
                ${ringX}px,
                ${ringY}px,
                0
            ) translate3d(-50%, -50%, 0)`;


        ringTwo.style.transform =
            `translate3d(
                ${ring2X}px,
                ${ring2Y}px,
                0
            ) translate3d(-50%, -50%, 0)`;


        trail.style.transform =
            `translate3d(
                ${trailX}px,
                ${trailY}px,
                0
            ) translate3d(-50%, -50%, 0)`;


        requestAnimationFrame(animate);

    }


    animate();

})();


/* =========================================
   AHS CRAFT — WELCOME LOADER
========================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("ahsWelcomeLoader");

    if (!loader) return;

    setTimeout(function () {
        loader.classList.add("hide");
    }, 2200);

});

