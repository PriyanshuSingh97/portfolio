document.addEventListener("DOMContentLoaded", function () {
  // --- Typing Animation ---
  const typingEl = document.querySelector('.typing');
  if (typingEl) {
    const text = typingEl.textContent;
    typingEl.textContent = '';
    let i = 0;

    function type() {
      if (i < text.length) {
        typingEl.textContent += text.charAt(i++);
        setTimeout(type, 100);
      } else {
        // Add a class when typing is done to hide the blinking cursor via CSS
        typingEl.classList.add('typing-finished');
      }
    }
    type();
  }

  // --- Dark Mode Toggle ---
  const toggleCheckbox = document.getElementById("toggle-mode");
  if (toggleCheckbox) {
    // Load preference from localStorage
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
      toggleCheckbox.checked = true;
    }

    toggleCheckbox.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
      // Save preference to localStorage
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark);
    });
  }

  // --- Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navUl = document.getElementById('nav-ul');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      const isActive = navUl.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive); // A11y improvement
      hamburger.innerHTML = isActive
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu when a link is clicked
    document.querySelectorAll('#nav-ul a').forEach(link => {
      link.addEventListener('click', () => {
        navUl.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // --- ScrollSpy ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar a");
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 70; // Dynamic offset

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 20; // Added buffer
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    });
  }

  // --- Contact Form with Formspree ---
  const form = document.getElementById("contact-form");
  const popup = document.getElementById("thank-you-popup");
  if (form && popup) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      fetch("https://formspree.io/f/mblkgbpe", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          form.reset();
          popup.classList.add("show");
          setTimeout(() => {
            popup.classList.remove("show");
          }, 4000);
        } else {
          // You could show an error message to the user here
          console.error("Oops! Something went wrong while submitting.");
          alert("Sorry, there was an error sending your message. Please try again later.");
        }
      })
      .catch(() => {
        console.error("Error sending form. Please check your connection.");
        alert("Sorry, there was a network error. Please check your connection and try again.");
      });
    });
  }
    
  // --- Dynamic Copyright Year ---
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});