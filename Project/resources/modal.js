// Get modal element
let modal = document.getElementById("simpleModal");
var modalBtn = document.getElementById("modalBtn");
var closeBtn = document.getElementsByClassName("CloseBtn")[0];
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', CloseModal);
function openModal() {
    modal.style.display = 'block';
}
function CloseModal() {
    modal.style.display = 'none';
}