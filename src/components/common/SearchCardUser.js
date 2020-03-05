import React from 'react'
import { Link } from 'react-router-dom'

const SearchCardUser = ({ username, name, profileImage, location, level, skills }) => (

  <div key={username}>
    <h3 >{name}a</h3>
    <img src={profileImage} alt={`${name} cover image`} />
    <h4>{location}</h4>
    <h4>{level}</h4>
    <h4>Skills Involved</h4>
    <ul>
      {skills.map(i => {
        return <li key={i._id}>{i.skill}</li>
      })}
    </ul>
    <Link to={`users/${username}`}><button>Go to profile</button></Link>

  </div>
)

export default SearchCardUser