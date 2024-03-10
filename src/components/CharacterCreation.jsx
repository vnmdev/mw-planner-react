import { useState, useEffect } from "react";
// import CharacterDropdowns from "./character-creation/CharacterDropdowns"
import CharacterStats from "./character-creation/CharacterStats"
import staticdata from '../data/static_data.json'
import Dropdown from "./character-creation/Dropdown";

const CharacterCreation = () => {
  //Form values
  const [race, setRace] = useState('')
  const [sex, setSex] = useState('')
  const [birthsign, setBirthsign] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [favoredAttributes, setFavoredAttributes] = useState(Array.from(Array(2)))
  const [majorSkills, setMajorSkills] = useState(Array.from(Array(5)))
  const [minorSkills, setMinorSkills] = useState(Array.from(Array(5)))
  //Final stats
  const [skills, setSkills] = useState(staticdata.BaseCharacter.Skills)
  const [attributes, setAttributes] = useState(staticdata.BaseCharacter.Attributes)


  useEffect(() => {
    updateSkills()
    updateAttributes()
  }, [race, sex, majorSkills, minorSkills, specialization, favoredAttributes, birthsign]);

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

  function updateAttributes() {
    const baseAttributes = Object.create(staticdata.BaseCharacter.Attributes)

    if (race != '' && sex != '') {
      const raceSexAttributes = staticdata.RacialBonuses[race]['Attributes'][sex]
      Object.entries(raceSexAttributes).forEach(([k, v]) => {
        baseAttributes[k] += v
      })
    } 

    favoredAttributes.filter((x) => x != undefined).forEach((attribute) => {
      baseAttributes[attribute] += 10
    })

    if (birthsign != '') {
      switch(birthsign) {
        case 'The Lady':
          baseAttributes['Endurance'] += 25
          baseAttributes['Personality'] += 25
          break;
        case 'The Steed':
          baseAttributes['Speed'] += 25
          break;
        case 'The Lover':
          baseAttributes['Agility'] += 25
          break;
      }
    }

    setAttributes(Object.create(baseAttributes))
  }

  function updateArray(array, setArray, value, index) {
    if (!Array.isArray(array)) return
    setArray(array.map((c, i) => { return i === index ? value : c }));
  }

  function drawRepeatedDropdowns() {
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
          onChange={(e) => setSex(e.target.value)}
        />
        <Dropdown
          name={'Race'}
          values={staticdata.RacialBonuses}
          onChange={(e) => setRace(e.target.value)}
        />
        <Dropdown
          name={'Birthsign'}
          values={staticdata.Birthsigns}
          onChange={(e) => setBirthsign(e.target.value)}
        />
        <Dropdown
          name={'Specialization'}
          values={staticdata.SkillCategories}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        {drawRepeatedDropdowns()}
      </div>
      <CharacterStats
        sex={sex}
        race={race}
        birthsign={birthsign}
        specialization={specialization}
        favoredAttributes={favoredAttributes}
        skills={skills}
        attributes= {attributes}
      />

    </>
  )
}

export default CharacterCreation