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

  const dropdownGenerator = (name, item, categories = null) => {
    console.log(categories)
    const dropdown = [<option value=""></option>]
    if (!categories) {
      item = Array.isArray(item) ? item : Object.keys(item)
      item.forEach((x) => {
        dropdown.push(<option value={x}>{x}</option>)
      })
    } else {
      Object.keys(categories).forEach((category) => {
        var s = []
        categories[category] = Array.isArray(categories[category]) ? categories[category] : Object.keys(categories[category])
        console.log(categories)
        categories[category].forEach(x => {
          s.push(<option value={x}>{x}</option>)
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
      {dropdownGenerator(props.name, props.values, props.categories)}
    </>
  )
}

export default Dropdown