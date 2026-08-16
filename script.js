/* =========================================================
   CAREERBRIDGE CONSULTANCY
   JAVASCRIPT
========================================================= */


/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 500);

});


/* ================= HEADER ================= */

const header = document.querySelector(".header");

function handleHeader() {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", handleHeader);

handleHeader();


/* ================= MOBILE MENU ================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    nav.classList.toggle("open");

    document.body.classList.toggle("menu-open");

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        nav.classList.remove("open");

        document.body.classList.remove("menu-open");

    });

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= COUNTERS ================= */

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

function animateCounters() {

    if (countersStarted) return;

    const statsSection = document.querySelector(".stats-grid");

    const rect = statsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {

        countersStarted = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);

            let current = 0;

            const duration = 1600;

            const startTime = performance.now();


            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;

                const progress = Math.min(elapsed / duration, 1);

                const eased = 1 - Math.pow(1 - progress, 3);

                current = Math.floor(target * eased);

                counter.textContent = current;

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            }


            requestAnimationFrame(updateCounter);

        });

    }

}

window.addEventListener("scroll", animateCounters);

animateCounters();


/* ================= ACTIVE NAV ================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        if (!link.classList.contains("nav-link")) return;

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${current}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* ================= BACK TO TOP ================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const interest = document.getElementById("interest").value;
    const message = document.getElementById("message").value.trim();


    if (!name || !phone || !email || !message) {

        alert("Please fill in all required fields.");

        return;

    }


    const whatsappMessage =

        `Hello CareerBridge Consultancy,

` +
        `Name: ${name}
` +
        `Phone: ${phone}
` +
        `Email: ${email}
` +
        `Interested In: ${interest || "Not specified"}

` +
        `Message:
${message}`;


    const whatsappURL =
        `https://wa.me/918595460058?text=${encodeURIComponent(whatsappMessage)}`;


    window.open(
        whatsappURL,
        "_blank"
    );


    contactForm.reset();

});


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        menuToggle.classList.remove("active");
        nav.classList.remove("open");

        document.body.classList.remove("menu-open");

    }

});


/* ================= CURRENT YEAR ================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ================= IMAGE FALLBACK ================= */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.background = "#eef3fb";

        img.style.minHeight = "200px";

    });

});