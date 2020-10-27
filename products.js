window.onload = function(){
    let product_section; let formatted_price; let product_img_container; let icons; let   buy_now;

    let remove_elm; let increase_quantity_elm; let  decrease_quantity_elm;

     // Get Cart Information from Local Storage
    let items_in_cart = localStorage.getItem("your_bag_elm"); 


    let product_clicked; let company_filter ="All";  let user_search ="" ; let user_search_length; let slider_value="";

    const all_products_grid = document.getElementById("all_products_grid");

    const filter_option = document.querySelectorAll(".filter_option");

    const search_elm = document.getElementById("search");

    search_elm.addEventListener("input",onUserSearch);

    const main_container = document.getElementById("main_container")

    //Filter out based on company, fetch them from API and then populate DOM
    function fetchProducts(){
        console.log("fetch")
        console.log(user_search)
    fetch("https://course-api.netlify.app/api/javascript-store-products")
    .then(response => response.json())
    .then(data => {




            product_section  =  data.filter(function(elm,index){

                        const {company,price,name} = elm.fields;

                        // User Search Input Check 

                        if(user_search != "" ){
                       
                        user_search_length = user_search.length;

                        return name.slice(0,user_search_length) == user_search
                                    
                        }

                        // Slider Input Check 

                        if(slider_value != "" ){
                        console.log(slider_value)

                        formatted_price = String(price).split("");

                        formatted_price.splice(formatted_price.length-2,0,".");

                        return parseInt(formatted_price.join("")) <  parseInt(slider_value) ;
                                    
                        }

                            

                        // Company Filter Check 

                       if(company_filter == "All"){

                            return company == "ikea" || company == "marcos" || company == "caressa" || company == "liddy";
                        } else {  return company == company_filter.toLowerCase() }
                        
                       

                        }).map(function(elm,index){

                const{url} = elm.fields.image[0];

                const {price,name} = elm.fields;

                formatted_price = String(price).split("");

                formatted_price.splice(formatted_price.length-2,0,".");
               

                return `  <div class="product">
                    <div class="product_img_container">  
                        <img class="image" src=${url}>
                        <div class="quick_look icon hideIcon"><i class="fa fa-search"></i></div>
                        <div class="buy_now icon hideIcon"><i class="fa fa-shopping-cart"></i></div>
                    
                    </div>
                        <p class="product_name">${name.toUpperCase()}</p>

                        <p class="product_price">$ ${formatted_price.join("")}</p>

                    </div>`

            }).join("");

           

            all_products_grid.innerHTML = product_section;

           
            

            product_img_container = document.querySelectorAll(".product_img_container");

            product_img_container.forEach(elm=>elm.addEventListener("mouseover",showIcon))

            product_img_container.forEach(elm=>elm.addEventListener("mouseout",hideIcon))

            quick_look = document.querySelectorAll(".quick_look");

       quick_look.forEach(elm => elm.addEventListener("click",goToProductPage))

       buy_now = document.querySelectorAll(".buy_now");

        buy_now.forEach(elm=> elm.addEventListener("click",add_to_cart));




    })

   

}

     fetchProducts();


     // User Chooses a Company Filter
    filter_option.forEach(elm => elm.addEventListener("click",fetchFilteredProducts))

    function fetchFilteredProducts(){

        company_filter = this.textContent;

         //Make User Search & SliderValue empty, so that it skips boht the IF statements and filters directly based on Company Filter
        user_search="";

        slider_value =""

         fetchProducts();

    }

    //When user searches for a product

    function onUserSearch(){

        user_search = this.value;
       // No need to make anything empty here as, this is the first IF Statement in Fetch Products Function
        fetchProducts();
        }

        //When price changes on slider

        const slider = document.getElementById("slider")

        slider.addEventListener("input",sliderChange);

        let slider_value_elm = document.getElementById("slider_value");



        function sliderChange(){

        slider_value_elm.innerHTML = this.value;
        slider_value = this.value;

        //Make User Search empty, so that it skips userSearch if statement and filters directly based on sliderValue
        user_search="";
        
        fetchProducts();


        }




    // When a product is clicked On , go to product detail page
    function goToProductPage(){


        product_clicked = this.parentElement.nextElementSibling.textContent;
        console.log(product_clicked)

        localStorage.setItem("product_clicked",product_clicked.toLowerCase());

        location.assign("./product.html")
        
    }

    // On hover show Quick Look and Add to cart
    function showIcon(){

        icons = this.children;

        [...icons].forEach(function(elm,index){

            if(index == 1 || index ==2){

                elm.classList.remove("hideIcon")
                elm.classList.add("showIcon")


            }


        })


    }

     // On mouse out hide Quick Look and Add to cart
    function hideIcon(){
            icons = this.children;

            [...icons].forEach(function(elm,index){

                if(index == 1 || index ==2){

                    elm.classList.remove("showIcon")
                    elm.classList.add("hideIcon")


                }


            })


            }

    

    
    
  


    // Show and Hide Side Menu

 //Show Side Menu on click of Cart 
 const homepage = document.getElementById("main_container")

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
                       <img class="cart_image" src=${this.parentElement.children[0].src}>
               
                       <div class="cart_details">
                           <h4 class="cart_product_name">${this.parentElement.nextElementSibling.textContent}</h4>
                           <h4 class="cart_product_price">${this.parentElement.parentElement.lastElementChild.textContent}</h4>
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
  
   // quantity = document.querySelectorAll(".quantity")  
   
   //console.log(items_in_cart)
   total_elm.textContent = calculateTotal() ;
  
   remove_elm = document.querySelectorAll(".remove");
   remove_elm.forEach( elm=> elm.addEventListener("click",remove_item_from_cart))
   increase_quantity_elm =  document.querySelectorAll(".up_arrow");

decrease_quantity_elm =  document.querySelectorAll(".down_arrow");

increase_quantity_elm.forEach(elm => elm.addEventListener("click",increaseQuantity));

decrease_quantity_elm.forEach(elm => elm.addEventListener("click",decreaseQuantity));




}
 remove_elm = document.querySelectorAll(".remove");


remove_elm.forEach( elm=> elm.addEventListener("click",remove_item_from_cart))

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
       console.log(total)

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
    homepage.classList.add("homepage")

    }

    // Close Modal, when user clicks on close button
    const modal_close = document.getElementById("modal_close");

    modal_close.onclick = function(){


    modal.style.visibility ="hidden";
    homepage.classList.remove("homepage")

    }


 // Set Cart Information to local Storage when user moves to another page
 window.addEventListener('beforeunload', function(event) {
        
        localStorage.setItem("your_bag_elm", your_bag_elm.innerHTML)
    
    });



    




}