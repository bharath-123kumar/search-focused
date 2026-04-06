document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    
    const resultsContainer = document.getElementById('results-container');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    const clearFiltersBtn = document.getElementById('clear-filters');

    // Initial fetch
    fetchResults();

    searchBtn.addEventListener('click', fetchResults);
    
    // Allow pressing "Enter" to search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchResults();
    });

    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        categorySelect.value = 'All';
        minPriceInput.value = '';
        maxPriceInput.value = '';
        fetchResults();
    });

    async function fetchResults() {
        // Grab values
        const q = searchInput.value.trim();
        const category = categorySelect.value;
        const minPrice = minPriceInput.value;
        const maxPrice = maxPriceInput.value;

        // Build query string
        const params = new URLSearchParams();
        if (q) params.append('q', q);
        if (category && category !== 'All') params.append('category', category);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);

        try {
            const response = await fetch(`/search?${params.toString()}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            renderResults(data);
        } catch (error) {
            console.error("Failed to fetch results:", error);
            resultsContainer.innerHTML = `<p style="color:#ef4444;">Error loading results. Please try again.</p>`;
        }
    }

    function renderResults(data) {
        resultsContainer.innerHTML = '';
        resultsCount.textContent = `${data.length} items`;
        
        if (data.length === 0) {
            resultsContainer.classList.add('hidden');
            noResults.classList.remove('hidden');
        } else {
            resultsContainer.classList.remove('hidden');
            noResults.classList.add('hidden');

            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <div class="card-category">${item.category}</div>
                    <div class="card-title">${item.name}</div>
                    <div class="card-price">₹${item.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                `;
                resultsContainer.appendChild(card);
            });
        }
    }
});
