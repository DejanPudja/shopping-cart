export default class Product{
    constructor({id, name, photo, price}){
        this.product_id = id;
        this.product_name  = name;
        this.product_photo = photo;
        this.product_price = price;
    }
    showProducts(){
        let field = document.querySelector('.product-field');
        let item = document.createElement('div');
        item.classList = 'product';
        item.innerHTML = 
        `<div class="product_image"><img src="${this.product_photo}"></div>
            <div class="product_info">
                <div class="product_title">${this.product_name}</div>
                <div class="hidden">${this.product_id}</div>
                <div class="product_price">PRICE: ${this.product_price}$</div>
                <div class="product_stock">IN STOCK:<span class='amount'></span></div>
            </div>
            <div class="order_buttons">
                <input class="input_amount" type="text" value="1" autocomplete='off'>
                <button class="add_button">Add to cart</button>
            </div>`;
        field.append(item); 
    }
    productStorage({productNumber,productName,product_id,product_price,product_amount,stock,inputValue}){
        let arrayValues = [productNumber,product_id,product_price,product_amount];

        if(isNaN(inputValue)){
            alert('You did not enter a number');
        }else if(inputValue <= 0){
            alert('Wrong entry')
        }else{
            if(inputValue <= stock){
                if(localStorage.getItem(`product${productNumber}`)){      
                    localStorage.setItem(`product${productNumber}`, JSON.stringify([productNumber,product_id,product_price,JSON.parse(localStorage.getItem(`product${productNumber}`))[3] + inputValue]));
                }else{
                    localStorage.setItem(`product${productNumber}`, JSON.stringify(arrayValues));
                }
                alert(`You have successfully add ${inputValue} ${productName}  in basket`);
            }else{
                alert('There are not that many products in the database');
            }
        }
        location.reload();
    }
    getProductsFromStorage(products){
        let arrayIdFromStorage = [];
        let arrayProductNumber = [];

        for(let i = 0; i < products.length; i++ ){
            if(localStorage.getItem(`product${i+1}`)){
                arrayIdFromStorage[i] = JSON.parse(localStorage.getItem(`product${i+1}`))[1];
                arrayProductNumber[i] = JSON.parse(localStorage.getItem(`product${i+1}`))[0];
            }
        }
        let newArrayId = arrayIdFromStorage.filter(n=>n);
        let newProductNumber = arrayProductNumber.filter(n=>n);

        return {newArrayId,newProductNumber};

    }
    // getAmountFromStorage(){
    //     const amountProducts = [];
    //     for(let i = 0; i < 6; i++ ){
    //         if(localStorage.getItem(`product${i+1}`)){
    //             if(JSON.parse(localStorage.getItem(`product${i+1}`))[3] == 10){
    //                 amountProducts[i] = 0;
    //             }else{
    //                 amountProducts[i] = JSON.parse(localStorage.getItem(`product${i+1}`))[3]
    //             }
    //         }else{
    //             amountProducts[i] = 10;
    //         }
    //         return amountProducts[i];
    //     }
    // }
}
