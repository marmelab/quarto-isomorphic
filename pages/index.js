import React from 'react';
import Link from 'next/link';
import Button from './ui/Button';
import Container from './ui/Container';

class HomeQuarto extends React.Component {
    render() {
        return (
            <Container>
                <div>
                    <img src="/static/boardTitle.jpg" alt="logo" />
                    <h2>Welcome to Quarto-isomorphic</h2>
                </div>
                <Link href="/game/Game">
                    <Button>Watch a game</Button>
                </Link>
            </Container>
        );
    }
}

export default HomeQuarto;
