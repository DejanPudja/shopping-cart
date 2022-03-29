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
    product.show();
}
const btnAdd = document.querySelectorAll('.add_button');

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
        product.storage(value);
    })
}












// const product = new Product(await APIClient.get('GetProduct', {id: 73}));


