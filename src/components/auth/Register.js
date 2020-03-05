import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
class Register extends React.Component {
  state = {
    data: { 
      username: '',
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  }
  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
    console.log('const data =', data)
    console.log('state =', this.state.data)
  }
  handleSubmit = async e => {
    e.preventDefault()
    const userData = { ...this.state.data, 
      profileImage: 'https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg',
      bio: 'Click edit portfolio to get started editing your profile!',
      location: 'Mars'
      // skills: [{}],
      // professions: ''
    }
    try {
      await axios.post('/api/register', userData)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }
  render() {
    console.log('errors=', this.state.errors)
    return (
      <section className="is-fullheight-with-navbar hero section_padding">
        <div className="hero-body columns is-fullwidth">
          <div className="column is-quarter-desktop"></div>
          <div className='column is-three-quarters-mobile is-half-tablet is-one-third-desktop box'>
            <form onSubmit={this.handleSubmit}>
              <div className="title-underLine">
                <h2 className="subtitle-hero is-4 padding-v-10">register</h2>
              </div>

              <div className="field">
                <label className="form-fields">name</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.name ? 'display' : ''}`}
                    placeholder="Name"
                    name="name"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.name && <p className="help is-danger">{this.state.errors.name}</p>}
              </div>            
      
              <div className="field">
                <label className="form-fields">username</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.username ? 'display' : ''}`}
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.username && <p className="help is-danger">{this.state.errors.username}</p>}
              </div>   

              <div className="field">
                <label className="form-fields">email</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.email ? 'display' : ''}`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.email && <p className="help is-danger">{this.state.errors.email}</p>}
              </div>   
      
              <div className="field">
                <label className="form-fields">password</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.password ? 'display' : ''}`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password && <p className="help is-danger">{this.state.errors.password}</p>}
              </div>   

              <div className="field">
                <label className="form-fields">password confirmation</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.passwordConfirmation ? 'display' : ''}`}
                    type="password"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.passwordConfirmation && <p className="help is-danger">{this.state.errors.passwordConfirmation}</p>}
              </div>  

              <div className="field">
                <div className="control">
                  <button className="button is-primary has-text-white is-fullwidth" type="submit">Register Me</button>            
                </div>
              </div> 
              <div className="mr-6">
                <p>Already a member? Login <Link className="link" to="/login">here</Link></p>
              </div>            
            </form>
          </div>
          <div className="column is-quarter-desktop"></div>
        </div>
      </section>









 
    )
  }
}
export default Register