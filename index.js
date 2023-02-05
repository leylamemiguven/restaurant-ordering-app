import {menuArray} from "./data.js"

let paymentModule = document.getElementById("payment-module")
let orderBreakdown = document.getElementById("order-breakdown")
let username = document.getElementById("username")
let cardNumber = document.getElementById("card-number")
let password = document.getElementById("password")
let confirmationBox = document.getElementById("confirmationBox")
let addedItems = {} //has name of orders and the numbers of orders as key value pairs like 'Beer': 2


document.addEventListener('click', function(e){
    if (e.target.id === 'add-item'){
        addItem(e.target.dataset.additem)
    }
    else if (e.target.id === 'complete-order'){
        getPaymentDetails()
    }
    else if (e.target.id === 'remove-item-btn'){
        removeItem(e.target.dataset.removeitem) 
    }

    else if (e.target.id === 'pay-btn'){
        if (paymentValidation()){
            displayOrderConfirmation(username)
            orderBreakdown.style.display = "none"
        }
        else{
            username.value = ""
            cardNumber.value = ""
            password.value = ""

        }
        
        

    }
})

function addItem(itemId){
    
 
    const addedItemObj = menuArray.filter(item => item.id == itemId)[0]
    if (addedItemObj.name in addedItems){
        addedItems[addedItemObj.name] += 1

    }
    else{
        addedItems[addedItemObj.name] = 1

    }

    getOrderBreakdown(addedItems)
            
}

function getOrderBreakdown(itemsList){
    let feed = ``
    let totalPrice = getTotalPrice(itemsList)


    for (let item in itemsList){
        let orderedItem = menuArray.filter(order => order.name == item)[0]
        // console.log(orderedItem)
        
        feed += `
        <div class="ordered-item" id="ordered-item">
            <div class="ordered-item-start">
                <p class="amount-ordered"> x ${itemsList[item]}</p>
                <p class="ordered-item-name" id="ordered-item-name">${orderedItem.name}</p>
                <button class="remove-item-btn" id="remove-item-btn" data-removeitem="${orderedItem.name}"> remove </button>
            </div>
            <p class="ordered-item-price"> $${itemsList[item] * orderedItem.price}</p>
        </div>
        `
    }   
   
    
    orderBreakdown.innerHTML = `
        <p class="your-order-title">Your order</h1>
        <div id="added-items">
            ${feed}
        </div>
        <p class="total-price-title" id="total-price"> Total price: $${totalPrice} </p>
        <button class="complete-order-btn" id="complete-order">Complete order</button>
    `

    return orderBreakdown
    
    }

function getTotalPrice(items){
    let totalPrice = 0
    for (let item in items){

        let orderedItem = menuArray.filter(order => order.name == item)[0]
        totalPrice += items[item] * parseInt(orderedItem.price)
    }
        
    return totalPrice
    
}

function removeItem(itemName){
   
    for (let item in addedItems){

        if (itemName === item){
            if (addedItems[item]> 0){
                addedItems[item] -= 1

            }
            if (addedItems[item]=== 0){
                delete addedItems[item]

            }
                   
            getOrderBreakdown(addedItems)
          
        }
        // console.log(item) prints Beer, Pizza, Burger
    }
}

function getPaymentDetails(){
    paymentModule.style.visibility = "visible"
 
}

function paymentValidation(){
    if(username.value != "" && cardNumber.value != "" && password.value !=""){
        return true
    }
    else{
        alert("Please make sure to enter a username, a valid card number and a password.")
        console.log(username.value)
        return false
    }



}

function displayOrderConfirmation(name){
    
    const confirmationMessage = `
    <p class=confirmationMessage> Thanks, ${name.value} ! Your order is on its way! </p>
    `
    // ${name.value}
    confirmationBox.innerHTML = `${confirmationMessage}`
    // confirmationBox.style.display = !confirmationBox.style.display
    paymentModule.style.visibility = "hidden"

}

function renderItems(data){
     let menuItems = ``
    
    data.forEach(function(menuItem){
        
        menuItems +=`
        <li class="item" id="${menuItem.id}">
                
                <div class="item-info">
                    <div class="menu-icon">${menuItem.emoji}</div>
                    <div class="item-name-ingredients">
                        <p class="item-name" id="name">${menuItem.name}</p>
                        <p class="item-ingredients" id="ingredients">${menuItem.ingredients}</p>
                    </div>
                </div>
                <div class="price-addbtn">
                    <p class="item-price" id="price">$${menuItem.price}</p>
                    <button class="add-item-button" id="add-item" data-additem="${menuItem.id}"> + </button>
                </div>
                
                
            </li>
        `
    
        })
    return menuItems
    
    
}

function render(){
    document.getElementById("menu-items").innerHTML = renderItems(menuArray)
    
}


render()

