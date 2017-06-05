import React, { Component } from 'react'

class LinkItem extends Component {
  render () {
    const { url, shortLink, visits, createdAt } = this.props
    const date = new Date(createdAt).toDateString()
    return (
      <div>
        <p>Created at: {date}</p>
        <p>Url: {url}</p>
        <p>Short link: <a href={`http://localhost:8080/${shortLink}`}>{`http://localhost:8080/${shortLink}`}</a></p>
        <p>Visits: {visits}</p>
      </div>
    )
  }
}

export default LinkItem
