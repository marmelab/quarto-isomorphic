import React from 'react';
import Grid from '../src/game/Grid';
import RemainingList from '../src/game/RemainingList';
import ActionText from '../src/game/ActionText';
import Link from 'next/link';
import Button from '../src/ui/Button';
import Container from '../src/ui/Container';
import config from '../config/config.dist';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import io from 'socket.io-client';
import styled from 'react-emotion';

const BoardContainer = styled('div')`
    height: 500px;
`;

class Game extends React.Component {
    state = {
        game: {},
        loaded: false,
    };

    static propTypes = {
        game: PropTypes.object.isRequired,
        loaded: PropTypes.bool,
    };

    static async getInitialProps() {
        let url = `http://${config.apiUrl}/479`;

        const res = await fetch(url);
        const data = await res.json();

        return {
            game: data,
            loaded: data.grid ? true : false,
        };
    }

    componentDidMount = async () => {
        this.setState(this.props);
        this.socket = io();
        this.socket.on('game', this.handleGame);
    };

    componentWillUnmount = async () => {
        this.socket.off('game', this.handleGame);
        this.socket.close();
    };

    handleGame = game => {
        this.setState({ game: JSON.parse(game) });
    };

    render() {
        const { game, loaded } = this.state;
        return (
            <Container>
                {game.grid ? (
                    <BoardContainer>
                        <span>{game.idGame}</span>
                        <Grid
                            grid={game.grid}
                            goodPlaces={game.winningPlaces}
                            winningLine={game.winningLine}
                            readOnly={game.locked}
                            activeZone={game.selectedPiece > 0}
                        />
                        <ActionText
                            closed={game.closed}
                            locked={game.locked}
                            selectedPiece={game.selectedPiece}
                            watchOnly={game.watch_only}
                        />
                        <RemainingList
                            list={game.allPieces}
                            selectedPiece={game.selectedPiece}
                            badPieces={
                                game.winningLine.length == 0 &&
                                game.selectedPiece == 0
                                    ? game.winningPieces
                                    : []
                            }
                            readOnly={game.locked}
                            activeZone={game.selectedPiece === 0}
                        />
                    </BoardContainer>
                ) : (
                    loaded || (
                        <BoardContainer>
                            <span>Game not found !</span>
                            <span>Go choose another</span>
                        </BoardContainer>
                    )
                )}
                <Link href="/">
                    <Button>Back to home</Button>
                </Link>
            </Container>
        );
    }
}

export default Game;
