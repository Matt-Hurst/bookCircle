import React, { FunctionComponent } from 'react';
import { Book } from '../Interfaces';
import { AiFillStar } from "react-icons/ai";
import './Book.scss'


type BookProps = {
  book: Book | undefined,
  handleBookClicked: Function
}

const BookDisplay: FunctionComponent<BookProps> = ({book, handleBookClicked}) => {

  const handleClick = () => {
    handleBookClicked(book)
  }

  return (
    <div className="BookDisplayDiv">
      { 
      book && 
      <img className="book" 
      src={book.imageUrl} 
      alt={`${book.title} book cover`}
      onClick={handleClick}
      />}
      { book && book.star && <AiFillStar className="star" />}
    </div>
  )
}

export default BookDisplay;
