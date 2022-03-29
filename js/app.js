import ApiClient from "./base/ApiClient.js";
import Product from "./base/Products.js";
import Cart from "./base/Cart.js";


let APIClient = new ApiClient();

// Async await examples
console.log(await APIClient.get('SearchProducts'));
console.log(await APIClient.get('GetProduct', {id: 1}));
await APIClient.post('Purchase', [
    {
        product_id: 73,
        amount: 21
    },
    {
        product_id: 22,
        amount: 21
    }
]); // APIClient will do a console.log()

// Regular promise examples
APIClient.get('SearchProducts')
    .then((result) => {
        console.log(result);
    });

APIClient.get('GetProduct', {id: 1})
    .then((result) => {
        console.log(result);
    });

APIClient.post('Purchase', [
    {
        product_id: 73,
        amount: 21
    },
    {
        product_id: 22,
        amount: 22
    }
]); // APIClient will do a console.log()

const products = await APIClient.get('SearchProducts');

//Show products
for(let i = 0; i < products.length; i++){
    var product = new Product(products[i]);
    product.showProducts();
}

//Show cart
let cart = new Cart();
let niz1 = product.getProductsFromStorage(products);

for(let i = 0; i < localStorage.length; i++){
    cart.show(await APIClient.get('GetProduct', {id: niz1.newArrayId[i]}), 
              JSON.parse(localStorage.getItem(`product${niz1.newProductNumber[i]}`))[3],
              JSON.parse(localStorage.getItem(`product${niz1.newProductNumber[i]}`))[2],
              niz1.newProductNumber[i]);
}

const btnCard = document.querySelector('.go_to_cart_button');
const btnSearch = document.querySelector('.search_button');
const btnAdd = document.querySelectorAll('.add_button');
const btnRemove = document.querySelectorAll('.remove_button');
const btnCheckout = document.querySelector('.checkout_button');
const btnRemoveAllItems = document.querySelector('.remove_btn');
const btnBuy = document.querySelector('.buy_btn');
const card = document.querySelector('.js_cart_page');
const search = document.querySelector('.js_product_page');

btnCard.addEventListener('click', function(){
    card.classList.remove('hidden');
    search.classList.add('hidden');
});
btnSearch.addEventListener('click', function(){
    card.classList.add('hidden');
    search.classList.remove('hidden');
});
//Add product 
for(let i = 0; i < btnAdd.length; i++){
    btnAdd[i].addEventListener('click', (e) => {
        const stock = Number(document.querySelectorAll('.amount')[i].textContent);
        const inputAmount = document.querySelectorAll('.input_amount');
        const inputValue = Number(inputAmount[i].value);

        let value = {
            productNumber:Number(i+1),
            productName: e.path[2].children[1].children[0].innerText,
            product_id: Number(e.path[2].children[1].children[1].innerText),
            product_price: Number(e.path[2].children[1].children[2].innerText.slice(6,-1)),
            product_amount: inputValue,
            stock: 10,
            inputValue: inputValue
        }
        product.productStorage(value);
    })
}
//Remove product
for (let i = 0; i < btnRemove.length; i++){
    btnRemove[i].addEventListener('click', function(e){
    const amountField = document.querySelectorAll('.amountField');
        let value = {
            btn_id: Number(btnRemove[i].id),
            product_id: Number(niz1.newArrayId[i]),
            product_name:e.path[2].children[1].children[0].innerText,
            product_price: Number(e.path[2].children[1].children[1].innerText.slice(6,-1)),
            product_amount: JSON.parse(localStorage.getItem(`product${btnRemove[i].id}`))[3] - Number(amountField[i].value),
            amount_field: Number(amountField[i].value)
        }
        cart.removeProduct(value);
    });
}
//Checkout
btnCheckout.addEventListener('click', function(){
    for(let i = 0; i < localStorage.length; i++){
        APIClient.post('Purchase', [
            {
                product_id:  JSON.parse(localStorage.getItem(`product${niz1.newProductNumber[i]}`))[1],
                amount:  JSON.parse(localStorage.getItem(`product${niz1.newProductNumber[i]}`))[3]
            }
        ]);
    }
});
//Remove all products
btnRemoveAllItems.addEventListener('click', function(){
    cart.removeAllItemsFromStorage();
})
//Buy products
btnBuy.addEventListener('click', function(){
    cart.buyProducts();
})






// let ni = [];
// for(let i = 0; i < 6; i++){
//     ni[i] = product.getAmountFromStorage();
// }
// console.log(ni);


const amountProducts = [];
        for(let i = 0; i < products.length; i++ ){
            if(localStorage.getItem(`product${i+1}`)){
                if(JSON.parse(localStorage.getItem(`product${i+1}`))[3] == 10){
                    amountProducts[i] = 0;
                }else{
                    amountProducts[i] = JSON.parse(localStorage.getItem(`product${i+1}`))[3]
                }
            }else{
                amountProducts[i] = 10;
            }
            
        }
console.log(amountProducts);








// const product = new Product(await APIClient.get('GetProduct', {id: 73}));


