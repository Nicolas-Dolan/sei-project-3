import React from 'react'
import { Link } from 'react-router-dom'

const ChatBoxMessage = ({ messages, text, handleChange, handleMessageRequest, toggleMessageBoard, showMessages, members }) => {
  // console.log(messages)
  return (
    <>
      <div style={{
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
        // display: showMessages ? 'block' : 'none'
      }}
      className="messageBoard"
      >
        <div style={{
          backgroundColor: 'yellow',
          height: '80%',
          width: '80%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'fixed',
          padding: '0',
          margin: '0',
          top: '10%',
          left: '10%',
          overflow: 'auto'
          // display: 'none'
          // zIndex: '1'
          // borderRadius: '95%',
          // overflow: 'hidden'                  
        }}
        >
          <h1>Chat between {members[0].name} and {members[1] ? members[1] : 'her/himself'}</h1>
          {/* <button onClick={toggleMessageBoard}>Close Message Board</button> */}
          {messages.map(message => {
            return (
              <div key={message._id}>
                <h2>Name: {message.user.name}</h2>
                <h2>Added: {Date(message.createdAt).slice(0, 15)}</h2>
                <img src={message.user.profileImage} />
                <p>{message.text}</p>
              </div>
            )
          })}
          <div>
            <form
              onSubmit={handleMessageRequest}
            >
              {/* <label>Add a message</label> */}
              <textarea
                name='text'
                value={text}
                onChange={handleChange}
              >
              </textarea>
              <button type='submit'>Submit</button>
            </form>
          </div>
          {/* <button onClick={toggleMessageBoard}>Close Message Board</button> */}
        </div>
      </div>


    </>
  )
}


export default ChatBoxMessage