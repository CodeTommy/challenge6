function printHighscores() {
    //either get scores from localstorage or set to empty array
var highscores = JSON.parse(window.localStorage.getItem("highscore")) || [];

//sort highscores by score property in descending order
highscores.sort(function(a,b) {
    return b.score - a.score;
});

highscores.array.forEach(function(score) {
    //create li tag for each high score
    var liTag = document.createElement("li")
    liTag.textContent = score.initials + " - " + score.score;

    //display on page
    var olEL = document.getElementById("highscores");
    olEL.appendChild(liTag);
});
}

function clearHighscores () {
    window.localStorage.reload();
}

document.getElementById("clear").onclick = clearHighscore;


// run function when page loads
printHighscores();

