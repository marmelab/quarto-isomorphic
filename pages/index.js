import React from 'react';
import Link from 'next/link'
import styled, { css } from 'react-emotion'

class HomeQuarto extends React.Component {
  render() {
    return (
      <div className={myStyle}>
        <div>
          <img src='/static/boardTitle.jpg' alt="logo" />
          <h2>Welcome to Quarto-isomorphic</h2>
        </div>
        <p className="Home-intro">
          For now, you can't do nothing, but you should watch games soon
        </p>

        Click{' '}
    <Link href="/Game">
      <a>here</a>
    </Link>{' '}
    to read more
      </div>
    );
  }
}

const myStyle = css`
  color: darkblue;
`

export default HomeQuarto;


