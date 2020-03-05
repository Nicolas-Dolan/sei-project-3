import React from 'react'
import Select from 'react-select'
import { skills, professions, levels } from '../../../config/environment'
import ImageUpload from '../common/ImageUpload'
import colorStyles from '../../lib/colourStyles'

const UserForm = ({ data, handleChange, handleSubmit, handleMultiChange, handleChangeImage, handleChangeSkill, handleChangeLevel }) => {
  const professionOptions =
    professions.map(item => {
      return (
        { value: item, label: item }
      )
    })

  const skillsOptions =
    skills.map(item => {
      return (
        { value: item, label: item }
      )
    })

  const levelOptions =
    levels.map(item => {
      return (
        { value: item, label: item }
      )
    })
  return (
    <section className="is-fullheight-with-navbar hero section_padding">
      <div className="hero-body columns is-fullwidth">
        <div className="column is-quarter-desktop"></div>
        <div className='column is-three-quarters-mobile is-half-tablet is-two-fifths-desktop box'>
          {/* HOLD FOR FORM */}

          <form onSubmit={handleSubmit}>
            {/* <div className="title-underLine">
              <h2 className="title is-4 padding-v-10">user</h2>
            </div> */}

            <div className="field">
              <label className="form-fields">name</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                />
              </div>
            </div>

            <div className="field">
              <div className="form-fields">upload profile image</div>
              <div className="control">  
                <ImageUpload
                  labelText="Upload your profile image"
                  onChange={handleChange}
                  required
                  name="profileImage"
                  handleChangeImage={handleChangeImage}
                  fieldName="profileImage"
                />
              </div>
            </div>

            <div className="field">
              <label className="form-fields">location</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Location"
                  name="location"
                  onChange={handleChange}
                  value={data.location}
                />
              </div>
            </div>

            <div className="field">
              <label className="form-fields">bio</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Bio"
                  name="bio"
                  maxLength="150"
                  onChange={handleChange}
                  value={data.bio}
                ></textarea>
              </div>
            </div>

            <div className="field">
              <div className="form-fields">profession/industry</div>
              <div className="control">  
                <Select
                  options={professionOptions}
                  isMulti
                  name="professions"
                  value={professionOptions.filter(profession => data.professions.includes(profession.value))}
                  onChange={handleMultiChange}
                  styles={colorStyles} 
                />
              </div>
            </div>

            <div className="field">
              <div className="form-fields">level</div>
              <div className="control">  
                <Select
                  options={levelOptions}
                  name="level"
                  value={levelOptions.filter(l => l.value === data.level)}
                  onChange={handleChangeLevel}
                  styles={colorStyles} 
                />
              </div>
            </div>

            <div className="field">
              <div className="form-fields">skills</div>
              {/* { data.skills.length > 0 && */}
              <div className="control">  
                <Select
                  options={skillsOptions}
                  isMulti
                  name="skills"
                  value={skillsOptions.filter(skill =>  data.skills.map(a => a.skill).includes(skill.value))}
                  onChange={handleChangeSkill}
                  styles={colorStyles} 
                />
              </div> 
              {/* } */}
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-primary has-text-white is-fullwidth" type="submit">Submit</button>            
              </div>
            </div>   

          </form>
        </div>
        <div className="column is-quarter-desktop"></div>   
      </div>
    </section>      

  )
}
export default UserForm