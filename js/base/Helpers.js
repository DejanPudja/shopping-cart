export {btnCard,btnSearch,btnAdd,btnRemove,btnCheckout,btnRemoveAllItems,btnBuy,card,search};

function btnCard(){
    return document.querySelector('.go_to_cart_button');
}
function btnSearch(){
    return document.querySelector('.search_button');
}
function btnAdd(){
    return document.querySelectorAll('.add_button');
}
function btnRemove(){
    return document.querySelectorAll('.remove_button');
}
function btnCheckout(){
    return document.querySelector('.checkout_button');
}
function btnRemoveAllItems(){
    return document.querySelector('.remove_btn');
}
function btnBuy(){
    return document.querySelector('.buy_btn');
}
function card(){
    return document.querySelector('.js_cart_page');
}
function search(){
    return document.querySelector('.js_product_page');
}