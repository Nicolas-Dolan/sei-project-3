import React from 'react'
// import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const ProjectComment = ({ comments, text, handleChange, handleCommentRequest, handleEditSelected, handleEditComment, handleDeleteComment, projectId, editingComment, editedCommentText, resetEditComment }) => {

  const isOwner = (commentOwnerId) => {
    return Auth.getPayload().sub === commentOwnerId
  }

  return (
    <>
      {Auth.isAuthenticated() &&
        <form onSubmit={handleCommentRequest}>
          <div className="columns">
            <div className="column">
            </div>
            <div className="column is-three-fifths">
              <textarea
                className="text-area-form"
                name='text'
                value={text}
                onChange={handleChange}
                placeholder='Share your thoughts on this project...'
              >
              </textarea>
            </div>
            <div className="column">
              <button className="button is-small" type='submit'>Post a Comment</button>
            </div>
          </div>
        </form>
      }

      <br />

      {comments.map(comment => {
        return (
          <div className="section padding-reset" key={comment._id}>
            {editingComment !== comment._id &&

              <>
                <div className="columns">
                  <div className="column">
                  </div>
                  <div className="column is-three-quarters">
                    <div className="columns">
                      <div className="column is-2 has-text-centered is-vertical-center remove-padding">
                        <img className="comment-image" src={comment.user.profileImage} />
                      </div>
                      <div className="column">
                        <div className="columns">
                          <h2 className="column is-3 comment-info-text">{comment.user.name}</h2>
                          <h2 className="column comment-info-text">{Date(comment.createdAt).slice(0, 15)}</h2>
                        </div>
                        <div className="columns">
                          <p className="column profession-grey-box padding-reset is-two-thirds">{comment.text}</p>
                          <div className="column">
                            {isOwner(comment.user._id) &&
                              <div className="columns">
                                <button className="button is-small add-margin" onClick={() => handleDeleteComment(projectId, comment._id)}>Delete</button>
                                <button className="button is-small add-margin" onClick={() => handleEditSelected(comment._id, comment.text)}>Edit</button>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                  </div>
                </div>
              </>

            }
            {editingComment === comment._id &&
              <>
                <div className="columns">
                  <div className="column is-three-quarters">
                    <div className="columns">
                      <div className="column is-2 has-text-centered is-vertical-center remove-padding">
                        <img className="comment-image" src={comment.user.profileImage} />
                      </div>
                      <div className="column">
                        <div className="columns">
                          <h2 className="column is-3 comment-info-text">{comment.user.name}</h2>
                          <h2 className="column comment-info-text">{Date(comment.createdAt).slice(0, 15)}</h2>
                        </div>
                        <div className="columns">
                          <textarea
                            name='editedCommentText'
                            onChange={handleChange}
                            value={editedCommentText}
                          ></textarea>
                          <div className="column">
                            <div className="columns">
                              <div className="column ">
                                <button className="button is-small" onClick={() => handleEditComment(comment._id)}>Edit Comment</button>
                              </div>
                              <div className="column ">
                                <button className="button is-small" onClick={resetEditComment}>Cancel</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        )
      })}
    </>
  )
}

export default ProjectComment