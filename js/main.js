const productList = document.getElementById("productList");
const cardItemsElement = document.getElementById("card-items");
const cardTotalElement = document.getElementById("card-total");
let menu = document.querySelector(".navbar");
let menuIcon = document.querySelector("#menu-icon");

menuIcon.addEventListener("click", () => menu.classList.toggle("open-menu"));

let card = JSON.parse(localStorage.getItem("card")) || [];
// Product Data
const products = [
  {
    id: 1,
    title: "Autumn Hoodie",
    price: 264.9,
    image:
      "https://pangaia.com/cdn/shop/products/Recycled-Nylon-NW-Flwrdwn-Quilted-Collarless-Jacket-Cerulean-Blue-Female-1_bf4b2a54-8a7f-4174-bc49-8ef22b24bfdd.jpg?v=1666708230&width=1426",
  },
  {
    id: 2,
    title: "FUSION HOODIE",
    price: 295,
    image:
      "https://images.undiz.com/on/demandware.static/-/Sites-ZLIN-master/default/dw2264d914/merch/BTS/654206666_x.jpg?sw=1250",
  },
  {
    id: 3,
    title: "Chestnut Brown",
    price: 74.9,
    image:
      "https://pangaia.com/cdn/shop/products/Recycled-Cashmere-Core-Hoodie-Chestnut-Brown-Male-1.jpg?v=1663947464&width=1426",
  },
  {
    id: 4,
    title: "Nike Sportswear",
    price: 80,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40f3-9b95-c7500939150a/sportswear-club-mens-french-terry-crew-neck-sweatshirt-tdFDRc.png",
  },
  {
    id: 5,
    title: "Champion BASIC",
    price: 48.99,
    image:
      "https://img01.ztat.net/article/spp-media-p1/7067458719b744fe81ffee62d3d0b912/abad421e7d8e47f08a2abc1c6ffe07dc.jpg?imwidth=1800",
  },
  {
    id: 6,
    title: "Cotton Hoodie",
    price: 395,
    image:
      "https://pangaia.com/cdn/shop/files/Reclaim-3.0-Hoodie-Reclaim-Jade-Womens-3.jpg?v=1693398673&width=1426",
  },
  {
    id: 7,
    title: "CLASSIC CREWNECK",
    price: 48.99,
    image:
      "https://img01.ztat.net/article/spp-media-p1/10cea44041564f81ac585fc6c8978907/c4c32dbc45dd4dbc9d15087c846538f2.jpg?imwidth=1800",
  },
  {
    id: 8,
    title: "TAPE HOODED",
    price: 79.99,
    image:
      "https://img01.ztat.net/article/spp-media-p1/d391f90be278469ebfdff731800cfccc/6d2101bd672f4e059501f01fe726f315.jpg?imwidth=1800",
  },
];
// List of Products
function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) =>
        `
        <div class="products">
          <img src="${product.image}" class="product-img" alt="image">
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$ ${product.price}</p>
            <a class="add-to-card" data-id="${product.id}">Add to card</a>
          </div>
        </div>
        `
    )
    .join("");
  const addToCardButtons = document.getElementsByClassName("add-to-card");
  for (i = 0; i < addToCardButtons.length; i++) {
    const addToCardButton = addToCardButtons[i];
    addToCardButton.addEventListener("click", addToCard);
  }
}
// Add product
function addToCard(e) {
  const productID = parseInt(e.target.dataset.id);
  const product = products.find((product) => product.id === productID);
  if (product) {
    const exixtingItem = card.find((item) => item.id === productID);
    if (exixtingItem) {
      exixtingItem.quantity++;
    } else {
      const cardItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      card.push(cardItem);
    }
    e.target.textContent = "Added";
    updateCardIcon();
    saveTolocalStroge();
    renderCardItems();
    calculateCardTotal();
  }
}
// Delete product
function removeFromCard(e) {
  const productID = parseInt(e.target.dataset.id);
  card = card.filter((item) => item.id !== productID);
  saveTolocalStroge();
  renderCardItems();
  calculateCardTotal();
  updateCardIcon();
}
// Change product quantity
function changeQuantity(e) {
  const productID = parseInt(e.target.dataset.id);
  const quantity = parseInt(e.target.value);
  if (quantity > 0) {
    const cardItem = card.find((item) => item.id === productID);
    if (cardItem) {
      cardItem.quantity = quantity;
      saveTolocalStroge();
      calculateCardTotal();
      updateCardIcon();
    }
  }
}
// Save products localStroge
function saveTolocalStroge() {
  localStorage.setItem("card", JSON.stringify(card));
}
// Product list in cart
function renderCardItems() {
  cardItemsElement.innerHTML = card
    .map(
      (item) =>
        `
    <div class="card-item">
      <img
        src="${item.image}"
        alt="${item.title}"
      />
      <div class="card-item-info">
        <h2 class="card-item-title">${item.title}</h2>
        <input
          type="number"
          min="1"
          value="${item.quantity}"
          class="card-item-quantity"
          data-id=${item.id}
        />
      </div>
      <h2 class="card-item-price">$ ${item.price}</h2>
      <button class="remove-from-card" data-id=${item.id}>Remove</button>
    </div>
    `
    )
    .join("");
  const removeButtons = document.getElementsByClassName("remove-from-card");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCard);
  }
  const quantityInputs = document.getElementsByClassName("card-item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", changeQuantity);
  }
  updateCardIcon();
}
// Calculate the total amount
function calculateCardTotal() {
  const total = card.reduce((sum, item) => sum + item.quantity * item.price, 0);
  cardTotalElement.textContent = `Total= $  ${total.toFixed(2)}`;
}

if (window.location.pathname.includes("card.html")) {
  renderCardItems();
  calculateCardTotal();
} else {
  renderProducts();
}
// Update cart icon
function updateCardIcon() {
  const cardIcon = document.getElementById("card-icon");
  const i = document.querySelector(".bx-shopping-bag");
  let totalQuantity = card.reduce((sum, item) => sum + item.quantity, 0);
  cardIcon.setAttribute("data-quantity", totalQuantity);
  i.setAttribute("data-quantity", totalQuantity);
  if (card.length === 0) {
    totalQuantity = 0;
  }
  cardIcon.setAttribute("data-quantity", totalQuantity);
}
updateCardIcon();

function updateCardIconOnCardChange() {
  updateCardIcon();
}

window.addEventListener("storage", updateCardIconOnCardChange);

renderCardItems();
renderProducts();
calculateCardTotal();
