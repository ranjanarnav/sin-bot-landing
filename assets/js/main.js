// Scroll Animation

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.1
});

document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
});


// Navbar Scroll Effect

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add(
            "nav-scroll"
        );

    } else {

        navbar.classList.remove(
            "nav-scroll"
        );

    }

});

// Interactive Commands

const buttons = document.querySelectorAll(".command-btn");
const preview = document.getElementById("command-preview");

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const title = button.dataset.title;
        const message = button.dataset.message;
        const color = button.dataset.color;

        let icon = "fa-terminal";
        let glow = "text-red-600";

        if (color === "green") {
            icon = "fa-check-circle";
            glow = "text-green-500";
        }

        if (color === "yellow") {
            icon = "fa-triangle-exclamation";
            glow = "text-yellow-500";
        }

        preview.innerHTML = `

            <div class="command-preview-success">

                <i class="fa-solid ${icon} text-6xl ${glow} mb-6"></i>

                <h3 class="text-3xl font-bold mb-4">
                    ${title}
                </h3>

                <p class="text-zinc-400 text-lg max-w-md">
                    ${message}
                </p>

            </div>

        `;

    });

});

const destroyOverlay = document.getElementById("destroy-overlay");

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        if (button.dataset.destroy === "true") {

            // Shake Screen

            document.body.style.animation =
                "shake 0.2s infinite";

            setTimeout(() => {

                document.body.style.animation = "";

                destroyOverlay.classList.remove("hidden");
                destroyOverlay.classList.add("flex");

            }, 1200);

        }

    });

});
// Counter Animation

const counters = document.querySelectorAll(".counter");
const decimalCounters = document.querySelectorAll(".counter-decimal");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            // INTEGER COUNTERS

            counters.forEach((counter) => {

                const target =
                +counter.getAttribute("data-target");

                let count = 0;

                const updateCounter = () => {

                    const increment = target / 80;

                    if(count < target){

                        count += increment;

                        counter.innerText =
                        Math.ceil(count);

                        requestAnimationFrame(updateCounter);

                    }else{

                        counter.innerText = target;

                    }

                };

                updateCounter();

            });

            // DECIMAL COUNTER

            decimalCounters.forEach((counter) => {

                const target =
                parseFloat(counter.dataset.target);

                let count = 0;

                const updateDecimal = () => {

                    const increment = target / 80;

                    if(count < target){

                        count += increment;

                        counter.innerText =
                        count.toFixed(1);

                        requestAnimationFrame(updateDecimal);

                    }else{

                        counter.innerText =
                        target.toFixed(1);

                    }

                };

                updateDecimal();

            });

            counterObserver.disconnect();

        }

    });

}, {
    threshold: 0.5
});

const statsSection =
document.getElementById("stats");

counterObserver.observe(statsSection);