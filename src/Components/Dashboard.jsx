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
  const [SearchInput, setSearchInput] = useState('')
  const [SearchedData, setSearchedData] = useState([])
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
   
    const moviesByGenre = {};

    movies.forEach(movie => {
      
      movie.genres.forEach(genre => {
        if (!moviesByGenre[genre]) {
          moviesByGenre[genre] = [];
        }
        moviesByGenre[genre].push(movie);
      });
    });

    console.log(moviesByGenre, "moviesbygener")
    setSortedData(moviesByGenre)
    return moviesByGenre;
  }

  useEffect(() => {
    
  const filteredData = Data.filter((item) =>
  item.slug.includes(SearchInput.toLowerCase()));

  console.log(filteredData)
  setSearchedData(filteredData)
    
  }, [SearchInput])
  
  console.log(SearchInput ,"search",SearchInput != "")
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
          <Input placeholder='Search'
          onChange={(e) => setSearchInput(e.target.value)}
          className='searchInput' />
          <SearchOutlined
          className='inputSearch'
          
           />
        </div>
      </Row>

      <Row>
        {
          SearchInput != "" ? 
          <>
          {SearchedData.map((movie) => (
            <Card className='ImageCards'
            bordered={false}>
                <motion.div
                  whileHover={{ scale: 1.11 }}>
                  <img className='image' src={movie.backdrop} width={300} height={200}>
                  </img>
                </motion.div>
                <h2 className='Movie-title'>
                    {movie.title}
                  </h2>
                  </Card>
          ))}
          </>
          :
      <>
          <Row>
            {

              Object.keys(SortedData).map((Item) => (
<>
               
                    <h1 className='genere-name'>
                      {Item}
                    </h1>
<div className='Moviebygenere-row'>


                    {SortedData[Item].map((movie) => (
                     
                      <div>
                      <Card key={Item} className='ImageCards'
                  bordered={false}>
                      <motion.div
                        whileHover={{ scale: 1.10 }}>
                        <img className='image' src={movie.backdrop} width={300} height={200}>
                        </img>
                      </motion.div>
                      <h2 className='Movie-title'>
                          {movie.title}
                        </h2>
                        </Card>
                          </div>
                    
                  ))
                  }
                  </div>
                </>

              ))
            }

          </Row>
          </>
          }
        <div className='circle-group'>
          <div className='circle-1'>

          </div>
          <div className='circle-2'>

          </div>
          <div className='circle-3'>

          </div>
        </div>
      </Row>
     
      
    </div>
  )
}

export default Dashboard