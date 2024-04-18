import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Row, Col, Input, Card } from 'antd'
import axios from "axios";
import { SearchOutlined } from '@ant-design/icons';
import { BaseUrl } from '../Constant/Constant';
import { motion } from 'framer-motion'

const Dashboard = () => {
  const [Data, setData] = useState([])
  const [SortedData, setSortedData] = useState([])
  const token = "eyJhbGciOiJIUzI1NiJ9.e30.wv682cI5SYQa70_kULC7iPFq8lPXHMtC9ML4KVkGYq0";

  useEffect(() => {
    axios
      .get(`${BaseUrl}movies`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res, "res")
        setData(res.data)
        sortMoviesByGenre(res.data);

      })
      .catch((err) => {
        console.log(err, "err")
      })
  }, [])

  function sortMoviesByGenre(movies) {
    // Create an empty object to hold movies categorized by genre
    const moviesByGenre = {};

    // Iterate through each movie
    movies.forEach(movie => {
      // Iterate through each genre of the movie
      movie.genres.forEach(genre => {
        // If the genre category doesn't exist, create it
        if (!moviesByGenre[genre]) {
          moviesByGenre[genre] = [];
        }
        // Add the movie to the respective genre category
        moviesByGenre[genre].push(movie);
      });
    });

    console.log(moviesByGenre, "moviesbygener")
    setSortedData(moviesByGenre)
    return moviesByGenre;
  }
  return (
    <div>
      <Row className='Header-Row'>
        <div className='Header-MovieName'>
          <h1>
            Wookie<br></br>
            Movies
          </h1>
        </div>
        <div className='Header-Search'>
          <Input placeholder='Search' className='searchInput' />
          <SearchOutlined className='inputSearch' />
        </div>
      </Row>

      <Row>
        
          <Row>
            {

              Object.keys(SortedData).map((Item) => (
<>
               
                    <h2 className='genere-name'>
                      {Item}
                    </h2>

                    {SortedData[Item].map((movie) => (
                      <>
                      <Card key={Item} className='ImageCards'
                  bordered={false}>
                      <motion.div
                        whileHover={{ scale: 1.13 }}>
                        <img className='image' src={movie.backdrop} width={300} height={200}>
                        </img>
                      </motion.div><h2 className='Movie-title'>
                          {movie.title}
                        </h2>
                        </Card>
                        </>
                  ))
                  }
                </>

              ))
            }

          </Row>
         
        <div className='circle-group'>
          <div className='circle-1'>

          </div>
          <div className='circle-2'>

          </div>
          <div className='circle-3'>

          </div>
        </div>
      </Row>
      <h1>

        Dashboard
      </h1>
    </div>
  )
}

export default Dashboard