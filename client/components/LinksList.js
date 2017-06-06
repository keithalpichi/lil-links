import React from 'react'
import ReactTable from 'react-table'

// const dateSearch = (filter, date) => {
//   // (filter, row) => row[filter.id].includes(filter.value)
// }

const columns = [{
  Header: 'Lil\' Link',
  accessor: 'shortlink',
  filterMethod: (filter, row) => row[filter.id].includes(filter.value)
}, {
  Header: 'Original URL',
  accessor: 'url',
  filterMethod: (filter, row) => row[filter.id].includes(filter.value)
}, {
  Header: 'Created',
  accessor: 'createdat',
  Cell: d => <span>{new Date(d.value).toDateString()}</span>,
  filterable: false
  // filterMethod: dateSearch()
}, {
  Header: 'Visits',
  accessor: 'visits',
  filterMethod: (filter, row) => row[filter.id].toString() === filter.value
}]

export default ({ links }) => (
  <ReactTable
    className='-striped -highlight'
    filterable
    resizable
    data={links}
    columns={columns}
    defaultSorted={[{ id: 'createdat', desc: true }]}
  />
)
