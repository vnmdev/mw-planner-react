import { useEffect, useState } from 'react'
import staticdata from '../../data/static_data.json'

const CharacterStats = (props) => {

  const displaySkills = (skills) => {
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
      result.push(
        <>
          <br></br>
          <b>{category}</b>
          <br></br>
          {s}
        </>
      )

    })
    return (<>{result}</>)
  }

  const displayAttributes = (attributes) => {
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

  const displayDerivedAttributes = (derivedAttributes) => {
    var result = []
    Object.keys(staticdata.DerivedAttributes).forEach((derivedAttribute) => {
      result.push(
        <>
          {derivedAttribute + ': ' + derivedAttributes[derivedAttribute]}
          <br></br>
        </>
      )
    })
    return (<>{result}</>)
  }

  return (
    <>
      <div class="dd-Stats4">
        {displaySkills(props.skills)}<br></br>
        {displayAttributes(props.attributes)}<br></br>
        {displayDerivedAttributes(props.derivedAttributes)}
      </div>
    </>
  )
}

export default CharacterStats