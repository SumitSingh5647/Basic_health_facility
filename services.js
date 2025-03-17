// Get elements
const profileBtn = document.getElementById("profileBtn");
const dashboardPopup = document.getElementById("userDashboard");
const closeBtn = document.querySelector(".close-btn");

// Show Dashboard Popup when clicking the profile picture
profileBtn.addEventListener("click", function() {
    dashboardPopup.style.display = "flex";
});

// Close Popup when clicking the close button
closeBtn.addEventListener("click", function() {
    dashboardPopup.style.display = "none";
});

// Close Popup when clicking outside the content
window.addEventListener("click", function(event) {
    if (event.target === dashboardPopup) {
        dashboardPopup.style.display = "none";
    }
});

// Logout Function
document.querySelector(".logout").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    window.location.href = "index.html"; // Redirect to login page
});