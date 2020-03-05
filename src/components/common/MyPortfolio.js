import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import ProjectCard from '../projects/ProjectCard'

class MyPortfolio extends React.Component {
  state = {
    user: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const { name, professions, email, username, bio, location, profileImage, level, collaboratedProjects, skills, createdProjects } = this.state.user
    if (!this.state.user) return null
    return (
      <section className="section">
        <h1>My Portfolio</h1>
        <h2>{name}</h2>
        <img className="profile-img" src={profileImage} />
        <h3>Account Info</h3>
        <p>Email: {email}</p>
        <p>Username: {username}</p>
        <h3>Other Info</h3>
        <h4>Location</h4>
        <p>{location}</p>
        <h4>Bio</h4>
        <p>{bio}</p>
        <h4>Professions</h4>
        <ul>{professions.map(profession => <li key={profession}>{profession}</li>)}</ul>
        <h4>Level</h4>
        <p>{level}</p>
        <h4>Skills</h4>
        <ul>{skills.map(skill => <li key={skill['skill']}>{skill['skill']}</li>)}</ul>
        <Link to={'/myportfolio/edit'}>Edit Portfolio</Link>
        <h4>Projects</h4>
        {/* <ul>{collaboratedProjects.map(project => <li key={project}>{project}</li>)}</ul> */}
        {collaboratedProjects.map(project => (
          <ProjectCard key={project._id} {...project} />
        ))}
        <Link to={'/myportfolio/edit'}>Edit Portfolio</Link>
      </section>
    )
  }
}

export default MyPortfolio