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

  const displayCharacterAttributes = (attributes) => {
    var result = []
    Object.keys(staticdata.BaseCharacter.Attributes).forEach((attribute) => {
      result.push(
        <>
          {attribute + ': ' + attributes[attribute]}
          <br></br>
        </>
      )
    })
    return (<>{result}</>)
  }

  return (
    <>

      {displayCharacterSkills(props.skills)}<br></br>
      {displayCharacterAttributes(props.attributes)}
    </>
  )
}

export default CharacterStats