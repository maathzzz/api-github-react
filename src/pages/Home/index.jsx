import { useState, useEffect } from 'react'
import axios from 'axios';

import { FiArrowUpCircle, FiSearch } from "react-icons/fi";
import './styles.css';

import Card from '../../components/Card';
import CardUser from '../../components/CardUser';

function Home() {
  const [username, setUsername] = useState('maathzzz');
  const [repositories, setRepositories] = useState([]);
  const [user, setUser] = useState({});

  const handleSearch = async() => {

     await axios.get(`https://api.github.com/users/${username}`)
      .then(response => {
        const user = response.data;
        setUser(user);
        axios.get(user.repos_url)
          .then(response => {
            const repositories = response.data;
            setRepositories(repositories);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect (() => {
    handleSearch();
  }, [])

  return (
    <div className='container'>
      <div className='child'>
        <div className='search-user'>
          <h1> List Repositories of GitHub </h1>
          <input type="text" 
            placeholder="Type GitHub username..." 
            value={username} 
            onChange={event => setUsername(event.target.value)} 
          />

          {/* <FiSearch className='btn-search' onClick={handleSearch} /> */}
          <button className='search-btn' onClick={handleSearch}>Search by User</button>
        </div>

          <CardUser user={user} />
        
      </div>

      <Card repositories={repositories} />

      <FiArrowUpCircle className='backOnTop' onClick={() => window.scrollTo(0, 0)} />
    </div>
  );
}

export default Home