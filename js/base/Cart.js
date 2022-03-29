export default class Cart{
    show(product, stock, total, number){
        let field = document.querySelector('.cart-field');
        let totalField = document.querySelector('.js_total').textContent;
        let result = Number(total * stock);
        document.querySelector('.js_total').textContent = (Number(totalField) + result).toFixed(2);

        let item = document.createElement('div');
        item.classList = 'product';
        item.innerHTML = 
        `<div class="product_image">
            <img src="${product.photo}">
            </div>
            <div class="product_info">
                <div class="product_title">${product.name}</div>
                <div class="product_price">PRICE: ${product.price}$</div>
            </div>
            <div class="order_buttons">
                <input class="amountField" type="text" value="${stock}" autocomplete='off'>
                <button id="${number}" class="remove_button">Remove from cart</button>
            </div>`;
        field.append(item); 
    }
    removeProduct({btn_id,product_id,product_name,product_price,product_amount,amount_field}){
        let arrayValues = [btn_id,product_id,product_price,product_amount];

        if(isNaN(amount_field)){
            alert('You did not enter a numeric value')
        }else if(Number(amount_field) > JSON.parse(localStorage.getItem(`product${btn_id}`))[3]){
            alert('You entered a larger amount ');
        }else{
            if(Number(amount_field) < JSON.parse(localStorage.getItem(`product${btn_id}`))[3]){
                localStorage.setItem(`product${btn_id}`, JSON.stringify(arrayValues));  
                alert(`You have successfully deleted ${amount_field } ${product_name}`)
            }else{
    
                localStorage.removeItem(`product${btn_id}`);
                alert(`You have successfully deleted ${amount_field} ${product_name}`)
            }
        }
        location.reload();
    }
    removeAllItemsFromStorage(){
        if(localStorage.length !== 0){
            alert(`You have successfully deleted all items`);
        }
        localStorage.clear();
        location.reload();
    }
    buyProducts(){
        if(localStorage.length !== 0){
            alert('You have successfully made a purchase')
        }
        localStorage.clear();
        location.reload();
    }
    
}