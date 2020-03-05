import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import ProjectForm from './ProjectForm'

class ProjectEdit extends React.Component{

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

  async componentDidMount() {
    // console.log(this.props.match.params.id)
    try {
      const res = await axios.get(`/api/projects/${this.props.match.params.id}`)
      this.setState({ data: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : event.target.value
    const data = { ...this.state.data, [e.target.name]: value }
    this.setState({ data })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`/api/projects/${this.props.match.params.id}`, { ...this.state.data }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log(res.data)
      this.props.history.push(`/projects/${res.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  handleChangeImage = ({ target: { name, value } }) => {
    const newValue = { ...this.state.data[name].push(value) }
    this.setState({ newValue })
  }

  handleMultiChange = (selected, metaAction) => {
    const dropSelected = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, [metaAction.name]: dropSelected }
    this.setState({ data })
  }

  render() {
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

export default ProjectEdit