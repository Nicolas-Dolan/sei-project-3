import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import ProjectComment from './ProjectComment'
import ProjectMessage from './ProjectMessage'
// import { borderRadius } from 'react-select/src/theme'

import { notify } from 'react-notify-toast'


class ProjectShow extends React.Component {
  state = {
    project: {},
    users: null,
    searchedUsers: null,
    text: '',
    showMessages: false,
    editingComment: '',
    editedCommentText: ''
    // userSearch: ''
  }

  async componentDidMount() {
    const projectId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/projects/${projectId}`)
      this.setState({ project: res.data })
      console.log('project =', this.state.project)
    } catch (err) {
      console.log(err)
    }
  }

  // this is handling the change in the first checkbox form (looking for creatives/users)
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  userSearch = async () => {
    try {
      const res = await axios.get('/api/users')
      this.setState({ users: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleSearchChange = (e) => {
    const searchedUsers = this.state.users.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()))
    if (searchedUsers.length === this.state.users.length) {
      this.setState({ searchedUsers: null })
    } else {
      this.setState({ searchedUsers })
    }
  }

  handleAddCollaborator = async () => {
    if (this.state.project.owner._id !== Auth.getPayload().sub) {
      const collabObject = {
        project: this.state.project._id,
        owner: false,
        user: true,
        ownerId: this.state.project.owner._id,
        userId: Auth.getPayload().sub
      }
      try {
        const res = await axios.post('/api/users/collaborate', collabObject, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        const myColor = { background: '#C4C4C4', text: '#3F3F3F' }
        notify.show('Request sent!', 'custom', 1000, myColor)
        this.props.getUser()
      } catch (err) {
        console.log(err)
      }
    } else {
      this.userSearch()
    }
  }

  handleAddCollaboratorTwo = async (e) => {
    if (this.state.project.owner._id === Auth.getPayload().sub) {
      const collabObject = {
        project: this.state.project._id,
        owner: true,
        user: false,
        ownerId: this.state.project.owner._id,
        userId: e.target.getAttribute('name')
      }
      try {
        const res = await axios.post('/api/users/collaborate', collabObject, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        const myColor = { background: '#C4C4C4', text: '#3F3F3F' }
        notify.show('Request sent!', 'custom', 1000, myColor)
        this.props.getUser()
      } catch (err) {
        console.log(err)
      }
    }
    this.setState({ users: null, searchedUsers: null })
  }

  handleCommentRequest = async (e) => {
    e.preventDefault()
    const projectId = this.props.match.params.id
    try {
      const res = await axios.post(`/api/projects/${projectId}/comments`, { text: this.state.text }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ project: res.data })
    } catch (err) {
      console.log(err)
    }
    this.setState({ text: '' })
  }

  //! This function is activated when a user submits a message to the project message board

  handleMessageRequest = async (e) => {
    e.preventDefault()
    const projectId = this.props.match.params.id
    try {
      const res = await axios.post(`/api/projects/${projectId}/messages`, { text: this.state.text }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ project: res.data })
    } catch (err) {
      console.log(err)
    }
    this.setState({ text: '' })
  }

  handleLike = async () => {
    const projectId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/projects/${projectId}/like`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ project: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  //! this function toggles the message board on and off

  toggleMessageBoard = async (e) => {
    this.setState({ showMessages: !this.state.showMessages })
    // console.log('show messages =', this.state.showMessages)
    console.log(e.target.value)
  }

  handleEditSelected = (commentId, commentText) => {
    this.setState({ editingComment: commentId, editedCommentText: commentText })
  }

  handleEditComment = async (commentId) => {
    const projectId = this.props.match.params.id
    try {
      const res = await axios.put(`/api/projects/${projectId}/comments/${commentId}`, { text: this.state.editedCommentText }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ project: res.data, editingComment: '', editedCommentText: '' })
    } catch (err) {
      console.log(err)
    }
  }

  resetSearch = () => {
    this.setState({ users: null })
  }

  resetEditComment = () => {
    this.setState({ editedCommentText: '', editingComment: '' })
  }

  handleDeleteComment = async (projectId, commentId) => {
    try {
      const res = await axios.delete(`/api/projects/${projectId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ project: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  //! these functions determine whether a user is an or owner or collaborator on the project and can be used to show/hide certain features

  isOwner = () => Auth.getPayload().sub === this.state.project.owner._id

  isCollab = () => {
    const arr = this.state.project.collaborators.map(collab => collab._id === Auth.getPayload().sub)
    return arr.includes(true)
  }



  render() {
    const { project } = this.state
    console.log(project.images)
    if (!project._id) return null
    console.log(project)
    // console.log('collabs included? =', this.state.project.collaborators.map(collab => collab._id === Auth.getPayload().sub))
    return (
      <section style={{
        position: this.state.showMessages ? 'fixed' : 'absolute',
        overflow: this.state.showMessages ? 'hidden' : 'auto'
      }}>

        <section className="is-fullheight-with-navbar section_padding full-width">

          <section className="section">
            <div className="container has-text-centered">

              {/* NAME */}
              <div className="">
                <h1 className="subtitle-hero">{project.name}</h1>
              </div>

              {/* LIKES */}
              <div>
                <div>
                  <div className="like_container" onClick={this.handleLike}>
                    <span>{project.likes.length}</span> likes
                  </div>
                </div>
              </div>

              {/* COLLABORATORS */}
              <div className="column is-half is-offset-one-quarter">
                <div className="add-margin">collaborators:</div>
                <div className="collaborator-circles" style={{ display: 'flex' }}>
                  {project.collaborators.map(collaborator => {
                    return (
                      <div key={collaborator._id}>
                        <div className="add-margin" style={{
                          background: `url(${collaborator.profileImage})`,
                          height: '80px',
                          width: '80px',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '50%',
                          overflow: 'hidden'
                        }}>
                          <Link to={`/users/${collaborator.username}`} style={{
                            display: 'block',
                            height: '100%',
                            width: '100%'
                          }}>

                          </Link>
                        </div>
                        <p>{collaborator._id === this.state.project.owner._id ? 'owner' : ''}</p>
                      </div>
                    )
                  })}

                  {/* ADD COLLABORATOR */}
                  {Auth.isAuthenticated() &&
                    (!project.collaborators.map(collab => collab._id).includes(Auth.getPayload().sub) ||
                      project.owner._id === Auth.getPayload().sub) &&
                    (!project.pendingCollaborators.map(collab => collab._id).includes(Auth.getPayload().sub) ||
                      project.owner._id === Auth.getPayload().sub) &&
                    <div className="add-margin add-collab-button"
                      onClick={this.handleAddCollaborator}
                    >
                    </div>
                  }
                  <div
                    className={`modal ${this.state.users && 'is-active'} is-clipped`}
                  >
                    <div onClick={this.resetSearch} className="modal-background"></div>
                    <div className="modal-content">
                      {/* COLLAB SEARCH */}
                      <div className="collab_add_search">
                        <h2 className="subtitle">Search</h2>
                        <input
                          placeholder="search"
                          className="input"
                          // name="userSearch"
                          onChange={this.handleSearchChange}
                        />
                        {/* COLLAB SEARCH RESULTS */}
                        {this.state.searchedUsers &&
                          this.state.searchedUsers.map(user => {
                            return (
                              <div
                                onClick={this.handleAddCollaboratorTwo}
                                key={user._id}
                                name={user._id}
                                className="collab_search_result"
                                style={{ cursor: 'pointer' }}
                              >
                                <div style={{ background: `url(${user.profileImage})`, pointerEvents: 'none' }}></div>
                                <h2 style={{ pointerEvents: 'none' }}>{user.name}</h2>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <button
                      onClick={this.resetSearch}
                      className="modal-close is-large" aria-label="close"></button>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECT DESCRIPTION */}
            <p className="project-paragraph is-vertical-center">{project.description}</p>

            {/* MESSAGES */}
            {this.isCollab() &&
              <div className="has-text-centered">
                <button className="button is-small" onClick={this.toggleMessageBoard}>Collaborator Message Board</button>
              </div>
            }


            <hr className="seperater-line" />

            {/* SKILLS */}
            <div>{project.skillsInvolved.length < 1 ? 'skills: no skills listed yet' :
              <div className="columns is-multiline">
                <div className="column">
                </div>

                <div className="column is-1">skills: </div>
                {project.skillsInvolved.map(skill => (
                  <div className="column is-one-fifth rounded-border-box-skills"
                    key={skill}>{skill}</div>
                ))}

                <div className="column">
                </div>
              </div>
            }</div>

            <section className="section padding-reset">
              <div className="columns">

                {/* LOCATION */}
                <div className="column profession-grey-box is-vertical-center">
                  <p>location: {project.location}</p>
                </div>

                {/* SKILLS */}
                {/* <div className="column profession-grey-box is-vertical-center">
                  <div>{project.skillsInvolved.length < 1 ? 'skills: no skills listed yet' :
                    <div>skills: {project.skillsInvolved.map(skill => <h5 key={skill}>{skill}</h5>)}</div>
                  }</div>
                </div> */}

                {/* PROJECT RECRUITING */}
                <div className="column profession-grey-box is-vertical-center">
                  <p>{project.recruiting ? project.lookingFor.length > 0 ? `looking for: ${project.lookingFor.map(prof => ` ${prof}`)}` : 'looking for: nothing listed yet' : 'looking for: nothing listed yet'}</p>
                  {/* <p>{project.recruiting ? `Looking for: ${project.lookingFor.map(prof => prof)}` : ''}</p>
          <p>{project.lookingFor.length > 0 ? `Looking for: ${project.lookingFor.map(prof => prof)}` : 'Nothing listed yet'}</p> */}
                </div>

                {/* PROJECT COMPLETED */}
                <div className="column profession-grey-box is-vertical-center">
                  <p>{project.completed ? 'this project is completed' : `looking for creatives?: ${project.recruiting ? 'yes' : 'not currently looking'}`}</p>
                </div>

              </div>
            </section>

            {/* IMAGE */}
            <figure className="columns padding-reset">
              <img className="column is-three-fifths is-offset-one-fifth project-image-border" src={project.images[0]} />
            </figure>

            {/* EXTRA IMAGE GALLERY */}
            {project.images.length > 0 ? '' :
              <div className="section">
                <div className="columns">
                  {project.images.map((image, index) => index === 0 ? '' :
                    <div className="column test-border">
                      <img className="test-border" key={image} src={image} />
                    </div>
                  )}
                </div>
              </div>
            }

            <div className="column is-half is-offset-one-quarter has-text-centered">
              {/* EDIT BUTTON IF OWNER OF PROJECT */}
              {this.isOwner() &&
                <Link className="button add-margin is-small" to={`/projects/${this.props.match.params.id}/edit`}>Edit Project</Link>
              }
            </div>

            <hr className="seperater-line" />

            {/* ADD PROJECT COMMENT */}
            <ProjectComment
              comments={this.state.project.comments}
              text={this.state.text}
              handleChange={this.handleChange}
              handleCommentRequest={this.handleCommentRequest}
              handleEditSelected={this.handleEditSelected}
              handleEditComment={this.handleEditComment}
              handleDeleteComment={this.handleDeleteComment}
              projectId={this.state.project._id}
              editingComment={this.state.editingComment}
              editedCommentText={this.state.editedCommentText}
              resetEditComment={this.resetEditComment}
            />
            {/* PROJECT COMMENT DISPLAY */}
            <ProjectMessage
              messages={this.state.project.messages}
              text={this.state.text}
              handleChange={this.handleChange}
              handleMessageRequest={this.handleMessageRequest}
              toggleMessageBoard={this.toggleMessageBoard}
              showMessages={this.state.showMessages}
            />

            {/* OWNER STAR
            {this.isOwner() &&
              <img alt="star indicating project ownership" src="./../../assets/star.png" />
            } */}

          </section>
        </section>
      </section>

    )
  }
}

export default ProjectShow