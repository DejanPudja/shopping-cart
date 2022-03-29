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
}