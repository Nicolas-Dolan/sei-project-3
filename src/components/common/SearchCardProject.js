import React from 'react'
import { Link } from 'react-router-dom'

const SearchCardProject = ({ images, name, owner, description, skillsInvolved, _id }) => (

  <div>
    <h3 >{name}</h3>
    <img src={images[0]} alt={`${name} cover image`} /> */
    <h4>{owner.name}</h4>
    <p>{description}</p>
    <h4>Skills Involved</h4>
    <ul>
      {skillsInvolved.map(i => '<li>' + i + '</li>')}
    </ul>

    <Link to={`projects/${_id}`}><button>Go to project site</button></Link>
  </div>
)

export default SearchCardProject