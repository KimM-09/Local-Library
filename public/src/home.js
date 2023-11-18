function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
return books.reduce((total, book) => {
  return total + (book.borrows[0].returned ? 0 : 1);
}, 0)
}

function getMostCommonGenres(books) {
  const temp = books.reduce((acc, book) => {
    const genreLoc = acc.findIndex((element) => 
    element.name === book.genre);
    if (genreLoc >=0) {
      acc[genreLoc].count++;
    } else {
      acc.push({ name: book.genre, count: 1});
    }
    return acc;
  }, []);
  return temp.sort((genreA, genreB) => genreB.count - genreA.count).slice(0, 5);
}

function getMostPopularBooks(books, count=5) {
  const borrows = books.map((book) => ({name:book.title, count: book.borrows.length}));
  borrows.sort((bookA, bookB) => bookB.count - bookA.count);
  return borrows.slice(0, count);
}


function getMostPopularAuthors(books, authors) {
  const authorList = books.reduce((acc, book) => {
    const { authorId, borrows } = book;
    const authorObject = authors.find(author => author.id === authorId);
    const name = `${authorObject.name.first} ${authorObject.name.last}`;
    const count = borrows.length;
    const authorExist = acc.find((auth) => auth.name === name);
    if(authorExist) {
      authorExist.count += count;
    } else {
      const newAuthor = {
        name,
        count
      };
      acc.push(newAuthor);
    }
    return acc;
  }, []);
  const sorted = authorList.sort((a, b) => b.count - a.count);
  const topFive = sorted.slice(0, 5);
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
