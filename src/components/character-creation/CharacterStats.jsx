import { useEffect, useState } from 'react'
import staticdata from '../../data/static_data.json'

const CharacterStats = (props) => {

  const displayCharacterSkills = (skills) => {
    var result = []
    Object.keys(staticdata.SkillCategories).forEach((category) => {
      var s = []
      staticdata.SkillCategories[category].forEach((skill) => {
        s.push(
          <>
            {skill + ': ' + skills[skill]}
            <br></br>
          </>
        )
      })
      result.push(<><br></br>{category}<br></br><br></br>{s}</>)

    })
    return (<>{result}</>)
  }

  const displayCharacterAttributes = (character) => {
    var result = []
    for (var attribute in character.Attributes) {
      result.push(
        <>
          {attribute + ': ' + character.Attributes[attribute]}
          <br></br>
        </>
      )
    }
    return (<>{result}</>)
  }

  return (
    <>

      Sex: {props.sex}<br></br>
      Race: {props.race}<br></br>
      Birthsign: {props.birthsign}<br></br>
    
      Specialization: {props.specialization}<br></br>
      Favoured Attributes: {props.favoredAttributes}<br></br>
      {/* Major Skills: {props.majorSkills.toString()}<br></br> */}
      {/* Minor Skills: {props.minorSkills.toString()}<br></br><br></br> */}
      {displayCharacterSkills(props.skills)}
    </>
  )
}

export default CharacterStats