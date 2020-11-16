import React, { FunctionComponent, useState } from "react"
import FriendsSearchResults from '../Components/FriendsSearchResults'
import { searchFriend } from '../ApiService/serverApiService'
import {User} from '../Interfaces'

type FriendSearchProps = {
  handleAddFriend: Function,
  user: User
}

const FriendSearch: FunctionComponent<FriendSearchProps> = ({handleAddFriend, user}) => {
  const [searchName, setSearchName] = useState('')
  const [searchResults, setSearchResults] = useState<any>()
  const [isSearch, setIsSearch] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: any = await searchFriend(searchName);
    setSearchName('');
    setSearchResults(result)
    setIsSearch(true)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
  };


  return (
    <div>
      <h1 className='searchHeader'>Find Friends:</h1>
      <form className='searchForm' action="submit" onSubmit={handleSubmit}>
        <div className='inputAndBtnContainer'>
          <input onChange={handleChange} className='searchInput' type="text" value={searchName} placeholder={`search by username...`}/>
          <button className="searchBtn">search</button>
        </div>
      </form>
    { isSearch && <FriendsSearchResults users={searchResults} handleAddFriend={handleAddFriend} user={user} />
  }
    </div>
  )
}

export default FriendSearch;