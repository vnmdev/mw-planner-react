import { useState, useEffect } from "react";
// import CharacterDropdowns from "./character-creation/CharacterDropdowns"
import CharacterStats from "./character-creation/CharacterStats"
import staticdata from '../data/static_data.json'
import Dropdown from "./character-creation/Dropdown";

const CharacterCreation = () => {
  const [race, setRace] = useState('')
  const [sex, setSex] = useState('')
  const [birthsign, setBirthsign] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [favoredAttribute1, setFavoredAttribute1] = useState('')
  const [favoredAttribute2, setFavoredAttribute2] = useState('')
  const [favoredAttributes, setFavoredAttributes] = useState(Array.from(Array(2)))
  const [majorSkills, setMajorSkills] = useState(Array.from(Array(5)))
  const [minorSkills, setMinorSkills] = useState(Array.from(Array(5)))

  const character = Object.create(staticdata.BaseCharacter)
  const [skills, setSkills] = useState(character.Skills)
  const attributes = character.Attributes


  useEffect(() => {
    updateSkills();
  }, [race, sex, majorSkills, minorSkills, specialization, favoredAttributes]);

  function updateSkills() {
    const baseSkills = Object.create(staticdata.BaseCharacter.Skills)
    //Racial Bonuses
    if (race != '') {
      const raceSkills = staticdata.RacialBonuses[race]['Skills']
      Object.entries(raceSkills).forEach(([k, v]) => {
        baseSkills[k] += v
      })
    }

    //Major + Minor Skills
    majorSkills.filter((x) => x != undefined).forEach((skill) => {
      baseSkills[skill] += 25
    })
    minorSkills.filter((x) => x != undefined).forEach((skill) => {
      baseSkills[skill] += 10
    })

    //Specialization
    if (specialization != '') {
      staticdata.SkillCategories[specialization].forEach((skill) => {
        baseSkills[skill] += 5
      })
    }

    setSkills(Object.create(baseSkills))
  }

  function updateValue(setMethod, value) {
    updateSkills()
    setMethod(value)
  }

  function updateArray(array, setArray, value, index) {
    if (!Array.isArray(array)) return
    updateSkills()
    setArray(array.map((c, i) => { return i === index ? value : c }));
  }

  function drawNonUniqueDropdowns() {
    const ddmajor = []
    const ddminor = []
    const ddattributes = []
    {
      Array.from(Array(5).keys()).forEach((i) => {
        ddmajor.push(
          <Dropdown
            name={'MajorSkill' + (i + 1)}
            values={staticdata.BaseCharacter.Skills}
            skillCategories={staticdata.BaseCharacter.SkillCategories}
            mutuallyExclusive={[majorSkills, minorSkills]}
            onChange={(e) => updateArray(majorSkills, setMajorSkills, e.target.value, i)}
          />
        )
      })
      Array.from(Array(5).keys()).forEach((i) => {
        ddminor.push(
          <Dropdown
            name={'MinorSkill' + (i + 1)}
            values={staticdata.BaseCharacter.Skills}
            mutuallyExclusive={[majorSkills, minorSkills]}
            onChange={(e) => updateArray(minorSkills, setMinorSkills, e.target.value, i)}
          />
        )
      })
      Array.from(Array(2).keys()).forEach((i) => {
        ddattributes.push(
          <Dropdown
            name={'FavoredAttribute' + (i + 1)}
            values={staticdata.BaseCharacter.Attributes}
            mutuallyExclusive={[favoredAttributes]}
            onChange={(e) => updateArray(favoredAttributes, setFavoredAttributes, e.target.value, i)}
          />
        )
      })
    }
    return (
      <>
        <div class="dd-Major">
          {ddmajor}
        </div>
        <div class="dd-Minor">
          {ddminor}
        </div>
        {ddattributes}
      </>
    )
  }

  return (
    <>
      <div class="dd">
        <Dropdown
          name={'Sex'}
          values={staticdata.RacialBonuses.Argonian.Attributes}
          onChange={(e) => updateValue(setSex, e.target.value)}
        />
        <Dropdown
          name={'Race'}
          values={staticdata.RacialBonuses}
          onChange={(e) => updateValue(setRace, e.target.value)}
        />
        <Dropdown
          name={'Birthsign'}
          values={staticdata.Birthsigns}
          onChange={(e) => updateValue(setBirthsign, e.target.value)}
        />
        <Dropdown
          name={'Specialization'}
          values={staticdata.SkillCategories}
          onChange={(e) => updateValue(setSpecialization, e.target.value)}
        />
        {/* <Dropdown
          name={'FavoredAttribute1'}
          values={staticdata.BaseCharacter.Attributes}
          onChange={(e) => updateValue(setFavoredAttribute1, e.target.value)}
        />
        <Dropdown
          name={'FavoredAttribute2'}
          values={staticdata.BaseCharacter.Attributes}
          onChange={(e) => updateValue(setFavoredAttribute2, e.target.value)}
        /> */}
        {drawNonUniqueDropdowns()}
      </div>
      <CharacterStats
        sex={sex}
        race={race}
        birthsign={birthsign}
        specialization={specialization}
        // favoredAtrribute1={favoredAttribute1}
        // favoredAttribute2={favoredAttribute2}
        favoredAttributes={favoredAttributes}
        skills={skills}
      />

    </>
  )
}

export default CharacterCreation