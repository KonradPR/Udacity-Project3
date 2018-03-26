# Memory Game Project

## Table of Contents

* [Introduction](#introduction)
* [Global variables](#global-variables)
* [Timer object](#timer-object)
* [Reset function](#reset-function)
* [Main event listener](#main-event-listener)
* [Minor functions](#minor-functions)
* [Dependencies](#dependencies)
* [Contributing](#contributing)

## Introduction

This is a simple memory game that utylizes JS functions to create a dynamic grid of 16 cards
that the player can flip. Player wins when he succesfully matches all 16 cards.

## Global variables

Project uses the following globa variables:
icons - array containing class names for icons on cards
deck - contains reference to the ul element on which cards are displayed
matchedCards - array containing cards matched by player
openedCards - array containing cards currently opened
cards - array containing all cards that are displayed oon screen with the cards beeing created
        in an IIFE

## Timer object

Timer object is a JS object used for measuring time that has passed in game and displaying
this information on page.
It has 3 methods and properites that are worth noting:
timer.timePassed - returns the time passed (in seconds) since the timer was started
timer.start() - starts the timer
timer.stop() - stops the timer

## Reset function
The reset function completly resets the state of the game, it does so by :
1 Shuffling cards array (calls function shuffle)
2 Appending cards to the deck
3 Empting openedCards array
4 Empting matchedCards array
5 Reseting score panel information
6 Hiding win modal
7 Starting the timer
The reset function is called when the script is being executed and each time the reset button is
clisked or the play again button is clicked

## Main even listener
The main event listener is added on the deck element and is responsible for the logic of the game.
It calls function canOpen in order to determin if a card can be opened and then openes (function open) cards and moves the to the matchedCards array if necessary (function match) and closes the if
they dont match (function close). The event listener also counts moves made by player, vy calling function moveCount and after each move check if the player has won. If player won listener calls the
showModal function wchich shows the win modal.

## Minor functions
There are following minor functions that are being called by other functions:
- open(card, openedCards) - adds class open to given cards and adds it to openedCards array
- close(openedCards) - removes elements from openedCards array and removes form them class opene
- canOpen(card, matchedCards, openedCards) - checks if a card can be open returns boolean
- matched(openedCards) - checks if opened cards match returns boolean
- match(openedCards, matchedCards) - moves cards form openedCards to matchedCards and adds to them   class matched
- moveCount() - increases moves counter on page and updates star rating
- showModal() - shows the game win modal

## Dependencies
This project uses:
- Font Awesome icons linked form :
https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css
- Coda font family linked form : https://fonts.googleapis.com/css?family=Coda

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
