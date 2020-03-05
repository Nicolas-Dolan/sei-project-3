import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import axios from 'axios'

import PendingRequests from '../users/PendingRequests'

class Navbar extends React.Component {
  state = { navbarOpen: false, name: null, username: null }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  handleClick = () => {
    this.setState({ navbarOpen: false })
  }
  
  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  async componentDidMount() {
    if (Auth.isAuthenticated()) {
      try {
        const res = await axios.get('/api/myportfolio', {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.setState({ name: res.data.name, username: res.data.username })
      } catch (err) {
        console.log(err)
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.getUser()
      if (this.props.open === true) {
        this.props.handleOpen()
      }
      this.setState({ navbarOpen: false })
      if (Auth.isAuthenticated()) {
        try {
          const res = await axios.get('/api/myportfolio', {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
          })
          this.setState({ name: res.data.name, username: res.data.username })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  render() {
    const { navbarOpen } = this.state

    return (
      <nav className="navbar custom_nav">
        <div className="navbar-brand navbar-item-font navbar-logo">
          <Link className="navbar-brand navbar-item" onClick={this.handleClick} to="/">beehive</Link>          
          <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>


        <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
          <div className="navbar-item navbar-end navbar-item-font">
            {Auth.isAuthenticated() && <Link onClick={this.handleClick} to="/projects/new">new project</Link>}
          </div>
          <div className="navbar-item navbar-item-font">
            <Link onClick={this.handleClick} to="/search">start your journey</Link>
          </div>
          {Auth.isAuthenticated() &&
          <div className="navbar-item navbar-item-font">
            <Link onClick={this.handleClick} to={`/users/${this.state.username}`}>my portfolio</Link>
          </div>
          }
          {Auth.isAuthenticated() && 
          <PendingRequests 
            open={this.props.open} 
            user={this.props.user}
            handleClick={this.handleClick} 
            acceptCollabRequest={this.props.acceptCollabRequest}
            rejectCollabRequest={this.props.rejectCollabRequest}
            getUser={this.props.getUser}
            handleOpen={this.props.handleOpen}
          /> }
          {Auth.isAuthenticated() &&
          <div className="navbar-item navbar-item-font">
            <Link className="button" to="/mail">Mail</Link>
          </div>
          }
          {Auth.isAuthenticated() && 
          <div className="navbar-item navbar-item-font">
            <button className="button" onClick={this.handleLogout}>logout {this.state.name}</button>
          </div>
          }
          {!Auth.isAuthenticated() &&
          <div className="navbar-item navbar-item-font">
            <Link onClick={this.handleClick} to="/register">register</Link>
          </div>
          }
          {!Auth.isAuthenticated() && 
          <div className="navbar-item navbar-item-font">
            <Link onClick={this.handleClick} to="/login">login</Link>
          </div>
          }
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)