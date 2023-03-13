import React from 'react'
import './styles.css';

export default function CardUser({ user }) {
  return (
    <div className='card-user' key={user.id}>
      <div className='text-user'>
        <h3>{user.name}</h3>
        <h4>{user.login}</h4>
        <h5>{user.bio}</h5>
      </div>
      <div>
        <img className='avatar' src={user.avatar_url} onClick={user.html_url}></img>
      </div>
    </div>
  )
}