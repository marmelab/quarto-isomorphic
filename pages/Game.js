import React from 'react';
import Grid from '../src/game/Grid';
import RemainingList from '../src/game/RemainingList';
import Link from 'next/link';
import Button from '../src/ui/Button';
import Container from '../src/ui/Container';
import config from '../config/config.dist';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

const Game = props => (
    <Container>
        {props.game.grid ? (
            <div>
                <span>{props.game.idGame}</span>
                <Grid
                    grid={props.game.grid}
                    goodPlaces={props.game.winningPlaces}
                    winningLine={props.game.winningLine}
                    readOnly={props.game.locked}
                    activeZone={props.game.selectedPiece > 0}
                />
                {props.game.locked &&
                    !props.game.closed &&
                    !props.game.watch_only && (
                        <span>Wait for your own turn</span>
                    )}
                {props.game.closed && (
                    <div>
                        <div />
                        <span>End of game</span>
                    </div>
                )}
                <span>Do something</span>
                <RemainingList />
            </div>
        ) : (
            props.loaded || (
                <div>
                    <span>Game not found !</span>
                    <span>Go choose another</span>
                </div>
            )
        )}
        <Link href="/">
            <Button>Back to home</Button>
        </Link>
    </Container>
);

Game.propTypes = {
    game: PropTypes.object.isRequired,
    loaded: PropTypes.bool,
};

Game.getInitialProps = async function() {
    let url = `http://${config.apiUrl}/479`;

    const res = await fetch(url);
    const data = await res.json();

    return {
        game: data,
        loaded: data.grid ? true : false,
    };
};

export default Game;
