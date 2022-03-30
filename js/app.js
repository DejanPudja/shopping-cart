import ApiClient from "./base/ApiClient.js";
import Product from "./base/Products.js";
import Cart from "./base/Cart.js";
import {btnCard,btnSearch,btnAdd,btnRemove,btnCheckout,btnRemoveAllItems,btnBuy,card,search} from './base/Helpers.js'


let APIClient = new ApiClient();
const products = await APIClient.get('SearchProducts');

//Show products
for(let i = 0; i < products.length; i++){
    var product = new Product(products[i]);
    product.showProducts(product.productIndex(i));
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

btnCard().addEventListener('click', function(){
    card().classList.remove('hidden');
    search().classList.add('hidden');
});

btnSearch().addEventListener('click', function(){
    card().classList.add('hidden');
    search().classList.remove('hidden');
});
//Add product 
for(let i = 0; i < btnAdd().length; i++){
    btnAdd()[i].addEventListener('click', (e) => {
        const stock = Number(document.querySelectorAll('.amount')[i].textContent);
        const inputAmount = document.querySelectorAll('.input_amount');
        const inputValue = Number(inputAmount[i].value);

        let value = {
            productNumber:Number(i+1),
            productName: e.path[2].children[1].children[0].innerText,
            product_id: Number(e.path[2].children[1].children[1].innerText),
            product_price: Number(e.path[2].children[1].children[2].innerText.slice(6,-1)),
            product_amount: inputValue,
            stock: stock,
            inputValue: inputValue
        }
        product.productIndex(i);
        product.productStorage(value);
    })
}
//Remove product
for (let i = 0; i < btnRemove().length; i++){
    btnRemove()[i].addEventListener('click', function(e){
    const amountField = document.querySelectorAll('.amountField');
        let value = {
            btn_id: Number(btnRemove()[i].id),
            product_id: Number(niz1.newArrayId[i]),
            product_name: e.path[2].children[1].children[0].innerText,
            product_price: Number(e.path[2].children[1].children[1].innerText.slice(6,-1)),
            product_amount: JSON.parse(localStorage.getItem(`product${btnRemove()[i].id}`))[3] - Number(amountField[i].value),
            amount_field: Number(amountField[i].value)
        }
        cart.removeProduct(value);
    });
}
//Checkout
btnCheckout().addEventListener('click', function(){
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
btnRemoveAllItems().addEventListener('click', function(){
    cart.removeAllItemsFromStorage();
})
//Buy products
btnBuy().addEventListener('click', function(){
    cart.buyProducts();
})
