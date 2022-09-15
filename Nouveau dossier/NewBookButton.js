//Premiere phase bouton ajouter un livre//

//doit declencher un formulaire //

// var id = document.getElementById("AddBook");
// alert("Cliqué sur " + id.value);



// window.addEventListener('load', function(){
//     creat_form();});

var bouton = document.getElementById("boutonAdd");
bouton.addEventListener("aadBooks", clic);
 
var mon_form = document.querySelector("#mon_form");
 
function clic(){
  bouton.style.display = "none";
  mon_form.style.display = "block";
}
 
function create_mon_form()
{
  // ----------
  // 1- CREATION du formulaire
  var mon_form = document.querySelector("#mon_form");
  var form = document.createElement('form');
  mon_form.appendChild(form);
    //...  
    //...  
  // ----------
  // 2- TRAITEMENT du formulaire
  form.addEventListener("submit", function(e){
    //...  
    bouton.style.display = "block";
    mon_form.style.display = "none";
    //...  
  });
  // ----------
}
// au chargement de page
window.addEventListener('load', function(){
  create_mon_form();
});