import React from 'react';
import Grid from './Grid';
import Link from 'next/link';
import { bodyStyle } from '../styles/GlobalStyles';
import { StyledButton } from '../globalComponents/StyledButton';

class Game extends React.Component {
    render() {
        return (
            <div className={bodyStyle}>
                <div>
                    <h2>This is a game</h2>
                </div>
                <Grid />
                <Link href="/">
                    <StyledButton>Back to home</StyledButton>
                </Link>
            </div>
        );
    }
}

export default Game;
