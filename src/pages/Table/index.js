import React, { useState, useEffect } from 'react'
import tableConfig from './config'
import exerciseUiTable from '../../assets/exerciceUITable.json'
import { formatMessage } from '../../languajeProvider'
import './Table.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileVideo } from '@fortawesome/free-solid-svg-icons'

const Table = (props) => {
  const [dataSource, setDataSource] = useState([])
  const [tableRows, setTableRows] = useState()
  const [lastOrdination, setLastOrdination] = useState({key: undefined, type: undefined, order: 'asc'})

  const { languageChanged, language } = props

  const handleLanguageChanged = (event) => {
    languageChanged(event.target.value)
  }

  useEffect (()=>{
    setDataSource(exerciseUiTable)
  },[])

  useEffect(() => {
    if(dataSource !== undefined){
      const rows = dataSource.map((rowElement, index) => {
        return (
          <tr key={`tr-${index}`}>
            {tableConfig.columns.map((column, index) => {
              return (
                <td key={`tr-rowElement-${column.key}-${index}`}>
                  {renderCell(rowElement, column.key, column.type)}
                </td>
              )
            })}
          </tr>
        )
      })
      setTableRows(rows)
    }
  },[dataSource])

  const handleOrderByColumn = (key, type) => {
    let order
    if(lastOrdination.key === key && lastOrdination.type === type) {
      setLastOrdination({ key: key, type: type, order: lastOrdination.order === 'asc' ? 'desc': 'asc'})
      order = lastOrdination.order === 'asc' ? 'desc': 'asc'
    } else {
      setLastOrdination({ key: key, type: type, order: 'asc'})
      order = 'asc'
    }
    const tableDataOrdered = dataSource.sort(function (a, b) {
      const aElement = type !== 'hour' ? a[key] : a[key].split(' ')[1]
      const bElement = type !== 'hour' ? b[key] : b[key].split(' ')[1]
      if (aElement > bElement) {
        return order === 'asc' ? 1 : -1
      }
      if (aElement < bElement) {
        return order === 'asc' ? -1 : 1
      }
      return 0
    })
    const rows = tableDataOrdered.map((rowElement, index) => {
      return (
        <tr key={`tr-${index}`}>
          {tableConfig.columns.map((column, index) => {
            return (
              <td key={`tr-rowElement-${column.key}-${index}`}>
                {renderCell(rowElement, column.key, column.type)}
              </td>
            )
          })}
        </tr>
      )
    })
    setTableRows(rows)
  }

  const renderCell = (object, key, type) => {
    if (type === 'text') {
      return object[key]
    } else if (type === 'hour') {
      return object[key].split(' ')[1]
    } else if (type === 'date') {
      return object[key].split(' ')[0]
    } else if (type === 'check') {
      return object[key] ? <FontAwesomeIcon icon={faFileVideo} /> : ''
    }
  }
  const tableHeader = (
    <tr>
      {tableConfig.columns.map((column) => {
        return (
          <th
            key={`header-${column.name}`}
            onClick={() => handleOrderByColumn(column.key, column.type)}
          >
            {formatMessage(column.name, language)}
          </th>
        )
      })}
    </tr>
  )

  return (
    <>
      <i className="fas fa-camera"></i>
      <label>{formatMessage('languageSelection', language)}</label>
      <select
        name="languajes"
        id="languajes"
        onChange={handleLanguageChanged}
        defaultValue={'spanish'}
      >
        <option value={'spanish'}>Spanish</option>
        <option value={'english'}>English</option>
      </select>
      <table>
        <tbody>
          {tableHeader}
          {tableRows}
        </tbody>
      </table>
    </>
  )
}

export default Table
