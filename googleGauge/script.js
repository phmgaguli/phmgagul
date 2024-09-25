document.addEventListener('DOMContentLoaded', function() {
    let count = 0; // Initialize the count variable
    const countDisplay = document.getElementById('count'); // Get the count display element
    const countButton = document.getElementById('count-button'); // Get the button element

    // Function to update the count display
    function updateCount() {
        count++; // Increment the count
        countDisplay.innerText = count; // Update the displayed count
    }

    // Add click event listener to the button
    countButton.addEventListener('click', updateCount);
});
