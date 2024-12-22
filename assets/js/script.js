document.addEventListener('DOMContentLoaded', () => {
    // Ensure the elements are available after DOM is fully loaded
    const carouselImages = document.querySelector('.carousel-images');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    // Check if all elements are present in the DOM
    if (!carouselImages || !prevButton || !nextButton) {
        console.log("One or more carousel elements were not found in the DOM.");
        return; 
    }

    let currentIndex = 0;

    // Function to update the carousel slide position
    const updateSlide = () => {
        const totalImages = carouselImages.children.length; // Total number of images
        if (totalImages === 0) {
            console.error("No images found in the carousel.");
            return;
        }
        carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`; // Adjust the transform property to show the current image
    };

    // Function to slide to the next image
    const slideNext = () => {
        const totalImages = carouselImages.children.length;
        currentIndex = (currentIndex + 1) % totalImages; // Move to the next image (looping back to the start if necessary)
        updateSlide();
    };

    // Function to slide to the previous image
    const slidePrev = () => {
        const totalImages = carouselImages.children.length;
        currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Move to the previous image (looping to the last if necessary)
        updateSlide();
    };

    // Automatic sliding functionality
    const slideInterval = 3000; // Time between slides (in milliseconds)
    let autoSlide = setInterval(slideNext, slideInterval); // Start the automatic sliding

    // Add event listeners for manual controls
    nextButton.addEventListener('click', () => {
        clearInterval(autoSlide); // Stop automatic sliding on manual interaction
        slideNext();
        autoSlide = setInterval(slideNext, slideInterval); // Restart the automatic sliding
    });

    prevButton.addEventListener('click', () => {
        clearInterval(autoSlide); // Stop automatic sliding on manual interaction
        slidePrev();
        autoSlide = setInterval(slideNext, slideInterval); // Restart the automatic sliding
    });
});




// Fetch API for dynamic project details
function fetchProjectDetails(projectId) {
    const content = document.getElementById(`${projectId}-text`);
    fetch('assets/projects/project1.json') // Assume this file contains project descriptions
        .then(response => response.json())
        .then(data => {
            content.textContent = data[projectId];
        })
        .catch(error => {
            content.textContent = "Failed to load project details. Please try again.";
            console.error("Error fetching project details:", error);
        });
}

// Accordion toggle functionality
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        // Toggle active state
        content.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Select all skills with the class 'skill'
    const skills = document.querySelectorAll('.skill');

    // Iterate through each skill element
    skills.forEach(skill => {
        const progressBar = skill.querySelector('.progress');  // Get the progress bar inside the skill
        const percentageText = progressBar.querySelector('.percentage'); // Select the percentage text
        const progressWidth = progressBar.style.width;         // Get the initial width (from the inline style)

        // Initialize progress bar width to 0% and hide the percentage text
        progressBar.style.width = '0%';
        if (percentageText) {
            percentageText.textContent = '0%';
            percentageText.style.display = 'none';
        }

        // Add mouseenter event to animate progress on hover
        skill.addEventListener('mouseenter', () => {
            // On hover, smoothly animate to the desired width
            progressBar.style.transition = 'width 1s ease-in-out';
            progressBar.style.width = progressWidth;  // Set it back to the original width

            // Show the percentage and animate its value
            if (percentageText) {
                percentageText.style.transition = 'opacity 1s ease-in-out'; // Smooth transition for opacity
                percentageText.style.display = 'block';  // Make the percentage visible
                percentageText.textContent = progressWidth;  // Set percentage text based on width
            }
        });

        // Add mouseleave event to reset the progress bar to 0% when hover ends
        skill.addEventListener('mouseleave', () => {
            // On mouse leave, animate the progress back to 0%
            progressBar.style.transition = 'width 0.5s ease-out';  // Faster transition on mouse leave
            progressBar.style.width = '0%';

            // Hide the percentage text
            if (percentageText) {
                percentageText.style.transition = 'opacity 0.5s ease-out'; // Fade out the percentage text
                percentageText.style.display = 'none';  // Hide the percentage text
                percentageText.textContent = '0%';  // Reset the percentage text to 0%
            }
        });
    });
});
