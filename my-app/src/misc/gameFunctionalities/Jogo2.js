import $ from 'jquery';
import timerBell from '../../assets/sons/bell.wav';
import pieceMove from '../../assets/sons/peca-efeito.mp3';
import pantherChew from '../../assets/sons/panther-chew.mp3';

let conta = -1;
let isJaguarTurn = false;
let position = [];

sessionStorage.setItem("variablesGame", JSON.stringify({ openModal: false, isDogVictory: false }));
window.dispatchEvent(new Event("storage"));
sessionStorage.setItem("countDogsDeath", 0);
window.dispatchEvent(new Event("storage"));

const difficult = sessionStorage.getItem('difficult');

var oncaEating = new Audio(pantherChew) //efeito sonoro onça comendo
var timerSound = new Audio(timerBell) //efeito sonoro turno
var pecaMov = new Audio(pieceMove) //efeito sonoro peca movendo

for (let i = 0; i <= 6; i++) {
    for (let j = 0; j <= 4; j++) {
        if ((i == 5 && j == 0) || (i == 5 && j == 4) || (i == 6 && j == 0) || (i == 6 && j == 4)) { continue }
        conta++;
        position[conta] = [i, j];
    }
}

//listando as posições criadas    
for (let num = 0; num <= 30; num++) {
    console.log("position(" + num + "): " + position[num]);
}

//iniciando e controlando as posições do tabuleiro *positionIsFree[0] até positionIsFree[30] (true ou false)
var positionIsFree = [];
for (let i = 0; i <= 14; i++) {
    positionIsFree[i] = false;
}
for (let i = 15; i <= 30; i++) {
    positionIsFree[i] = true;
}

//estabelecendo os possiveis movimentos
var canMove = [[[1, 2], [6, 12], [5, 10]],//0
[[0], [2, 3], [6, 11]],//1
[[3, 4], [1, 0], [8, 14], [7, 12], [6, 10]],
[[4], [2, 1], [8, 13]],
[[3, 2], [9, 14], [8, 12]],
[[0], [6, 7], [10, 15]],
[[0], [1], [2], [5], [7, 8], [10], [12, 18], [11, 16]],
[[2], [8, 9], [6, 5], [12, 17]],
[[3], [2], [4], [9], [14], [7, 6], [12, 16], [13, 18]],
[[4], [8, 7], [14, 19]],
[[5, 0], [6, 2], [11, 12], [15, 20], [16, 22]],
[[6, 1], [12, 13], [10], [16, 21]],
[[7, 2], [8, 4], [6, 0], [13, 14], [11, 10], [18, 24], [16, 20], [17, 22]],
[[8, 3], [12, 11], [14], [18, 23]],
[[9, 4], [8, 2], [13, 12], [19, 24], [18, 22]],
[[10, 5], [16, 17], [20]],
[[10], [11, 6], [12, 8], [15], [17, 18], [20], [21], [22, 27]],
[[12, 7], [16, 15], [18, 19], [22, 26]],
[[13, 8], [12, 6], [14], [17, 16], [19], [14], [23], [22, 25]], //18
[[14, 9], [18, 17], [24]],
[[15, 10], [16, 12], [21, 22]],/*************/
[[16, 11], [20], [22, 23]],
[[17, 12], [16, 10], [18, 14], [21, 20], [23, 24], [25, 28], [27, 30], [26, 29]],
[[18, 13], [24], [22, 21]],
[[19, 14], [18, 12], [23, 22]],
[[22, 18], [28], [26, 27]],
[[22, 17], [29], [27], [25], [29]],
[[22, 16], [30], [26, 25]],
[[25, 22], [29, 30]],
[[28], [30], [26, 22]],
[[27, 22], [29, 28]]];  /*esta lista devolve as possiveis posições de movimento a partir 
                da posição atual dada. Ex: canMove[0] dá as possiveis posições de 
                destino a partir da posição 0.*/

//colocando as peças no tabuleiro   
var initiate = function () {
    timerSound.play();
    $("#target").removeClass("point");
    $("#target").addClass("target_point");
    $("#c00").removeClass("point");
    $("#c00").addClass("soldier");
    $("#c01").removeClass("point");
    $("#c01").addClass("soldier");
    $("#c02").removeClass("point");
    $("#c02").addClass("soldier");
    $("#c03").removeClass("point");
    $("#c03").addClass("soldier");
    $("#c04").removeClass("point");
    $("#c04").addClass("soldier");
    $("#c05").removeClass("point");
    $("#c05").addClass("soldier");
    $("#c06").removeClass("point");
    $("#c06").addClass("soldier");
    $("#c07").removeClass("point");
    $("#c07").addClass("soldier");
    $("#c08").removeClass("point");
    $("#c08").addClass("soldier");
    $("#c09").removeClass("point");
    $("#c09").addClass("soldier");
    $("#c10").removeClass("point");
    $("#c10").addClass("soldier");
    $("#c11").removeClass("point");
    $("#c11").addClass("soldier");
    $("#c12").removeClass("point");
    $("#c12").addClass("monster"); //monster
    $("#c13").removeClass("point");
    $("#c13").addClass("soldier");
    $("#c14").removeClass("point");
    $("#c14").addClass("soldier");
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

//controlando os movimentos do jogador
var movement = [];//moviment é um array que recebe posição de origem e posição de destino, conforme a jogada selecionada

//mostrando o soldado selecionado e controlando origem e destino
var select = function (value) {

    let test = "#c" + value;
    //console.log(monsterTest);
    if ((movement.length == 0) && ($(test).hasClass("soldier")) && !isJaguarTurn) {
        let options = canMove[parseInt(value)];
        console.log(options);
        for (let i = 0; i < options.length; i++) {
            if (positionIsFree[parseInt(options[i][0])] == true) {
                movement.push(value);
                break;
            }
        }
    }

    if ((movement.length == 1) && ($(test).hasClass("point"))) {
        movement.push(value);
        if (!verifyMovement(movement)) {
            movement.pop();
        }
    }

    console.log(movement);

    if ((movement.length == 1) && (positionIsFree[parseInt(value)] == false)) {
        let origin = "#c" + movement[0];
        $(origin).removeClass("soldier");
        $(origin).addClass("soldierSelect");
    }
    if (movement.length == 2) {


        if (verifyMovement(movement)) {
            moveSoldier(movement); // movimenta o soldado
            //console.log("movimento possível " + movement);
        }
        else if (!(positionIsFree[parseInt(movement[0])])) {
            console.log("movimento não permitido");
            let origin = "#c" + movement[0];
            $(origin).removeClass("soldierSelect");
            $(origin).addClass("soldier");
        } // aqui a seleção é tirada da origem porque o movimento não é permitido

        movement = [];
        //  console.log("antes do monstro"+ movement);

        //Aqui é a vez do monstro atacar...

        isJaguarTurn = true;
        setTimeout(() => {
            monsterAttack();
            isJaguarTurn = false;
        }, 1200);
    }
};

/************************************MONSTER*****************************/

var monsterPosition = 12;
var oldMonsterPosition = 12;

var capture = [];     /************************/
var monsterSearch = []; /************************/
var attack = false;

var monsterMoving = function (coord) {
    let monsterDestiny = "";
    let monsterOrigin = "";
    let target = "";
    if ((attack == false) && (coord.length == 3)) {
        coord.pop();
    }
    //      console.log("**************************coord" +coord);
    if (coord[0] < 10) {
        monsterOrigin = "#c0" + coord[0];
    } else {
        monsterOrigin = "#c" + coord[0];
        //          console.log("**************************coord" +monsterOrigin);
    };
    if (coord[1] < 10) {
        monsterDestiny = "#c0" + coord[1];
    } else {
        monsterDestiny = "#c" + coord[1];
    };

    $(monsterOrigin).removeClass("monster");
    $(monsterOrigin).addClass("point");

    if (attack == true) {
        oncaEating.play();
        if (coord[2] < 10) {
            target = "#c0" + coord[2];
        } else {
            target = "#c" + coord[2];
        };
        $(target).removeClass("soldier");
        $(target).addClass("monster");

        async function testWait() {
            await wait(50);
            $(target).removeClass("monster");
            $(target).addClass("point");
        }

        testWait();
        positionIsFree[(coord[2])] = true;
        //        console.log("PIF 248"+ capture);
    } else {
        pecaMov.play();
    }

    $(monsterDestiny).removeClass("point");
    $(monsterDestiny).addClass("monster");

    monsterPosition = parseInt(coord[1]); /***************************************/
    oldMonsterPosition = monsterPosition;

    //    console.log("236 "+ coord[0]);
    positionIsFree[parseInt(coord[0])] = true;

    positionIsFree[parseInt(coord[1])] = false;   /************************/

    //    console.log("movimento do monstro validado na linha 236");


    /************************************************************** 31-03-18************/
    coord = [];
    let monsterMovement = [];
    let attackSelect = [];

    let monsterSearch2 = canMove[monsterPosition];
    for (let i = 0; i < monsterSearch2.length; i++) {
        if (((monsterSearch2[i][1]) != "undefined") && (positionIsFree[monsterSearch2[i][1]]) && (!(positionIsFree[monsterSearch2[i][0]]))) {
            attackSelect = attackSelect.concat(monsterSearch2[i][1]);
        }
    }

    if ((attackSelect.length > 0) && (attack == true)) {
        monsterSearch = [];
        attackSelect = [];
        attack = false;
        setTimeout(monsterAttack, 500);
    }
    attack = false;
    /***********************************************************************************/
};

var monsterAttack = function () {
    let monsterMovement = [];
    let simpleMoveSelect = [];
    let attackSelect = [];
    let capture = [];
    let conta = 0;

    monsterSearch = canMove[monsterPosition];

    for (let i = 0; i < monsterSearch.length; i++) {
        if (((monsterSearch[i][1]) != "undefined") && (positionIsFree[monsterSearch[i][1]]) && (!(positionIsFree[monsterSearch[i][0]]))) {
            attackSelect = attackSelect.concat(monsterSearch[i][1]);
            capture = capture.concat(monsterSearch[i][0]);
        }
    }

    if (attackSelect.length == 0) {
        for (let i = 0; i < monsterSearch.length; i++) {
            if ((positionIsFree[monsterSearch[i][0]]) && ((monsterSearch[i][0]) != "undefined")) {
                simpleMoveSelect = simpleMoveSelect.concat(monsterSearch[i][0]);
            }
        }
    }
    //  console.log("simpleMoveSelect");

    monsterMovement.push(monsterPosition);

    if (attackSelect.length > 0) {
        monsterMovement.push(attackSelect[0]);
        monsterMovement.push(capture[0]);
        //    console.log("monsterMovement  attack 289: "+monsterMovement);
        attack = true;
        monsterMoving(monsterMovement);
    } else if (simpleMoveSelect.length > 0) {

        let tam = simpleMoveSelect.length;
        let dice = 1 + (Math.floor(Math.random() * 6));

        if (tam >= 2 && dice >= 4) {
            for (let j = tam - 1; j > 0; j--) {

                if ((position[simpleMoveSelect[j]][0]) > (position[simpleMoveSelect[0]][0])) {
                    simpleMoveSelect.pop();
                }
            }
        }

        tam = simpleMoveSelect.length;

        let easy = Math.floor(Math.random() * tam);
        //console.log(easy);

        (difficult === "normal")
            ? monsterMovement.push(simpleMoveSelect[easy]) //easy version
            : monsterMovement.push(simpleMoveSelect[0]);// hard version

        attack = false;
        monsterMoving(monsterMovement);
    } else if (monsterPosition == 26 || monsterPosition === oldMonsterPosition) {
        //alert("Parabéns, você venceu!!!");
        sessionStorage.setItem("variablesGame", JSON.stringify({ openModal: true, isDogVictory: true }));
        window.dispatchEvent(new Event("storage"));
    };

    for (let i = 0; i < 31; i++) {

        if (positionIsFree[i]) {
            conta++;
            sessionStorage.setItem("countDogsDeath", conta);
            window.dispatchEvent(new Event("storage"));
        }
    }

    if (conta >= 21) {
        //alert("Sorry, you lost! Press <F5> to start again.");
        //alert("Puxa, você perdeu! Aperte <F5> para jogar outra vez.");
        sessionStorage.setItem("variablesGame", JSON.stringify({ openModal: true, isDogVictory: false }));
        window.dispatchEvent(new Event("storage"));
    }

};


/************************************MONSTER*****************************/

//mudando o soldado de posição
var moveSoldier = function (movement) {

    let origin = "#c" + movement[0];
    //console.log(origin);

    let destiny = "#c" + movement[1];
    //console.log(destiny);


    //Se há um soldado na origem e o destino está livre
    if ((!(positionIsFree[parseInt(movement[0])])) && (positionIsFree[parseInt(movement[1])])) {
        pecaMov.play();
        $(origin).removeClass("soldierSelect");
        $(origin).addClass("point");
        $(destiny).removeClass("point");
        $(destiny).addClass("soldier");
        positionIsFree[parseInt(movement[0])] = true;
        positionIsFree[parseInt(movement[1])] = false;
        //  console.log("movimento validado na linha 187");

    } else if (!(positionIsFree[parseInt(movement[0])])) {
        let origin = "#c" + movement[0];
        $(origin).removeClass("soldierSelect");
        $(origin).addClass("soldier");
        console.log("movimento nao permitido linha 191"); //aqui o movimento não é válido se o destino não estiver livre.

    }
}

function verifyMovement(movement) {

    let origin = parseInt(movement[0]);
    let destiny = parseInt(movement[1]);

    if (((((position[destiny][0] - position[origin][0]) ** 2 + (position[destiny][1] - position[origin][1]) ** 2) === 1) ||


        ((((position[destiny][0] - position[origin][0]) ** 2 + (position[destiny][1] - position[origin][1]) ** 2) === 2) && (((position[origin][0] % 2 === 0) && (position[origin][1] % 2 === 0)) || ((position[origin][0] % 2 === 1) && (position[origin][1] % 2 === 1)))))

        &&

        (!(((position[origin][0] === 4) && ((position[origin][1] === 0) || (position[origin][1] === 1) || (position[origin][1] === 3) || (position[origin][1] === 4))) && (position[destiny][0] === 5)))

        &&

        (!(((position[origin][0] === 5) && (position[origin][1] === 1)) && ((position[destiny][0] === 4) && ((position[destiny][1] === 0) || (position[destiny][1] === 1)))))

        &&

        (!(((position[origin][0] === 5) && (position[origin][1] === 3)) && ((position[destiny][0] === 4) && ((position[destiny][1] === 3) || (position[destiny][1] === 4)))))

        &&

        (!(((position[origin][0] == 5) && ((position[origin][1] == 1) || (position[origin][1] == 3))) && ((position[destiny][0] == 6) && (position[destiny][1] == 2))))

        &&

        (!(((position[destiny][0] == 5) && ((position[destiny][1] == 1) || (position[destiny][1] == 3))) && ((position[origin][0] == 6) && (position[origin][1] == 2))))

        &&

        (origin != destiny)

    ) { return true }
    else { return false };
}

$(document).ready(function () {

    $("#b00").click(function () {
        $(this).hide();
        setTimeout(initiate, 400)
    });

    $("#c00").click(function () {
        //$(this).hide();
        var val = "00";
        //  console.log(val);
        select(val);
    });

    $("#c01").click(function () {

        var val = "01";
        console.log(val);
        select(val);

    });

    $("#c02").click(function () {

        var val = "02";
        console.log(val);
        select(val);
    });

    $("#c03").click(function () {
        //$(this).hide();
        var val = "03";
        console.log(val);
        select(val);
    });

    $("#c04").click(function () {
        //$(this).hide();
        var val = "04";
        console.log(val);
        select(val);
    });

    $("#c05").click(function () {
        //$(this).hide();
        var val = "05";
        console.log(val);
        select(val);
    });

    $("#c06").click(function () {
        //$(this).hide();
        var val = "06";
        console.log(val);
        select(val);
    });

    $("#c07").click(function () {
        //$(this).hide();
        var val = "07";
        console.log(val);
        select(val);
    });

    $("#c08").click(function () {
        //$(this).hide();
        var val = "08";
        console.log(val);
        select(val);
    });

    $("#c09").click(function () {
        //$(this).hide();
        var val = "09";
        console.log(val);
        select(val);
    });

    $("#c10").click(function () {
        //$(this).hide();
        var val = "10";
        console.log(val);
        select(val);
    });

    $("#c11").click(function () {
        //$(this).hide();
        var val = "11";
        console.log(val);
        select(val);
    });

    $("#c12").click(function () {
        //$(this).hide();
        var val = "12";
        console.log(val);
        select(val);
    });

    $("#c13").click(function () {
        //$(this).hide();
        var val = "13";
        console.log(val);
        select(val);
    });

    $("#c14").click(function () {
        //$(this).hide();
        var val = "14";
        console.log(val);
        select(val);
    });

    $("#c15").click(function () {
        //$(this).hide();
        var val = "15";
        console.log(val);
        select(val);
    });

    $("#c16").click(function () {
        //$(this).hide();
        var val = "16";
        console.log(val);
        select(val);
    });

    $("#c17").click(function () {
        //$(this).hide();
        var val = "17";
        console.log(val);
        select(val);
    });

    $("#c18").click(function () {
        //$(this).hide();
        var val = "18";
        console.log(val);
        select(val);
    });

    $("#c19").click(function () {
        //$(this).hide();
        var val = "19";
        console.log(val);
        select(val);
    });

    $("#c20").click(function () {
        //$(this).hide();
        var val = "20";
        console.log(val);
        select(val);
    });

    $("#c21").click(function () {
        //$(this).hide();
        var val = "21";
        console.log(val);
        select(val);
    });

    $("#c22").click(function () {
        //$(this).hide();
        var val = "22";
        console.log(val);
        select(val);
    });

    $("#c23").click(function () {
        //$(this).hide();
        var val = "23";
        console.log(val);
        select(val);
    });

    $("#c24").click(function () {
        //$(this).hide();
        var val = "24";
        console.log(val);
        select(val);
    });

    $("#c25").click(function () {
        //$(this).hide();
        var val = "25";
        console.log(val);
        select(val);
    });

    $("#c26").click(function () {
        //$(this).hide();
        var val = "26";
        console.log(val);
        select(val);
    });

    $("#c27").click(function () {
        //$(this).hide();
        var val = "27";
        console.log(val);
        select(val);
    });

    $("#c28").click(function () {
        //$(this).hide();
        var val = "28";
        console.log(val);
        select(val);
    });

    $("#c29").click(function () {
        //$(this).hide();
        var val = "29";
        console.log(val);
        select(val);
    });

    $("#c30").click(function () {
        //$(this).hide();
        var val = "30";
        console.log(val);
        select(val);
    });
});
