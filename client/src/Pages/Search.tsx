import React, {useState} from 'react';
import SearchResults from '../Components/SearchResults'
import './Search.scss'

const Search = () => {
  const [search, setSearch] = useState('');
  const [placeholder, setPlaceholder] = useState('title'); 
  const [isSearch, setIsSearch] = useState(false);
  const [titles, setTitles] = useState([]);
  const [bookClicked, setBookClicked] = useState();


  const getBook = (name : String) : void => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=in${placeholder}:${name}&maxResults=40&printType=books&key=AIzaSyCPGabDlZJ8QKPihWNWfW-kl5yQtNFSlDc`)
    .then(result => {
      return result.json();
    })
    .then(books => { 
      let data = books.items
      setTitles(data.slice(0, 40))
      setIsSearch(true)
      console.log(titles);
    })
    .catch(error => {console.log(error)})
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getBook(search);
    setSearch('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  };

  const handleAuthorClick = () => {
    setPlaceholder('author')
  };
  
  const handleTitleClick = () => {
    setPlaceholder('title')
  };

  const handleBookClick = (newBook: any): void => {
    setBookClicked(newBook)
    console.log('NEWBOOK', newBook)
  }

  return (
    <div>
    {bookClicked && <div className="bookClickedDiv"></div>}
      <h1 className='searchHeader'>Search:</h1>
      <form className='searchForm' action="submit" onSubmit={handleSubmit}>
        <div className='inputAndBtnContainer'>
          <input className='searchInput' type="text" onChange={handleChange} value={search} placeholder={`search by ${placeholder}`}/>
          <button className="searchBtn">search</button>
        </div>
      </form>
      <div className="buttonContainer">
        <button className={placeholder === 'title' ? "selectedSearchMethod" : "otherSearchMethod"} id="bookTitleBtn" onClick={handleTitleClick}>book title</button>
        <button className={placeholder === 'author' ? "selectedSearchMethod" : "otherSearchMethod"} id="authorBtn" onClick={handleAuthorClick}>author</button>
      </div>
    { isSearch && <SearchResults titles={titles} handleBookClick={handleBookClick} />}
    </div>
  )
}

export default Search;