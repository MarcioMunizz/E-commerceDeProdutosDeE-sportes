//carrinho
let carrinhoicone = document.querySelector('#carrinho-icone')
let carrinho = document.querySelector('.carrinho')
let fecharcarrinho = document.querySelector('#fechar-carrinho')
//abrir carrinho
carrinhoicone.onclick = () => {
    carrinho.classList.add('ativar');
};
//fechar carrinho
fecharcarrinho.onclick = () => {
    carrinho.classList.remove('ativar');
};

//funcionamento do carrinho
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}

//marcar função
function ready(){
    //remover itens do carrinho
    var removecartbuttons = document.getElementsByClassName("remover-carrinho");
    console.log(removecartbuttons);
    for (var i = 0; i < removecartbuttons.length; i++){
        var button = removecartbuttons[i];
        button.addEventListener('click', removecartitem);
    }
    //quantidade de mudanças
    var quantityInpusts = document.getElementsByClassName("carrinho-quantidade");
    for (var i = 0; i < quantityInpusts.length; i++){
        var input = quantityInpusts[i];
        input.addEventListener("change", quantityCharged);
    }
    // adicionar ao carrinho
    var addCart = document.getElementsByClassName("add-carrinho");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addcartclicked);
    }
    // acionando botao de comprar
    document
        .getElementsByClassName("btn-comprar")[0]
        .addEventListener("click", buyButtonClicked);
}
//botao de compra
function buyButtonClicked(){
    alert("Seu pedido foi Realizado");
    var cartContent = document.getElementsByClassName("carrinho-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//remover itens do carrinho
function removecartitem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
//quantaidade de mudança
function quantityCharged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}
//adicionar para o carrinho
function addcartclicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("nome-do-produto")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("Produto-img")[0].src;
    addPoductToCart(title, price,  productImg);
    updatetotal();
}
function addPoductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName("carrinho-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("carrinho-produto-titulo");
    var itemAlreadyInCart = false;

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            itemAlreadyInCart = true;
            break; // Sair do loop quando um item com o mesmo título for encontrado
        }
    }

    if (itemAlreadyInCart) {
        alert("Você já adicionou este item ao carrinho.");
    } else {
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("carrinho-box");

        var cartBoxContent = `
            <img src="${productImg}" alt="" class="carrinho-img">
            <div class="detail-box">
                <div class="carrinho-produto-titulo">${title}</div>
                <div class="carrinho-preco">${price}</div>
                <input type="number" value="1" class="carrinho-quantidade">
            </div> 
            <!--remover do carrinho--> 
            <i class='bx bxs-trash-alt remover-carrinho'></i>`;

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox
            .getElementsByClassName("remover-carrinho")[0]
            .addEventListener("click", removecartitem);
        cartShopBox
            .getElementsByClassName("carrinho-quantidade")[0]
            .addEventListener("change", quantityCharged);
    }

    updatetotal();
}

//atualizar total
function updatetotal(){
    var cartContent = document.getElementsByClassName("carrinho-content")[0];
    var cartBoxs = cartContent.getElementsByClassName("carrinho-box");
    var total = 0;
    for (var i = 0; i < cartBoxs.length; i++){
        var cartBox = cartBoxs[i];
        var priceElement = cartBox.getElementsByClassName("carrinho-preco")[0];
        var quantityElement = cartBox.getElementsByClassName("carrinho-quantidade")[0];
        var preco = parseFloat(priceElement.innerText.replace("R$", ""));
        var quantity = quantityElement.value;
        total= total + (preco * quantity);
    }

        document.getElementsByClassName("preco-total")[0].innerText = "R$" + total;
    
}