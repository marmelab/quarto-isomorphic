import React, { Component } from 'react';
import Grid from '../src/game/Grid';
import RemainingList from '../src/game/RemainingList';
import ActionText from '../src/game/ActionText';
import Link from 'next/link';
import Button from '../src/ui/Button';
import Container from '../src/ui/Container';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import styled from 'react-emotion';
import { getGame } from '../src/services/gameService';

const BoardContainer = styled('div')`
    height: 500px;
    display: flex;
    flex-direction: column;
    text-align: center;
`;

class Game extends Component {
    state = {
        game: {},
        loaded: false,
    };

    static propTypes = {
        game: PropTypes.object.isRequired,
        loaded: PropTypes.bool,
    };

    static async getInitialProps() {
        const game = await getGame(547);
        return {
            game: game,
            loaded: !!game.grid,
        };
    }

    componentDidMount = async () => {
        this.setState(this.props);
        this.socket = io();
        this.socket.on(`game${this.props.game.idGame}`, this.handleGame);
        this.socket.emit('listenGame', { id: this.props.game.idGame });
    };

    componentWillUnmount = async () => {
        this.socket.off(`game${this.props.game.idGame}`, this.handleGame);
        this.socket.close();
    };

    handleGame = game => {
        this.setState({ game });
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
                            watchOnly={!!game.watch_only}
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
