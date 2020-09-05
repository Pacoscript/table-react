import React from 'react'
import tableConfig from './config'
import exerciseUiTable from '../../assets/exerciceUITable.json'
import './Home.css'

const Home = () => {
  const tableHeader = (
    <tr>
      {tableConfig.columns.map((column) => {
        return <th>{column.name}</th>
      })}
    </tr>
  )
  const tableRows = () => {
    return exerciseUiTable.map((rowElement) => {
      return (
        <tr>
          {tableConfig.columns.map((column) => {
            return <td>{rowElement[column.key]}</td>
          })}
        </tr>
      )
    })
  }
  console.log(exerciseUiTable)

  return (
    <table>
      {tableHeader}
      {tableRows()}
    </table>
  )
}

export default Home
