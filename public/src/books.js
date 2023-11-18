function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
let available = [];
let notAvailable = [];
const result = [];
books.forEach((book) => {
  const bookReturned = book.borrows[0].returned;
  if (bookReturned === true) {
    notAvailable.push(book)
  } else {
    available.push(book);
  }
});
result.push(available);
result.push(notAvailable);
return result
}
    

function getBorrowersForBook(book, accounts) {
  const result = []; 
  let borrowed = book.borrows; 
  borrowed.forEach((borrow) => {              
    let account = accounts.find((acct) => acct.id === borrow.id);
    let object = account;
    object['returned'] = borrow.returned;
    result.push(object)
  }) 
return result.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
