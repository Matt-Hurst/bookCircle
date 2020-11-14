import React, { FunctionComponent, useState } from "react";
import { Book } from '../Interfaces'
import { AiFillStar } from "react-icons/ai";
import './FriendsBook.scss'

type FriendsBookProps = {
  clickedBook: Book,
  handleBookRequest: Function,
}
const FriendsBook:FunctionComponent<FriendsBookProps>  = ({clickedBook, handleBookRequest}) => {
  const [buttonText, setButtonText] = useState('request book')


  const handleClick = () => {
    handleBookRequest(clickedBook)
    setButtonText('requested')
  }
  
  return (
    <div className="friendsBookClickedDiv">
      <div className="friendsBookPopOutDiv">
        {/* add cancel icon top right of pop out */}
        <div className="SelectedBookDisplayDiv">
          <img src={clickedBook.imageUrl} alt=""/>
          {clickedBook.star && <AiFillStar className="SelectedBookStar" />}
        </div>
        <div className="friendsBookPopOutContentContainer">
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
