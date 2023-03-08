import { useState, useEffect } from 'react'
import axios from 'axios';
import './styles.css';

function Home() {
  const [username, setUsername] = useState('maathzzz');
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

        <h1> GitHub API - Search Repositories</h1>
        <input type="text" placeholder="Type GitHub username..." value={username} onChange={event => setUsername(event.target.value)} />
        <center><button onClick={handleSearch}>Search User</button></center>

      </div>

      <div className='repos'>
      {repositories.map(repository => (
        <div key={repository.id}>
          <h3>{repository.name}</h3>
          <a href={repository.html_url} target='_blank'><p>GitHub Link</p></a>
        </div>
      ))}
      </div>

    </div>
  );
}

export default Home