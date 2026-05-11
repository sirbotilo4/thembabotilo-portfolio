

/**
 * Themba Botilo — Portfolio JavaScript
 * Black / White / Gold edition
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     Auto-update age + copyright year
  ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    const birthday = new Date("2000-09-26");
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) age--;

    const ageEl = document.getElementById("age");
    const yearEl = document.getElementById("year");
    if (ageEl) ageEl.textContent = age;
    if (yearEl) yearEl.textContent = today.getFullYear();
  });

  /* ------------------------------------------------------------
     Helpers
  ------------------------------------------------------------ */
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  /* ------------------------------------------------------------
     Mobile nav toggle
  ------------------------------------------------------------ */
  const navToggle = select(".mobile-nav-toggle");
  const navbar = select("#navbar");

  if (navToggle && navbar) {
    navToggle.addEventListener("click", function () {
      navbar.classList.toggle("navbar-mobile");
      this.textContent = navbar.classList.contains("navbar-mobile") ? "\u2715" : "\u2630";
    });
  }

  /* ------------------------------------------------------------
     Section switching (single-page nav)
  ------------------------------------------------------------ */
  const navLinks = select("#navbar .nav-link", true);
  const header = select("#header");
  const sections = select("section", true);

  function showSection(targetHash) {
    navLinks.forEach((l) =>
      l.classList.toggle("active", l.getAttribute("href") === targetHash)
    );

    if (targetHash === "#header") {
      header.classList.remove("header-top");
      sections.forEach((s) => s.classList.remove("section-show"));
      return;
    }

    const target = select(targetHash);
    if (!target) return;

    if (!header.classList.contains("header-top")) {
      header.classList.add("header-top");
      setTimeout(() => {
        sections.forEach((s) => s.classList.remove("section-show"));
        target.classList.add("section-show");
      }, 350);
    } else {
      sections.forEach((s) => s.classList.remove("section-show"));
      target.classList.add("section-show");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");
      e.preventDefault();

      if (navbar.classList.contains("navbar-mobile")) {
        navbar.classList.remove("navbar-mobile");
        if (navToggle) navToggle.textContent = "\u2630";
      }

      showSection(hash);
    });
  });

  /* ------------------------------------------------------------
     Open section from URL hash on load
  ------------------------------------------------------------ */
  window.addEventListener("load", function () {
    if (window.location.hash) {
      const hash = window.location.hash;
      if (select(hash)) {
        header.classList.add("header-top");
        setTimeout(() => showSection(hash), 50);
      }
    }
  });

  /* ------------------------------------------------------------
     Contact form (Formspree AJAX)
  ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    const form = select(".contact-form");
    if (!form) return;

    const loading = select(".form-status .loading");
    const errorMsg = select(".form-status .error-message");
    const sentMsg = select(".form-status .sent-message");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      loading.style.display = "block";
      errorMsg.style.display = "none";
      sentMsg.style.display = "none";

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        loading.style.display = "none";

        if (response.ok) {
          sentMsg.style.display = "block";
          form.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          errorMsg.textContent =
            data.error || "There was an error sending your message. Please try again.";
          errorMsg.style.display = "block";
        }
      } catch (err) {
        loading.style.display = "none";
        errorMsg.textContent = "There was an error sending your message. Please try again.";
        errorMsg.style.display = "block";
      }
    });
  });
})();

