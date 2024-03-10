// import staticdata from '../data/static_data.json'

const Dropdown = (props) => {
  var lastOption = ''

  function handleChange(e) {
    if (props.mutuallyExclusive) {
      const isDupe = props.mutuallyExclusive.filter((item) => item.includes(e.target.value)).length > 0
      e.target.value = isDupe ? lastOption : e.target.value
    } else {
      lastOption = e.target.value
    }
    return props.onChange(e)
  }

  const dropdownGenerator = (name, object, skillCategories = null) => {
    const dropdown = [<option value=""></option>]

    if (!skillCategories) {
      object = Array.isArray(object) ? object : Object.keys(object)
      object.forEach((o1) => {
        dropdown.push(<option value={o1}>{o1}</option>)
      })
    } else {
      Object.keys(skillCategories).forEach((category) => {
        var s = []
        skillCategories[category].forEach(skill => {
          s.push(<option value={skill}>{skill}</option>)
        })
        dropdown.push(<optgroup label={category}>{s}</optgroup>)
      })
    }

    return (
      <>
        <div class={"dd-" + name}>
          <label>{name}</label>
          <br></br>
          <select id={name} onChange={(e) => handleChange(e)}>{dropdown}</select>
        </div >
      </>
    )
  }

  return (
    <>
      {dropdownGenerator(props.name, props.values, props.skillCategories)}
    </>
  )
}

export default Dropdown