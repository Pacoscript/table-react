import React from 'react'

const Controls = (props) => {
  const {
    language,
    handleLanguageChanged,
    formatMessage,
    handleGroupChanged,
    tableConfig,
  } = props
  const groupSelection = (
    <>
      <label>{formatMessage('groupSelection', language)}</label>
      <select name="groups" id="groups" onChange={handleGroupChanged}>
        <option value={'nogroup'}>select a group...</option>
        {tableConfig.columns.map((column) => {
          if (column.name !== 'hour' && column.name !== 'date') {
            return (
              <option value={column.name} key={`groupOption-${column.name}`}>
                {formatMessage(column.name, language)}
              </option>
            )
          }
        })}
      </select>
    </>
  )

  return (
    <div className="controls">
      <div className="controls-languaje">
        <label>{formatMessage('languageSelection', language)}</label>
        <select
          name="languages"
          id="languages"
          onChange={handleLanguageChanged}
          defaultValue={'spanish'}
        >
          <option value={'spanish'}>Spanish</option>
          <option value={'english'}>English</option>
        </select>
      </div>
      <div className="controls-group">{groupSelection}</div>
    </div>
  )
}

export default Controls
