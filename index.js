window.onload = function(){
            let section;  let child_elms;   let productImage ; let quick_look; let product_clikced;

            let buy_now;   let quantity; let items_in_cart;  let remove_elm; let increase_quantity_elm; let  decrease_quantity_elm;


            // Get Cart Information from Local Storage
            let items_in_cart_storage = localStorage.getItem("your_bag_elm");


            const featured_grid = document.getElementById("featured_grid");
            const all_products_btn = document.getElementById("all_products_btn");

            fetch("https://course-api.netlify.app/api/javascript-store-products")
            .then(response => response.json())
            .then(data => {

            section = data.filter(function(elm,index){
                    const {featured} = elm.fields

                    return featured;


            }).map(function(e,i){

                const {name,price} = e.fields;
                const {url} = e.fields.image[0]
            
            let formatted_price = String(price).split("");
            //console.log(formatted_price)
            formatted_price.splice(formatted_price.length-2,0,".")
            // console.log(formatted_price.join(""))
                
                return ` <div class="product">
                <div class="product_img_container"> 
                    <img class="home_image"  src=${url}>
                        <div class="quick_look icon hideIcon"><i class="fa fa-search"></i></div>
                        <div class="buy_now icon hideIcon"><i class="fa fa-shopping-cart"></i></div>
                    </div>
                    <h4 class="product_title">${name.toUpperCase()}</h4>
                    <h4 class="price">$${formatted_price.join("")}</h4>
                </div>`

            }).join("")
            featured_grid.innerHTML = section
            
            productImage = document.querySelectorAll(".product_img_container");
            
            productImage.forEach(elm => elm.addEventListener("mouseover",showIcon))

            productImage.forEach(elm => elm.addEventListener("mouseout",hideIcon))

            quick_look = document.querySelectorAll(".quick_look");

            quick_look.forEach(elm => elm.addEventListener("click",goToProductPage))

            buy_now = document.querySelectorAll(".buy_now");

            buy_now.forEach(elm=> elm.addEventListener("click",add_to_cart));
        

            })

        // console.log(featured_grid.innerHTML)


            


        // Show Quick Look and Buy Now on Mouse Hover
        
            function showIcon(){
            // console.log("mouseOver")
                child_elms =   this.children;

            // console.log(child_elms);

                for(var i=0; i< child_elms.length;i++){

                    if(i==1 || i==2){

                        child_elms[i].classList.remove("hideIcon");
                        child_elms[i].classList.add("showIcon")

                    }

                }
                
            }
        // Hide Quick Look and Buy Now on Mouse Out
            function hideIcon(){
            
                child_elms =   this.children;

                //console.log(child_elms);

                for(var i=0; i< child_elms.length;i++){

                    if(i==1 || i==2){

                        child_elms[i].classList.remove("showIcon");
                        child_elms[i].classList.add("hideIcon")

                    }

                }
                
            }

            // Show Side Menu, when click on cart

            const cart_button = document.getElementById("cart_container");

            const sideMenu = document.getElementById("side_menu")

            const close_sidemenu =document.getElementById("close")

            const homepage = document.getElementById("homepage")

            cart_button.onclick = function(){

            

                sideMenu.classList.remove("hide_sidemenu")

                sideMenu.classList.add("show_sidemenu");

                homepage.classList.add("homepage")


                

            }

            close_sidemenu.onclick = function(){

                sideMenu.classList.remove("show_sidemenu")

                sideMenu.classList.add("hide_sidemenu")

                homepage.classList.remove("homepage")


            }

            // Add to Cart Button in bottom of Home Page
        
            all_products_btn.onclick = function(){


                location.assign("./products.html")
            }

            //Add to Cart

            const your_bag_elm = document.getElementById("your_bag");

            const total_elm = document.getElementById("total");

            const update_cart_elm = document.getElementById("items_in_cart")

            if(items_in_cart_storage){

                console.log("items in cart")
                your_bag_elm.innerHTML =items_in_cart_storage;

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



            // Remove Items in Cart
        remove_elm = document.querySelectorAll(".remove");


            remove_elm.forEach(elm=> elm.addEventListener("click",remove_item_from_cart))

        increase_quantity_elm =  document.querySelectorAll(".up_arrow");

            decrease_quantity_elm =  document.querySelectorAll(".down_arrow");

            increase_quantity_elm.forEach(elm => elm.addEventListener("click",increaseQuantity));

            decrease_quantity_elm.forEach(elm => elm.addEventListener("click",decreaseQuantity));


            // Function to Calculate Total in cArt
            function calculateTotal(){
                let total=0;
            
                items_in_cart = document.querySelectorAll(".your_bag_container");

                    items_in_cart.forEach(function(elm,index){

                        total += parseFloat((elm.querySelector(".cart_product_price").textContent).slice(1)).toFixed(2) * parseInt(elm.querySelector(".quantity").textContent)
                        

                    })
                    console.log(total.toFixed(2))

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

            //Product Page
            function goToProductPage(){

                product_clikced = this.parentElement.nextElementSibling.textContent;
        
                localStorage.setItem("product_clicked",product_clikced.toLowerCase());

                localStorage.setItem("your_bag_elm", your_bag_elm.innerHTML)
        
                location.assign("./product.html")
        
        
            }

            // When user Clicks on Shop Now on Home Page
            const shopNowBtn = document.getElementById("shop");

            shopNowBtn.onclick = function(){

                location.assign("./products.html")

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