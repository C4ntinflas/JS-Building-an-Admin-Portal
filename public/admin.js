let api_base_url = 'http://localhost:3001';

async function main() {
    let response = await fetch(api_base_url + '/listBooks');
    let books = await response.json();

    // Clear existing book cards
    let bookContainer = document.querySelector('.book-container');
    bookContainer.innerHTML = '';

    // Render the updated book list
    books.forEach(renderBook);
}


function renderBook(book) {
    let bookContainer = document.querySelector('.book-container');
    let card = document.createElement('div');
    card.className = 'col-sm-3 card';
    card.style.width = '100%';

    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5> 
            <input type="text" class="quantity-input" value="${book.quantity}"/>
            <button class="btn btn-primary submit-btn">Submit</button>
        </div>
    `;

    // Attach click event listener to the submit button
    let submitBtn = card.querySelector('.submit-btn');
    submitBtn.addEventListener('click', function () {
        let quantityInput = card.querySelector('.quantity-input');
        let newQuantity = quantityInput.value;

        // Call a function to update the quantity on the server
        updateQuantityOnServer(book.id, newQuantity);
    });

    bookContainer.appendChild(card);
}

async function updateQuantityOnServer(bookId, newQuantity) {
    try {
        let response = await fetch(api_base_url + '/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: bookId, quantity: newQuantity }),
        });
        
        if (!response.ok) {
            throw new Error(`Error updating quantity: ${response.statusText}`);
        }

        console.log('Quantity updated successfully');

        // Refresh the book list in the regular user interface
        main();
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

main();