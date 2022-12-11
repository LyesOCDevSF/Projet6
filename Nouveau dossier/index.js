


 let divHide = document.getElementById("div1");
 divHide.style.display="none";

const btnAdd = document.getElementById("btn1");
const btnCancel = document.getElementById("btn2");
const btnSearch = document.getElementById("btn3");

function addBooks(){

    //divHide = document.getElementById("div1");
    
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

    let title = document.getElementById("champTitre");
    let author = document.getElementById("champAuteur");

    if(title.value == ""){
        alert("Veuillez renseigner un titre.");
        title.focus();
        return false;
    }
    if(author.value == ""){
        alert("Veuillez renseigner un nom d'auteur");
        author.focus();
        return false;
    }
    return true;

   // fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms')
        //.then(res => res.json());
       // .then(data => data.json())
}
btnSearch.addEventListener("click", searchBook);


