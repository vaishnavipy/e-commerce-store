window.onload = function(){
    let single_product_grid_html,formatted_price; let availableColor; let color_div;

    let remove_elm; let increase_quantity_elm; let  decrease_quantity_elm;

 // Get Product Selected from Local Storage
    let product_chosen = localStorage.getItem("product_clicked");

     // Get Cart Information from Local Storage
    let items_in_cart = localStorage.getItem("your_bag_elm")



    document.title = product_chosen.toUpperCase();

    const single_product_gird = document.getElementById("single_product_grid")
  
  

    const homepage = document.getElementById("main_container")


    fetch("https://course-api.netlify.app/api/javascript-store-products/")
    .then(response => response.json())
    .then(data => {

        console.log(data)

     single_product_gird_html =   data.filter(function(elm,index){

                const {name} = elm.fields

                 return name == product_chosen


                
            }).map(function(product,index){

                const {url} = product.fields.image[0]
                const {company,price,colors} = product.fields
               availableColor = colors;
                formatted_price = String(price).split("");

                formatted_price.splice(formatted_price.length-2,0,".")

                return ` <div class="single_image_grid" ><img class="single_image" src=${url}></div>    
                    <div class="product_desc_grid">
                        <h1 class="single_product_title">${product.fields.name.toUpperCase()}</h1> 
                        <h3 class="company">BY ${company.toUpperCase()}</h3>
                        <h3 class="single_product_price">$ ${formatted_price.join("")}</h3>`
                     
                      
        


            }).join("")

         color_div =  availableColor.map(function(elm,index){


                return ` <div class="color" style="background-color:${elm}"> </div> `

            }).join("")

            console.log(single_product_gird_html)

            single_product_gird.innerHTML =  `${single_product_gird_html}${color_div}<div class="product_desc">Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge </div>    
                        <button id="add_to_cart">ADD TO CART</button>   
                    </div> ` 





    const add_to_cart_btn = document.getElementById("add_to_cart") ;

    add_to_cart_btn.addEventListener("click",add_to_cart);



    })




//Show Side Menu on click of Cart 

const sideMenu = document.getElementById("side_menu")

const cart_button = document.getElementById("cart_container");

    cart_button.onclick = function(){

    

        sideMenu.classList.remove("hide_sidemenu")

        sideMenu.classList.add("show_sidemenu");

        homepage.classList.add("main_container")


        

    }
// Hide Side Menu on close

const close_sidemenu =document.getElementById("close")

    close_sidemenu.onclick = function(){

        sideMenu.classList.remove("show_sidemenu")

        sideMenu.classList.add("hide_sidemenu")

        homepage.classList.remove("main_container")


    }


// Populate Shopping cart with string from previous page


const your_bag_elm = document.getElementById("your_bag");

const total_elm = document.getElementById("total");

const update_cart_elm = document.getElementById("items_in_cart")

if(items_in_cart){

console.log("items in cart")
your_bag_elm.innerHTML =items_in_cart;

//Update Cart Quantity in the cart icon
update_cart_elm.textContent = totalItemsInCart();

total_elm.textContent = calculateTotal() ;

}


//Calculat the total Number of items or Quantity in your shopping Cart
 function totalItemsInCart(){
let quantity_total=0;

items_in_cart = document.querySelectorAll(".your_bag_container");

items_in_cart.forEach(function(eachItem,index){

    quantity_total += parseInt(eachItem.children[2].children[1].textContent)

})

return quantity_total;


}




function add_to_cart(){



your_bag_elm.innerHTML += `   <div class="your_bag_container">
                    <img class="cart_image" src=${this.parentElement.previousElementSibling.firstElementChild.src}>
            
                    <div class="cart_details">
                        <h4 class="cart_product_name">${this.parentElement.children[0].textContent}</h4>
                        <h4 class="cart_product_price">${this.parentElement.children[2].textContent}</h4>
                        <button class="remove">remove</button>
                    </div>
                    <div class="quantity_container">
                        <button class="up_arrow"><i class="fa fa-angle-up"></i></button>
                        <span class="quantity">1</span>
                        <button class="down_arrow"><i class="fa fa-angle-down"></i></button>
                    </div>
                    </div>`


cart_button.click();



//Update Cart Quantity in the cart icon
update_cart_elm.textContent = totalItemsInCart();


total_elm.textContent = calculateTotal() ;

remove_elm = document.querySelectorAll(".remove");
remove_elm.forEach( elm=> elm.addEventListener("click",remove_item_from_cart))
increase_quantity_elm =  document.querySelectorAll(".up_arrow");

decrease_quantity_elm =  document.querySelectorAll(".down_arrow");

increase_quantity_elm.forEach(elm => elm.addEventListener("click",increaseQuantity));

decrease_quantity_elm.forEach(elm => elm.addEventListener("click",decreaseQuantity));




}
remove_elm = document.querySelectorAll(".remove");


remove_elm.forEach(elm=> elm.addEventListener("click",remove_item_from_cart))

increase_quantity_elm =  document.querySelectorAll(".up_arrow");

decrease_quantity_elm =  document.querySelectorAll(".down_arrow");

increase_quantity_elm.forEach(elm => elm.addEventListener("click",increaseQuantity));

decrease_quantity_elm.forEach(elm => elm.addEventListener("click",decreaseQuantity));



function calculateTotal(){
let total=0;

items_in_cart = document.querySelectorAll(".your_bag_container");

    items_in_cart.forEach(function(elm,index){

        total += parseFloat((elm.querySelector(".cart_product_price").textContent).slice(1)).toFixed(2) * parseInt(elm.querySelector(".quantity").textContent)
        

    })

    return total.toFixed(2);

}

// To remove item is yoru shopping bag

function remove_item_from_cart(){
// console.log("remove")

this.parentElement.parentElement.remove();

console.log(  items_in_cart)

total_elm.textContent = calculateTotal() ;

//Update Cart Quantity in the cart icon
update_cart_elm.textContent = totalItemsInCart();

}

//Increase quantity in shopping cart 
function increaseQuantity(){

this.nextElementSibling.textContent = parseInt( this.nextElementSibling.textContent) + 1;

total_elm.textContent = calculateTotal() ;

//Update Cart Quantity in the cart icon
update_cart_elm.textContent = totalItemsInCart();


}

//Decrease quantity in shopping cart 
function decreaseQuantity(){

this.previousElementSibling.textContent = parseInt( this.previousElementSibling.textContent) - 1;

if( parseInt(this.previousElementSibling.textContent) < 1){

    this.previousElementSibling.textContent = 1;
}

total_elm.textContent = calculateTotal() ;

//Update Cart Quantity in the cart icon
update_cart_elm.textContent = totalItemsInCart();

}


// On window Resize hide or show Navbar
const hamburger_menu = document.getElementById("hamburger_menu");

const navbar = document.getElementById("navbar");

window.onresize = function(){

    showHamburgerMenu();


}


function showHamburgerMenu(){

    if(window.outerWidth < 800){

        hamburger_menu.style.visibility = "visible";

        navbar.style.visibility ="hidden";

    }
    else{

        hamburger_menu.style.visibility = "hidden";

        navbar.style.visibility ="visible";


    }

}

// On window load, check window size to show or hide hamburger Menu
showHamburgerMenu();



// Show Modal, when hamburger icon is clicked

hamburger_menu.addEventListener("click",showModal);
const modal = document.getElementById("modal");

function showModal(){

modal.style.visibility ="visible";
homepage.classList.add("main_container")

}

// Close Modal, when user clicks on close button
const modal_close = document.getElementById("modal_close");

modal_close.onclick = function(){


modal.style.visibility ="hidden";
homepage.classList.remove("main_container")

}



// Set Cart Information to local Storage when user moves to another page  
window.addEventListener('beforeunload', function(event) {
    
localStorage.setItem("your_bag_elm", your_bag_elm.innerHTML)

});

}

