

let main = document.getElementById("main");
 
 

 let id, title, author, description, bookImg, bookMark





main.innerHTML= `<button input type="button" id="btn1" onclik= "function addBooks()"   class=".btn" style="text-align: center">Ajouter un livre</button>`
main.innerHTML += `<div id="div1"></br>
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
</div>`
let add = document.getElementById("btn1");
let divHide = document.getElementById("div1");
divHide.style.display="none";
let searchResult = document.getElementById("Result");
searchResult.style.display = "none";
let display = document.getElementById("displayBook");
display.style.display= "none";





function addBooks(){
    
    if(divHide.style.display == 'none'){
         divHide.style.display = 'block';
    }
    
}

add.addEventListener("click", addBooks);



let btnCancel = document.getElementById("btn2");
function cancelSearch(){
    
    location.reload();
}
btnCancel.addEventListener("click", cancelSearch);


const btnSearch = document.getElementById("btn3");
function searchBook(){

    
    let bookUrl = "https://www.googleapis.com/books/v1/volumes?q="
    let searchTitle = document.getElementById("champTitre");
    let searchAuthor = document.getElementById("champAuteur");
    let id, title, author, description, bookImg, bookMark
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
                })
               
            }
            
            
}
btnSearch.addEventListener("click", searchBook, displayResults);


function displayResults(data){
    console.log(data.items);
    for(var i=1; i< 2; i+=10){
        item = data.items[i];
        title = item.volumeInfo.title;
        authors = item.volumeInfo.authors;
        description = item.volumeInfo.description;
        bookImg = item.volumeInfo.imageLinks.smallThumbnail;
        if(bookImg == null || bookImg == "" )
        {
            document.createElement("img");
            img.src = "logo/unavailable.png";
        }
        else{

        
        formatOutput(bookImg, title, authors,description);
        if(searchResult.style.display == 'none')
    {
        searchResult.style.display = 'block';
    }   
}  
    }

function formatOutput(bookImg, title, authors, description, bookIsbn){
    let viewUrl = 'book.html?isbn='+bookIsbn;
    //let htmlCard= document.createElement("div");
    for(i=0; i<2; i++){
    display.innerHTML =
    `<div class="col-lg-6">
    <div class="card" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${bookImg}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">Author: ${authors}</p>
            <p class="card-text">Description: ${description}</p>
            <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
          </div>
        </div>
      </div>
    </div>
  </div>`
    }
}
}
