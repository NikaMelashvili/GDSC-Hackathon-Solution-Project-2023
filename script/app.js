'use strict';

// DOM Elements
const mainElements = document.querySelectorAll('.moving-element');
const startBtn = document.querySelector('#startButton');
const container = document.querySelector('.container');
const containerWidth = container.offsetWidth;
const currentScore = document.querySelector('.label-for-score');
let gameRunning = true;
let playerScore = 0;
let clickedElementCount = 0;

const fishType = function(){
    const images = [
        'images/small-shark.png',
        'images/small-shark.png',
        'images/small-shark.png',
        'images/small-shark.png',
        'images/small-shark.png',
        'images/gold-fish.png',
        'images/dolphin_small.png',
        'images/dolphin_small.png',
        'images/dolphin_small.png',
        'images/dolphin_small.png'
    ];

    mainElements.forEach(function(element, index) {
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex]; 

        element.innerHTML = `<img style="width: 100%;" src="${randomImage}" alt="fish-${index}">`;
        images.splice(randomIndex, 1);
    });
}

fishType();

const handleMovement = function () {
    startBtn.addEventListener('click', function (e) {
        e.preventDefault();

        mainElements.forEach(function (e) {
            e.classList.add('temp-class');
            const moveRight = Math.random() < 0.5; 

            if (moveRight) {
                moveElementRight(e);
            } else {
                moveElementLeft(e);
            }
        });
        setTimeout(() => {
            mainElements.forEach(function (e) {
                e.classList.remove('temp-class');
                e.style.transform = 'translateX(0)';
            });
        }, 5000);
    });
};
mainElements.forEach(function(e) {
    e.addEventListener('click', function() {
        e.style.display = 'none';
        let score = 0; 
        score++;
        currentScore.textContent = score;
        clickedElementCount++;

        if (clickedElementCount === mainElements.length) {
            gameRunning = false;
            alert('Game Over! You clicked all elements.');
        }
    });
  });
const clickStartButton = () => {
    while(gameRunning){
        startBtn.click(); 
        setTimeout(() => {
            clickStartButton();
        }, 11000);
    }
};
clickStartButton();

const setRandomStyles = function () {
    const occupiedPositions = new Set();

    mainElements.forEach(function (element) {
        let randomX = Math.floor(Math.random() * (containerWidth - element.offsetWidth));

        while (occupiedPositions.size > 0) {
            let closest = Infinity;
            for (const pos of occupiedPositions) {
                if (Math.abs(pos - randomX) < closest) {
                    closest = Math.abs(pos - randomX);
                }
            }
            if (closest < 20) {
                randomX = Math.floor(Math.random() * (containerWidth - element.offsetWidth));
            } else {
                break;
            }
        }

        element.style.position = 'absolute';
        element.style.left = randomX + 'px';
        occupiedPositions.add(randomX);

        
    });
};

const moveElementRight = function (element) {
    const elementWidth = element.offsetWidth;
    const elementPosition = element.getBoundingClientRect().left - container.getBoundingClientRect().left;
    const distanceToContainerEnd = containerWidth - (elementPosition + elementWidth);

    element.style.transition = 'transform 5s ease-in-out';
    element.style.transform = `translateX(${distanceToContainerEnd}px)`;

    element.addEventListener('transitionend', function () {
        const newPosition = element.getBoundingClientRect().left - container.getBoundingClientRect().left;
        if (newPosition >= containerWidth) {
            element.style.transition = 'none';
            element.style.transform = `translateX(-${elementWidth}px)`;
        }
    });
};
const moveElementLeft = function (element) {
    const elementPosition = element.getBoundingClientRect().left - container.getBoundingClientRect().left;

    element.style.transition = 'transform 5s ease-in-out';
    element.style.transform = `translateX(-${elementPosition}px)`;

    element.addEventListener('transitionend', function () {
        const newPosition = element.getBoundingClientRect().left - container.getBoundingClientRect().left;
        if (newPosition + element.offsetWidth <= 0) {
            element.style.transition = 'none';
            element.style.transform = `translateX(${containerWidth}px)`;
        }
    });
};
console.log(mainElements)
function randomFish() {
    while(gameRunning){
        const randomIndex = Math.floor(Math.random() * mainElements.length);
        const randomElement = mainElements[randomIndex];
        
        setTimeout(function(){
            randomElement.classList.add('moving-elements-visible');
            setTimeout(function(){
                randomElement.classList.remove('moving-elements-visible');
            }, 3000); 
        }, 3000); 
        setTimeout(function() {
            randomFish(); 
        }, 2000); 
    }
}
randomFish();
handleMovement();
document.addEventListener('DOMContentLoaded', function () {
    setRandomStyles();
});
