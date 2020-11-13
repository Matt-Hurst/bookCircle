import React, { useState } from 'react';
import BookShelf from '../Components/BookShelf';
import { User } from '../Interfaces'
import './Bookcase.scss'

interface myProps {
  user: User;
  name?: string;
}

//TODO: add state to store bookshelf genre/category

// TODO: make h2 = state

const Bookcase = (props: myProps) => {
  const [selectedBooks, setSelectedBooks] = useState('all')

  function handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedBooks(e.target.value)
  }

  return (
    <div className="bookCase">
      <h1>{props.name ? `${props.name}'s`  : 'Your'} Library:</h1>
      {/* <h2 className="bookCaseH2">{selectedBooks}</h2>  */}
      <select onChange={handleChange} id="filterBooks">
        <option selected value="all">All Books</option>
        <option value="borrow">Available to Borrow</option>
        <option value="star">Must Reads</option>
        <option value="fiction">Fiction</option>
        <option value="crime">Crime</option>
        <option value="science fiction">Science Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="politics and history">Politics and History</option>
      </select> 

      {props.user.books && <BookShelf 
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