const Grid = () => {
  const data = {
    level: 2,
    major: {
      names: ['Heavy Armor', 'Block', 'Long Blade', 'Athletics', 'Acrobatics'],
      values: [
        [40, 35, 50, 40, 30],
        [40, 35, 60, 40, 30],
      ]
    },
    minor: {
      names: ['Armorer', 'Restoration', 'Mysticism', 'Sneak', 'Marksman'],
      values: [
        [20, 15, 15, 15, 15],
        [20, 15, 15, 15, 15],
      ]
    },
    misc: {
      names: [
        'Alchemy', 'Alteration', 'Axe', 'Blunt Weapon', 'Conjuration', 'Destruction', 'Enchant', 'Hand-to-hand', 'Illusion',
        'Light Armor', 'Medium Armor', 'Mercantile', 'Security', 'Short Blade', 'Spear', 'Speechcraft', 'Unarmored'
      ],
      values: [
        [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5, 15, 5, 5, 5, 5, 5, 5, 5, 5, 15],
      ]
    }
  }

  const generateCSS = (data) => {
    const level = data.level
    var extraColumnStyles = ""
    var gridTemplateAreas = [
      'corner',
      'major',
      'minor',
      'misc'
    ]

    for (var i = 0; i < level; i++) {
      gridTemplateAreas[0] += ` h${i + 1}`
      gridTemplateAreas[1] += ` maj${i + 1}`
      gridTemplateAreas[2] += ` min${i + 1}`
      gridTemplateAreas[3] += ` mis${i + 1}`
      extraColumnStyles += `
            .grid-h${i + 1} {
                grid-area: h${i + 1};
                color:black;
            }
            .grid-maj${i + 1} {
                grid-area: maj${i + 1};
                color:black;
            }
            .grid-min${i + 1} {
                grid-area: min${i + 1};
                color: black;
            }
            .grid-mis${i + 1} {
                grid-area: mis${i + 1};
                color: black;
            }
            `
    }

    var result = `
            .grid-container {
                background-color: white;
                border: 1px solid black;
                display: grid;
                grid-template-columns: 10%;
                grid-template-areas: 
                    '${gridTemplateAreas[0]}'
                    '${gridTemplateAreas[1]}'
                    '${gridTemplateAreas[2]}'
                    '${gridTemplateAreas[3]}';
                justify-content: start;
            }
            .grid-item {
                background-color: white;
                border: 1px solid black;
                padding: 5px;
                font-size: 12px;
                font-style: oblique;
                text-align: center;
            }
            .grid-corner {
                grid-area: corner;
                color:white;
            }
            .grid-major {
                grid-area: major;
                color:black;
            }
            .grid-minor {
                grid-area: minor;
                color: black;
            }
            .grid-misc {
                grid-area: misc;
                color: black;
            }
            ${extraColumnStyles}
        `
    return <style>{result}</style>
  }

  const drawSidebar = (data) => {
    return (
      <>
        <div class="grid-corner">
          <div class="grid-item">.</div>
        </div>
        <div class="grid-major">
          {data.major.names.map((name) => {
            return <div class="grid-item"><b>{name}</b></div>
          })}
        </div>
        <div class="grid-minor">
          {data.minor.names.map((name) => {
            return <div class="grid-item"><b>{name}</b></div>
          })}
        </div>
        <div class="grid-misc">
          {data.misc.names.map((name) => {
            return <div class="grid-item"><b>{name}</b></div>
          })}
        </div>
      </>
    )
  }

  const drawGrid = (data) => {
    var result = []
    result.push(drawSidebar(data))
    for (var i = 0; i < data.level; i++) {
      result.push(
        <>
          <div class={"grid-h" + (i + 1)}>
            <div class="grid-item">Level {i + 1}</div>
          </div>
          <div class={"grid-maj" + (i + 1)}>
            {data.major.values[i].map((lvl) => {
              return <div class="grid-item">
                {/* <button class="button">-</button>  */}
                <b>{lvl}</b>
                {/* <button class="button">+</button>  */}
              </div>
            })}
          </div>
          <div class={"grid-min" + (i + 1)}>
            {data.minor.values[i].map((lvl) => {
              return <div class="grid-item"><b>{lvl}</b></div>
            })}
          </div>
          <div class={"grid-mis" + (i + 1)}>
            {data.misc.values[i].map((lvl) => {
              return <div class="grid-item"><b>{lvl}</b></div>
            })}
          </div>
        </>
      )
    }
    return <div class="grid-container">{result}</div>
  }

  return (
    <>
      {generateCSS(data)}
      {drawGrid(data)}
    </>
  );
}

export default Grid