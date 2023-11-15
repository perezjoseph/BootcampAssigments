// Get modal element
let modal = document.getElementById("simpleModal");
var modalBtn = document.querySelectorAll("button#modalBtn");
var closeBtn = document.getElementsByClassName("CloseBtn")[0];
let noBtn
var img

// Add listener to all modal buttons
for (let i=0; i<modalBtn.length;i++) {
   modalBtn[i].addEventListener('click', openModal);
}
closeBtn.addEventListener('click', CloseModal);


function openModal() {
    modal.style.display = 'block';
    contentdiv.innerHTML =`<div id="item"></div>
                      <p id="Content">Would you like to place an order of this product?</p>
                      <button id="yes">Yes</button>
                      <button id="no">No</button>`
    for (let e=0; e<this.parentNode.childNodes.length;e++) {
        if (this.parentNode.childNodes[e].nodeName === "IMG") {
            img = this.parentNode.childNodes[e].src;
        break;
    }
    }
    noBtn = document.querySelector("button#no");
    noBtn.addEventListener('click', Noanswer);
    yesBtn = document.querySelector("button#yes");
    yesBtn.addEventListener('click', OpenCart);
};
function CloseModal() {
    modal.style.display = 'none';
};

function Noanswer() {
    contentdiv.innerHTML = "<p>Sorry, let's check something else<p>";
}

function OpenCart() {
    contentdiv.innerHTML =`
    <div class="modal-body">
    <div class="image-container">
        <img src="${img}" id="modal-img">
    </div>
    <div class="modal-description">
        <header id="modalHeader">High-Efficiency 100W Solar Panel for Residential Roofs</header>
        <p class="desc">
        Elevate your home's energy efficiency with our state-of-the-art 100W Solar Panel, designed specifically for residential roof installation. Expertly crafted to maximize sunlight absorption, this panel is an ideal solution for homeowners looking to reduce their carbon footprint and electricity bills.
        </p>
        <form class="inputs">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity">
        </form>
        <button id="AddToCart" onclick=showConfirmationScreen()>Add To Cart</button>
    </div>
</div>
<footer id="modalFooter"></footer>
</div>
    `
}


function showConfirmationScreen() {
    // Update the modal content to show the confirmation message
    contentdiv.innerHTML = `
        <div class="confirmation-message">
            <p>Product successfully added to your cart!</p>
            <button id="continueShopping">Continue Shopping</button>
        </div>
    `;

    document.getElementById("continueShopping").addEventListener('click', function() {
        // Logic to continue shopping
        CloseModal(); // Assuming this function closes the modal
    });
}
