import React from 'react';
import Grid from './Grid';
import Link from 'next/link';
import Button from '../ui/Button';
import Container from '../ui/Container';

class Game extends React.Component {
    render() {
        return (
            <Container>
                <div>
                    <h2>This is a game</h2>
                </div>
                <Grid />
                <Link href="/">
                    <Button>Back to home</Button>
                </Link>
            </Container>
        );
    }
}

export default Game;
