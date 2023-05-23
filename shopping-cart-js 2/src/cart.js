let shoppingCart = document.getElementById('shopping-cart');
let label = document.getElementById('label');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };

  calculation();

  let generateCartItems = () =>{
    if(basket.length !== 0){
return (shoppingCart.innerHTML = basket.map(({ id, item }) => {
let search = shopItemsData.find((x) => x.id === id)
let { img, price, name } = search;
return `
<div class="cart-item">
        <img width="100" src=${img} alt="" />

        <div class="details">
        
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">$ ${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="cart-buttons">
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>

          <h3>$ ${item * price}</h3>
        
        </div>
      </div>
`
}).join(""))
    
    } else{
shoppingCart.innerHTML = "";
label.innerHTML = `
<h2>Cart is empty</h2>
<ahref="index.html">
<button class="homeBtn">Back to home</button>
</a>`;
    }
  }
  
  generateCartItems();

  let increment = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    let search = basket.find((x) => x.id === selectedItem.id);
    
  
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
  
    // console.log(basket);
    update(selectedItem.id);
    // localStorage.setItem("data", JSON.stringify(basket));
    mySavedData('data');
  };
  
  /**
   * ! used to decrease the selected product item quantity by 1
   */
  
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
  
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    // console.log(basket);
    // localStorage.setItem("data", JSON.stringify(basket));
    mySavedData('data');
    generateCartItems();
  };
 


  let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    calculation();
    totalAmount();
    mySavedData('data');
  }

  let totalAmount = (id) => {
    if (basket.length !== 0) {
        let amount = basket.map(({id, item}) => {
            let search = shopItemsData.find((x) => x.id === id);
        return search.price * item;
        }).reduce((x, y) => x + y, 0);
        return (label.innerHTML = ` 
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `);
    } else return;
};
totalAmount();




let clearCart = () => {
    basket = []
    generateCartItems();
    calculation();
     
    mySavedData('data');
 };
let mySavedData=(key) => localStorage.setItem("data", JSON.stringify(basket));