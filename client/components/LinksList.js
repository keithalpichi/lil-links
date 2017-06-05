import React from 'react'
import LinkItem from './LinkItem'

export default ({ links }) => (
  <div>
    {links.map(link => <LinkItem {...link} key={link.shortLink} />)}
  </div>
)
