import { servicesProducts } from "../services/product-service.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const resetButton = document.querySelector(".button-reset");

function createCard (name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="${name}" class="product-img">
        </div>
        <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--value">
                <p>$ ${price}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="img/basura.png" alt="Eliminar">
                </button>
            </div>
        </div>
    `;

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        const productId = deleteButton.getAttribute("data-id");
        servicesProducts.deleteProduct(productId).then(() => {
            card.remove();
        }).catch((err) => console.log(err));
    });

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listProduct = await servicesProducts.productList();

        listProduct.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        });

    } catch (error) {
        console.log(error);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts
        .createProduct(name, price, image)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
})

resetButton.addEventListener("click", () => {
    // Selecciona el formulario y llama al método reset() para limpiarlo
    form.reset();
});

render();