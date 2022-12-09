


 let divHide = document.getElementById("div1");
 divHide.style.display="none";
function addBooks(){
document.getElementById("div1").style.display = "block";
}



function test(){
    const newelt = document.createElement('div'); // creation d'une div
    let element = document.getElementById('main'); // rataché a une balise parent
    element.appendChild(element); // enfant rattaché au parent 
}
//}

// ------------------------------------------------ essai fetch pour api ------------------------------------------------

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