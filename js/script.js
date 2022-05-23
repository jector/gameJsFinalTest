$("form").on("submit", moveDice);

let diceFace = [1, 1, 1, 1, 1];
let explodedStatus = [false, false, false, false, false];
let oldStatus = [false, false, false, false, false];
let allDices = [];

for (let i = 0; i < diceFace.length; i++) {
    let newDice = {};
    newDice.numberDice = diceFace[i];
    newDice.statusDice = explodedStatus[i];
    allDices.push(newDice);
}
//console.log(allDices);
function moveDice(event) {
    event.preventDefault();

    for (let i = 0; i < allDices.length; i++) {
        if (allDices[i].statusDice === false) {
            allDices[i].numberDice = Math.floor(Math.random() * 6) + 1;
            if (allDices[i].numberDice === 2 || allDices[i].numberDice === 5) {
                allDices[i].statusDice = true;
            }
        }
    }

    let dice = document.querySelectorAll("img");
    dice.forEach(function(die){
        die.classList.add("shake");
    });
    setTimeout(function(){
            dice.forEach(function(die){
                die.classList.remove("shake");
            });
            showDices();
            pointsGame();
            gameOver()
        },
        1000
    );
}

function showDices() {

    $("#tableDices").empty();
    for (everyDice of allDices) {
        if (everyDice.statusDice === true){
            $("#tableDices").append('<div class="exploded"><span>'
                + everyDice.numberDice
                + '</span><img class="oneDice" src="images/dice-0'
                + everyDice.numberDice
                +'.svg" /></div>');
        }else {
            $("#tableDices").append('<div class="dice"><span>'
                + everyDice.numberDice
                + '</span><img class="oneDice" src="images/dice-0'
                + everyDice.numberDice
                +'.svg" /></div>');
        }
    }

}

function pointsGame(){
    for(let i = 0; i < explodedStatus.length; i++){
        oldStatus.push(explodedStatus[i]);
        oldStatus.shift();
    }
    for(let i = 0; i < allDices.length; i++){
        explodedStatus.push(allDices[i].statusDice);
        explodedStatus.shift();
    }

    let equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    let compareArr = equals(oldStatus, explodedStatus);
    //console.log(compareArr);


    let sum = 0;
    if (compareArr === true) {
        $(".dice span").each(function(){
            //console.log($(this).text());
            let num = parseInt($(this).html(),10);
            sum += (num || 0);
        });
        //console.log(sum);
        let takeNumber = parseInt($('.points').html(),10);
        $('.points').html(sum += (takeNumber|| 0));
    }

}

function gameOver() {
    let numDices = $('#tableDices .exploded').length;
    $("#tableDices div").each(function(){
        if (numDices === 5){
            $('.endGame').addClass("showGO");
        }
    });
}