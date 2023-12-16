'use strict';

// DOM Elements
const mainElements = document.querySelectorAll('.moving-element');
const startBtn = document.querySelector('#startButton');
const container = document.querySelector('.container');
const containerWidth = container.offsetWidth;

// Function to handle movement and reset
const handleMovement = function () {
    startBtn.addEventListener('click', function (e) {
        e.preventDefault();

        mainElements.forEach(function (element) {
            element.classList.add('temp-class');
            const moveRight = Math.random() < 0.5; // 50% chance of moving right

            if (moveRight) {
                moveElementRight(element);
            } else {
                moveElementLeft(element);
            }
        });

        // Reset animation after 5 seconds
        setTimeout(() => {
            mainElements.forEach(function (element) {
                element.classList.remove('temp-class');
                element.style.transform = 'translateX(0)';
            });
        }, 5000);
    });
};
mainElements.forEach(function(element) {
    element.addEventListener('click', function() {
      // Hide the clicked element by setting display to 'none'
      element.style.display = 'none';
    });
  });
const clickStartButton = () => {
    startBtn.click(); // Simulate a click on the start button

    // Trigger the click again after 5 seconds
    setTimeout(() => {
        clickStartButton();
    }, 11000);
};

// Initial call to start the continuous movement
clickStartButton();

// Function to set random initial positions and colors for elements
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

        const randomColor = getRandomColor();
        element.style.backgroundColor = randomColor;
    });
};

// Function to generate random color
const getRandomColor = function () {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Function to move elements to the right
const moveElementRight = function (element) {
    const elementWidth = element.offsetWidth;
    const elementPosition = element.getBoundingClientRect().left - container.getBoundingClientRect().left;
    const distanceToContainerEnd = containerWidth - (elementPosition + elementWidth);

    element.style.transition = 'transform 5s ease-in-out';
    element.style.transform = `translateX(${distanceToContainerEnd}px)`;

    // After the transition, move the element to the other side if it reaches the end
    element.addEventListener('transitionend', function () {
        const newPosition = element.getBoundingClientRect().left - container.getBoundingClientRect().left;
        if (newPosition >= containerWidth) {
            element.style.transition = 'none';
            element.style.transform = `translateX(-${elementWidth}px)`;
        }
    });
};

// Function to move elements to the left
const moveElementLeft = function (element) {
    const elementPosition = element.getBoundingClientRect().left - container.getBoundingClientRect().left;

    element.style.transition = 'transform 5s ease-in-out';
    element.style.transform = `translateX(-${elementPosition}px)`;

    // After the transition, move the element to the other side if it reaches the beginning
    element.addEventListener('transitionend', function () {
        const newPosition = element.getBoundingClientRect().left - container.getBoundingClientRect().left;
        if (newPosition + element.offsetWidth <= 0) {
            element.style.transition = 'none';
            element.style.transform = `translateX(${containerWidth}px)`;
        }
    });
};


// Call the function to handle movement and reset
handleMovement();

// Call the function to set random initial positions and colors after the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    setRandomStyles();
});
