import React from 'react'
import { Link } from 'react-router-dom'
const UserCard = ({ name, profileImage, location, _id, username, professions }) => {
  return  (
    <div key={_id} className="user_card_container">
      {/* <Link to={`/users/${username}`}> */}
      <div>
        <figure>
          <Link to={`/users/${username}`}>
            <img className="user-img" src={profileImage} alt={name} />
          </Link>
        </figure>
      </div>
      {/* <Link to={`/users/${username}`}> */}
      <div>
        <div>
          <h4 className="user_card_text">{name}</h4>
        </div>
        <div>
          <h4 className="user_card_text">{professions[0]}</h4>
        </div>
        <div>
          <h5 className="user_card_text">{location}</h5>
        </div>
      </div>
      {/* </Link> */}
      {/* </Link> */}
    </div>
  )
}
export default UserCard