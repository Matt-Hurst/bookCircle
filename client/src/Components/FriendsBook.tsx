import React, { FunctionComponent, useEffect, useState } from "react";
import { Book } from '../Interfaces'
import { AiFillStar, AiFillCloseCircle } from "react-icons/ai";
import './FriendsBook.scss'

type FriendsBookProps = {
  clickedBook: Book,
  handleBookRequest: Function,
  handleClosePopOut: Function,
  getSelectedFriend?: Function,
  updateAvailableBooks?: Function
}
const FriendsBook:FunctionComponent<FriendsBookProps>  = (
  {
    clickedBook, 
    handleBookRequest, 
    handleClosePopOut, 
    getSelectedFriend,
    updateAvailableBooks
  }) => {
  const [buttonText, setButtonText] = useState('request book')

  useEffect(() => {
    if (getSelectedFriend) getSelectedFriend(clickedBook.friendName)
  }, [])

  const handleClick = async () => {
    await handleBookRequest(clickedBook)
    setButtonText('requested')
    if (updateAvailableBooks)  updateAvailableBooks()
  }

  const handleCloseClick = (): void => {
    handleClosePopOut()
  }
  
  return (
    <div className="friendsBookClickedDiv">
      <div className="friendsBookPopOutDiv">
        <AiFillCloseCircle onClick={handleCloseClick} className="FriendsBookEscapeButton"/>
        <div className="SelectedBookDisplayDiv">
          <img src={clickedBook.imageUrl} alt=""/>
          {clickedBook.star && <AiFillStar className="SelectedBookStar" />}
        </div>
        <div className="friendsBookPopOutContentContainer">
          {clickedBook.friendName && <h3>{`Owner: ${clickedBook.friendName}`}</h3>}
          <h3>{clickedBook.title}</h3>
          <h3>User Review:</h3>
          <p>{clickedBook.review}</p>
          <h3>{clickedBook.genre}</h3>
          {clickedBook.availableToBorrow && buttonText === 'request book' &&
          <button className="requestBookBtn" onClick={handleClick}>{buttonText}</button>}
          {clickedBook.availableToBorrow && buttonText === 'requested' &&
          <button className="requestedBookBtn" onClick={handleClick}>{buttonText}</button>}
        </div>
      </div>
    </div>
  )
}

export default FriendsBook;
