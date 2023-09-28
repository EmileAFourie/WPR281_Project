
/*

function showpopup(){
    document.getElementsByClassName('popup')[0].style.display = "block";
}
*/

function submiteditticket(){
    hidepopupedit();
    }
function submitticket(){
    hidepopup();
    }

function hidepopup(){
    document.getElementsByClassName('popup')[0].style.display = "none";
}

function showpopup(){
    document.getElementsByClassName('popup')[0].style.display = "block";
}
//edit popup show and hide
function showpopupedit(){
    document.getElementsByClassName('popup1')[0].style.display = "block";
}

function hidepopupedit(){
    document.getElementsByClassName('popup1')[0].style.display = "none";
}

function showtext(){
    document.getElementsByClassName('showalltickets')[0].style.display = "block";
}


