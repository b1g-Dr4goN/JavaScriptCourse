const constCards = [
    { cardNum: "A", cardSuit: "spades"},
    { cardNum: "2", cardSuit: "spades"},
    { cardNum: "3", cardSuit: "spades"},
    { cardNum: "4", cardSuit: "spades"},
    { cardNum: "5", cardSuit: "spades"},
    { cardNum: "6", cardSuit: "spades"},
    { cardNum: "7", cardSuit: "spades"},
    { cardNum: "8", cardSuit: "spades"},
    { cardNum: "9", cardSuit: "spades"},
    { cardNum: "10", cardSuit: "spades"},
    { cardNum: "J", cardSuit: "spades"},
    { cardNum: "Q", cardSuit: "spades"},
    { cardNum: "K", cardSuit: "spades"},
    { cardNum: "A", cardSuit: "clubs"},
    { cardNum: "2", cardSuit: "clubs"},
    { cardNum: "3", cardSuit: "clubs"},
    { cardNum: "4", cardSuit: "clubs"},
    { cardNum: "5", cardSuit: "clubs"},
    { cardNum: "6", cardSuit: "clubs"},
    { cardNum: "7", cardSuit: "clubs"},
    { cardNum: "8", cardSuit: "clubs"},
    { cardNum: "9", cardSuit: "clubs"},
    { cardNum: "10", cardSuit: "clubs"},
    { cardNum: "J", cardSuit: "clubs"},
    { cardNum: "Q", cardSuit: "clubs"},
    { cardNum: "K", cardSuit: "clubs"},
    { cardNum: "A", cardSuit: "diamonds"},
    { cardNum: "2", cardSuit: "diamonds"},
    { cardNum: "3", cardSuit: "diamonds"},
    { cardNum: "4", cardSuit: "diamonds"},
    { cardNum: "5", cardSuit: "diamonds"},
    { cardNum: "6", cardSuit: "diamonds"},
    { cardNum: "7", cardSuit: "diamonds"},
    { cardNum: "8", cardSuit: "diamonds"},
    { cardNum: "9", cardSuit: "diamonds"},
    { cardNum: "10", cardSuit: "diamonds"},
    { cardNum: "J", cardSuit: "diamonds"},
    { cardNum: "Q", cardSuit: "diamonds"},
    { cardNum: "K", cardSuit: "diamonds"},
    { cardNum: "A", cardSuit: "hearts"},
    { cardNum: "2", cardSuit: "hearts"},
    { cardNum: "3", cardSuit: "hearts"},
    { cardNum: "4", cardSuit: "hearts"},
    { cardNum: "5", cardSuit: "hearts"},
    { cardNum: "6", cardSuit: "hearts"},
    { cardNum: "7", cardSuit: "hearts"},
    { cardNum: "8", cardSuit: "hearts"},
    { cardNum: "9", cardSuit: "hearts"},
    { cardNum: "10", cardSuit: "hearts"},
    { cardNum: "J", cardSuit: "hearts"},
    { cardNum: "Q", cardSuit: "hearts"},
    { cardNum: "K", cardSuit: "hearts"},
]

/*
const num = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
const suit = ["spades", "clubs", "diamonds", "hearts"]

for (let j of suit) {
    for (let i of num) {
        console.log("{ cardNum: \"" + i + "\", cardSuit: \"" + j + "\"},")
    }
}
*/


let cards = constCards

let drewCardsList = []
let dealerCardsList = []
let playerPoints = 0
let dealerPoints = 0
let isPlayerAlive = true
let isDealerAlive = true
let message = ""

let messageEl = document.getElementById("message-el")
let playerCardsEl = document.getElementById("player-cards-el")
let playerPointsEl = document.getElementById("player-points-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let dealerPointsEl = document.getElementById("dealer-points-el")

function getRandomCard() {
    let randInt = Math.floor(Math.random() * cards.length)
    let drewCard = cards[randInt]
    let newCards = []
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] !== drewCard) {
            newCards.push(cards[i])
        }
    }
    cards = newCards
    //console.log(cards)
    return drewCard
}

function startGame() {
    playerPoints = 0
    dealerPoints = 0
    drewCardsList = []
    dealerCardsList = []
    isPlayerAlive = true
    playerCardsEl.innerHTML = "<div id=\"player-cards-el\"></div>"
    playerPointsEl.innerHTML = "<h4>Your points:&ensp;<a id=\"player-points-el\">0</a></h4>"
    playerPointsEl.textContent = "0"
    cards = constCards
    messageEl.textContent = ""
    drawCard()
    drawCard()
}

function dealerDrawCard() {
    let drewCard = getRandomCard()
    dealerCardsList.push(drewCard)
    dealerCardsEl.innerHTML = "<div id=\"dealer-cards-el\"></div>"
    if (drewCard.cardNum !== "A") {
        if (drewCard.cardNum === "10" || drewCard.cardNum === "J" || drewCard.cardNum === "Q" || drewCard.cardNum === "K") {
            dealerPoints += 10
        }
        else {
            dealerPoints += parseInt(drewCard.cardNum, 10)
        }
    }
    else {
        if (dealerPoints <= 10) {
            dealerPoints += 11
        }
        else if (dealerPoints === 11) {
            dealerPoints += 10
        }
        else {
            dealerPoints++
        }
    }
    dealerPointsEl.textContent = "-"
}

function drawCard() {
    let drewCard = getRandomCard()
    drewCardsList.push(drewCard)
    playerCardsEl.innerHTML = "<div id=\"player-cards-el\"></div>"
    for (let x of drewCardsList) {
        playerCardsEl.innerHTML += `<img class="cards" alt="" src="src/images/${x.cardSuit}_${x.cardNum}.png">`
    }
    if (drewCard.cardNum !== "A") {
        if (drewCard.cardNum === "10" || drewCard.cardNum === "J" || drewCard.cardNum === "Q" || drewCard.cardNum === "K") {
            playerPoints += 10
        }
        else {
            playerPoints += parseInt(drewCard.cardNum, 10)
        }
    }
    else {
        if (playerPoints <= 10) {
            playerPoints += 11
        }
        else if (playerPoints === 11) {
            playerPoints += 10
        }
        else {
            playerPoints++
        }
    }
    playerPointsEl.textContent = `${playerPoints}`
    dealerDrawCard()
    if (playerPoints > 21) {
        if (dealerPoints <= 21) {
            message = "You're busted! Dealer Won!"
        }
        else {
            message = "Both busted! Draw!"
        }
        isPlayerAlive = false

        for (let x of dealerCardsList) {
            dealerCardsEl.innerHTML += `<img class="cards" alt="" src="src/images/${x.cardSuit}_${x.cardNum}.png">`
        }
        dealerPointsEl.textContent = `${dealerPoints}`
    }
    else if (playerPoints === 21) {
        if (dealerPoints !== 21) {
            message = "You've got Blackjack!"
        }
        else {
            message = "Both got Blackjack! Draw!"
        }
        for (let x of dealerCardsList) {
            dealerCardsEl.innerHTML += `<img class="cards" alt="" src="src/images/${x.cardSuit}_${x.cardNum}.png">`
        }
        dealerPointsEl.textContent = `${dealerPoints}`
    }
    else if (playerPoints < 21) {
        if (dealerPoints > 21) {
            message = "Dealer Busted! You won!"
            for (let x of dealerCardsList) {
                dealerCardsEl.innerHTML += `<img class="cards" alt="" src="src/images/${x.cardSuit}_${x.cardNum}.png">`
            }
            dealerPointsEl.textContent = `${dealerPoints}`
        }
        else if (dealerPoints === 21) {
            message = "Dealer got Blackjack! Dealer Won!"
            for (let x of dealerCardsList) {
                dealerCardsEl.innerHTML += `<img class="cards" alt="" src="src/images/${x.cardSuit}_${x.cardNum}.png">`
            }
            dealerPointsEl.textContent = `${dealerPoints}`
        }
        else {
            message = "Draw one more card?"
        }
    }

    messageEl.textContent = message
}

function homePage() {
    playerPoints = 0
    dealerPoints = 0
    drewCardsList = []
    dealerCardsList = []
    isPlayerAlive = true
    messageEl.textContent = "Wanna play a round?"
    dealerCardsEl.innerHTML = ""
    dealerPointsEl.textContent = "0"
    playerPointsEl.textContent = "0"
    playerCardsEl.innerHTML = ""
}

function check() {
    if (playerPoints > 21) {
        if (dealerPoints <= 21) {
            message = "You're busted! Dealer Won!"
        }
        else {
            message = "Both busted! Draw!"
        }
    }
    else if (playerPoints === 21) {
        if (dealerPoints !== 21) {
            message = "You've got Blackjack!"
        }
        else {
            message = "Both got Blackjack! Draw!"
        }
    }
    else if (playerPoints < 21) {
        if (dealerPoints > 21) {
            message = "Dealer Busted! You won!"
        }
        else if (dealerPoints === 21) {
            message = "Dealer got Blackjack! Dealer Won!"
        }
        else {
            if (dealerPoints < playerPoints) {
                message = "You won!"
            }
            else if (dealerPoints === playerPoints) {
                message = "Draw!"
            }
            else {
                message = "Dealer Won!"
            }
        }
    }
    for (let x of dealerCardsList) {
        dealerCardsEl.innerHTML += `<img class="cards" alt="" src="src/images/${x.cardSuit}_${x.cardNum}.png">`
    }
    dealerPointsEl.textContent = `${dealerPoints}`

    messageEl.textContent = message
}
