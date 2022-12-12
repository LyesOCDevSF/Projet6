


 let divHide = document.getElementById("div1");
 divHide.style.display="none";

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
        bookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchData1 + searchData2;
        if(searchData1 == "" || searchData1 == null ){
            displayError();
        }
        if(searchData2 == "" || searchData2 == null)
            displayError();
            else{
                fetch(bookUrl, /*{mode:'no-cors', credentials:'include'}*/)
                .then(function(resonse){
                    return resonse.json();
                })
                .then(function(data){
                    console.log(data);

                    for(i=0; i<10; i++){
                    let bookImg ='book'+(i+1)

                    let imgRow = document.createElement('div');
                    imgRow.className = "row imgRow";
                    document.getElementById(imgRow).appendChild("displayBook");

                    }
                })
            }
}
btnSearch.addEventListener("click", searchBook);
