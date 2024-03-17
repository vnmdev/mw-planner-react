import { useEffect, useState } from 'react'
import staticdata from '../../data/static_data.json'

const CharacterStats = (props) => {

  const displaySkills = (skills, category) => {
    var result = []
    // Object.keys(staticdata.SkillCategories).forEach((category) => {
    var s = []

    staticdata.SkillCategories[category].forEach((skill) => {
      var colour = props.majorSkills.includes(skill) ? 'cyan' : props.minorSkills.includes(skill) ? 'lightblue' : ''
      var ss = [
        <>
          <tr>
            <td><span style={{ color: colour }}>{skill}</span></td>
            <td><span style={{ color: colour }}>{skills[skill]}</span></td>
          </tr>
        </>
      ]


      s.push(<>{ss}</>)

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
      var colour = attributes[attribute] > 40 ? 'green' : colour = attributes[attribute] < 40 ? 'red' : ''
      var temp = [
        <>
          <tr>
            <td><span style={{ color: colour }}>{attribute}</span></td>
            <td><span style={{ color: colour }}>{attributes[attribute]}</span></td>
          </tr>
        </>
      ]
      result.push(<>{temp}</>)
    })
    return (<>{result}</>)
  }

  const displayDerivedAttributes = (derivedAttributes) => {
    var result = []
    Object.keys(staticdata.DerivedAttributes).forEach((derivedAttribute) => {
      result.push(
        <>
          <tr>
            <td>{derivedAttribute}</td>
            <td>{derivedAttributes[derivedAttribute]}</td>
          </tr>
        </>
      )
    })
    return (<>{result}</>)
  }

  return (
    <>
      <div class="Stat1">
        <h1>Attributes</h1>
        <table>
          {displayDerivedAttributes(props.derivedAttributes)}
          <br></br>
          {displayAttributes(props.attributes)}
        </table>
      </div>
      <div class="Stat2">
        <table>
          {displaySkills(props.skills, 'Combat')}
        </table>
      </div>
      <div class="Stat3">
        <table>
          {displaySkills(props.skills, 'Magic')}
        </table>
      </div>
      <div class="Stat4">
        <table>
          {displaySkills(props.skills, 'Stealth')}
        </table>
      </div>
    </>
  )
}

export default CharacterStats