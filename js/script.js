// Global property array loaded dynamically via fetch
var properties = [];

// Format pricing as AUD currency strings
function formatPrice(price, status) {
    if (status === "For Rent") {
        return "$" + price.toLocaleString() + " / week";
    }
    return "$" + price.toLocaleString();
}

// Property Listings Page Logic

function renderCards(list) {
    var container = document.getElementById("property-grid");
    if (!container) return;
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p class='no-results'>No properties found matching your search.</p>";
        return;
    }

    for (var i = 0; i < list.length; i++) {
        var p = list[i];
        var card = document.createElement("div");
        card.className = "property-card";

        var badgeClass = p.status === "For Sale" ? "badge-sale" : "badge-rent";

        card.innerHTML =
            "<div class='card-img-wrap'>" +
            "<img src='" + p.image + "' alt='" + p.title + "'>" +
            "<span class='badge " + badgeClass + "'>" + p.status + "</span>" +
            "</div>" +
            "<div class='card-body'>" +
            "<h3 class='card-title'>" + p.title + "</h3>" +
            "<p class='card-location'>" + p.location + "</p>" +
            "<p class='card-price'>" + formatPrice(p.price, p.status) + "</p>" +
            "<ul class='card-specs'>" +
            "<li>" + p.bedrooms + " Bed</li>" +
            "<li>" + p.bathrooms + " Bath</li>" +
            "<li>" + p.size + " m\u00B2</li>" +
            "<li class='specs-break'></li>" +
            "<li>" + p.type + "</li>" +
            "</ul>" +
            "<a href='property-detail.html?id=" + p.id + "' class='btn-details'>View Details</a>" +
            "</div>";

        container.appendChild(card);
    }
}

function applyFilters() {
    var searchVal = document.getElementById("search-input").value.toLowerCase().trim();
    var typeVal = document.getElementById("filter-type").value;
    var bedsVal = document.getElementById("filter-beds").value;
    var statusVal = document.getElementById("filter-status").value;
    var sortVal = document.getElementById("sort-by").value;

    var result = properties.slice();

    // Search filter
    if (searchVal !== "") {
        var filtered = [];
        for (var i = 0; i < result.length; i++) {
            var titleMatch = result[i].title.toLowerCase().indexOf(searchVal) !== -1;
            var locationMatch = result[i].location.toLowerCase().indexOf(searchVal) !== -1;
            if (titleMatch || locationMatch) {
                filtered.push(result[i]);
            }
        }
        result = filtered;
    }

    // Type filter
    if (typeVal !== "all") {
        var filtered2 = [];
        for (var i = 0; i < result.length; i++) {
            if (result[i].type === typeVal) filtered2.push(result[i]);
        }
        result = filtered2;
    }

    // Bedrooms filter
    if (bedsVal !== "all") {
        var filtered3 = [];
        for (var i = 0; i < result.length; i++) {
            if (bedsVal === "3+") {
                if (result[i].bedrooms >= 3) filtered3.push(result[i]);
            } else {
                if (result[i].bedrooms === parseInt(bedsVal)) filtered3.push(result[i]);
            }
        }
        result = filtered3;
    }

    // Status filter
    if (statusVal !== "all") {
        var filtered4 = [];
        for (var i = 0; i < result.length; i++) {
            if (result[i].status === statusVal) filtered4.push(result[i]);
        }
        result = filtered4;
    }

    // Sorting logic
    if (sortVal === "price-asc") {
        result.sort(function (a, b) { return a.price - b.price; });
    } else if (sortVal === "price-desc") {
        result.sort(function (a, b) { return b.price - a.price; });
    } else if (sortVal === "beds-asc") {
        result.sort(function (a, b) { return a.bedrooms - b.bedrooms; });
    } else if (sortVal === "beds-desc") {
        result.sort(function (a, b) { return b.bedrooms - a.bedrooms; });
    }

    renderCards(result);
    document.getElementById("results-count").textContent =
        result.length + " propert" + (result.length === 1 ? "y" : "ies") + " found";
}

function initListingPage() {
    var container = document.getElementById("property-grid");
    if (!container) return;

    // Parse URL query parameters
    var params = new URLSearchParams(window.location.search);
    var searchParam = params.get("search");
    var categoryParam = params.get("category");

    // Pre-fill search inputs
    if (searchParam) {
        document.getElementById("search-input").value = searchParam;
    }
    if (categoryParam) {
        document.getElementById("filter-status").value = categoryParam;
    }

    applyFilters();

    document.getElementById("search-input").addEventListener("keyup", applyFilters);
    document.getElementById("search-btn").addEventListener("click", applyFilters);
    document.getElementById("filter-type").addEventListener("change", applyFilters);
    document.getElementById("filter-beds").addEventListener("change", applyFilters);
    document.getElementById("filter-status").addEventListener("change", applyFilters);
    document.getElementById("sort-by").addEventListener("change", applyFilters);

    document.getElementById("clear-btn").addEventListener("click", function () {
        document.getElementById("search-input").value = "";
        document.getElementById("filter-type").value = "all";
        document.getElementById("filter-beds").value = "all";
        document.getElementById("filter-status").value = "all";
        document.getElementById("sort-by").value = "default";
        applyFilters();
    });
}

// Property Detail Page Logic

function getQueryParam(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function initDetailPage() {
    var mainImg = document.getElementById("main-image");
    if (!mainImg) return;

    var id = parseInt(getQueryParam("id"));
    var property = null;

    for (var i = 0; i < properties.length; i++) {
        if (properties[i].id === id) {
            property = properties[i];
            break;
        }
    }

    // Default to first property if not found
    if (!property) {
        property = properties[0];
    }

    document.title = property.title + " | Property Details";
    document.getElementById("detail-title").textContent = property.title;
    document.getElementById("detail-location").textContent = property.location;
    document.getElementById("detail-price").textContent = formatPrice(property.price, property.status);
    document.getElementById("detail-status-badge").textContent = property.status;
    document.getElementById("detail-status-badge").className =
        property.status === "For Sale" ? "badge badge-sale" : "badge badge-rent";
    document.getElementById("detail-description").textContent = property.description;

    // Specifications
    document.getElementById("spec-price").textContent = formatPrice(property.price, property.status);
    document.getElementById("spec-type").textContent = property.type;
    document.getElementById("spec-beds").textContent = property.bedrooms;
    document.getElementById("spec-baths").textContent = property.bathrooms;
    document.getElementById("spec-size").textContent = property.size + " m\u00B2";
    document.getElementById("spec-parking").textContent = property.parking;

    // Seller card details
    var seller = property.seller;
    if (seller) {
        document.getElementById("seller-name").textContent = seller.name;
        document.getElementById("seller-phone").textContent = seller.phone;
        document.getElementById("seller-email").textContent = seller.email;

        // Initials for avatar
        var parts = seller.name.trim().split(" ");
        var initials = parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "");
        document.getElementById("seller-avatar").textContent = initials.toUpperCase();

        document.getElementById("contact-btn").href = "mailto:" + seller.email;
    }

    // Breadcrumbs
    var crumbEl = document.getElementById("detail-title-crumb");
    if (crumbEl) crumbEl.textContent = property.title;

    // Thumbnail gallery setup
    var thumbs = (property.thumbnails && property.thumbnails.length > 0)
        ? property.thumbnails
        : [property.image];

    mainImg.src = thumbs[0];
    mainImg.alt = property.title;

    var thumbContainer = document.getElementById("thumb-container");
    thumbContainer.innerHTML = "";

    for (var j = 0; j < thumbs.length; j++) {
        var img = document.createElement("img");
        img.src = thumbs[j];
        img.alt = property.title + " photo " + (j + 1);
        img.className = "thumb" + (j === 0 ? " active-thumb" : "");

        img.addEventListener("click", function (e) {
            mainImg.src = e.target.src;
            var allThumbs = thumbContainer.getElementsByTagName("img");
            for (var k = 0; k < allThumbs.length; k++) {
                allThumbs[k].classList.remove("active-thumb");
            }
            e.target.classList.add("active-thumb");
        });

        thumbContainer.appendChild(img);
    }
}

// Event handlers for DOMContentLoaded (Form validations and Navigation)

document.addEventListener('DOMContentLoaded', () => {

    // Home search redirect
    const homeSearchBtn = document.getElementById('home-search-btn');
    if (homeSearchBtn) {
        homeSearchBtn.addEventListener('click', () => {
            const query = document.getElementById('home-search-input').value.trim();
            const category = document.getElementById('category').value;
            window.location.href = `property-listing.html?search=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`;
        });

        document.getElementById('home-search-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                homeSearchBtn.click();
            }
        });
    }

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const topNav = document.getElementById('top-nav');

    if (navToggle && topNav) {
        navToggle.addEventListener('click', () => {
            topNav.classList.toggle('open');
            const isOpen = topNav.classList.contains('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Active link highlights
    const currentPath = window.location.pathname;
    if (currentPath.includes('property-listing.html')) {
        document.getElementById('nav-listings')?.classList.add('active');
    } else if (currentPath.includes('property-detail.html')) {
        document.getElementById('nav-details')?.classList.add('active');
    } else if (currentPath.includes('about.html')) {
        document.getElementById('nav-about')?.classList.add('active');
    } else if (currentPath.includes('contact.html')) {
        document.getElementById('nav-contact')?.classList.add('active');
    }

    // Register form validation
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const role = document.querySelector('input[name="role"]:checked');
            const givenName = document.getElementById('givenName').value.trim();
            const middleName = document.getElementById('middleName').value.trim();
            const surname = document.getElementById('surname').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : "";
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Empty check
            if (!role || !givenName || !surname || !email || !phone || !password || !confirmPassword) {
                alert('Please fill out all required fields.');
                return;
            }

            // Phone validation
            if (!phone.startsWith('+61') && !phone.startsWith('(+61)') && !phone.startsWith('0')) {
                alert('Phone number must start with +61, (+61), or 0.');
                return;
            }

            // Email check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Check password complexity
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,}$/;
            if (!passwordRegex.test(password)) {
                alert('Password must be at least 7 characters long, contain at least one uppercase, one lowercase letter, and one special character.');
                return;
            }

            // Password matching check
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            alert('Registration Successful!');
            window.location.href = 'home.html';
        });
    }

    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            alert('Login Successful!');
            window.location.href = 'home.html';
        });
    }

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const descField = document.getElementById('description');

            const setError = (element, isError) => {
                const parentGroup = element.parentElement;
                if (isError) {
                    parentGroup.classList.add('has-error');
                    isValid = false;
                } else {
                    parentGroup.classList.remove('has-error');
                }
            };

            // Validate Name
            setError(nameField, nameField.value.trim() === '');

            // Validate Email
            const emailValue = emailField.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setError(emailField, emailValue === '' || !emailRegex.test(emailValue));

            // Validate Description
            setError(descField, descField.value.trim() === '');

            if (isValid) {
                const successMessage = document.getElementById('form-success');
                if (successMessage) {
                    successMessage.classList.add('show');
                    contactForm.reset();
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                } else {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                }
            }
        });

        // Live input check to clear errors
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function () {
                this.parentElement.classList.remove('has-error');
            });
        });
    }
});

// Fetch and start application on page load

function startApp(data) {
    properties = data.properties;
    initListingPage();
    initDetailPage();
}

window.onload = function () {
    // Fetch properties.json relative to pages (pages are located under src/ folder)
    fetch("../properties.json")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Server returned status " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            startApp(data);
        })
        .catch(function (err) {
            console.error("Failed to load properties.json:", err);
        });
};