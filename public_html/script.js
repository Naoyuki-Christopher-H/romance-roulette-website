// DOM Elements
const yesButton = document.querySelector(".yes-btn");
const noButton = document.querySelector(".no-btn");
const questionElement = document.querySelector(".question");
const gifElement = document.querySelector(".gif");
const wrapperElement = document.querySelector(".wrapper");

/**
 * Handles the "Yes" button click event
 * Changes the question text and GIF, then hides the "No" button
 */
const handleYesButtonClick = () => 
{
    questionElement.textContent = "Being with you is my biggest blessing. I love you.";
    gifElement.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGNhdXh1b252b2F2b2U4cHRlNGkwMDZsajllaGF1cDJyb2p4NXl2YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/G6N0pDDgDpLjUvNoyQ/giphy.gif";
    noButton.style.display = "none";
};

/**
 * Generates a random position within the wrapper boundaries
 * @returns {Object} An object with x and y coordinates
 */
const getRandomPositionWithinWrapper = () => 
{
    // Get dimensions of elements
    const wrapperRect = wrapperElement.getBoundingClientRect();
    const noButtonRect = noButton.getBoundingClientRect();
    
    // Calculate available space (accounting for button size)
    const maxX = wrapperRect.width - noButtonRect.width - 20; // 20px padding
    const maxY = wrapperRect.height - noButtonRect.height - 20; // 20px padding
    
    // Generate random positions within bounds
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));
    
    return { x: randomX, y: randomY };
};

/**
 * Moves the "No" button to a random position within the wrapper
 */
const moveNoButtonRandomly = () => 
{
    const newPosition = getRandomPositionWithinWrapper();
    
    // Apply new position with smooth transition
    noButton.style.left = `${newPosition.x}px`;
    noButton.style.top = `${newPosition.y}px`;
};

/**
 * Initializes the application by setting up event listeners
 */
const initializeApp = () => 
{
    // Set initial position for the "No" button (centered in button group)
    const btnGroupRect = document.querySelector(".btn-group").getBoundingClientRect();
    noButton.style.left = `${btnGroupRect.width / 2 - noButton.offsetWidth / 2}px`;
    noButton.style.top = "0px";
    
    // Add event listeners
    yesButton.addEventListener("click", handleYesButtonClick);
    noButton.addEventListener("mouseover", moveNoButtonRandomly);
    noButton.addEventListener("touchstart", moveNoButtonRandomly); // For mobile touch support
    
    // Prevent button from being stuck in a corner on small screens
    window.addEventListener("resize", () => 
    {
        moveNoButtonRandomly();
    });
};

// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeApp);