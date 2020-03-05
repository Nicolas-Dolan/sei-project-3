import React from 'react'
import Select from 'react-select'
import ImageUpload from '../common/ImageUpload'
import colorStyles from '../../lib/colourStyles'

import { skills, professions } from '../../../config/environment'

const ProjectForm = ({ handleChange, handleSubmit, data, handleMultiChange, handleChangeImage }) => {

  const skillsOptions =
    skills.map(item => {
      return (
        { value: item, label: item }
      )
    })

  const professionOptions =
    professions.map(item => {
      return (
        { value: item, label: item }
      )
    })


  return (
    <section className="is-fullheight-with-navbar hero section_padding">
      <div className="hero-body columns is-fullwidth">
        <div className="column is-quarter-desktop"></div>
        <div className='column is-three-quarters-mobile is-half-tablet is-two-fifths-desktop box'>
          <form onSubmit={handleSubmit}>

            <div className="title-underLine">
              <h2 className="subtitle-hero is-4 padding-v-10">project</h2>
            </div>

            <div className="field">
              <label className="form-fields">name</label>
              <div className="control">
                <input
                  className="input"
                  onChange={handleChange}
                  required
                  name="name"
                  placeholder="name"
                  value={data.name}
                />
              </div>
            </div>

            <div className="field">
              <label className="form-fields">upload project image</label>
              <div className="control">
                <ImageUpload
                  labelText="Upload an image to show off your project!"
                  onChange={handleChange}
                  required
                  name="images"
                  handleChangeImage={handleChangeImage}
                  fieldName="images"
                />
              </div>
            </div>

            <div className="field">
              <label className="form-fields">description</label>
              <div className="control">
                <input
                  className="input"
                  onChange={handleChange}
                  required
                  name="description"
                  value={data.description}
                />
              </div>
            </div>

            <div className="field">
              <label className="form-fields">location</label>
              <div className="control">
                <input
                  className="input"
                  onChange={handleChange}
                  name="location"
                  value={data.location}
                />
              </div>
            </div>

            <div className="field">
              <label className="checkbox form-fields">completed?</label>
              <div className="control">
                <input
                  // className="input"
                  type="checkbox"
                  onChange={handleChange}
                  name="completed"
                  checked={data.completed}
                />
              </div>
            </div>

            {!data.completed &&
              <div className="field">
                <label className="checkbox form-fields">looking for help?</label>
                <div className="control">
                  <input
                    // className="input"
                    type="checkbox"
                    onChange={handleChange}
                    name="recruiting"
                    checked={data.recruiting}
                  />
                </div>
              </div>}

            {data.recruiting && !data.completed &&
              <div className="field">
                <label className="form-fields">looking for...</label>
                <div className="control">
                  <Select
                    options={professionOptions}
                    isMulti
                    name="lookingFor"
                    styles={colorStyles}
                    value={professionOptions.filter(skill => data.lookingFor.includes(skill.value))}
                    onChange={handleMultiChange}
                  />
                </div>
              </div>}

            <div className="field">
              <label className="form-fields">skills</label>
              <div className="control">
                <Select
                  options={skillsOptions}
                  isMulti
                  name="skillsInvolved"
                  value={skillsOptions.filter(skill => data.skillsInvolved.includes(skill.value))}
                  onChange={handleMultiChange}
                  styles={colorStyles}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-primary has-text-white is-fullwidth" type="submit">Save Project</button>
              </div>
            </div>
          </form>
        </div>
        <div className="column is-quarter-desktop"></div>
      </div>
    </section>

  )
}

export default ProjectForm