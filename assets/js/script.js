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
        const totalImages = carouselImages.children.length;
        if (totalImages === 0) {
            console.error("No images found in the carousel.");
            return;
        }
        // Adjust the transform property to show the current image
        carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Function to slide to the next image
    // Move to the next image (looping back to the start if necessary)
    const slideNext = () => {
        const totalImages = carouselImages.children.length;
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlide();
    };

    // Function to slide to the previous image
    // Move to the previous image (looping to the last if necessary)
    const slidePrev = () => {
        const totalImages = carouselImages.children.length;
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSlide();
    };

    // Automatic sliding functionality
    // Time between slides (in milliseconds)
    const slideInterval = 3000;
    let autoSlide = setInterval(slideNext, slideInterval);

    // Add event listeners for manual controls
    nextButton.addEventListener('click', () => {
        clearInterval(autoSlide);
        slideNext();
        autoSlide = setInterval(slideNext, slideInterval);
    });

    prevButton.addEventListener('click', () => {
        clearInterval(autoSlide); 
        slidePrev();
        autoSlide = setInterval(slideNext, slideInterval); 
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Select all skills with the class 'skill'
    const skills = document.querySelectorAll('.skill');

    // Iterate through each skill element
    skills.forEach(skill => {
        const progressBar = skill.querySelector('.progress');
        const percentageText = progressBar.querySelector('.percentage');
        const progressWidth = progressBar.style.width;

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
            progressBar.style.width = progressWidth; 

            // Show the percentage and animate its value
            if (percentageText) {
                percentageText.style.transition = 'opacity 1s ease-in-out';
                percentageText.style.display = 'block'; 
                percentageText.textContent = progressWidth;
            }
        });

        // Add mouseleave event to reset the progress bar to 0% when hover ends
        skill.addEventListener('mouseleave', () => {
            // On mouse leave, animate the progress back to 0%
            progressBar.style.transition = 'width 0.5s ease-out'; 
            progressBar.style.width = '0%';

            // Hide the percentage text
            if (percentageText) {
                percentageText.style.transition = 'opacity 0.5s ease-out';
                percentageText.style.display = 'none'; 
                percentageText.textContent = '0%'; 
            }
        });
    });
});



// Accordion toggle functionality
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        // Toggle active state
        content.classList.toggle('active');
    });
});


// fetch text content stored locally in a txt file
function fetchProjectDetailsFromTxt(projectId) {
    const content = document.getElementById(`${projectId}-text`);

    // Map project IDs to their corresponding local file paths
    const localFiles = {
        project3: "assets/projects/project3.txt",
        project4: "assets/projects/project4.txt",
    };

    const filePath = localFiles[projectId];
    if (!filePath) {
        content.textContent = "Invalid project ID. Cannot fetch details.";
        return;
    }

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            content.textContent = data;
        })
        .catch(error => {
            content.textContent = "Failed to load project details. Please try again.";
            console.error("Error fetching project details:", error);
        });
}

// Google Maps Function

function initMap() {
    // Define the location (latitude, longitude)
    var location = { lat: 52.836529, lng: -6.937332 };

    // Create a map centered at the specified location
    var map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 14,  // Adjust zoom level as needed
    });

    // Create a marker at the specified location
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Carlow, Ireland",
    });
}

