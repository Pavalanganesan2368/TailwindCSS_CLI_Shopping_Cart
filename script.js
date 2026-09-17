const productList = document.querySelector("#products-lists");
const productCart = document.querySelector("#product-cart");
const totalCart = document.querySelector("#total-cart");
const toggleCart = document.querySelector("#toggle-cart");
const productCount = document.querySelector("#product-count");
const toggleContainer = document.querySelector(".toggle-container");

toggleCart.addEventListener("click", () => {
  toggleContainer.classList.toggle("hidden");
  console.log("Toggle Triggered");
});
const productClear = document.querySelector("#product-clear");

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    productImageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    price: 2499,
  },
  {
    id: 2,
    name: "Smart Watch",
    productImageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    price: 3999,
  },
  {
    id: 3,
    name: "Laptop",
    productImageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    price: 54999,
  },
  {
    id: 4,
    name: "Wireless Mouse",
    productImageUrl:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
    price: 1299,
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    productImageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    price: 2999,
  },
  {
    id: 6,
    name: "Gaming Controller",
    productImageUrl:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f",
    price: 3499,
  },
];

let productCard = JSON.parse(localStorage.getItem("Product")) || [];

function productListRender() {
  products.forEach((product) => {
    let sampleTemplate = `
        <section class="border rounded-md grid-rows-subgrid border-gray-600 p-5">
          <section class="border max-w-full border-gray-800">
            <img src=${product.productImageUrl} class="min-w-full" alt=${product.name} />
          </section>
    
          <section class="flex justify-between my-7 text-xl font-bold">
            <h1>${product.name}</h1>
            <h1>$${product.price}</h1>
          </section>
    
              <section class="w-full">
                <button
                  class="font-medium text-md w-full bg-sky-800 text-white p-3 cursor-pointer"
                  onclick="productAdd(${product.id})"
                >
                  Add to Cart
                </button>
              </section>
            </section>`;

    productList.innerHTML += sampleTemplate;
  });
}

function productAdd(id) {
  const existingProduct = productCard.find((product) => product.id === id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    const product = products.find((product) => product.id === id);

    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      productImage: product.productImageUrl,
      quantity: 1,
    };

    productCard.push(productData);
  }
  productCount.innerHTML = productCard.length;
  localStorage.setItem("Product", JSON.stringify(productCard));
  productRender();
  productCalculate();
}

function productRender() {
  productCart.innerHTML = "";

  if (productCard.length === 0) {
    productCart.innerHTML = `
    <section class="max-h-80 text-white flex items-center justify-center">
    <p>Product Not Found</p>
    </section>
    `;
  }

  productCard.forEach((product) => {
    productCart.innerHTML += `
          <section class="border rounded-md border-gray-700 w-full p-3">
                <section class="w-25 border border-gray-200">
                  <img src="${product.productImage}" alt="${product.name}" />
                </section>
                <section class="flex justify-between items-center my-3 text-xl">
                  <h1>${product.name}</h1>
                  <button onclick="productDelete(${product.id})" class="bg-red-500 text-sm text-white p-2 rounded-md">Delete</button>
                </section>
  
                <section class="flex justify-between text-xl">
                <section class="flex gap-2">
                  <button class="bg-white w-10 rounded-md text-black font-bold" onclick="productDecrement(${product.id})">
                    -
                  </button>
                  <input type="number" min="1" class="w-20" value="${product.quantity}" onchange="inputQuantity(${product.id}, this.value)" />
                  <button class="bg-white w-10 rounded-md text-black font-bold" onclick="productIncrement(${product.id})">
                    +
                  </button>
                </section>
                <section>
                  <h1>$${product.price}</h1>
                </section>
            </section>
          </section>`;
  });
}

productClear.addEventListener("click", productRemove);

function productCalculate() {
  const totalPrice = productCard.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );
  totalCart.innerHTML = `$${Number(totalPrice).toFixed(2)}`;
  localStorage.setItem("Product", JSON.stringify(productCard));
}

function productIncrement(id) {
  const product = productCard.find((product) => product.id === id);
  product.quantity++;
  localStorage.setItem("Product", JSON.stringify(productCard));
  productRender();
  productCalculate();
}

function productDecrement(id) {
  const product = productCard.find((product) => product.id === id);

  if (product.quantity > 1) {
    product.quantity--;
  }
  localStorage.setItem("Product", JSON.stringify(productCard));
  productRender();
  productCalculate();
}

function inputQuantity(id, value) {
  const product = productCard.find((product) => product.id === id);
  product.quantity = Number(value);

  if (product.quantity < 1 || isNaN(product.quantity)) {
    product.quantity = 1;
  }
  localStorage.setItem("Product", JSON.stringify(productCard));
  productRender();
  productCalculate();
}

function productDelete(id) {
  productCard = productCard.filter((product) => product.id !== id);
  localStorage.setItem("Product", JSON.stringify(productCard));
  productCalculate();
  productRender();
}

function productRemove() {
  productCard = [];
  localStorage.setItem("Product", JSON.stringify(productCard));

  productRender();
  productCalculate();
}

productRender();
productCalculate();
productListRender();
