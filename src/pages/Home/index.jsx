import { useState, useEffect } from 'react'
import axios from 'axios';
import './styles.css';
import Card from '../../components/Card';

function Home() {
  const [username, setUsername] = useState('maathzzz', {avatar: '', bio: ''});
  const [repositories, setRepositories] = useState([]);

  const handleSearch = () => {

     axios.get(`https://api.github.com/users/${username}`)
      .then(response => {
        const user = response.data;
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
        <div>
          <h1> GitHub API - Search By User</h1>
          <input type="text" 
            placeholder="Type GitHub username..." 
            value={username} 
            onChange={event => setUsername(event.target.value)} 
          />
          <button className='search' onClick={handleSearch}>Search User</button>
        </div>
      </div>
      <Card repositories={repositories} />
    </div>
  );
}

export default Home