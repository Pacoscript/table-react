import React, { useState, useEffect } from 'react'
import './ScrollTable.css'
import exerciseUiTable from '../../assets/exerciceUITable.json'
import tableConfig from './config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileVideo } from '@fortawesome/free-solid-svg-icons'
import { formatMessage } from '../../languajeProvider'

const ScrollTable = (props) => {
  const [nextItem, setNextItem] = useState(0)
  const [rowsToShow, setRowsToShow] = useState()
  const [tableRows, setTableRows] = useState([])
  const [lastOrdination, setLastOrdination] = useState({
    key: undefined,
    type: undefined,
    order: 'asc',
  })
  const [dataSourceOrdered, setDataSourceOrdered] = useState()

  const { languageChanged, language } = props

  useEffect(() => {
    if (dataSourceOrdered === undefined) {
      const firstRenderInfo = exerciseUiTable.slice(0, 19)
      setRowsToShow(firstRenderInfo)
    } else {
      const firstRenderInfo = dataSourceOrdered.slice(0, nextItem)
      setRowsToShow(firstRenderInfo)
      setTableRows([])
    }
  }, [dataSourceOrdered])

  useEffect(() => {
    if (rowsToShow !== undefined) {
      const newTableRows = rowsToShow.map((rowElement, index) => {
        return (
          <tr key={`tr-${index + nextItem}`}>
            {tableConfig.columns.map((column, subindex) => {
              return (
                <td key={`tr-rowElement-${column.key}-${subindex + nextItem}`}>
                  {renderCell(rowElement, column.key, column.type)}
                </td>
              )
            })}
          </tr>
        )
      })
      setTableRows([...tableRows, newTableRows])
      setNextItem(nextItem + 20)
    }
  }, [rowsToShow])

  const handleMoreRowsToShow = () => {
    const moreRowsToShow = exerciseUiTable.slice(nextItem, nextItem + 20)
    setRowsToShow(moreRowsToShow)
  }

  const handleScroll = (e) => {
    let element = e.target
    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      console.log('me disparo')
      handleMoreRowsToShow()
    }
  }

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
    } else if (type === 'check') {
      return object[key] ? <FontAwesomeIcon icon={faFileVideo} /> : ''
    }
  }

  const handleOrderByColumn = (key, type) => {
    let order
    if (lastOrdination.key === key && lastOrdination.type === type) {
      setLastOrdination({
        key: key,
        type: type,
        order: lastOrdination.order === 'asc' ? 'desc' : 'asc',
      })
      order = lastOrdination.order === 'asc' ? 'desc' : 'asc'
    } else {
      setLastOrdination({ key: key, type: type, order: 'asc' })
      order = 'asc'
    }
    const orderedData = ordination(type, key, order)
    setDataSourceOrdered([...orderedData])
  }

  const ordination = (type, key, order) => {
    const tableDataOrdered = exerciseUiTable.sort(function (a, b) {
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
    return tableDataOrdered
  }

  const tableHeader = (
    <tr>
      {tableConfig.columns.map((column) => {
        return (
          <th key={`header-${column.name}`} className={`th-${column.name}`}>
            <button
              type="button"
              onClick={() => handleOrderByColumn(column.key, column.type)}
            >
              {formatMessage(column.name, language)}
            </button>
          </th>
        )
      })}
    </tr>
  )

  return (
    <>
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
      <div className="infinite-list" onScroll={handleScroll}>
        <table>
          <thead>{tableHeader}</thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </>
  )
}

export default ScrollTable
