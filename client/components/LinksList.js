import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { deleteLink } from '../actions/link'

class LinksList extends Component {
  renderDeleteCell (shortlink) {
    return (
      <button onClick={() => this.props.deleteLink(shortlink)}>Delete</button>
    )
  }

  render () {
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
    }, {
      Header: 'Visits',
      accessor: 'visits',
      filterMethod: (filter, row) => row[filter.id].toString() === filter.value
    }, {
      Header: 'Delete',
      filterable: false,
      sortable: false,
      maxWidth: 100,
      Cell: d => this.renderDeleteCell(d.row.shortlink)
    }]

    return (
      <ReactTable
        className='-striped -highlight'
        filterable
        resizable
        data={this.props.links}
        columns={columns}
        defaultSorted={[{ id: 'createdat', desc: true }]}
      />
    )
  }
}

const mapStateToProps = state => {
  return { links: state.links }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteLink: shortlink => dispatch(deleteLink(shortlink))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinksList)
