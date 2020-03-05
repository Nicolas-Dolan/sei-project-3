import React from 'react'
// import axios from 'axios'

import Auth from '../../lib/auth'

class PendingRequests extends React.Component {

  state = {
    open: false
    // user: null
  }

  // getUser = async () => {
  //   try {
  //     const res = await axios.get('/api/myportfolio', {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.setState({ user: res.data })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  async componentDidMount() {
    this.props.getUser()
  }

  // handleOpen = () => {
  //   this.setState({ open: !this.state.open })
  // }

  // acceptCollabRequest = async (e) => {
  //   try {
  //     await axios.get(`/api/users/${this.state.user._id}/collaborate/${e.target.name}`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.getUser()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // rejectCollabRequest = async (e) => {
  //   console.log(this.state.user._id, e.target.name)
  //   try {
  //     await axios.delete(`/api/users/${this.state.user._id}/collaborate/${e.target.name}`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.getUser()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  render() {
    return (
      <div className="request_outer_container navbar-item navbar-item-font">
        <div
          className=""
        >
          <button
            className="button"
            // onClick={this.props.handleOpen, this.props.handleClick}
            onClick={this.props.handleOpen}
          >
            Requests
          </button>
        </div>
        {this.props.open && this.props.user && !this.props.navbarOpen && this.props.user.pendingProjects.length === 0 &&
          <div className="request_list">
            <div className="single_request">
              <div className="pending_header_container">
                <h1 style={{ display: 'block' }}>No Pending Projects</h1>
              </div>
            </div>
          </div>
        }
        {this.props.open && this.props.user && !this.props.navbarOpen &&
          <div
            className="request_list"
          >
            {this.props.user.pendingProjects.map(project => {

              return (
                <div
                  key={project._id}
                  className="single_request"
                >
                  <div className="pending_header_container">
                    {/* <img className="pending_project_preview" src={project.o.images[0]} /> */}
                    <h1 style={{ display: 'inline-block' }}>{project.project.name}</h1>
                  </div>
                  <div
                    style={{ float: 'right' }}
                    className="single_request_button"
                  >
                    {(((project.user === true) && (project.ownerId._id === Auth.getPayload().sub)) ||
                      ((project.owner === true) && (project.userId._id === Auth.getPayload().sub))) &&
                    <button
                      className="requestAccept button is-success"
                      name={project.project._id}
                      onClick={this.props.acceptCollabRequest}
                    >Accept</button>
                    }
                    {!(((project.user === true) && (project.ownerId._id === Auth.getPayload().sub)) ||
                      ((project.owner === true) && (project.userId._id === Auth.getPayload().sub))) &&
                      <button
                        className="requestAccept button is-success"
                        name={project.project._id}
                        onClick={this.props.acceptCollabRequest}
                        disabled
                      >Accept</button>
                    }
                    <button
                      className="requestDecline button is-danger"
                      name={project.project._id}
                      onClick={this.props.rejectCollabRequest}
                    >Reject</button>

                  </div>
                </div>
              )
            })}
          </div>
        }
      </div>
    )
  }
}

export default PendingRequests