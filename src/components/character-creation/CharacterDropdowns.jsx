import { useState } from "react";
import staticdata from '../../data/static_data.json'
import CharacterStats from "./CharacterStats";

const CharacterDropdowns = () => {
  const [race, setRace] = useState('')
  const [sex, setSex] = useState('')
  const [birthsign, setBirthsign] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [favoredAttributes, setFavoredAttributes] = useState([Array.from(Array(2))])
  const [majorSkills, setMajorSkills] = useState(Array.from(Array(5)))
  const [minorSkills, setMinorSkills] = useState(Array.from(Array(5)))

  function updateArray(array, setArray, value, index) {
    const newArray = array.map((c, i) => {
      if (i === index) {
        return value;
      } else {
        return c;
      }
    });
    setArray(newArray);
  }

  // function updateSkills(array, setArray, value, index) {
  //   const newArray = array.map((c, i) => {
  //     if (i === index) {
  //       return value;
  //     } else {
  //       return c;
  //     }
  //   });
  //   setArray(newArray);
  //   setSkills(setCharacterSkills(Object.create(staticdata.BaseCharacter.Skills), majorSkills))
  //   // setCharacterSkills()
  // }

  const drawSkillDropdowns = () => {
    const majorDropdowns = []
    const minorDropdowns = []
    const dropdowntemplate = [
      <option value=""></option>
    ]
    Object.keys(staticdata.SkillCategories).forEach((category) => {
      var s = []
      staticdata.SkillCategories[category].forEach(skill => {
        s.push(<option value={skill}>{skill}</option>)
      })
      dropdowntemplate.push(<optgroup label={category}>{s}</optgroup>)
    })



    Array.from(Array(10).keys()).forEach((i) => {
      const skillType = i < 5 ? ['major', majorDropdowns, majorSkills, setMajorSkills] : ['minor', minorDropdowns, minorSkills, setMinorSkills]
      const n = i < 5 ? i : i - 5
      skillType[1].push(
        <>
          <br></br>
          <select id={skillType[0] + "-skill-" + (n + 1)} onChange={e => updateArray(skillType[2], skillType[3], e.target.value, n)}>
            ${dropdowntemplate}
          </select>
        </>
      )
    })

    return (
      <>
        <div class="dd-maj">
          <label>Major Skills</label>
          {majorDropdowns}
        </div>
        <div class="dd-min">
          <label>Minor Skills</label>
          {minorDropdowns}
        </div>
      </>
    )
  }


  const dropdownGenerator = (name, update, get = null, set = null, object1, object2 = null, array1 = null, array2 = null) => {
    const dropdowntemplate = [
      <option value=""></option>
    ]
    Object.keys(object1).forEach((o1) => {
      var s = []
      dropdowntemplate.push(<option value={o1}>{o1}</option>)
    })
    return (
      <>
        <div class={"dd-"+name}>
          <label>{name}</label>
          <br></br>
          <select id={name} onChange={e => update(e.target.value)}>
          {dropdowntemplate}
          </select>
        </div >
      </>
    )


  }

  const drawDropdowns = () => {
    return (
      <>
        {dropdownGenerator('sex', setSex, null, null, staticdata.RacialBonuses.Argonian.Attributes)}
        {dropdownGenerator('race', setRace, null, null, staticdata.RacialBonuses)}
        <div class="dd-sign">
          <label>Birthsign</label>
          <br></br>
          <select id="birthsign" value={birthsign} onChange={e => setBirthsign(e.target.value)}>
            <option value=""></option>
            <option value="The Apprentice">The Apprentice</option>
            <option value="The Atronach">The Atronach</option>
            <option value="The Lady">The Lady</option>
            <option value="The Lord">The Lord</option>
            <option value="The Lover">The Lover</option>
            <option value="The Mage">The Mage</option>
            <option value="The Ritual">The Ritual</option>
            <option value="The Serpent">The Serpent</option>
            <option value="The Steed">The Steed</option>
            <option value="The Thief">The Thief</option>
            <option value="The Tower">The Tower</option>
            <option value="The Warrior">The Warrior</option>
          </select>
        </div>
        <div class="dd-spec">
          <label>Specialization</label>
          <br></br>
          <select id="specialization" value={specialization} onChange={e => setSpecialization(e.target.value)}>
            <option value=""></option>
            <option value="Combat">Combat</option>
            <option value="Magic">Magic</option>
            <option value="Stealth">Stealth</option>
          </select>
        </div>

        <div class="dd-fav1">
          <label>Favored Attributes</label>
          <br></br>
          <select id="favored-attributes" onChange={e => updateArray(favoredAttributes, setFavoredAttributes, e.target.value, 0)}>
            <option value=""></option>
            <option value="Strength">Strength</option>
            <option value="Intelligence">Intelligence</option>
            <option value="Willpower">Willpower</option>
            <option value="Agility">Agility</option>
            <option value="Speed">Speed</option>
            <option value="Endurance">Endurance</option>
            <option value="Personality">Personality</option>
            <option value="Luck">Luck</option>
          </select>
        </div>
        <div class="dd-fav2">
          <br></br>
          <select id="favored-attributes2" onChange={e => updateArray(favoredAttributes, setFavoredAttributes, e.target.value, 1)}>
            <option value=""></option>
            <option value="Strength">Strength</option>
            <option value="Intelligence">Intelligence</option>
            <option value="Willpower">Willpower</option>
            <option value="Agility">Agility</option>
            <option value="Speed">Speed</option>
            <option value="Endurance">Endurance</option>
            <option value="Personality">Personality</option>
            <option value="Luck">Luck</option>
          </select>
        </div>
        {drawSkillDropdowns()}
      </>
    )
  }

  return (
    <>
      <div class="dd">
        {drawDropdowns()}
      </div>
      <CharacterStats
        sex={sex}
        race={race}
        birthsign={birthsign}
        specialization={specialization}
        favoredAttributes={favoredAttributes}
        majorSkills={majorSkills}
        minorSkills={minorSkills}
      />
    </>
  )
}

export default CharacterDropdowns