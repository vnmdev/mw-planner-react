import { useEffect, useState } from 'react'
import staticdata from '../../data/static_data.json'

const CharacterStats = (props) => {

  const displaySkills = (skills, category) => {
    var result = []
    // Object.keys(staticdata.SkillCategories).forEach((category) => {
    var s = []
    staticdata.SkillCategories[category].forEach((skill) => {
      var ss = [
        <>
          {skill + ': ' + skills[skill]}
          <br></br>
        </>
      ]
      if (props.majorSkills.includes(skill)) {
        s.push(<b style={{ color: "cyan" }}>{ss}</b>)
      } else if (props.minorSkills.includes(skill)) {
        s.push(<b style={{ color: "lightblue" }}>{ss}</b>)
      } else {
        s.push(<>{ss}</>)
      }

    })
    result.push(
      <>
        <h1>{category}</h1>
        {s}
        <br></br>
      </>
    )

    // })
    return (<>{result}</>)
  }

  const displayAttributes = (attributes) => {
    var result = []
    Object.keys(staticdata.BaseCharacter.Attributes).forEach((attribute) => {
      var temp = [
        <>
          {attribute + ': ' + attributes[attribute]}
        </>
      ]
      result.push(<>{temp}<br></br></>)
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
      <div class="Stat1">
        <h1>Attributes</h1>
        {displayDerivedAttributes(props.derivedAttributes)}
        <br></br>
        {displayAttributes(props.attributes)}
      </div>
      <div class="Stat2">
        {displaySkills(props.skills, 'Combat')}
      </div>
      <div class="Stat3">
        {displaySkills(props.skills, 'Magic')}
      </div>
      <div class="Stat4">
        {displaySkills(props.skills, 'Stealth')}
      </div>
    </>
  )
}

export default CharacterStats