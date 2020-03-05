import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
// import ChatBoxMessage from './ChatBoxMessage'

class ChatBoxShow extends React.Component {
  state = {
    chatBox: {},
    users: null,
    userId: null,
    chatBoxId: null,
    text: ''
  }

  async componentDidMount() {
    const userId = this.props.match.params.userid
    const chatBoxId = this.props.match.params.id

    try {
      const res = await axios.get(`/api/users/${userId}/chatboxes/${chatBoxId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ chatBox: res.data, userId: res.data.owner, chatBoxId: res.data._id })
    } catch (err) {
      console.log(err)
    }
  }

  // this is handling the change in the first checkbox form (looking for creatives/users)
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }


  handleMessageRequest = async (e) => {
    e.preventDefault()
    const userId = this.props.match.params.userid
    const chatBoxId = this.props.match.params.id
    try {
      const res = await axios.post(`/api/users/${userId}/chatboxes/${chatBoxId}/messages`, { text: this.state.text }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ chatBox: res.data })
    } catch (err) {
      console.log(err)
    }
    this.setState({ text: '' })
  }


  toggleMessageBoard = async (e) => {
    this.setState({ showMessages: !this.state.showMessages })
  }


  isMember = () => {
    const arr = this.state.chatBox.members.map(memb => memb._id === Auth.getPayload().sub)
    return arr.includes(true)
  }



  render() {

    const { chatBox } = this.state
    if (!chatBox._id) return null
    return (
      <section className="section_padding">
        <h1>Chat between {chatBox.members[0].name} and {chatBox.members[1].name ? chatBox.members[1].name : 'her/himself'}</h1>
        {chatBox.messages.map(message => {
          return (
            <article key={message._id} className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img className="image is-64x64 is-rounded" src={message.user.profileImage}/>
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{message.user.name}</strong> <small>{Date(message.createdAt).slice(0, 15)}</small>
                    <br/>
                    {message.text}
                  </p>
                </div>
              </div>              
            </article>
          )
        })}
        <div>

          <div className="media-content">
            <form onSubmit={this.handleMessageRequest}>
              <div className="field">
                <p className="control">
                  <textarea 
                    className="textarea"
                    name='text'
                    value={this.state.text}
                    placeholder="Add new comment"
                    rows="2"
                    onChange={this.handleChange}>                    
                  </textarea>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button type='submit'className="button">Post comment</button>
                </p>
              </div>
            </form>
          </div>
        </div>



        {/* <ChatBoxMessage
          messages={this.state.chatBox.messages}
          text={this.state.text}
          handleChange={this.handleChange}
          handleMessageRequest={this.handleMessageRequest}
          // toggleMessageBoard={this.toggleMessageBoard}
          // showMessages={this.state.showMessages}
          members={this.state.chatBox.members}
        /> */}
      </section>
    )
  }
}

export default ChatBoxShow

