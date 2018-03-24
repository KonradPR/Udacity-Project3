/*
 * Create a list that holds all of your cards
 */
 /*Creating cards and storing them in an array*/
 /*Creating cards and storing them in an array*/
  const icons = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube",
                 "fa-leaf","fa-bicycle","fa-bomb","fa-diamond",
                 "fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube",
                 "fa-leaf","fa-bicycle","fa-bomb"];
  const deck = document.querySelector(".deck");
  const matchedCards = [];
  const openedCards = [];

 let cards = (function(){
   let arr = [];
   let card,back,front;

   for(let i = 0; i<16; i++){
     card = document.createElement("li");
     card.className = "card";
     front = document.createElement("i");
     front.className = `card-front fa ${icons[i]}`;
     back = document.createElement("div");
     back.className = "card-back";
     card.appendChild(front);
     card.appendChild(back);
     arr[i] = card;
   }
   return arr;
 })();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 /*Fucntion shuffling the cards and adding them to page
  while removing any previous cards*/
const reset = function() {
    cards = shuffle(cards);
    const deck = document.querySelector(".deck");
    deck.innerHTML = "";
    for(let i = 0; i<16; i++) {
    deck.appendChild(cards[i]);
    }
    while(openedCards.length) {
      openedCards.pop();
    }
    while(matchedCards.length) {
    let element = matchedCards.pop();
    element.previousSibling.classList.remove("matched");
    element.parentElement.classList.remove("open");
    }
    document.querySelector(".score-panel").childNodes[3].textContent = 0;

    let scorePanel_stars = document.querySelector(".score-panel").childNodes[1];

    for(let i = 1; i <= 5; i+=2) {
      scorePanel_stars.childNodes[i].firstElementChild.className = "fa fa-star";
    }
    const modal = document.querySelector(".modal");
    modal.classList.remove("visible");
  };

  reset();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /*Event listener for cards*/


 deck.addEventListener("click", function(e){
   let card = e.target;

   if(canOpen(card,openedCards,matchedCards)) {
     open(card,openedCards);

     if(openedCards.length===2) {
       moveCount();
       if(matched(openedCards)) {
        setTimeout(function(){match(openedCards,matchedCards)},1000);
       } else {
      setTimeout(function(){close(openedCards)},1000,);
       }
     }
   }
  setTimeout( function()
  {if(matchedCards.length===16) {
     showModal();}
   },1500);
 });



 /*Function for opening a card*/
const open = function(card,openedCards) {
  card.parentElement.classList.add("open");
  openedCards.push(card);
};
/*Function for closing a card*/
const close = function(openedCards) {
  while(openedCards.length) {
    let element = openedCards.pop();
    element.parentElement.classList.remove("open");
  }
};

/*Function checking if a card can be opened*/
const canOpen = function(card, matchedCards,openedCards) {
  if(card.nodeName!=="DIV") {
    return false;
  } else if(matchedCards.length>=2) {
    return false;
  }
   else if(matchedCards.includes(card)) {
    return false;
  } else if(openedCards.includes()) {
    return false;
  } else {
    return true;
  }
};
/*function checking if opened card matches others*/
const matched = function(openedCards) {
  if(openedCards[0].previousSibling.className===openedCards[1].previousSibling.className) {
    return true;
  }
  return false;

};

/*Function moving cards form opened to matched*/
const match = function(openedCards,matchedCards) {
      while(openedCards.length) {
        let element = openedCards.pop();
        element.previousSibling.classList.add("matched");
        matchedCards.push(element);
      }
};

/*Fucntion used for managing moves counter and scores*/
const moveCount = function() {
  /*Updating moves counter on Score Panel*/
  let scorePanel_counter = document.querySelector(".score-panel").childNodes[3];
  scorePanel_counter.textContent = Number(scorePanel_counter.textContent)+1;
/*Updating star icons on Score Panel*/
  let scorePanel_stars = document.querySelector(".score-panel").childNodes[1];
  if(Number(scorePanel_counter.textContent)===15){
      scorePanel_stars.childNodes[5].firstElementChild.className = "fa  fa-star-o";
  } else if(Number(scorePanel_counter.textContent)===25){
    scorePanel_stars.childNodes[3].firstElementChild.className = "fa  fa-star-o";
  } else if(Number(scorePanel_counter.textContent)===35){
    scorePanel_stars.childNodes[1].firstElementChild.className = "fa  fa-star-o";
  }
}

/*Function showing win modal*/
const showModal = function() {
  const modal = document.querySelector(".modal");
  const scorePanel_stars = document.querySelector(".score-panel .stars");
  const modal_rating = document.querySelector(".modal-content-rating-vaule");
  modal_rating.innerHTML = scorePanel_stars.innerHTML;
  modal.classList.add("visible");
};

/*Event Listener for the restart button*/
(function() {
    const restartButton = document.querySelector(".restart");
    restartButton.addEventListener("click", function(e){reset();});
})();

/*Event Listner for modal play again button*/
(function() {
    const modalButton = document.querySelector(".modal-content-button");
    modalButton.addEventListener("click",function(e){reset();});
})();
