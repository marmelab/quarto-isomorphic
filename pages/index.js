import React from 'react';
import Link from 'next/link'
import injectSheet from 'react-jss'

class HomeQuarto extends React.Component {
  render() {
    return (
      <div className={classes.myButton}>
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

//const StyledButton = injectSheet(styles)(Button)

const styles = {
  myButton: {
    color: 'green',
    margin: {
      // jss-expand gives more readable syntax
      top: 5, // jss-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: '1rem'
    },
    '& span': {
      // jss-nested applies this to a child span
      fontWeight: 'bold' // jss-camel-case turns this into 'font-weight'
    }
  },
  myLabel: {
    fontStyle: 'italic'
  }
}

export default injectSheet(styles)(HomeQuarto);
