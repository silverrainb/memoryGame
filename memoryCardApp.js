document.addEventListener("DOMContentLoaded", function() {

    const gifs = [
        "https://i.memeful.com/media/post/Bdq61Bw_700wa_0.gif",
        "https://i.memeful.com/media/post/WdnjZ6d_700wa_0.gif",
        "https://i.memeful.com/media/post/BRkjavM_700wa_0.gif",
        "https://i.memeful.com/media/post/BRk4Gd2_700wa_0.gif",
        "https://i.memeful.com/media/post/Pd1XAOR_700wa_0.gif",
        "https://media.giphy.com/media/mQsiaeOIEkXpC/giphy.gif",
        "https://media.giphy.com/media/X9rPB9KXCUsyk/giphy.gif",
        "https://media.giphy.com/media/MMlnz7g84qeMU/giphy.gif",
        "https://media.giphy.com/media/KnFV3u2Tkjj5S/giphy.gif",
        "https://i.kym-cdn.com/photos/images/newsfeed/000/238/340/273.gif",
        "https://media.giphy.com/media/KfrnIOYg9XmxhiJJN9/giphy.gif",
        "https://media.giphy.com/media/6zN4Ys2PcM1na/giphy.gif",
        // TODO refactor: how to create pair and allocate on divs?
        "https://i.memeful.com/media/post/Bdq61Bw_700wa_0.gif",
        "https://i.memeful.com/media/post/WdnjZ6d_700wa_0.gif",
        "https://i.memeful.com/media/post/BRkjavM_700wa_0.gif",
        "https://i.memeful.com/media/post/BRk4Gd2_700wa_0.gif",
        "https://i.memeful.com/media/post/Pd1XAOR_700wa_0.gif",
        "https://media.giphy.com/media/mQsiaeOIEkXpC/giphy.gif",
        "https://media.giphy.com/media/X9rPB9KXCUsyk/giphy.gif",
        "https://media.giphy.com/media/MMlnz7g84qeMU/giphy.gif",
        "https://media.giphy.com/media/KnFV3u2Tkjj5S/giphy.gif",
        "https://i.kym-cdn.com/photos/images/newsfeed/000/238/340/273.gif",
        "https://media.giphy.com/media/KfrnIOYg9XmxhiJJN9/giphy.gif",
        "https://media.giphy.com/media/6zN4Ys2PcM1na/giphy.gif"
    ]

    let startBtn = $("#start")
    let landing = $("#landing")
    let gameContainer = $("#game-container")
    let front = $(".game-card .front")
    let back = $(".game-card .back")

    startBtn.on("click", () => {
        //remove invisible class from game container
        gameContainer.removeClass("invisible")
        // add playing class to the landing so the page makes transition
        landing.addClass("playing")

        // add front card
        for (let box of front) {
            let frontURL = "https://pbs.twimg.com/profile_images/1116856950006923264/NjHQlbEF_400x400.jpg"
            let frontImg = document.createElement('img')
            frontImg.src = frontURL
            frontImg.style.width = "130px"
            frontImg.style.height = "130px"
            box.appendChild(frontImg)
        }

        function shuffle(arr) {
            return arr.sort(() => Math.random() - 0.5)
        }

        let doctorWho = shuffle(gifs)

        for(let i = 0; i < gifs.length; i++){
            let backImg = document.createElement('img')
            backImg.src = doctorWho[i]
            backImg.style.width = "130px"
            backImg.style.height = "130px"
            back[i].appendChild(backImg)
        }
    })

    const cards = $(".game-card:not(.score)");
    let numCards = cards.length;
    let card1 = null;
    let card2 = null;
    let cardsFlipped = 0;
    let currentScore = 0;
    let lowScore = localStorage.getItem("low-score");

    if (lowScore) {
        document.getElementById("best-score").innerText = lowScore;
    }

    // Handler
    for (let card of cards) {
        card.addEventListener("click", function handleCardClick(e) {
            if (!e.target.parentElement.classList.contains("front")) return;

            //assign current elem
            let currentCard = card.children[1].parentElement

            function setScore(newScore) {
                currentScore = newScore;
                document.getElementById("current-score").innerText = currentScore;
            }

            // if both not null
            if (!card1 || !card2) {
                // and if current card is not flipped
                if (!currentCard.classList.contains("flipped")) {
                    // add 1 to score
                    setScore(currentScore + 1);
                }
                // add class flipped
                currentCard.classList.add("flipped");

                card1 = card1 || currentCard;
                card2 = currentCard === card1 ? null : currentCard;
            }

            if (card1 && card2) {
                let gif1 = card1.children[1].innerHTML
                let gif2 = card2.children[1].innerHTML

                if (gif1 === gif2) {
                    cardsFlipped += 2;
                    console.log("Same, 2 cards flipped", cardsFlipped)
                    card1.removeEventListener("click", handleCardClick);
                    card2.removeEventListener("click", handleCardClick);
                    card1 = null;
                    card2 = null;
                } else {
                    setTimeout(function() {
                        card1.classList.remove("flipped");
                        card2.classList.remove("flipped");
                        card1 = null;
                        card2 = null;
                    }, 1000);
                }
            }

            // when all cards are flipped
            if (cardsFlipped === numCards) {
                function renderWinScreen() {
                    let end = $("#end")
                    setTimeout(function() {
                        end.removeClass("invisible")
                        end.addClass("visible");
                    }, 400);
                }

                renderWinScreen()

                let lowScore = +localStorage.getItem("low-score") || Infinity;
                $("#num-clicks")[0].textContent = currentScore
                $("#low-score")[0].textContent = lowScore

                if (currentScore < lowScore) {
                    localStorage.setItem("low-score", currentScore);
                }
            }
        });
    }
})