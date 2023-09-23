
// Your Code Here
let api_base_url = 'http://localhost:3001'
async function main() {

    let response = await fetch(api_base_url + '/listBooks')
    let books = await response.json()
    console.log(books)
    books.forEach(renderBook)
}

function renderBook(book) {
    let bookContainer = document.querySelector('.book-container')
    bookContainer.innerHTML += `
        <div class="col-sm-3">
            <div class="card" style="width: 100%;">
    
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5> 
                    <input type="text" value="${book.quantity}"/>                   
                </div>
            </div>
        </div>
    `
}

main()