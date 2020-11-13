import React from 'react';
import { Book } from '../Interfaces';
import { AiFillStar } from "react-icons/ai";
import './Book.scss'


interface myProps {
  book: Book | undefined;
}

const BookDisplay = (props: myProps) => {
  const {book} = props;
  return (
    <div className="BookDisplayDiv">
      { book && <img className="book" src={book.imageUrl} alt={`${book.title} book cover`}/>}
      { book && book.star && <AiFillStar className="star" />}
    </div>
  )
}

export default BookDisplay;
