let shoppingCart = [
  { id: "A31", item: "T-shirt", price: 9.9, quantity: 5 },
  { id: "A32", item: "Jacket", price: 99.9, quantity: 1 },
  { id: "A33", item: "Skirt", price: 19.9, quantity: 2 },
  { id: "A34", item: "Ankle Pant", price: 39.9, quantity: 3 },
  { id: "A35", item: "Polo shirt", price: 14.9, quantity: 3 },
  { id: "A36", item: "Chino Short", price: 29.9, quantity: 2 },
  { id: "A37", item: "Easy Short", price: 19.9, quantity: 2 },
];

// 1.
function itemValues(cart) {
  return cart.map((x) => x.price * x.quantity);
}

// 2.
function totalValue(cart) {
  return itemValues(cart).reduce((a, x) => a + x, 0);
}

console.log(totalValue(shoppingCart));

// 3.
function removeItemsFromCart(productId, quantity) {
  let cart = shoppingCart;

  cart.forEach(function (x) {
    // Remove quantity of productId
    if (x.id === productId) {
      x.quantity -= quantity;
    }
  });
  return cart.filter((x) => x.quantity > 0);
}

// 4.
function addItemToCart(product, quantity) {
  let cart = shoppingCart;
  let added = false;

  cart.forEach(function (x) {
    // Remove quantity of productId
    if (x.id === product.id) {
      x.quantity += quantity;
      added = true;
    }
  });

  if (!added) {
    product.quantity = quantity;
    cart.push(product);
  }

  return cart;
}

console.log(addItemToCart({ id: "A38", item: "Hat", price: 10 }, 2));
