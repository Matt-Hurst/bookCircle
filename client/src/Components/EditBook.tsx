import React, { FunctionComponent, useEffect, useState } from "react";
import { Book } from "../Interfaces";
import { AiFillCloseCircle } from "react-icons/ai";

import './EditBook.scss'

type EditBookProps = {
  book: Book,
  deleteFunc: Function,
  update: Function,
  setEditBook: Function,
  userId: string | null,
  setClickedBook: Function
}

const EditBook: FunctionComponent<EditBookProps> = ({deleteFunc, setEditBook, book, userId, setClickedBook}) => {
  const [updatedBook, setUpdatedBook] = useState<any>(
    {
    title: undefined,
    authors: undefined,
    imageUrl: undefined,
    dateRead: undefined,
    review: undefined,
    availableToBorrow: undefined,
    genre: undefined,
    star: undefined,
  }
  )

  useEffect(() => {
    setUpdatedBook(book)
    // return () => setUpdatedBook(undefined)
  },[])

  const handleCloseClick = () => {
    setEditBook(false)
  }

  const handleReviewChange = (e:React.ChangeEvent<HTMLTextAreaElement> ) => {
    setUpdatedBook(
      {
      ...updatedBook,
      review: e.target.value
    })
  }

  const handleGenreChange = (e:React.ChangeEvent<HTMLSelectElement> ) => {
    setUpdatedBook(
      {
      ...updatedBook,
      genre: e.target.value
    })
  }

  const handleStarChange = () => {
    setUpdatedBook(
      {
        ...updatedBook,
        star: !(updatedBook.star)
      })
  }

  const handleAvailabilityChange = () => {
    setUpdatedBook(
      {
        ...updatedBook,
        availableToBorrow: !(updatedBook.availableToBorrow)
      })
  }

  const handleDateChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    setUpdatedBook(
      {
      ...updatedBook,
      dateRead: e.target.value
    })
  }

  const handleClick = () => {
    console.log('UPDATED',updatedBook)
  }

  const handleDelete = async () => {
    await deleteFunc(userId,book.id)
    setUpdatedBook({
      title: undefined,
      authors: undefined,
      imageUrl: undefined,
      dateRead: undefined,
      review: undefined,
      availableToBorrow: undefined,
      genre: undefined,
      star: undefined,
    })
    setEditBook(false)
    setClickedBook(undefined)
  }

  console.log('BOOK', book)
  return(
    <div className="EditBookPopOutDiv">
      {book && <div className="EditBookPopOutContainer">
        <h1 className="EditBookH1">Update Book:</h1>
        <AiFillCloseCircle onClick={handleCloseClick} className="UserBookEscapeButton"/>
        <div className="EditOptionContainer">
          <h2>Review:</h2>
          <textarea 
            className="editookReviewInput" 
            maxLength={100} 
            value={updatedBook ? updatedBook.review: ''} 
            onChange={handleReviewChange}  
          />
        </div>
        <div className="EditOptionContainer">
          <h2>Genre:</h2>
          <select value={updatedBook ? updatedBook.genre: 'fiction'} id="pickGenre" onChange={handleGenreChange} >
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
        </div>
        <div className="EditOptionContainer">
          <h2>Star read:</h2>
          <div className="starReadBtnsDiv">
            <button className={updatedBook.star ? 'star' : 'notStar'} onClick={handleStarChange}>yes</button>
            <button className={updatedBook.star ? 'notStar' : 'star'} onClick={handleStarChange}>no</button>
          </div>
        </div>
        <div className="EditOptionContainer">
          <h2>Can lend:</h2>
          <div className="starReadBtnsDiv">
            <button className={updatedBook.availableToBorrow ? 'star' : 'notStar'} onClick={handleAvailabilityChange}>yes</button>
            <button className={updatedBook.availableToBorrow ? 'notStar' : 'star'} onClick={handleAvailabilityChange}>no</button>
          </div>
        </div>
        <div className="EditOptionContainer">
          <h2>Date read:</h2>
          <input type="date" value={updatedBook ? updatedBook.dateRead : ''} onChange={handleDateChange}/>
        </div>
        <div className="EditActionBtns">
          <button className="saveChanges" onClick={handleClick}>save</button>
          <button className="deleteBtn" onClick={handleDelete}>delete</button>
        </div>
      </div>}
    </div>
  )
}

export default EditBook;