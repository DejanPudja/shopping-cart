export {btnCard,btnSearch,btnAdd,btnRemove,btnCheckout,btnRemoveAllItems,btnBuy,card,search,email,password,btnLogin, login, logOut};

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
function login(){
    return document.querySelector('.login');
}
function email(){
    return document.querySelector('.email_login').value;
}
function password(){
    return document.querySelector('.password_login').value;
}
function btnLogin(){
    return document.querySelector('.btn_login');
}
function logOut(){
    return document.querySelector('.log_out');
}