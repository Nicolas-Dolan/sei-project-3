import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'

import ProjectForm from './ProjectForm'

class ProjectNew extends React.Component{

  state = {
    data: {
      name: '',
      collaborators: [],
      description: '',
      location: '',
      images: [],
      completed: false,
      recruiting: false,
      skillsInvolved: [],
      lookingFor: []
    }
  }

  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : event.target.value
    const data = { ...this.state.data, [e.target.name]: value }
    this.setState({ data })
  }

  handleChangeImage = ({ target: { name, value } }) => {
    const newValue = { ...this.state.data[name].push(value) }
    this.setState({ newValue })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.data)
    try {
      const res = await axios.post('/api/projects', { ...this.state.data }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/projects/${res.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  handleMultiChange = (selected, metaAction) => {
    const dropSelected = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, [metaAction.name]: dropSelected }
    this.setState({ data })
  }

  render() {
    console.log(this.state.data)
    return (
      <ProjectForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        data={this.state.data}
        handleMultiChange={this.handleMultiChange}
        handleChangeImage={this.handleChangeImage}
      />
    )
  }
}

export default ProjectNew