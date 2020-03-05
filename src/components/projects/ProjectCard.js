import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const ProjectCard = ({ name, images, _id, description, owner, skillsInvolved }) => (
  <div className="project_card_container" key={_id}>
    <Link to={`/projects/${_id}`}>
      <div className="card test-border2">
        <div className="project_card_img_text_container">
          <img className="project-img image" src={images[0]} alt={name} />
          <div className="project_card_text">
            <p>{description}</p>
            <div>
              {skillsInvolved.map(skill => {              
                return <div key={skill} className="project_card_skills" style={{ display: 'inline-block' }}>{skill}</div>
              })}
            </div>
          </div>
        </div>
        <div>
          <h3 className="project_card_header_text project_card_main_header">{name}</h3>
        </div>
        <div>
          <h4 className="project_card_header_text">{owner.location}</h4>
        </div>
      </div>
    </Link>
  </div>
)

export default ProjectCard