let books = [
    { title:'Moby Dick', price:20 },
    { title:'Tom Sawyer', price:12 },
    { title:'War & Peace', price:25 }
   ];

   const getAll = () => {
       return books;
   }

   const get = (title) => {
       return books.find((book) =>{
           return book.title == title;
       });
/*        for (i=0;i<books.length;i++){
           if (books [i].title===title){
               return books[i];
           }
       } */
       
   }
   console.log(get('Tom Sawyer'));
   module.exports = { getAll, get }