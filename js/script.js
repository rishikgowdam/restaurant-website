// A small, self-contained restaurant website for the Module 5 practice project.
const categories = [
  { short_name: "L", name: "Lunch", description: "Bright, satisfying midday favorites." },
  { short_name: "D", name: "Dinner", description: "Comforting classics for the evening." },
  { short_name: "S", name: "Sushi", description: "Fresh rolls and delicate flavors." },
  { short_name: "A", name: "Appetizers", description: "A little something to start." }
];

const dishes = [
  { category: "L", name: "Ginger Garden Bowl", emoji: "🥗", description: "Crisp greens, ginger dressing, sesame and crunchy vegetables.", price: "₹249" },
  { category: "L", name: "Sesame Noodles", emoji: "🍜", description: "Noodles tossed with sesame, scallions and a savory house sauce.", price: "₹279" },
  { category: "L", name: "Golden Rice Plate", emoji: "🍚", description: "Fragrant rice with seasonal vegetables and herbs.", price: "₹229" },
  { category: "D", name: "House Fried Rice", emoji: "🍛", description: "Wok-fried rice, garden vegetables and aromatic spices.", price: "₹299" },
  { category: "D", name: "Chilli Garlic Tofu", emoji: "🥘", description: "Crisp tofu glazed with chilli, garlic and a hint of sweetness.", price: "₹329" },
  { category: "D", name: "Sizzling Veg Delight", emoji: "🥦", description: "A colorful mix of vegetables served with a rich house sauce.", price: "₹349" },
  { category: "S", name: "Avocado Cucumber Roll", emoji: "🍣", description: "Creamy avocado and cool cucumber wrapped with seasoned rice.", price: "₹319" },
  { category: "S", name: "Crispy Veg Roll", emoji: "🍱", description: "A crunchy vegetable roll with a tangy dipping sauce.", price: "₹299" },
  { category: "S", name: "Sesame Maki", emoji: "🍙", description: "Seasoned rice, vegetables and toasted sesame.", price: "₹339" },
  { category: "A", name: "Crispy Spring Rolls", emoji: "🥟", description: "Golden pastry filled with vegetables, served with dip.", price: "₹189" },
  { category: "A", name: "Chilli Garlic Edamame", emoji: "🫛", description: "Steamed edamame tossed with chilli and fragrant garlic.", price: "₹179" },
  { category: "A", name: "Steamed Dumplings", emoji: "🥢", description: "Soft dumplings with a flavorful vegetable filling.", price: "₹219" }
];

const hero = document.querySelector("#hero");
const tiles = document.querySelector("#tiles");
const content = document.querySelector("#content");
const contentInner = document.querySelector("#content-inner");
const nav = document.querySelector("#main-nav");

document.querySelector("#year").textContent = new Date().getFullYear();

function showHome() {
  hero.classList.remove("hidden");
  tiles.classList.remove("hidden");
  content.classList.add("hidden");
  nav.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCategory(category, isSpecial = false) {
  const categoryDishes = dishes.filter(dish => dish.category === category.short_name);
  contentInner.innerHTML = `
    <div class="section-heading">
      <div>
        <p class="eyebrow">${isSpecial ? "RANDOMLY PICKED FOR YOU" : "FROM OUR KITCHEN"}</p>
        <h2>${escapeHtml(category.name)}</h2>
        <p>${escapeHtml(category.description)}</p>
      </div>
    </div>
    <div class="category-list" aria-label="Choose a menu category">
      ${categories.map(item => `<button class="category-chip ${item.short_name === category.short_name ? "active" : ""}" data-category="${item.short_name}">${escapeHtml(item.name)}</button>`).join("")}
    </div>
    <div class="menu-grid">
      ${categoryDishes.map(dish => `
        <article class="food-card">
          <span class="food-emoji" aria-hidden="true">${dish.emoji}</span>
          <h3>${escapeHtml(dish.name)}</h3>
          <p>${escapeHtml(dish.description)}</p>
          <span class="price">${dish.price}</span>
        </article>`).join("")}
    </div>`;
  contentInner.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      const chosen = categories.find(item => item.short_name === button.dataset.category);
      renderCategory(chosen);
    });
  });
  showContent();
}

function renderMenu() {
  contentInner.innerHTML = `
    <div class="section-heading">
      <div><p class="eyebrow">MADE WITH CARE</p><h2>Explore the menu</h2><p>Choose a category to discover what's cooking.</p></div>
    </div>
    <div class="menu-grid">
      ${categories.map(category => `<button class="food-card category-card" data-category="${category.short_name}" style="text-align:left">
        <span class="food-emoji">${({L:"🥗",D:"🍲",S:"🍣",A:"🥟"})[category.short_name]}</span>
        <h3>${escapeHtml(category.name)}</h3><p>${escapeHtml(category.description)}</p><span class="price">Explore category ↗</span>
      </button>`).join("")}
    </div>`;
  contentInner.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => renderCategory(categories.find(item => item.short_name === button.dataset.category)));
  });
  showContent();
}

function renderMap() {
  contentInner.innerHTML = `
    <div class="section-heading"><div><p class="eyebrow">COME SAY HELLO</p><h2>Find us</h2><p>Your next favorite meal is closer than you think.</p></div></div>
    <div class="map-panel"><span class="map-pin">📍</span><div><h3>David Chu's China Bistro</h3><p>123 Restaurant Street<br>Bengaluru, Karnataka</p><p><strong>Hours:</strong> Every day, 11:00 AM – 10:00 PM</p><p>This is sample address information for the demo. Replace it with your real restaurant details.</p></div></div>`;
  showContent();
}

function showContent() {
  hero.classList.add("hidden");
  tiles.classList.add("hidden");
  content.classList.remove("hidden");
  nav.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showRandomSpecial() {
  const randomIndex = Math.floor(Math.random() * categories.length);
  renderCategory(categories[randomIndex], true);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;
    if (view === "menu") renderMenu();
    if (view === "specials") showRandomSpecial();
    if (view === "map") renderMap();
  });
});

document.querySelector("#home-logo").addEventListener("click", event => {
  event.preventDefault();
  showHome();
});
document.querySelector("#back-home").addEventListener("click", showHome);
document.querySelector("#menu-toggle").addEventListener("click", event => {
  const isOpen = nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});
