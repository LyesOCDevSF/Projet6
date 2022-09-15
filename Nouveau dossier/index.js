

document.getElementById("button").onclick = buttonSearchGet;

Source: https://prograide.com/pregunta/17839/utiliser-un-bouton-html-pour-appeler-une-fonction-javascript

// ici on prépare la recherche par déclenchement du bouton recherche//



function buttonSearchGet(){
    //on met l'url dans une variable//
    var apiGoogle = "https://www.googleapis.com/books/v1/{collectionName}/resourceID?parameters";
    goto (apiGoogle);
}