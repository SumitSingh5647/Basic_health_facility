// Get elements
const profileBtn = document.getElementById("profileBtn");
const dashboardPopup = document.getElementById("userDashboard");
const servicePopup = document.getElementById("servicePopup");
const serviceTitle = document.getElementById("serviceTitle");
const serviceDescription = document.getElementById("serviceDescription");

// Service Details Data
const serviceDetails = {
    keratinTreatment: {
        title: "Surgery",
        description: "Surgery is a medical procedure involving an incision to remove or repair a body part."
    },
    HairSpa: {
        title: "Robotic Surgery",
        description: "Robotic surgery is a type of minimally invasive surgery using robotic systems to aid procedures."
    },
    PRP: {
        title: "Chemotherapy",
        description: "Chemotherapy uses powerful drugs to kill fast-growing cancer cells."
    },
    HairBotoxTreatment: {
        title: "Radiation Therapy",
        description: "Radiation therapy uses high-energy radiation to shrink tumors and kill cancer cells."
    },
    ScalpDetoxDandruff: {
        title: "Immunotherapy",
        description: "Immunotherapy boosts the body's natural defenses to fight cancer."
    },
    Hairtransplant: {
        title: "Bone Marrow Transplant",
        description: "A bone marrow transplant replaces damaged or destroyed bone marrow with healthy bone marrow stem cells."
    }
};

// Open Service Popup
function openServicePopup(serviceKey) {
    serviceTitle.innerText = serviceDetails[serviceKey].title;
    serviceDescription.innerText = serviceDetails[serviceKey].description;
    servicePopup.style.display = "flex";
}

// Close Service Popup
function closeServicePopup() {
    servicePopup.style.display = "none";
}

// Open User Dashboard
profileBtn.addEventListener("click", function() {
    dashboardPopup.style.display = "flex";
});

// Close User Dashboard
function closeDashboard() {
    dashboardPopup.style.display = "none";
}

// Close Popups when clicking outside the content
window.addEventListener("click", function(event) {
    if (event.target === dashboardPopup) {
        dashboardPopup.style.display = "none";
    }
    if (event.target === servicePopup) {
        servicePopup.style.display = "none";
    }
});