import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'


import UserCard from '../users/UserCard'
import ProjectCard from '../projects/ProjectCard'

class Gallery extends React.Component{
  
  state = {
    array: null
  }

  handleOnDragStart = (e) => {
    e.preventDefault()
  }

  componentDidMount() {
    // const array = this.props.data.map(user => (
    //   <UserCard key={user._id} {...user} />
    // ))
    // // console.log(array)
    // this.setState({ array })
  }

  render() {
    return (
      this.props.type === 'users' ?
      <>
        <AliceCarousel 
          className="carousel_class"
          mouseTrackingEnabled
          responsive={{ 0: { items: 1 }, 1024: { items: 5 } }}
          dotsDisabled
          // buttonsDisabled
        >
        
          {this.props.type === 'users' && this.props.data.map(user => {
            return <UserCard key={user._id} {...user} />
          })}
        </AliceCarousel> 
        </>
        :
        <AliceCarousel 
          className="carousel_class"
          mouseTrackingEnabled
          responsive={{ 0: { items: 1 }, 1024: { items: 3 } }}
          dotsDisabled
        >
          {this.props.type === 'projects' && this.props.data.map(project => (
            <div key={project._id} className="project_card_outer_container_test">
              <ProjectCard key={project._id} {...project} />
            </div>
          ))}
        </AliceCarousel> 
    )
  }
}

export default Gallery