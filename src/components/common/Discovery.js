import React from 'react'
import axios from 'axios'
import UserCard from '../users/UserCard'
import ProjectCard from '../projects/ProjectCard'

import Gallery from './Gallery'

class Discovery extends React.Component {
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
      <section className="discovery_container section_padding">
        <h1 className="title discovery_title" style={{ marginBottom: '0rem'  }}>discover</h1>
        <div className="discovery_inner_container">
          <div>
            <div className="discovery_title_container">
              <h2 className="subtitle discovery_subtitle">people</h2>
              <div className="discovery_line_break"></div>
            </div>
            <div className="gallery_outer_container">
              <div className="gallery_container">
                <Gallery data={this.state.users} type={'users'}/>
                {/* {this.state.users.map(user => (
              <UserCard key={user._id} {...user} />
            ))} */}
              </div>
            </div>
          </div>
          <div>
            <div className="discovery_title_container">
              <h2 className="subtitle discovery_subtitle">projects</h2>
              <div className="discovery_line_break"></div>
            </div>
            <div>
              <Gallery data={this.state.projects} type={'projects'}/>
              {/* {this.state.projects.map(project => (
              <ProjectCard key={project._id} {...project} />
            ))} */}
            </div>
          </div>
        </div>
      </section>

    )
  }
}
export default Discovery