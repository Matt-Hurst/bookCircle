import React, {useState, useEffect} from 'react';
import SearchResults from '../Components/SearchResults'
import './Search.scss'

// TODO: add component did unmount equivalent so that bookClicked is undefined if user leaves page 

interface bookClicked {
  title: string | undefined;
  authors: Array<string> | undefined;
  imageUrl: string | undefined;
  genre: string | undefined;
}

interface userInput {
  date: any;
  review: string | undefined;
  star: boolean;
}

const Search = () => {
  const [search, setSearch] = useState('');
  const [placeholder, setPlaceholder] = useState('title'); 
  const [isSearch, setIsSearch] = useState(false);
  const [titles, setTitles] = useState([]);
  const [bookClicked, setBookClicked] = useState<bookClicked>();
  const [userInput, setUserInput] = useState<userInput>({
    date: undefined,
    review: undefined,
    star: false,
  });
  const [questionSetion, setQuestionSection] = useState(1)

  useEffect(() => {
    console.log('bookClicked', bookClicked)
    console.log('User Input', userInput)
  },[bookClicked, userInput])

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, word: string) => {
    if (word === 'date') {
      setUserInput(prevUserInput => {
        return {
        ...prevUserInput,
        date: e.target.value
      }})
    }
    if (word === 'review') {
      setUserInput(prevUserInput => {
        return {
        ...prevUserInput,
        review: e.target.value
      }})
    }
    if (word === 'star') {
      setUserInput(prevUserInput => {
        return {
        ...prevUserInput,
        star: !prevUserInput.star
      }})
    }
    console.log(e.target.value, typeof(e.target.value))
  }

  const moveToNextQuestion = () => {
    setQuestionSection((questionSection) => questionSection + 1 )
  }

  return (
    <div>
      
      {bookClicked && <div className="bookClickedDiv">
        <div className="addBookPopOutDiv">
          {/* {bookClicked ? <img src={bookClicked.imageUrl} alt=""/>: <div className="standInBook"></div>} */}
          {questionSetion === 1 && <div className="addBookPopOutForm">
            <h2>When did you read this book?</h2>
            <input type="date" onChange={(e) => handleDateChange(e, 'date')}/>
            <div className="addBookPopOutFormBtns">
              {/* <button onClick={moveToPreviousQuestion}>back to results</button> */}
              <button onClick={moveToNextQuestion}>next</button>
            </div>
          </div>}
          {questionSetion === 2 && <div className="addBookPopOutForm">
            <h2>What did you think?</h2>
            <input className="addBookReviewInput" type="text" onChange={(e) => handleDateChange(e, 'review')}/>
            <div className="addBookPopOutFormBtns">
              {/* <button onClick={moveToPreviousQuestion}>back to results</button> */}
              <button onClick={moveToNextQuestion}>next</button>
            </div>
          </div>}
          {questionSetion === 3 && <div className="addBookPopOutForm">
            <h2>Did this book change your life? Is it a must read? Check the below to mark it as a star read.</h2>
            <div>
              <input className="addBookReviewInputRadio" type="checkbox" id='yes' value='yes' onChange={(e) => handleDateChange(e, 'star')}/>
              <label htmlFor="yes">star read</label>
              <div className="addBookPopOutFormBtns">
                {/* <button onClick={moveToPreviousQuestion}>back to results</button> */}
                <button onClick={moveToNextQuestion}>add book to bookcase</button>
              </div>
            </div>
          </div>}
        </div>
      </div>}

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