// Function to initiate the slide transition
document.getElementById('next-page-btn').addEventListener('click', function() {
    // Hide the header before the transition
    document.querySelector('.header').style.display = 'none';

    // Add the 'show' class to the iframe, triggering the slide-in effect
    const iframe = document.getElementById('iframe');
    iframe.style.display = 'block';  // Ensure iframe is displayed before sliding
    iframe.classList.add('show');

    // Optionally hide the current page content (for example, the clock)
    document.querySelector('.retro-background').style.display = 'none';
});

// Function for the clock slideshow (add logic as needed)
function startSlideshow() {
    // Add your slideshow logic here if necessary
}
