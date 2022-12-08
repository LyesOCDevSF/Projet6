

/*const buttonElement = document.createElement("button");
const sectionBouton = doucment.querySelector(".btn");
sectionBouton.appendChild(buttonElement);*/


/*let boutonElement = document.getElementById("Bouton");
boutonElement.addEventListener("click", addBooks);*/

// ajouter un formulaire en js avec une fonction ?
// le formulaire s'affiche au niveau du click
//creer le bouton innerhtml




//let divformulaire = document.getElementById("divFormulaire")
//divformulaire.style.display = 'none';

/*function addBooks(){
    //divformulaire = document.getElementById("divFormulaire")
    divformulaire.style.display= 'block';
    console.log(divformulaire);*/
document.getElementById(".champ_cache").style.display = "none";
function addBooks(){
document.getElementById(".champ_cache").style.display = "block";
}



function searchBook(){
fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms")
    .then(function(res) {
        if (res.ok){
            return res.json();
        }
    })
    .then(function(value){
        console.log(value);
    })
    .catch(function(err){
        console.log(err);
    })
}