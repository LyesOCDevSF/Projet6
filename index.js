let main = document.getElementById("main");
let imgsrc = "D:/P6/unavailable.png"
let bookmark = `<i class="fa-solid fa-bookmark"></i>`
let id, title, author, description, bookImg, bookMark


//##################################### Affichage du bouton ajouter ######################################### 
const myBooks = document.getElementById("myBooks");
let line = document.querySelector("hr");
line.id = "line";

let newBooks = document.createElement("div");
newBooks.id = "Add";
myBooks.appendChild(newBooks);
newBooks = myBooks.insertBefore(newBooks, line);

const btnAdd = document.createElement("button");
const btnLabel = document.createTextNode("Ajouter un livre");
btnAdd.id = "btnAdd";
newBooks.appendChild(btnAdd);
btnAdd.appendChild(btnLabel);

//###################################################### Ajout du formulaire ###################################
let formContainer = document.createElement("div")
formContainer.id = "formContainer";
newBooks.appendChild(formContainer);
let form = document.createElement("form");
form.id = "serachForm";
/*form.action = "/submit";
form.method = "post";*/
formContainer.appendChild(form);
formContainer.style.display = "none";

// ajout des champs de recherche //
let inputTitle = document.createElement("input");
inputTitle.type = "text";
inputTitle.name = "Titre";
inputTitle.placeholder = "titre";
form.appendChild(inputTitle);

let inputAuthor = document.createElement("input");
inputAuthor.type = "text";
inputAuthor.name = "Auteur";
form.appendChild(inputAuthor);

// ajout des boutons Rechercher et Annuler //

let btnSearch = document.createElement("button");
const btnLabelSearch = document.createTextNode("Rechercher");
btnSearch.id = "btnSearch";
formContainer.appendChild(btnSearch);
btnSearch.appendChild(btnLabelSearch);

let br = document.createElement("br")
formContainer.appendChild(br);

let btnCancel = document.createElement("button");
const btnLabelCancel = document.createTextNode("Annuler");
btnCancel.id = "btnCancel";
formContainer.appendChild(btnCancel);
btnCancel.appendChild(btnLabelCancel);

//################# affichage des resultats de recherche #################################



const bookList = document.createElement("div");
bookList.className = "bookList";
newBooks.appendChild(bookList);
const searchResult = document.createElement("h2");
const searchResultTitle = document.createTextNode("Résultat de recherche");
searchResult.appendChild(searchResultTitle);
bookList.appendChild(searchResult);

const displayBook = document.createElement("div");
displayBook.id = "displayBook";
bookList.appendChild(displayBook);


searchResult.style.display = "none";
displayBook.style.display = "none";




//########################## affichage formulaire dynamique ########################



function addBooks() {

    if (formContainer.style.display === 'none') {
        formContainer.style.display = 'block';
    }

}
btnAdd.addEventListener("click", addBooks);

//######################################## annulation de la recherche #####################################

function cancelSearch() {

    location.reload();
}
btnCancel.addEventListener("click", cancelSearch);

//############################################ Recherche des livres #######################################

function searchBook() {

    let bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    let searchData1;
    let searchData2;


    if (inputTitle.value == "") {
        alert("Veuillez renseigner un titre.");
        inputTitle.focus();
        return false;
    }
    if (inputAuthor.value == "") {
        alert("Veuillez renseigner un nom d'auteur");
        inputAuthor.focus();
        return false;
    }
    searchData1 = inputTitle.value;
    searchData2 = inputAuthor.value;
    bookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchData1 + " " + searchData2;
    if (searchData1 == "" || searchData1 == null) {
        displayError();
    }
    if (searchData2 == "" || searchData2 == null) {
        displayError();
    }
    else {
        fetch(bookUrl)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                if (data.totalItems === 0) {

                    alert("Aucun Résultat");
                }
                data.items.forEach(book => {
                    displayResults(book);
                })
            })


    }
}


btnSearch.addEventListener("click", searchBook);

// #####################################affichage des resultats de la recherche############################### 


function displayResults(book) {

    let outputList = document.createElement('section');
    outputList.name = "favoris";
    outputList.className = 'outputlist';
    outputList.setAttribute("id", book.id);
    outputList.style.display = "none";

    title = book.volumeInfo.title;

    authors = book.volumeInfo.authors && book.volumeInfo.authors.length ? book.volumeInfo.authors[0] : "inconnu";
    if (book && book.volumeInfo && book.volumeInfo.description) {
        description = (book.volumeInfo.description).substring(0, 200);
    }

    bookImg = (book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.smallThumbnail : imgsrc;
    id = book.id;

    outputList.innerHTML = formatOutput(bookImg, title, authors, description, id);
    displayBook.appendChild(outputList);

    if (searchResult.style.display === 'none') {
        searchResult.style.display = 'block';
    }
    if (outputList.style.display === 'none') {
        outputList.style.display = 'block';
    }

}

function formatOutput(bookImg, title, authors, description, id) {

    if (displayBook.style.display === "none") {
        displayBook.style.display = "grid";
    }
    var a =
        `<header>
        <div class="bookMark"><i class="fa-solid fa-bookmark" onclick = myList('${id}')></i></div>
      <div class="title"><h3>${title}</h3></div>
      </header>
      <div class="authors"><h4>${authors}</h4></div>
      <div class="idBook"><p>ID : ${id}<p></div>
      <div class="description"><p>${description}...</p></div>
      <div class="imgBook"><img src="${bookImg}"></div>
      `;
    return a;
}





function myList(favorite) {

    if (sessionStorage.getItem(favorite)) {
        alert('Vous ne pouvez ajouter deux fois le même livre')
    }
    else {

        const content = document.getElementById("content");
        let saveTitle = document.getElementById("h2");

        let save = document.createElement('div');
        save.id = "save";
        content.appendChild(save);

        let saveBook = document.createElement('section');
        saveBook.name = "favoris"
        saveBook.className = 'favoriteBook';
        saveBook.setAttribute("id", favorite);

        let bookCard = document.getElementById(favorite).cloneNode(true);
        saveBook.appendChild(bookCard);

        //let save = document.getElementById("save");
        save.appendChild(saveBook);

        // remplacement de l'icone marquepage avec l'icone corbeille //
        let bookMark = saveBook.querySelector('.bookMark');
        let bookTrash = document.createElement('div');
        bookTrash.className = 'bookTrash';
        bookTrash.innerHTML = `<i class="fa-solid fa-trash" onclick="deleteBook('${favorite}')" ></i>`;
        bookMark.replaceWith(bookTrash);

        sessionStorage.setItem(favorite, saveBook.innerHTML);

        // supression du livre dans ma poche liste //
        bookTrash.addEventListener('click', function deleteBook() {
            saveBook.parentElement.removeChild(myBook);
            sessionStorage.removeItem(favorite);
        });
    }
    
}

// function de supression du livre dans la liste //
function deleteBook(favorite) {

    let saveBook = document.getElementById(favorite);
    let save = document.getElementById('save');
    save.removeChild(saveBook);


    sessionStorage.removeItem(favorite);
}

//############################## session storage après rafraichissement de la page ################################

window.onload = function () {

    
    let save = document.createElement('div');
    save.id = "save";
    content.appendChild(save);

    for (let i = 0; i < sessionStorage.length; i++) {

        let value = sessionStorage.getItem(sessionStorage.key(i));
        let favorite = sessionStorage.key(i);

        if (favorite != "IsThisFirstTime_Log_From_LiveServer") {

            save.innerHTML += value;
        }

        console.log("onload:" + i + "/" + favorite);

    }

}