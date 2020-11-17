import React, { useState, FunctionComponent } from 'react';
import BookShelf from '../Components/BookShelf';
import FriendsBook from '../Components/FriendsBook'
import UserBook from '../Components/UserBook'
import { User, Book } from '../Interfaces'
import './Bookcase.scss'

type BookCaseProps = {
  user: User,
  name?: string | null,
  username: string | null,
  handleBookRequest: Function,
  fromUserLibrary?: boolean,
  removeBookFromBookCase: Function,
  editBook: Function
}

const Bookcase: FunctionComponent<BookCaseProps> = (props) => {
  const [selectedBooks, setSelectedBooks] = useState('all')
  const [clickedBook, setClickedBook] = useState<Book>()
  
  function handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedBooks(e.target.value)
  }
  
  // state to save selected book => pass that state to FriendsBook component
  function handleFriendsBookClicked(book:Book) {
    setClickedBook(book)
  }

  function handleUserBookClick(book:Book) : void {
    setClickedBook(book)
  }
  
  function handleClosePopOut(): void {
    setClickedBook(undefined);
  }
   
  return (
    <div className="bookCase">
      {clickedBook && props.fromUserLibrary && 
        <UserBook 
         clickedBook={clickedBook} 
         handleClosePopOut={handleClosePopOut} 
         user={props.user}
         removeBookFromBookCase={props.removeBookFromBookCase}
         setClickedBook={setClickedBook}
         editBookFunc={props.editBook ? props.editBook: ()=> {}}
        />
      }
      {clickedBook && !props.fromUserLibrary && 
        <FriendsBook 
          handleClosePopOut={handleClosePopOut} 
          handleBookRequest={props.handleBookRequest} 
          clickedBook={clickedBook} 
        />}
      <h1>{props.name ? `${props.name}'s`  : 'Your'} Library:</h1>
      <select defaultValue="all" onChange={handleChange} id="filterBooks">
        <option value="all">All Books</option>
        <option value="borrow">Available to Borrow</option>
        <option value="star">Must Reads</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        <option value="crime">Crime & Thriller</option>
        <option value="science fiction">Science Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="action & adventure">Action & Adventure</option>
        <option value="politics & history">Politics & History</option>
        <option value="romance">Romance</option>
        <option value="comedy">Comedy</option>
        <option value="science & technology">Science & Technology</option>
        <option value="biography">Biography</option>
        <option value="arts & culture">Arts & Culture</option>
        <option value="self-improvement">Self-Improvement</option>
      </select> 

      {props.user.books && <BookShelf
      handleBookClicked={props.name ? handleFriendsBookClicked : handleUserBookClick} 
      books={selectedBooks === 'all' ? 
      props.user.books : 
      props.user.books?.filter(book => {
        if (selectedBooks === 'borrow') return book.availableToBorrow; 
        if (selectedBooks === 'star') return book.star; 
        return book.genre?.toLowerCase() === selectedBooks;
        })} />}
      
      <h2 className="bookCaseH2">Library Stats:</h2>
      <div className="bookCaseStatsDiv">
        <div className="statDiv">
          <p>Number of books </p>
          <p className="statDivNumber">{props.user.books ? props.user.books.length : null}</p>
        </div>
        <div className="statDiv">
          <p>Available to borrow </p>
          <p className="statDivNumber">{props.user.books ? props.user.books.filter(book => book.availableToBorrow).length : null}</p>
        </div>
        <div className="statDiv">
          <p>Must reads </p>
          <p className="statDivNumber">{props.user.books ? props.user.books.filter(book => book.star).length : null}</p>
        </div>
      </div>
    
    </div>

  )
}

export default Bookcase;