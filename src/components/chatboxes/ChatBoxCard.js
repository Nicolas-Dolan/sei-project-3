import React from 'react'
import { Link } from 'react-router-dom'
// import Auth from '../../lib/auth'

const ChatBoxCard = ({ _id, owner, messages }) => (
  <div key={_id} className="messages">
    {messages.length > 0 ? <Link className="centerIt" to={`users/${owner}/chatboxes/${_id}`}>
      <img className="image is-rounded is-64x64" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Human-emblem-mail-yellow-128.png/120px-Human-emblem-mail-yellow-128.png" alt="message" />
      <p>{messages[messages.length - 1].createdAt.slice(8, 10)}/{messages[messages.length - 1].createdAt.slice(5, 7)}/{messages[messages.length - 1].createdAt.slice(2, 4)} {messages[messages.length - 1].createdAt.slice(11, 19)}</p>
    </Link> : '' }
  </div>
)

export default ChatBoxCard