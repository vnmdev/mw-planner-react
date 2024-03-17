import { useState, useEffect, useCallback } from "react";
// import CharacterDropdowns from "./character-creation/CharacterDropdowns"
import CharacterStats from "./character-creation/CharacterStats"
import staticdata from '../data/static_data.json'
import Dropdown from "./character-creation/Dropdown";
import { useCookies } from "react-cookie";

const CharacterCreation = () => {
  //COOKIE
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name'])
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
  const [derivedAttributes, setDerivedAttributes] = useState(staticdata.DerivedAttributes)
  //Weapon
  const [weaponSkill, setWeaponSkill] = useState('')
  const [weapon, setWeapon] = useState('')

  useEffect(() => {
    updateStats()
  }, [race, sex, majorSkills, minorSkills, specialization, favoredAttributes, birthsign]);

  function updateStats() {
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

    const baseAttributes = Object.create(staticdata.BaseCharacter.Attributes)
    //Race/Sex attributes
    if (race != '' && sex != '') {
      const raceSexAttributes = staticdata.RacialBonuses[race]['Attributes'][sex]
      Object.entries(raceSexAttributes).forEach(([k, v]) => {
        baseAttributes[k] += v
      })
    }
    //Favored Attributes
    favoredAttributes.filter((x) => x != undefined).forEach((attribute) => {
      baseAttributes[attribute] += 10
    })

    var birthsignAttributes = birthsign != '' && 'AttributeBonus' in staticdata.Birthsigns[birthsign] ? staticdata.Birthsigns[birthsign]['AttributeBonus'] : []

    birthsignAttributes.forEach((attribute) => {
      baseAttributes[attribute] += 25
    })

    setAttributes(Object.create(baseAttributes))

    //Derived Attributes
    const baseDerivedAttributes = Object.create(staticdata.DerivedAttributes)
    const racialMagickaMultiplier = race != '' && 'MagickaBonus' in staticdata.RacialBonuses[race] ? staticdata.RacialBonuses[race]['MagickaBonus'] : 0
    const birthsignMagickaMultiplier = birthsign != '' && 'MagickaBonus' in staticdata.Birthsigns[birthsign] ? staticdata.Birthsigns[birthsign]['MagickaBonus'] : 0

    baseDerivedAttributes['Health'] = (baseAttributes['Strength'] + baseAttributes['Endurance']) / 2
    baseDerivedAttributes['Magicka'] = baseAttributes['Intelligence'] * (1 + racialMagickaMultiplier + birthsignMagickaMultiplier)
    baseDerivedAttributes['Fatigue'] = baseAttributes['Strength'] + baseAttributes['Willpower'] + baseAttributes['Agility'] + baseAttributes['Endurance']
    baseDerivedAttributes['Encumbrance'] = baseAttributes['Strength'] * 5

    setDerivedAttributes(Object.create(baseDerivedAttributes))
  }
  function updateArray(array, setArray, value, index) {
    if (!Array.isArray(array)) return
    setArray(array.map((c, i) => { return i === index ? value : c }));
  }

  function drawMinorSkills() {
    const ddminor = []
    Array.from(Array(5).keys()).forEach((i) => {
      ddminor.push(
        <Dropdown
          name={i == 0 ? 'Minor Skills' : ''}
          categories={staticdata.SkillCategories}
          mutuallyExclusive={[majorSkills, minorSkills]}
          onChange={(e) => updateArray(minorSkills, setMinorSkills, e.target.value, i)}
        />
      )
    })
    return (
      <>
        {ddminor}
      </>
    )
  }

  function drawMajorSkills() {
    const ddmajor = []
    Array.from(Array(5).keys()).forEach((i) => {
      ddmajor.push(
        <Dropdown
          name={i == 0 ? 'Major Skills' : ''}
          categories={staticdata.SkillCategories}
          mutuallyExclusive={[majorSkills, minorSkills]}
          onChange={(e) => updateArray(majorSkills, setMajorSkills, e.target.value, i)}
        />
      )
    })
    return (
      <>
        {ddmajor}
      </>
    )
  }

  function drawFavoredAttributes() {
    const ddattributes = []
    Array.from(Array(2).keys()).forEach((i) => {
      ddattributes.push(
        <Dropdown
          name={i == 0 ? 'Favored Attributes' : ''}
          values={staticdata.BaseCharacter.Attributes}
          mutuallyExclusive={[favoredAttributes]}
          onChange={(e) => updateArray(favoredAttributes, setFavoredAttributes, e.target.value, i)}
        />
      )
    })
    return (
      <>
        {ddattributes}
      </>
    )
  }

  function drawStartingSpells() {
    const result = []
    const attributeModifier = attributes['Willpower'] / 5 + attributes['Luck'] / 10
    Object.entries(staticdata.StartingSpells).forEach(([k, v]) => {
      Object.entries(v).forEach(([k2, v2]) => {
        const baseSpellChance = skills[k] * 2 + attributeModifier
        if (baseSpellChance > v2.requiredScore) {
          result.push(
            <>
              <tr>
                <td>{k2}</td>
                <td>{baseSpellChance - v2.magickaCost}%</td>
              </tr>
            </>
          )
        }
      })
    })

    return (
      <table>
        {result}
      </table>
    )
  }

  function drawWeaponSandbox() {
    if (weapon == '' || weaponSkill == '') return
    return (<>
      Chance to hit: {((skills[weaponSkill] + (weapon.includes('Bound') ? 10 : 0)) + attributes['Agility'] / 5 + attributes['Luck'] / 10) * 1 + (birthsign == 'The Warrior' ? 10 : 0)}<br></br>
      Damage per hit: {weapon == '' ? '' : staticdata.Weapons[weaponSkill][weapon].maxDamage * (attributes['Strength'] + 50) / 100}<br></br><br></br>
    </>)

  }

  return (
    <>
      <div class="layout">
        
        <div class="Dropdown1">
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
          {drawFavoredAttributes()}
        </div>
        <div class="Dropdown2">
          {drawMajorSkills()}
        </div>
        <div class="Dropdown3">
          {drawMinorSkills()}
        </div>
        <div class="Dropdown4"></div>
        <div class="Dropdown5"></div>
        <CharacterStats
          sex={sex}
          race={race}
          birthsign={birthsign}
          specialization={specialization}
          favoredAttributes={favoredAttributes}
          skills={skills}
          attributes={attributes}
          derivedAttributes={derivedAttributes}
          majorSkills={majorSkills}
          minorSkills={minorSkills}
        />
        <div class="Stat5">
          <h1>Weapon Calculator</h1>
          <Dropdown
            name={'Weapon Skill'}
            values={staticdata.Weapons}
            onChange={(e) => setWeaponSkill(e.target.value)}
          />
          <Dropdown
            name={'Weapon'}
            categories={staticdata.WeaponCategories[weaponSkill] || ['']}
            onChange={(e) => setWeapon(e.target.value)}
          />
          {drawWeaponSandbox()}
          <h1>Starting Spells</h1>
          {drawStartingSpells()}
        </div>
        <br></br>
      </div>
    </>
  )
}

export default CharacterCreation