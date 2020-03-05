import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import UserForm from './UserForm'

class UserEdit extends React.Component {
  state = {
    data: {
      name: '',
      bio: '',
      location: '',
      profileImage: '',
      professions: [],
      level: '',
      skills: []
    },
    usernameMain: ''
  }


  async componentDidMount() {
    // const currentUsername = this.props.match.params.username
    // console.log(this.state.data)
    try {
      const res = await axios.get('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      // const res = await axios.get(`/api/projects/${this.props.match.params.id}`)
      this.setState({
        data: res.data,
        usernameMain: res.data.username
      })
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
      // const res = await axios.put(`/api/users/${this.props.match.params.id}`, { ...this.state.data }, {
      const res = await axios.put('/api/myportfolio/edit', { ...this.state.data }, {
        // const res = await axios.put('/api/myportfolio', { ...this.state.data }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/users/${this.state.usernameMain}`)
    } catch (err) {
      console.log(err)
    }
  }

  handleMultiChange = (selected, metaAction) => {
    const dropSelected = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, [metaAction.name]: dropSelected }
    this.setState({ data })
  }

  handleChangeLevel = (selected) =>  {
    const value = selected.value
    const data = { ...this.state.data, level: value }
    this.setState({ data })
  }

  handleChangeSkill = (selected) => {
    const data = { ...this.state.data, skills: selected.map(sel => ({ skill: sel.value }) ) }
    this.setState({ data })
  }

  handleChangeImage = ({ target: { name, value } }) => {
    const newValue = value
    const data = { ...this.state.data, [name]: newValue }
    this.setState({ data })
  }

  render() {

    return (
      <UserForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        data={this.state.data}
        handleMultiChange={this.handleMultiChange}
        handleChangeImage={this.handleChangeImage}
        handleChangeSkill={this.handleChangeSkill}
        handleChangeLevel={this.handleChangeLevel}
      />
    )

  }
}
export default UserEdit