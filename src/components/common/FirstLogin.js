import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/auth'

class FirstLogin extends React.Component{

  state = {
    name: null
  }

  async componentDidMount() {
    try {
      const res = await axios('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log(res.data.firstLogin)
      // if (!res.data.firstLogin) this.props.history.push('/discovery')
      this.setState({ name: res.data.name, username: res.data.username })
    } catch (err) {
      console.log(err)
    }
  }
 
  render() {
    if (!this.state.name) return null
    return (
      <section className="hero is-fullheight-with-navbar section_padding">
        <div className="container hero-body columns has-text-centered">
          <div>
            <section className="section padding-reset">
              <h1 className="title-hero is-size-1">welcome to the hive {this.state.name}</h1>
            </section>
            <h2 className="subtitle">start your journey with:</h2>
            
            <div className="buttons is-centered">
              <div className="control">
                <Link to="/search" className="button">Opportunities</Link>
              </div>
              <div className="control">
                <Link to={`/users/${this.state.username}`} className="button">My Profile</Link>
              </div>
              <div className="control">
                <Link to="/projects/new" className="button">New Project</Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    )
  }
}

export default FirstLogin