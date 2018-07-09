import React from 'react';
import Link from 'next/link';
import { bodyStyle } from './styles/GlobalStyles';
import { StyledButton } from './globalComponents/StyledButton';

class HomeQuarto extends React.Component {
    render() {
        return (
            <div className={bodyStyle}>
                <div>
                    <img src="/static/boardTitle.jpg" alt="logo" />
                    <h2>Welcome to Quarto-isomorphic</h2>
                </div>
                <Link href="/game/Game">
                    <StyledButton>Watch a game</StyledButton>
                </Link>
            </div>
        );
    }
}

export default HomeQuarto;
