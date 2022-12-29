

let main = document.getElementById("main");
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
</div>`

/*<div id="list-output" class="">
<div class="row">
</div>
</div>*/


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
                    console.log(data);
                    data.items.forEach(book =>{
                    displayResults(book);})})
                    }  
            }

btnSearch.addEventListener("click", searchBook);


// affichage des resultats de la recherche 
//let outputList = document.getElementById("list-output");

function displayResults(book){
    //console.log(data.items);
        //item = book.items[i];
       
        let outputList = document.createElement('section');
        outputList.className = 'outputlist';
        outputList.setAttribute("id", book.id);
            outputList.style.display="none";

        title = book.volumeInfo.title;
        authors = book.volumeInfo.authors;
        description =(book.volumeInfo.description).substring(0, 200);
        bookImg = (book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.smallThumbnail : imgsrc;
        id = book.id;
    
        outputList.innerHTML = formatOutput(bookImg, title, authors,description, id);
        display.appendChild(outputList);
        
        if(searchResult.style.display == 'none')
    {
        searchResult.style.display = 'block';
    }   
    if(outputList.style.display == 'none'){
        outputList.style.display = 'block';
    }

        }
    

 
    
// format resultat de recherche 

function formatOutput(bookImg, title, authors, description, id){
    
        if(display.style.display = "none"){
            display.style.display= "block";
        }
        
    
    var a =
  `<header>
          <input type="button" id="saveB" onclick="function myList()" style="text-align: right"><img src="${bookmark}" classe= "bookmark"></input>
  <div class="title"><h3>${title}</h3></div>
  </header>
  <div class="authors"><h4>${authors}</h4></div>
  <div class="idBook"><p>ID : ${id}<p></div>
  <div class="description"><p>${description}...</p></div>
  <div class="imgBook"><img src="${bookImg}"></div>
  `;
   return a;
}




let saveBook = document.getElementById("saveB");

function myList(favorite){
    
    if (sessionStorage.getItem(favorite)) {
        alert('Vous ne pouvez ajouter deux fois le même livre')
} else {

    let myBook = document.createElement('section');
    myBook.className = 'favoriteBook';
    myBook.setAttribute("id", favorite);
    myBook.getElementById(favorite);
    let outputList = document.getElementById(favorite);
    let list = document.getElementById("h2");

    myBook = outputList.cloneNode(true);
    list.appendChild(myBook);
    sessionStorage.setItem(favorite, myBook.innerHTML);
}
   
}
saveBook.addEventListener("click", myList);





