import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './styles/main.scss'
import axios from 'axios'
import Auth from './lib/auth'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Discovery from './components/common/Discovery'
import Search from './components/common/Search'
import ProjectShow from './components/projects/ProjectShow'
import ProjectEdit from './components/projects/ProjectEdit'
import ProjectNew from './components/projects/ProjectNew'
import UserShow from './components/users/UserShow'
import UserEdit from './components/users/UserEdit'
// import UserMessages from './components/users/UserMessages'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import NotFound from './components/common/NotFound'
// import MyPortfolio from './components/common/MyPortfolio'
// import Auth from '../../lib/auth'
import SecureRoute from './components/common/SecureRoute'
import UnSecureRoute from './components/common/UnSecureRoute'
import FirstLogin from './components/common/FirstLogin'
import Gallery from './components/common/Gallery'

import Notifications, { notify } from 'react-notify-toast'
import ChatBoxShow from './components/chatboxes/ChatBoxShow'
import ChatBoxIndex from './components/chatboxes/ChatBoxIndex'


class App extends React.Component{
  state = {
    open: false,
    user: null
  }

  getUser = async () => {
    if (Auth.isAuthenticated()) {
      try {
        const res = await axios.get('/api/myportfolio', {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.setState({ user: res.data })
      } catch (err) {
        console.log(err)
      }
    }
  }
  // componentDidUpdate() {
  //   if (Auth.isAuthenticated()) {
  //     this.getUser()
  //   }
  // }
  handleOpen = () => {
    this.setState({ open: !this.state.open })
  }
  async componentDidMount() {
    this.getUser()
  }
  acceptCollabRequest = async (e) => {
    try {
      await axios.get(`/api/users/${this.state.user._id}/collaborate/${e.target.name}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const myColor = { background: '#C4C4C4', text: '#3F3F3F' }
      notify.show('Request Accepted!', 'custom' , 1000, myColor)
      this.getUser()
    } catch (err) {
      console.log(err)
    }
  }
  rejectCollabRequest = async (e) => {
    try {
      await axios.delete(`/api/users/${this.state.user._id}/collaborate/${e.target.name}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const myColor = { background: '#C4C4C4', text: '#3F3F3F' }
      notify.show('Request Rejected!', 'custom' , 1000, myColor)
      this.getUser()
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <BrowserRouter>
        {/* <main style={{ height: '100vh', overflow: 'hidden' }}> */}
        <main>
          <Notifications />
          <Navbar 
            open={this.state.open} 
            user={this.state.user} 
            acceptCollabRequest={this.acceptCollabRequest}
            rejectCollabRequest={this.rejectCollabRequest}
            getUser={this.getUser}
            handleOpen={this.handleOpen}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/discovery" component={Discovery} />
            <SecureRoute path="/myportfolio/edit" component={UserEdit} />
            <Route path="/search" component={Search} />
            {/* <SecureRoute path="/myportfolio" component={MyPortfolio} /> */}
            <SecureRoute path="/projects/:id/edit" component={ProjectEdit} />
            <SecureRoute path="/projects/new" component={ProjectNew} />
            {/* <Route path="/projects/:id" component={ProjectShow} getUser={this.getUser}/> */}
            <Route path="/projects/:id" render={(props) => <ProjectShow {...props} getUser={this.getUser}/>}/>
            {/* <SecureRoute path="/users/:username/edit" component={UserEdit} /> */}
            <Route path="/users/:userid/chatboxes/:id" component={ChatBoxShow} />
            <SecureRoute path="/mail" component={ChatBoxIndex} />
            <Route path="/users/:username" component={UserShow} />
            {/* <Route path="/users/:username/messages" component={UserMessages} /> */}
            <UnSecureRoute path="/register" component={Register} />
            <UnSecureRoute path="/login" component={Login} />
            <SecureRoute path="/getstarted" component={FirstLogin} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/*" component={NotFound} />
          </Switch>
          {/* <PendingRequests /> */}
        </main>
      </BrowserRouter>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)