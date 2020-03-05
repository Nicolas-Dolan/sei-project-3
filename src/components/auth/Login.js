import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
// import { notify } from 'react-notify-toast'

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: '' })
  }
  handleSubmit = async e => {
    e.preventDefault()
    
    try {
      const res = await axios.post('/api/login', this.state.data)
      console.log(res.data)
      Auth.setToken(res.data.token), console.log('token =', res.data.token)
      console.log(res.data.firstLogin)
      if (res.data.firstLogin) {
        this.props.history.push('/getstarted')
      } else {
        this.props.history.push('/discovery')
      }
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }
  
  render() {
    return (
      <section className="is-fullheight-with-navbar hero section_padding">
        <div className="hero-body columns is-fullwidth">
          <div className="column is-quarter-desktop"></div>
          <div className='column is-three-quarters-mobile is-half-tablet is-one-third-desktop box'>
            <form onSubmit={this.handleSubmit}>
              <div className="title-underLine">
                <h2 className="subtitle-hero is-4 padding-v-10">login</h2>
              </div>              
              <div className="field">
                <label className="form-fields">email</label>
                <div className="control">
                  <input
                    className={`input ${this.state.error ? 'display' : ''}`}
                    name="email"
                    placeholder="email"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="form-fields">password</label>
                <div className="control">
                  <input
                    className={`input ${this.state.error ? 'display' : ''}`}
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error && <small>{this.state.error}</small>}
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary has-text-white is-fullwidth" type="submit">Login</button>            
                </div>
              </div>            
            </form>
          </div>
          <div className="column is-quarter-desktop"></div>
        </div>
      </section>
        
    )
  }
}
export default Login