import React from 'react'

// ! This controls the format of individual messages on the project message board

const ProjectMessage = ({ messages, text, handleChange, handleMessageRequest, toggleMessageBoard, showMessages }) => {
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: showMessages ? 'block' : 'none'
      }}
      className="messageBoard"
      >

        <div style={{
          backgroundColor: '#F7F7F4',
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
        }}
        >

          <div className="has-text-right">
            <button className="button is-small" onClick={toggleMessageBoard}>Close Message Board</button>
          </div>

          <div className="has-text-centered">
            <h1 className="subtitle-hero">collaborator message board</h1>
          </div>
          <section className="section">
            <br />

            {messages.map(message => {
              return (
                <div key={message._id}>
                  <div className="columns">
                    <div className="column is-three-quarters">
                      <div className="columns">
                        <div className="column is-2 has-text-centered is-vertical-center remove-padding">
                          <img className="comment-image" src={message.user.profileImage} />
                        </div>
                        <div className="column">
                          <div className="columns">
                            <h2 className="column is-3 comment-info-text">{message.user.name}</h2>
                            <h2 className="column comment-info-text">{Date(message.createdAt).slice(0, 15)}</h2>
                          </div>

                          <div className="columns">
                            <p className="column yellow-rounded-box padding-reset is-two-thirds">{message.text}</p>


                          </div>
                          <div className="column">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <section className="section padding-reset margin-reset">
              <form
                onSubmit={handleMessageRequest}
              >
                <textarea
                  className="collab-message-board-text"
                  name='text'
                  value={text}
                  onChange={handleChange}
                >
                </textarea>
                <button className="button" type='submit'>Submit</button>
              </form>
            </section>

          </section>
        </div>
      </div>
    </>
  )
}


export default ProjectMessage