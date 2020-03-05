import React from 'react'
import axios from 'axios'
import UserCard from '../users/UserCard'
import ProjectCard from '../projects/ProjectCard'
import { Link } from 'react-router-dom'
import Discovery from './Discovery'

class Home extends React.Component {
  state = {
    projects: [],
    users: []
  }
  async componentDidMount() {
    try {
      const res = await axios.get('/api/users')
      const res2 = await axios.get('/api/projects')
      this.setState({
        users: res.data,
        projects: res2.data
      })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div className="home_custom">
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="main-hero-title">
                beehive
              </h1>
              <h2 className="subtitle subtitle-hero">
                for creative busy bees
              </h2>
              <div className="field buttons is-centered">
                <p className="control">
                  <Link className="button is-medium" to="/register">register</Link>
                </p> 
                <p className="control">
                  <a href="#discover" className="button is-medium">discover</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="discover" className="discover_counter_container">
          <Discovery />
        </section>
        {/* <section>
          <h1 id="discover">Discovery</h1>
          <div>
            <h2>Users</h2>
            <div>
              {this.state.users.map(user => (
                <UserCard key={user._id} {...user} />
              ))}
            </div>
          </div>
          <div>
            <h2>Projects</h2>
            <div>
              {this.state.projects.map(project => (
                <ProjectCard key={project._id} {...project} />
              ))}
            </div>
          </div>
        </section> */}
      </div>
    )
  }
}

export default Home