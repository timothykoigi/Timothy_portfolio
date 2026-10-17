/* =========================================================
   TIMOTHY KOIGI — PORTFOLIO JAVASCRIPT
   ========================================================= */


/* ================= ELEMENTS ================= */

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

const backToTop = document.getElementById("backToTop");

const header = document.querySelector("header");

const year = document.getElementById("year");

const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");


/* ================= CURRENT YEAR ================= */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ================= MOBILE MENU ================= */

if (burger && navLinks) {

    burger.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        burger.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            navLinks.classList.remove("open");

            burger.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ================= HEADER SCROLL ================= */

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= ACTIVE NAV ================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 150;

    let currentSection = "home";

    sections.forEach((section) => {

        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (
            scrollPosition >= top &&
            scrollPosition < top + height
        ) {
            currentSection = section.id;
        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* ================= REVEAL ANIMATIONS ================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ================= SKILL BARS ================= */

const skillRows =
    document.querySelectorAll(".skill-row");


const skillObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const row = entry.target;

                const percentage =
                    Number(
                        row.dataset.pct || 0
                    );

                const fill =
                    row.querySelector(".bar-fill");

                const number =
                    row.querySelector(".pct");


                if (fill) {
                    fill.style.width =
                        `${percentage}%`;
                }


                if (number) {

                    animateNumber(
                        number,
                        percentage
                    );

                }


                observer.unobserve(row);

            });

        },
        {
            threshold: 0.3
        }
    );


skillRows.forEach((row) => {

    skillObserver.observe(row);

});


/* ================= RING SKILLS ================= */

const ringCards =
    document.querySelectorAll(".ring-card");


const ringObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const card =
                    entry.target;

                const percentage =
                    Number(
                        card.dataset.pct || 0
                    );

                const progress =
                    card.querySelector(".prog");

                const number =
                    card.querySelector(".ring-num");


                const circumference =
                    2 * Math.PI * 60;


                if (progress) {

                    progress.style.strokeDasharray =
                        circumference;

                    const offset =
                        circumference -
                        (
                            percentage / 100
                        ) *
                        circumference;

                    progress.style.strokeDashoffset =
                        offset;

                }


                if (number) {

                    animateNumber(
                        number,
                        percentage
                    );

                }


                observer.unobserve(card);

            });

        },
        {
            threshold: 0.35
        }
    );


ringCards.forEach((card) => {

    ringObserver.observe(card);

});


/* ================= NUMBER ANIMATION ================= */

function animateNumber(
    element,
    target
) {

    let current = 0;

    const duration = 1200;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        current =
            Math.floor(
                progress * target
            );


        element.textContent =
            `${current}%`;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                `${target}%`;

        }

    }


    requestAnimationFrame(
        update
    );

}


/* ================= CERTIFICATE MODAL ================= */

const certCards =
    document.querySelectorAll(".cert-card");

const certModal =
    document.getElementById("certModal");

const certModalClose =
    document.getElementById(
        "certModalClose"
    );

const certModalImg =
    document.getElementById(
        "certModalImg"
    );

const certModalTitle =
    document.getElementById(
        "certModalTitle"
    );

const certModalIssuer =
    document.getElementById(
        "certModalIssuer"
    );


function openCertificate(card) {

    if (!certModal) return;


    const image =
        card.dataset.img;

    const title =
        card.dataset.title;

    const issuer =
        card.dataset.issuer;


    certModalImg.src = image;

    certModalImg.alt =
        `${title} certificate`;


    certModalTitle.textContent =
        title;


    certModalIssuer.textContent =
        issuer;


    certModal.classList.add("open");

    certModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


function closeCertificate() {

    if (!certModal) return;


    certModal.classList.remove("open");

    certModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


certCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            openCertificate(card);

        }
    );

});


if (certModalClose) {

    certModalClose.addEventListener(
        "click",
        closeCertificate
    );

}


if (certModal) {

    certModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === certModal
            ) {

                closeCertificate();

            }

        }
    );

}


/* ================= ESCAPE MODAL ================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            certModal &&
            certModal.classList.contains("open")
        ) {

            closeCertificate();

        }

    }
);


/* ================= BACK TO TOP ================= */

window.addEventListener(
    "scroll",
    () => {

        if (!backToTop) return;


        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* ================= CONTACT FORM ================= */

/*
   Formspree handles the actual submission.

   We only change the button text while
   the browser submits the form.
*/

if (contactForm && submitButton) {

    contactForm.addEventListener(
        "submit",
        () => {

            submitButton.disabled = true;

            submitButton.innerHTML = `
                Sending...
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path d="M12 2v20"/>
                    <path d="M5 9l7-7 7 7"/>
                </svg>
            `;

        }
    );

}


/* ================= SIMPLE ROLE EFFECT ================= */

/*
   Keeps the original Full-Stack Developer
   identity while giving the hero a subtle
   typing-style animation.
*/

const typedRole =
    document.getElementById(
        "typedRole"
    );


if (typedRole) {

    const roles = [
        "Full-Stack Developer",
        "Backend Developer",
        "API Developer"
    ];

    let roleIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function typeRole() {

        const currentRole =
            roles[roleIndex];


        if (!deleting) {

            characterIndex++;

        } else {

            characterIndex--;

        }


        typedRole.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        let speed =
            deleting ? 45 : 80;


        if (
            !deleting &&
            characterIndex ===
                currentRole.length
        ) {

            speed = 1800;

            deleting = true;

        }


        if (
            deleting &&
            characterIndex === 0
        ) {

            deleting = false;

            roleIndex =
                (
                    roleIndex + 1
                ) % roles.length;

            speed = 400;

        }


        setTimeout(
            typeRole,
            speed
        );

    }


    /*
       Start after page load so the initial
       page doesn't look empty.
    */

    setTimeout(
        typeRole,
        1200
    );

}