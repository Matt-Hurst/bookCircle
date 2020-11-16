import React, { FunctionComponent } from 'react';
import BookDisplay from './Book';
import { Book, BorrowableBook } from '../Interfaces';
import './BookShelf.scss'

type BookShelfProps = {
  books: (Book | BorrowableBook)[] | null,
  fromDashboard?: Boolean,
  getSelectedFriend?: Function,
  handleBookClicked: Function,
}

const BookShelf: FunctionComponent<BookShelfProps> = ({books, getSelectedFriend, handleBookClicked, fromDashboard}) => {
  return (
    <>
    <div className="bookShelf">
      {(fromDashboard && books) ? books.map((book, i) =>       
       <BookDisplay 
          key={i} 
          book={book} 
          handleBookClicked={handleBookClicked}
          />   ): null   }
       {(!fromDashboard && books) && books.map((book, i) => <BookDisplay key={i} book={book} handleBookClicked={handleBookClicked} /> )}
    
    </div>
    </>
  )
}

export default BookShelf;