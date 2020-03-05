import React from 'react'
import Select from 'react-select'
import colorStyles from '../../lib/colourStyles'


const SearchCardUser = ({ userForm, handleChange, handleMultiChange, professionOptions, skillsOptions, levelOptions }) => {

  return (
  
    <section>
      {/* <div className="title-underLine"> */}
      {/* <h2 className="subtitle is-4">user search</h2> */}
      {/* </div> */}

      <div className="field">
        <div className="label">name</div>
        <div className="control">        
          <input
            className="input"
            name="name"
            value={userForm.name}
            onChange={(e) => handleChange(e,'userForm')}
          />
        </div>
      </div>   

      <div className="field">
        <div className="label">username</div>
        <div className="control">        
          <input
            className="input"
            name="username"
            value={userForm.username}
            onChange={(e) => handleChange(e,'userForm')}
          />
        </div>
      </div>    

      <div className="field">
        <div className="label">location</div>
        <div className="control">        
          <input
            className="input"
            name="location"
            value={userForm.location}
            onChange={(e) => handleChange(e,'userForm')}
          />
        </div>
      </div>   

      <div className="field">
        <div className="label">level</div>
        <div className="control">        
          <Select                  
            options={levelOptions}
            isMulti
            onChange={(e) => handleMultiChange(e,'userForm','level')}
            styles={colorStyles}  
          />
        </div>
      </div>

      <div className="field">
        <div className="label">profession</div>
        <div className="control">        
          <Select                
            menuPlacement="top"  
            options={professionOptions}
            isMulti
            onChange={(e) => handleMultiChange(e,'userForm','professions')}
            styles={colorStyles}  
          />
        </div>
      </div>

      <div className="field">
        <div className="label">skills needed</div>
        <div className="control">        
          <Select 
            menuPlacement="top"
            options={skillsOptions}
            isMulti
            onChange={(e) => handleMultiChange(e,'userForm','skills')}
            styles={colorStyles}  
          />
        </div>
      </div>
    </section>

  )
}

export default SearchCardUser