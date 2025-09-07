// Typing Animation
const typingEl = document.querySelector('.typing');
const text = typingEl.textContent;
typingEl.textContent = '';
let i = 0;

(function type() {
  if (i < text.length) {
    typingEl.textContent += text.charAt(i++);
    setTimeout(type, 100);
  } else {
    typingEl.style.borderRight = '2px solid transparent';

    let count = 0;
    const interval = setInterval(() => {
      typingEl.style.borderRight =
        typingEl.style.borderRight === '2px solid transparent'
          ? `2px solid ${getComputedStyle(typingEl).color}`
          : '2px solid transparent';

      count++;
      if (count >= 7) {
        clearInterval(interval);
        typingEl.style.borderRight = 'none';
      }
    }, 700);
  }
})();

// Dark Mode Toggle
const toggleCheckbox = document.getElementById("toggle-mode");

// Load preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  toggleCheckbox.checked = true;
}

toggleCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");

// Save preference
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
});


// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navUl = document.getElementById('nav-ul');

hamburger.addEventListener('click', () => {
  navUl.classList.toggle('active');
  hamburger.innerHTML = navUl.classList.contains('active')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('#nav-ul a').forEach(link => {
  link.addEventListener('click', () => {
    navUl.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// ScrollSpy
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 250;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Get the height of the fixed navbar
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0; // Get height, default to 0 if not found

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - navbarHeight, // Subtract navbar height
        behavior: 'smooth'
      });
    }
  });
});

// Contact Form with Formspree
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
        popup.style.display = "block";
        popup.style.opacity = "1";

        setTimeout(() => {
          popup.style.opacity = "0";
          setTimeout(() => {
            popup.style.display = "none";
          }, 300);
        }, 4000);
      } else {
        console.error("Oops! Something went wrong while submitting.");
      }
    })
    .catch(() => {
      console.error("Error sending form. Please check your connection.");
    });
  });
}