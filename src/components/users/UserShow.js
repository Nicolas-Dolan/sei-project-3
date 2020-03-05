import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
// import ProjectCard from '../projects/ProjectCard'
import Gallery from '../common/Gallery'

class UserShow extends React.Component {
  state = {
    user: {},
    you: []
  }

  getUser = async () => {
    const currentUsername = this.props.match.params.username
    try {
      const res = await axios.get(`/api/users/${currentUsername}`)
      this.setState({ user: res.data })
      console.log('them=', this.state.user)
    } catch (err) {
      console.log(err)
    }
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
    this.getUser()
    this.getSelf()
  }

  async componentDidUpdate() {
    if (this.props.match.params.username !== this.state.user.username) {
      this.getUser()
    }
  }

  isOwner = () => Auth.getPayload().sub === this.state.user._id

  handleLike = async (e) => {
    console.log(this.state)
    try {
      const res = await axios.get(`/api/users/${this.props.match.params.username}/skills/${e.target.getAttribute('name')}/like`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleMessage = async (e) => {
    const theirId = this.state.user._id
    const yourId = this.state.you._id
    const yourChats = this.state.you.chats
    const arr2 = yourChats.filter(chat => chat.members.includes(theirId))

    if (arr2[0]) {
      this.props.history.push(`/users/${arr2[0].owner}/chatboxes/${arr2[0]._id}`)
    } else {
      try {
        console.log('trying to creat a chat')
        const res = await axios.post(`/api/users/${theirId}/chatboxes`, { }, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.props.history.push(`/users/${yourId}/chatboxes/${res.data._id}`)
      } catch (err) {
        console.log(err)
      }
    }
  }




  render() {
    const { user } = this.state
    if (!user._id) return null

    return (
      <section className="is-fullheight-with-navbar section_padding">
        <section className="section">
          <div className="columns">

            <div className="column is-one-quarter">
              <div className="container">
                <div className="has-text-centered">
                  <img className="profile-img" src={user.profileImage} />
                </div>
                <div className="has-text-centered add-margin">
                  {this.isOwner() && <Link className="button" to={'/myportfolio/edit'}>Edit Portfolio</Link>}
                  {!this.isOwner() && <button className="button" onClick={this.handleMessage}>Message {user.name}</button>}
                </div>
              </div>
            </div>

            <div className="column">
              <div className="columns">
                <div className="column is-three-quarters">
                  <div className="subtitle-hero">
                    <h1>{user.name}</h1>
                  </div>
                  <ul className="profession-parent">{user.professions.map(profession => <li className="user-profession profession-grey-box" key={profession}>{profession}</li>)}</ul>
                </div>
                <div className="column">
                  <div className="rounded-box">
                    <p className="has-text-centered">{user.location}</p>
                  </div>
                  <div className="rounded-box">
                    <p className="has-text-centered">{user.level}</p>
                  </div>
                </div>
              </div>

              {/* <hr className="seperater-line" /> */}

              <div>
                <p className="bio-paragraph">{user.bio}</p>
              </div>
              <hr className="seperater-line" />
              <div className="container">

                <div className="skills-header">
                  <h4 className="header-small">skills 
                    {!this.isOwner() && <span className="endorse-small"> (click to endorse)</span>}
                  </h4>
                </div>

                <div className="columns margin-reset is-multiline">{user.skills.map(skill => (
                  <>
                  <div className="column is-one-fifth rounded-border-box"
                    name={skill._id}
                    onClick={this.handleLike}
                    key={skill['skill']}
                    style={{ cursor: 'pointer' }}
                  >{skill['skill']}</div>
                <div className="has-text-centered">
                  <div className="skill-circle">{skill.likes.length}</div>
                </div>
                  </>
                ))}</div>

              </div>
            </div>
          </div>
        </section>

        <section>
          {/* <h4>Owned Projects</h4>
          {user.createdProjects.map(project => (
            <ProjectCard key={project._id} {...project} />
          ))} */}
          {/* <ul>{collaboratedProjects.map(project => <li key={project}>{project}</li>)}</ul> */}
          {/* <div className="columns is-mobile is-multiline">
            {user.collaboratedProjects.map(project => (
              <ProjectCard className="" key={project._id} {...project} />
            ))}
          </div> */}
          { user.collaboratedProjects.length !== 0 &&
          <Gallery data={user.collaboratedProjects} type={'projects'}/>
          }
        </section>
      </section>
    )
  }
}

export default UserShow