import React, {useState} from 'react';
import './Search.scss'

const Search = () => {
  const [search, setSearch] = useState('');
  const [placeholder, setPlaceholder] = useState('title') 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted form')
    console.log(typeof(e))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleAuthorClick = () => {
    setPlaceholder('author')
  }
  
  const handleTitleClick = () => {
    setPlaceholder('title')
  }

  return (
    <div>
      <h1 className='searchHeader'>Search:</h1>
      <form className='searchForm' action="submit" onSubmit={handleSubmit}>
        <div className='inputAndBtnContainer'>
          <div className="borderDiv">
            <input className='searchInput' type="text" onChange={handleChange} value={search} placeholder={`search by ${placeholder}`}/>
            <button className="searchBtn">search</button>
          </div>
        </div>
      </form>
      <div className="buttonContainer">
        <button className="bookTitleBtn" onClick={handleTitleClick}>book title</button>
        <button className="authorBtn" onClick={handleAuthorClick}>author</button>
      </div>
    </div>
  )
}

export default Search;