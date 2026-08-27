document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
    });
  });

  // 2. Project Category Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter").toLowerCase();

      projectCards.forEach((card) => {
        const label = card.querySelector("label").innerText.toLowerCase();
        if (filterValue === "all" || label.includes(filterValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 3. Scrollspy Active Navigation
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 160) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href") === `#${current}`) {
        a.classList.add("active");
      }
    });
  });

  // 4. Animated Stat Counter
  const counterEl = document.getElementById("projectCounter");
  let animated = false;

  const animateCounter = () => {
    const target = +counterEl.getAttribute("data-target");
    let count = 0;
    const speed = 150;

    const updateCount = () => {
      count++;
      counterEl.innerText = count + "+";
      if (count < target) {
        setTimeout(updateCount, speed);
      }
    };
    updateCount();
  };

  window.addEventListener("scroll", () => {
    if (!animated && window.scrollY < 400) {
      animateCounter();
      animated = true;
    }
  });
  
  // Trigger initial check for hero count
  animateCounter();
});