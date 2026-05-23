function buscarCancion(){

    let input =
    document.getElementById("search")
    .value
    .toLowerCase();

    let cards =
    document.querySelectorAll(".song-card");

    cards.forEach(card => {

        if(card.innerText
        .toLowerCase()
        .includes(input)){

            card.style.display = "block";

        }else{

            card.style.display = "none";
        }

    });
}

function traducir(){

    alert("Aquí aparecerá la traducción");
}