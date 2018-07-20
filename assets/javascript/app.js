$(document).ready(function(){
    var options = [
        {
            question: "Who is the best Lord of the Rings character?",
            choice: ["Aragorn", "Galadriel", "Legolas", "Radagast, obviously!"],
            answer: 3,
            photo: "assets/images/Radagast.jpg"
        },
        {
            question: "What is Legolas's weapon of choice?",
            choice: ["Axe", "Bow and arrow", "Sword", "Bare hands"],
            answer: 1,
            photo: "assets/images/legolas.jpg"
        },
        {
            question: "What are Durin's folk commonly known as?",
            choice: ["Hobbits", "Forest Elves", "Dwarves", "Eagles"],
            answer: 2,
            photo: "assets/images/dwarves.jpg"
        },
        {
            question: "Who participated in the battle of Isengard?",
            choice: ["Sarumans army VS Rohirrim", "Sauron VS Gondor", "Orcs VS Lothlorien", "Saruman VS Ents"],
            answer: 3,
            photo: "assets/images/isengard.jpg"
        },
        {
            question: "Where did Aragorn live as a child?",
            choice: ["Rivendell", "Shire", "The north", "Rohan"],
            answer: 0,
            photo: "assets/images/rivendell.jpg"
        },
        {
            question: "Morgul wounds are inflicted by?",
            choice: ["Sting blade", "Ringwraith weapons", "Elvish arrows", "A regular stone in Middle Earth"],
            answer: 1,
            photo: "assets/images/nazgul.jpg"
        },
        {
            question: "Which word do the elves use to call hobbits?",
            choice: ["Bilbo", "Periannath", "Onodrim", "Mellon"],
            answer: 1,
            photo: "assets/images/hobbits.png"
        },
        {
            question: "Radagast is what kind of being?",
            choice: ["Wizard", "Orc", "Elf", "Hobbit"],
            answer: 0,
            photo: "assets/images/wizard.jpg"
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();
    
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })
    
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * options.length);
        pick = options[index];

        /*	if (pick.shown) {
    		displayQuestion();
        	} else {
        		console.log(pick.question);*/
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //checks answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
            //		}
        }



        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position
            userGuess = parseInt($(this).attr("data-guessvalue"));

    
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;

            //score screen
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })
});