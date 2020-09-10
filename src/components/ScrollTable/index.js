import React, { useState, useEffect } from 'react'
import './ScrollTable.css'
import exerciseUiTable from '../../assets/exerciceUITable.json'
import tableConfig from './config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileVideo } from '@fortawesome/free-solid-svg-icons'
import { formatMessage } from '../../languageProvider'
import Controls from './components/controls'
import TableHeader from './components/tableHeader'

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
  const [dataSourceGrouped, setDataSourceGrouped] = useState()
  const [showGroupedElementsClicked, setShowGroupedElementsClicked] = useState(
    false
  )
  const [hideGroupedElementsClicked, setHideGroupedElementsClicked] = useState(
    false
  )
  const [scrollBlocked, setScrollBlocked] = useState(false)

  const { languageChanged, language } = props

  useEffect(() => {
    if (dataSourceOrdered !== undefined) {
      const firstRenderInfo = dataSourceOrdered.slice(0, 19)
      setRowsToShow(firstRenderInfo)
      setTableRows([])
    }
    if (dataSourceGrouped !== undefined) {
      const firstRederInfo = dataSourceGrouped.slice(0, 19)
      setRowsToShow(firstRederInfo)
      setTableRows([])
    } else {
      const firstRenderInfo = exerciseUiTable.slice(0, 19)
      setRowsToShow(firstRenderInfo)
    }
  }, [dataSourceOrdered, dataSourceGrouped])

  useEffect(() => {
    if (rowsToShow !== undefined && rowsToShow[0].groupName === undefined) {
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
    } else if (rowsToShow !== undefined) {
      const newTableRows = rowsToShow.map((rowElement, index) => {
        if (rowElement.groupName !== undefined) {
          return (
            <tr key={`tr-grouped-${index + nextItem}`}>
              <td>{rowElement.groupName}</td>
              <td>{'quantity: ' + rowElement.numberOfElements}</td>
              <td>
                <button onClick={() => showGroupedRows(rowElement.groupName)}>
                  +
                </button>
              </td>
            </tr>
          )
        } else {
          return rowElement
        }
      })
      if (showGroupedElementsClicked) {
        setTableRows([newTableRows])
        setShowGroupedElementsClicked(false)
        setScrollBlocked(false)
      } else if (hideGroupedElementsClicked) {
        setTableRows([newTableRows])
        setHideGroupedElementsClicked(false)
        setNextItem(0)
      } else {
        setTableRows([...tableRows, newTableRows])
        setNextItem(nextItem + 20)
      }
    }
  }, [rowsToShow])

  const handleMoreRowsToShow = () => {
    if (!dataSourceGrouped) {
      const moreRowsToShow = exerciseUiTable.slice(nextItem, nextItem + 20)
      setRowsToShow(moreRowsToShow)
    } else {
      const moreRowsToShow = dataSourceGrouped.slice(nextItem, nextItem + 20)
      setRowsToShow(moreRowsToShow)
    }
  }

  const handleScroll = (e) => {
    let element = e.target
    if (element.scrollTop + element.clientHeight >= element.scrollHeight && !scrollBlocked) {
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
    setNextItem(0)
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

  const handleGroupChanged = (event) => {
    const groupBy = event.target.value
    const order = 'asc'
    const type = tableConfig.columns.filter((column) => column.name === groupBy)
      .type
    const orderedData = ordination(type, groupBy, order)
    const alreadygrouped = []
    let groupedData = []
    orderedData.forEach((row) => {
      if (
        !alreadygrouped.some(
          (alreadyGroupedBy) => alreadyGroupedBy === row[groupBy]
        )
      ) {
        alreadygrouped.push(row[groupBy])
        const filtered = orderedData.filter(
          (element) => element[groupBy] === row[groupBy]
        )
        groupedData = [
          ...groupedData,
          {
            groupName: row[groupBy],
            numberOfElements: filtered.length,
            rows: [...filtered],
          },
        ]
      }
    })
    setDataSourceOrdered()
    setDataSourceGrouped([...groupedData])
    setNextItem(0)
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

  const showGroupedRows = (groupedBy) => {
    const indexOfGroupedBy = rowsToShow.findIndex(
      (element) => element.groupName === groupedBy
    )
    if (!rowsToShow[indexOfGroupedBy + 1].props) {
      const newTableRows = rowsToShow[indexOfGroupedBy].rows.map(
        (rowElement, index) => {
          return (
            <tr key={`tr-groupItem-${groupedBy}-${index}`}>
              {tableConfig.columns.map((column, subindex) => {
                return (
                  <td
                    key={`tr-rowElement-${groupedBy}-${column.key}-${subindex}`}
                  >
                    {renderCell(rowElement, column.key, column.type)}
                  </td>
                )
              })}
            </tr>
          )
        }
      )
      const dataSource = [...dataSourceGrouped].slice(0, nextItem + 20)
      dataSource.splice(indexOfGroupedBy + nextItem + 1, 0, ...newTableRows)
      setScrollBlocked(true)
      setRowsToShow([...dataSource])
      setShowGroupedElementsClicked(true)
    } else {
      const dataSource = [...dataSourceGrouped].slice(0, 19)
      setRowsToShow([...dataSource])
      setHideGroupedElementsClicked(true)
    }
  }

  return (
    <>
      <Controls
        language={language}
        handleLanguageChanged={handleLanguageChanged}
        formatMessage={formatMessage}
        handleGroupChanged={handleGroupChanged}
        tableConfig={tableConfig}
      />
      <div className="infinite-list" onScroll={handleScroll}>
        <table>
          <TableHeader
            tableConfig={tableConfig}
            handleOrderByColumn={handleOrderByColumn}
            formatMessage={formatMessage}
            language={language}
          />
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </>
  )
}

export default ScrollTable
