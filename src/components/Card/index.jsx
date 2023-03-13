import React from 'react';
import './styles.css';

export default function Card({ repositories }) {
  return (
    <ul className='repos'>
    {repositories.map(repository => (
      <li key={repository.id}>
        <h3>{repository.name}</h3>
        <h4> {repository.description}</h4>
        <a href={repository.html_url} target='_blank'><p>GitHub Link</p></a>
      </li>
    ))}
    </ul>
  )
}