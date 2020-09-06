import React from 'react'
import tableConfig from './config'
import exerciseUiTable from '../../assets/exerciceUITable.json'
import { formatMessage } from '../../languajeProvider'
import './Table.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileVideo } from '@fortawesome/free-solid-svg-icons'

const Table = (props) => {
  const { languageChanged, language } = props

  const handleLanguageChanged = (event) => {
    languageChanged(event.target.value)
  }

  const renderCell = (object, key, type) => {
    if (type === 'text') {
      return object[key]
    } else if (type === 'hour') {
      return object[key].split(' ')[1]
    } else if (type === 'date') {
      return object[key].split(' ')[0]
    } else if (type === 'check'){
      return object[key] ? <FontAwesomeIcon icon={faFileVideo} /> : ''
    }
  }

  const tableHeader = (
    <tr>
      {tableConfig.columns.map((column) => {
        return (
          <th key={`header-${column.name}`}>
            {formatMessage(column.name, language)}
          </th>
        )
      })}
    </tr>
  )
  const tableRows = () => {
    return exerciseUiTable.map((rowElement, index) => {
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
  }

  return (
    <>
      <i class="fas fa-camera"></i>
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
          {tableRows()}
        </tbody>
      </table>
    </>
  )
}

export default Table
