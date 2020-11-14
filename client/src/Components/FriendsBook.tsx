import React, { FunctionComponent } from "react";
import { Book } from '../Interfaces'
import { AiFillStar } from "react-icons/ai";
import './FriendsBook.scss'

type FriendsBookProps = {
  clickedBook: Book
}
const FriendsBook:FunctionComponent<FriendsBookProps>  = ({clickedBook}) => {
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
            <button className="requestBookBtn">request book</button>
        </div>
      </div>
    </div>
  )
}

export default FriendsBook;
