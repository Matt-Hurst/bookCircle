import React, { FunctionComponent, useEffect, useState } from "react";
import { Book, User } from '../Interfaces'
import { AiFillStar, AiFillCloseCircle } from "react-icons/ai";
import EditBook from '../Components/EditBook'


import './UserBook.scss'

type UserBookProps = {
  clickedBook: Book,
  handleClosePopOut: Function,
  updateAvailableBooks?: Function,
  user: User,
  removeBookFromBookCase: Function,
  setClickedBook: Function,
}
const UserBook:FunctionComponent<UserBookProps>  = (
  {
    clickedBook, 
    handleClosePopOut, 
    updateAvailableBooks,
    user,
    removeBookFromBookCase,
    setClickedBook,
  }) => {
  const [buttonText, setButtonText] = useState('request book')
  const [editBook, setEditBook] = useState<boolean>(false)

    console.log('Clicked Book', clickedBook, 'User', user)
  const handleEditClick = async () => {
    // await removeBookFromBookCase(user._id, clickedBook.id)
    // setClickedBook(undefined)
    setEditBook(true)
  }

  const handleCloseClick = (): void => {
    handleClosePopOut()
  }

  console.log(clickedBook)
  
  return (
    <div className="UserBookClickedDiv">
      {editBook && 
        <EditBook 
          book={clickedBook} 
          deleteFunc={removeBookFromBookCase} 
          update={()=>{}} 
          setEditBook={setEditBook}
          userId={user._id}
          setClickedBook={setClickedBook}
        />}
      <div className="UserBookPopOutDiv">
        <AiFillCloseCircle onClick={handleCloseClick} className="UserBookEscapeButton"/>

        <div className="SelectedBookDisplayDiv">
          <img src={clickedBook.imageUrl} alt=""/>
          {clickedBook.star && <AiFillStar className="SelectedBookStar" />}
          {/* {clickedBook.availableToBorrow && <IoIosCheckmarkCircle className="availableToBorrow" />} */}
        </div>
        <div className="UserBookPopOutContentContainer">
          <h3>{clickedBook.title}</h3>
          <h4>Your Review:</h4>
          <p>{clickedBook.review}</p>
          <h3>{clickedBook.genre}</h3>
          <p>{`Read ${clickedBook.dateRead}`}</p>
          <p>{clickedBook.availableToBorrow ? `Available to Borrow` : `Unavailable to Borrow`}</p>
          <button className="editBookBtn" onClick={handleEditClick}>edit</button>
        </div>
      </div>
    </div>
  )
}

export default UserBook;
