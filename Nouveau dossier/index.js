


 let divHide = document.getElementById("div1");
 divHide.style.display="none";
 let id, title, author, description, bookImg, bookMark
const btnAdd = document.getElementById("btn1");
const btnCancel = document.getElementById("btn2");
const btnSearch = document.getElementById("btn3");

function addBooks(){
    
    if (document.getElementById("div1").style.display == 'none')
    {
         document.getElementById("div1").style.display = 'block';
    }
    
}

btnAdd.addEventListener("click", addBooks);


function cancelSearch(){
    
    let getTitle = document.getElementById("champTitre");
    let getAuthor = document.getElementById("champAuteur");
    if(getTitle.value != ""){
        getTitle.value = "";
    }
    if(getAuthor.value != ""){
        getAuthor.value = "";
    }
    if(document.getElementById("div1").style.display == 'block')
    {
        document.getElementById("div1").style.display = 'none';
    }
}
btnCancel.addEventListener("click", cancelSearch);

function searchBook(){

    
    let bookUrl = "https://www.googleapis.com/books/v1/volumes?q="
    let searchTitle = document.getElementById("champTitre");
    let searchAuthor = document.getElementById("champAuteur");
    let id, title, author, description, bookImg, bookMark
    let searchData1;
    let searchData2;
   // let keyAPI = "key=AIzaSyAq8xs1_8LCggwaDVqpMg2QqoMEinvf0Qk";
    
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
        if(searchData2 == "" || searchData2 == null)
            displayError();
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
    console.log(data.items.count);
    for(var i=0; i< 2; i+=10){
        item = data.items[i];
        title = item.volumeInfo.title;
        author = item.volumeInfo.author;
        description = item.volumeInfo.description;
        bookImg = item.volumeInfo.imageLinks;

        
        formatOutput(bookImg, title, author,description);
                                
                                
                                //console.log(disp)
    }

function formatOutput(bookImg, title, author, description, bookIsbn){
    let display = document.getElementById("displayBook");
    let viewUrl = 'book.html?isbn='+bookIsbn;
    //let htmlCard= document.createElement("div");
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
            <p class="card-text">Author: ${author}</p>
            <p class="card-text">Description: ${description}</p>
            <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
          </div>
        </div>
      </div>
    </div>
  </div>`
    
  
  
}
}
