import React from 'react'
import './Movie.css'

const image_api = 'https://image.tmdb.org/t/p/original'

function Movie({title, poster_path, overview, ratings}) {
  return (
    <div className='movie'>
        <img src={`${image_api+poster_path}`} alt='image not found'/>
        <div className='movie-info'>
          <h3>{title}</h3>
          <span>{ratings}</span>
        </div>
        <div className='movie-over'>
          <h2>overview</h2>
          <p>{overview}</p>
        </div>
    </div>
  )
}

export default Movie