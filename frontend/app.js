const API_URL = 'http://localhost:5000/api';

// Fetch and display property listings
async function fetchProperties() {
    const response = await fetch(`${API_URL}/properties`);
    const properties = await response.json();
    const propertyList = document.getElementById('property-list');

    properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.innerHTML = `
            <h3>${property.title}</h3>
            <p>${property.description}</p>
            <p>Price: $${property.price}</p>
            <p>Size: ${property.size} sq ft</p>
            <p>Location: ${property.location}</p>
        `;
        propertyList.appendChild(propertyDiv);
    });
}

// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
        alert('Login successful!');
        localStorage.setItem('token', data.token); // Store token
        window.location.href = 'property_listing.html'; // Redirect to property listing
    } else {
        alert(data.error); // Show error
    }
});

// Handle recommendations form submission
document.getElementById('preferences-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const maxPrice = document.getElementById('max-price').value;
    const minSize = document.getElementById('min-size').value;

    const response = await fetch(`${API_URL}/recommendations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ maxPrice, minSize })
    });

    const data = await response.json();
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = '';

    data.recommendedProperties.forEach(id => {
        const recommendationDiv = document.createElement('div');
        recommendationDiv.innerHTML = `<p>Recommended Property ID: ${id}</p>`;
        recommendationsList.appendChild(recommendationDiv);
    });
});

// Load properties on page load
if (window.location.pathname === '/property_listing.html') {
    fetchProperties();
}
