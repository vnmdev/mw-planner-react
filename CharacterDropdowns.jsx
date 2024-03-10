// import { useState } from "react";
// import staticdata from '../../data/static_data.json'
// import CharacterStats from "./CharacterStats";
// import Dropdown from "./Dropdown";

// const CharacterDropdowns = (race, sex, birthsign, specialization, favoredAttribute1, favoredAttribute2, majorSkills, minorSkills) => {


//   function updateArray(array, setArray, value, index) {
//     if (!Array.isArray(array)) return
//     setArray(array.map((c, i) => { return i === index ? value : c }));
//   }

//   const drawSkillDropdowns = () => {
//     const majorDropdowns = []
//     const minorDropdowns = []
//     const dropdowntemplate = [
//       <option value=""></option>
//     ]
//     Object.keys(staticdata.SkillCategories).forEach((category) => {
//       var s = []
//       staticdata.SkillCategories[category].forEach(skill => {
//         s.push(<option value={skill}>{skill}</option>)
//       })
//       dropdowntemplate.push(<optgroup label={category}>{s}</optgroup>)
//     })

//     Array.from(Array(10).keys()).forEach((i) => {
//       const skillType = i < 5 ? ['major', majorDropdowns, majorSkills, setMajorSkills] : ['minor', minorDropdowns, minorSkills, setMinorSkills]
//       const n = i < 5 ? i : i - 5
//       skillType[1].push(
//         <>
//           <br></br>
//           <select id={skillType[0] + "-skill-" + (n + 1)} onChange={e => updateArray(skillType[2], skillType[3], e.target.value, n)}>
//             ${dropdowntemplate}
//           </select>
//         </>
//       )
//     })

//     return (
//       <>
//         <div class="dd-maj">
//           <label>Major Skills</label>
//           {majorDropdowns}
//         </div>
//         <div class="dd-min">
//           <label>Minor Skills</label>
//           {minorDropdowns}
//         </div>
//       </>
//     )
//   }


//   const dropdownGenerator = (name, update, object1, arrayGet = null, arrayPosition = null) => {
//     const dropdown = [<option value=""></option>]
//     if (!Array.isArray(object1)) object1 = Object.keys(object1)
//     object1.forEach((o1) => {
//       dropdown.push(<option value={o1}>{o1}</option>)
//     })
//     return (
//       <>
//         <div class={"dd-" + name}>
//           <label>{name}</label>
//           <br></br>
//           {arrayPosition && arrayGet
//             ? <select id={name} onChange={e => updateArray(arrayGet, update, e.target.value, arrayPosition)}>{dropdown}</select>
//             : <select id={name} onChange={e => update(e.target.value)}>{dropdown}</select>
//           }


//         </div >
//       </>
//     )
//   }

//   return (
//     <>
//       <div class="dd">

//        {dropdownGenerator('Sex', setSex, staticdata.RacialBonuses.Argonian.Attributes)}
//         {dropdownGenerator('Race', setRace, staticdata.RacialBonuses)}
//         {dropdownGenerator('Birthsign', setBirthsign, staticdata.Birthsigns)}
//         {dropdownGenerator('Specialization', setSpecialization, staticdata.SkillCategories)}
//         {dropdownGenerator('FavoredAttribute1', setFavoredAttribute1, staticdata.BaseCharacter.Attributes)}
//         {dropdownGenerator('FavoredAttribute2', setFavoredAttribute2, staticdata.BaseCharacter.Attributes)} 
//         {drawSkillDropdowns()}
//       </div>
//     </>
//   )
// }

// export default CharacterDropdowns