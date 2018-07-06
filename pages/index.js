import React from 'react';
import Link from 'next/link'
//import '../styles.less';

class HomeQuarto extends React.Component {
  render() {
    return (
      <div className="Home">
        <div>
          <img src='/static/boardTitle.jpg' alt="logo" />
          <h2>Welcome to Quarto-isomorphic</h2>
        </div>
        <p className="Home-intro">
          For now, you can do nothing, but you should watch games soon
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

export default HomeQuarto;
