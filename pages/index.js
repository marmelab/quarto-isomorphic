import React from 'react';
import Link from 'next/link';
import Button from '../src/ui/Button';
import Container from '../src/ui/Container';

const HomeQuarto = () => (
    <Container>
        <div>
            <img src="/static/boardTitle.jpg" alt="logo" />
            <h2>Welcome to Quarto-isomorphic</h2>
        </div>
        <Link href="/Game">
            <Button>Watch a game</Button>
        </Link>
    </Container>
);

export default HomeQuarto;
