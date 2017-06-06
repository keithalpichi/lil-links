import React, { Component } from 'react'
const mainUrl = process.env.URL || `http://localhost:8080/`

class LinkItem extends Component {
  render () {
    const { url, shortlink, visits, createdat } = this.props
    const date = new Date(createdat).toDateString()
    return (
      <div>
        <p>Created at: {date}</p>
        <p>Url: {url}</p>
        <p>Short link: <a href={`${mainUrl}${shortlink}`}>{`${mainUrl}${shortlink}`}</a></p>
        <p>Visits: {visits}</p>
      </div>
    )
  }
}

export default LinkItem
