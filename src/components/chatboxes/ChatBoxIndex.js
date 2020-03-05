import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import ChatBoxCard from '../chatboxes/ChatBoxCard'

class ChatBoxIndex extends React.Component {
  state = {
    you: []
  }

  getSelf = async () => {
    try {
      const res = await axios.get('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ you: res.data })
      console.log('you=', this.state.you)

    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    this.getSelf()
  }


  render() {
    const { you } = this.state
    if (!you._id) return null
    console.log('you =', you)
    const { chats } = this.state.you
    console.log('chats =', chats)
    console.log('chats.length =', chats.length)
    // if (chats.length) return null
    return (
      <section className="is-fullheight-with-navbar section_padding">
        <h1 className="subtitle-hero">Your Messages</h1>
        <div className="gridIt">
          {chats.length > 0 ? chats.map(chat => (
            <ChatBoxCard key={chat._id} {...chat} />
          )) : 'You have no messages'}
        </div>



      </section>
    )
  }
}

export default ChatBoxIndex