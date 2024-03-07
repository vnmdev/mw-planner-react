import { useEffect, useState } from 'react'
import staticdata from '../../data/static_data.json'

const CharacterStats = (props) => {
  const character = Object.create(staticdata.BaseCharacter)
  const [skills, setSkills] = useState(character.Skills)
  const attributes = character.Attributes

  const setCharacterSkills = (skills) => {
    skills = Object.create(staticdata.BaseCharacter.Skills)
    props.majorSkills.forEach((majorSkill) => {
      console.log(majorSkill)
      skills[majorSkill] = staticdata.BaseCharacter.Skills[majorSkill] + 30
    })
    return skills
  }
  
  const displayCharacterSkills = (skills) => {
    var result = []
    for (var skill in skills) {
      result.push(
        <>
          {skill + ': ' + skills[skill]}
          <br></br>
        </>
      )
    }
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
      Favoured Attributes: {props.favoredAttributes.toString()}<br></br>
      Major Skills: {props.majorSkills.toString()}<br></br>
      Minor Skills: {props.minorSkills.toString()}<br></br><br></br>
      {displayCharacterSkills(skills)}
    </>
  )
}

export default CharacterStats