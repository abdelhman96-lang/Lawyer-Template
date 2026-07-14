// 1. سكرول ناعم للروابط
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// 2. تأثير الآلة الكاتبة (للعناوين)
const heroTitle = document.querySelector(".hero-text h1");
if (heroTitle) {
  const originalText = heroTitle.textContent;
  heroTitle.textContent = "";
  let charIndex = 0;
  function typeEffect() {
    if (charIndex < originalText.length) {
      heroTitle.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 50);
    }
  }
  setTimeout(typeEffect, 500);
}

// 3. ظهور تدريجي للعناصر
const fadeElements = document.querySelectorAll(
  ".service-card, .achievement-card, .partner-card, .consult-card, .contact-card",
);
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

fadeElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  fadeInObserver.observe(el);
});

// 4. عدّاد الأرقام المتحرك
function animateNumbers() {
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((num) => {
    const target = parseInt(num.getAttribute("data-count"));
    let current = 0;
    const increment = target / 80;
    const updateNumber = () => {
      current += increment;
      if (current < target) {
        num.textContent = Math.ceil(current);
        setTimeout(updateNumber, 20);
      } else {
        num.textContent = target;
      }
    };
    updateNumber();
  });
}

const achievementSection = document.getElementById("achievements");
let counted = false;

window.addEventListener("scroll", () => {
  if (achievementSection) {
    const rect = achievementSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && !counted) {
      counted = true;
      animateNumbers();
    }
  }
});

// 5. تأثير 3D للبطاقات
const cards = document.querySelectorAll(
  ".service-card, .achievement-card, .partner-card, .contact-card",
);
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(500px) rotateX(0) rotateY(0)";
    card.style.transition = "transform 0.3s ease";
  });
});

// 6. قائمة الموبايل (الهامبرجر)
const mobileMenu = document.getElementById("mobile-menu");
const navList = document.getElementById("nav-list");

if (mobileMenu && navList) {
  mobileMenu.addEventListener("click", () => {
    navList.classList.toggle("active");
  });
  document.querySelectorAll("#nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
    });
  });
}
