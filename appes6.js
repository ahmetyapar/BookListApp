class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBookToList(book){
        const list = document.getElementById("book-list");
        const row = document.createElement("tr");

        row.innerHTML = ` 
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X<a></td>
        `;
        list.appendChild(row);
    }
    deleteBook(clicked){
        if(clicked.className=="delete"){
            clicked.parentElement.parentElement.remove();
            this.showAlert("Book removed.","success");
        }

    }
    showAlert(text, clas){
        const div = document.createElement("div");
        div.textContent =`${text}`;
        div.className=`alert ${clas}`;
        const container = document.querySelector(".container");
        const form = document.getElementById("book-form");

        container.insertBefore(div,form);
        setTimeout(function(){
            document.querySelector(".alert").remove();
        },3000)
    }
}

class Store {
    static getBook(){
        let books;
        if(localStorage.getItem("books") === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books
    }

    static displayBook(){
        let books = Store.getBook();

        books.forEach(function(book){
            const ui = new UI();
            ui.addBookToList(book);

        });


    }

    static addBook(book){
        let books = Store.getBook();
        books.push(book);

        localStorage.setItem("books",JSON.stringify(books));
        

    }

    static removeBook(isbn){
        let books = Store.getBook();

        books.forEach(function(book,index){
            if(book.isbn == isbn){
                books.splice(index,1);

            }

        });
        localStorage.setItem("books",JSON.stringify(books));
    }
}



const title = document.getElementById("title");
const author = document.getElementById("author");
const isbn = document.getElementById("isbn");

document.addEventListener("DOMContentLoaded",Store.displayBook);


document.getElementById("book-form").addEventListener("submit",function(e){
    let bookTitle = title.value;
    let bookAuthor = author.value;
    let bookIsbn = isbn.value;
    
    const book = new Book(bookTitle,bookAuthor,bookIsbn);
    const ui = new UI();
    
    if(bookTitle == "" || bookAuthor.value == "" || bookIsbn.value == ""){
        ui.showAlert("Please fill in all fields","error");
        
    }else{
        ui.addBookToList(book);
        Store.addBook(book);
        title.value = "";
        author.value = "";
        isbn.value = "";
        ui.showAlert("Book added","success")
        
    }

    


    e.preventDefault();
})


document.getElementById("book-list").addEventListener("click",function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
})
