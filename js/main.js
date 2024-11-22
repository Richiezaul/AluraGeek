import { servicesProducts } from "./product-services.js";

const productsContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(product) {
  let card = document.createElement("article");
  card.classList.add("AluraGeek__product__card");

  let content = ` <figure>
                            <img class="AluraGeek__product__card_img" src="${product.img}" alt="${product.nombre}">
                            <figcaption class="AluraGeek__product__card__nombre"> ${product.nombre}</figcaption>
                        </figure>

                        <div class="AluraGeek__product__card--opt">
                            <h3 class="AluraGeek__product__card__price">$${product.price}</h3>
                            <img class="AluraGeek__product__card__deleteBtn" src="./img/remove_icon.svg" alt="delete Icon">
                        </div>`;

  card.innerHTML = content;

  addDeleteEvent(card, product.id);

  return card;
}

const renderProductos = async () => {
  try {
    const data = await servicesProducts.productList();

    console.log(data);
    data.forEach((product) => {
      const card = createCard(product);

      productsContainer.appendChild(card);
    });
  } catch (e) {
    console.log(e);
  }
};

async function addDeleteEvent(card, id) {
  const deleteBtn = card.querySelector(".AluraGeek__product__card__deleteBtn");

  try {
    deleteBtn.addEventListener("click", async () => {
      servicesProducts.deleteProduct(id);
      card.remove();
      console.log(`Producto con id ${id} eliminado`);
    });
  } catch (error) {
    console.error(`Error al eliminar el producto con id ${id}:`, error);
  }
}


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  if (name === "" || price === "" || image === "") {
    alert("Por favor, complete todos los campos");
  } else {
    try {
      const newProduct = await servicesProducts.createProducts(
        name,
        price,
        image
      );
      console.log("Producto creado:", newProduct);
      const newCard = createCard(newProduct);
      productsContainer.appendChild(newCard);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }

    form.reset(); // Reinicia el formulario
  }
});

renderProductos();
