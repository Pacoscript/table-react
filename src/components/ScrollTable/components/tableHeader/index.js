import React from 'react'

const TableHeader = (props) => {
  const { tableConfig, handleOrderByColumn, formatMessage, language } = props
  const tableHeader = (
    <tr>
      {tableConfig.columns.map((column) => {
        return (
          <th
            key={`header-${column.name}`}
            className={`th-${column.name}`}
            onClick={() => handleOrderByColumn(column.key, column.type)}
          >
            <label>{formatMessage(column.name, language)}</label>
          </th>
        )
      })}
    </tr>
  )
  return <thead>{tableHeader}</thead>
}

export default TableHeader
