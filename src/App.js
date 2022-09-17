import Movie from './components/Movie.js'
import React, {useEffect, useState}  from 'react'
import axios from 'axios'

let api = 'https://developers.themoviedb.org/3/discover/movies?api_key=a11e6180bd5c29906226e8b015ef143d'
api = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a11e6180bd5c29906226e8b015ef143d'

const search_api = 'https://api.themoviedb.org/3/search/movie?api_key=a11e6180bd5c29906226e8b015ef143d&query='

function App() {
  const [movies, setMovies]  = useState([])
  const[page, setPage] = useState(1)
  const[pages, setPages] = useState(1)
  const[search, setSearch] = useState('')
  // const [search, setSearch] = useState([])

  useEffect(()=>{
    //calls axios and gets top 20 movies sorted from most popular to least popular
    axios.get(api)
      .then(res=>{
        setMovies(res.data.results)
        setPages(res.data.total_pages)
      })
      .catch(err=>{alert(err)})
  }, []) 
  // handles the search engine
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(search !== ''){

      axios.get(`${search_api+ search}`)
        .then(res=>{
          setMovies(res.data.results)
          setPages(res.data.total_pages)
        })
        .catch(err=>{
          alert(err)
        })
    }
    else{
      axios.get(api)
        .then(res=>{
          setMovies(res.data.results)
          setPages(res.data.total_pages)
        })
        .catch(err=>{alert(err)})
    }
  }
  // handles the pages
  function changePage(e){
    e.preventDefault()
    if(page <=0){
      setPage(1)
    }else if (page >pages){
      setPage(pages)
    }
    if(search !== ''){
      axios.get(`${search_api+ search+'&page='+page}`)
        .then(res=>{
          setMovies(res.data.results)
        })
        .catch(err=>{
          alert(err)
        })
    }
    else{
      axios.get(`${api+'&page='+page}`)
        .then(res=>{
          setMovies(res.data.results)
        })
        .catch(err=>{alert(err)})
    }
  }
  return (
    <div className="App">
      <header>
          <form onSubmit={handleSubmit}>
            <input onChange={(e)=>{setSearch(e.target.value)}}className='search' placeholder='search...'type='search'/>
          </form>
      </header>
      <div className='movie-container'>
        {movies.map(movie=>(
          //calls the movie component for each result from either
          // search or popularity
          <Movie key={movie.id} 
          ratings={movie.average_score} 
          title={movie.title} 
          poster_path={movie.poster_path} 
          overview={movie.overview}/>
        ))}
      </div>
      <div className='pages'>
        <form onSubmit={changePage} className='form'>
          <button type='submit'onClick={()=>{
            if(page!==1){
              setPage(page=>page-1)
              changePage()
          }}} 
          className='page-btn'>
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          
            <input onChange={(e)=>{setPage(e.target.value)}}className='page' value={page}type='number'/>
          
          <button 
          onClick={()=>{
            if(page !== pages){
              setPage(page=>page+1)
              changePage()
            }
          }}
          className='page-btn'>
          <i class="fa-solid fa-chevron-right"></i>
          </button>
        </form>
      </div>
      <span>page {page} of {pages}</span>
    </div>
  );
}

export default App;
