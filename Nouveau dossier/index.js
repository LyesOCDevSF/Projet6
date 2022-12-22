

let main = document.getElementById("main");
 
 // Préparation insertion du formulaire dans le html
let imgsrc = "D:/P6/Nouveau dossier/logo/unavailable.png"
let bookmark = "D:/P6/Nouveau dossier/logo/signet (2).png"
 let id, title, author, description, bookImg, bookMark





main.innerHTML= `<button input type="button" id="btn1" onclik= "function addBooks()"   class=".btn" style="text-align: center">Ajouter un livre</button>
<div id="div1"></br>
Titre du livre <input id="champTitre" type="text" value=""></br>
</br>
Auteur du Livre <input id="champAuteur" type="text" value=""></br>
</br>
<button inputType="Search" id="btn3" style="text-align:center">Rechercher</button>
<button input type="reset" id="btn2" style="text-align: center">Annuler</button>
</div></br>
<div class="bookList">
<h2 id= "Result" class="text-center">Résultat de recherche</h2>
<div id="displayBook">
</div>
<div id="list-output" class="">
<div class="row">
</div>
</div>
</div>`
/*main.innerHTML += `<div id="div1"></br>
Titre du livre <input id="champTitre" type="text" value=""></br>
</br>
Auteur du Livre <input id="champAuteur" type="text" value=""></br>
</br>
<button inputType="Search" id="btn3" style="text-align:center">Rechercher</button>
<button input type="reset" id="btn2" style="text-align: center">Annuler</button>
</div></br>`
main.innerHTML += `<div class="bookList">
<h2 id= "Result" class="text-center">Résultat de recherche</h2>
<div id="displayBook">
</div>
`
main.innerHTML += `<div id="list-output" class="">
<div class="row">
</div>
</div>
</div>`*/
let add = document.getElementById("btn1");
let divHide = document.getElementById("div1");
divHide.style.display="none";
let searchResult = document.getElementById("Result");
searchResult.style.display = "none";
let display = document.getElementById("displayBook");
display.style.display= "none";





// bouton ajouter un livre : Affichage des champs de recherche
function addBooks(){
    
    if(divHide.style.display == 'none'){
         divHide.style.display = 'block';
    }
    
}

add.addEventListener("click", addBooks);


// bouton annuler la recherche : rafraichissement de la page 
let btnCancel = document.getElementById("btn2");
function cancelSearch(){
    
    location.reload();
}
btnCancel.addEventListener("click", cancelSearch);

// bouton recherche : recherche le livre demandé 
const btnSearch = document.getElementById("btn3");
function searchBook(){

    
    let bookUrl = "https://www.googleapis.com/books/v1/volumes?q="
    let searchTitle = document.getElementById("champTitre");
    let searchAuthor = document.getElementById("champAuteur");
    let searchData1;
    let searchData2;
    
    
   
    
    if(searchTitle.value == ""){
        alert("Veuillez renseigner un titre.");
        searchTitle.focus();
        return false;
    }
    if(searchAuthor.value == ""){
        alert("Veuillez renseigner un nom d'auteur");
        searchAuthor.focus();
        return false;
    }
        searchData1 = searchTitle.value;
        searchData2 = searchAuthor.value;
        bookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchData1 +" " + searchData2;
        if(searchData1 == "" || searchData1 == null ){
            displayError();
        }
        if(searchData2 == "" || searchData2 == null){
            displayError();
        }
            else{
                fetch(bookUrl, /*{mode:'no-cors', credentials:'include'}*/)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    displayResults(data);
                    //displayResults(outputList);
                })
               
            }
            
            
}
btnSearch.addEventListener("click", searchBook);


// affichage des resultats de la recherche 
let outputList = document.getElementById("list-output");

    outputList.style.display="none";
function displayResults(data){
    //outputList.appendChild(display);
    console.log(data.items);
    
        item = data.items[0];
        title = item.volumeInfo.title;
        authors = item.volumeInfo.authors;
        description = (item.volumeInfo.description).substring(0, 200);
        bookImg = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.smallThumbnail : imgsrc
        id = item.id;
        
        item2 = data.items[1];
        title2 = item2.volumeInfo.title;
        authors2 =  item2.volumeInfo.authors;
        description2 = item2.volumeInfo.description.substring(0, 200);
        bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.smallThumbnail : imgsrc
        id2 = item2.id;

        item3 = data.items[2];
        title3 = item3.volumeInfo.title;
        authors3 = item3.volumeInfo.authors
        description3 =  item3.volumeInfo.description.substring(0, 200);
        bookImg3  = (item3.volumeInfo.imageLinks) ? item3.volumeInfo.imageLinks.smallThumbnail : imgsrc
        id3 = item3.id;
        
        outputList.innerHTML += '<div class="row mt-4">' +
        `<table><tbody><tr>`+
        formatOutput(bookImg, title, authors,description, id) +
        formatOutput(bookImg2, title2, authors2, description2, id2) +
        formatOutput(bookImg3, title3, authors3, description3, id3) +
        `</tr></tbody></table>`+
        `</div>`;
        if(searchResult.style.display == 'none')
    {
        searchResult.style.display = 'block';
    }   
    if(outputList.style.display == 'none'){
        outputList.style.display = 'block';
    }
 
    
// format resultat de recherche 

function formatOutput(bookImg, title, authors, description, id, bookIsbn){
    let viewUrl = 'book.html?isbn='+bookIsbn;
    //let htmlCard= document.createElement("div");
    
        if(display.style.display = "none"){
            display.style.display= "block";
        }
        
    //display.innerHTML =
    var a =
       `<td>
       
    <div class="card" style="">
          <img src="${bookImg}" class="card-img" alt="...">
          <button inputType="button" id="saveB" style="text-align: right"><img src="${bookmark}" classe= "bookmark"></button>
        </div>
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">Author: ${authors}</p>
            <p class="card-text" maxLenght="200">Description: ${description}</p>
            <p class="card-text">Id: ${id}</p>
            <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
  </div>
  </td>`
    
   return a;
}

let saveBook = document.getElementById("saveB");

function myList(){
    
}

}

