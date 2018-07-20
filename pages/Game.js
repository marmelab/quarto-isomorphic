import React, { Component } from 'react';
import Grid from '../src/game/Grid';
import RemainingList from '../src/game/RemainingList';
import ActionText from '../src/game/ActionText';
import PlayersText from '../src/game/PlayersText';
import Link from 'next/link';
import Button from '../src/ui/Button';
import ButtonContainer from '../src/ui/ButtonContainer';
import Container from '../src/ui/Container';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import styled from 'react-emotion';
import { newGame, getGame } from '../src/services/gameService';
import LoadingZone from '../src/ui/LoadingZone';
import { storeGameToken } from '../src/services/storageService';

const BoardContainer = styled('div')`
    height: 500px;
    display: flex;
    flex-direction: column;
    text-align: center;
`;

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    state = {
        game: {},
        loaded: false,
    };

    static async getInitialProps(props) {
        const { query } = props;
        let { game, token } =
            query && query.idGame
                ? await getGame(
                      query.idGame,
                      query.token,
                      JSON.parse(query.register),
                      query.avatar,
                  )
                : await newGame(
                      JSON.parse(query.solo) ? 1 : 2,
                      query ? query.avatar : null,
                  );

        return {
            idGame: game.idGame,
            game: game,
            token: token || query.token,
            loaded: !!game.grid,
        };
    }

    componentDidMount = async () => {
        this.setState(this.props);
        const { idGame, token } = this.props;

        storeGameToken(idGame, token);
        this.socket = io();
        this.socket.on(`game${idGame}`, this.handleGame);
        this.socket.emit('listenGame', {
            id: idGame,
            token: token,
        });
    };

    componentWillUnmount = async () => {
        this.socket.off(`game${this.props.game.idGame}`, this.handleGame);
        this.socket.close();
    };

    handleGame = game => {
        this.setState({ game });
    };

    render() {
        const { idGame, token, game, loaded } = this.state;
        return (
            <Container>
                <LoadingZone loaded={loaded}>
                    {game.grid ? (
                        <BoardContainer>
                            <span>{idGame}</span>
                            <Grid
                                idGame={idGame}
                                token={token}
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
                            <PlayersText
                                closed={game.closed}
                                youWon={!!game.you_won}
                                winnerId={game.winner_id}
                                watchOnly={!!game.watch_only}
                                avatarWinner={game.winnerName}
                                avatarPlayerOne={game.playerOneName}
                                avatarPlayerTwo={game.playerTwoName}
                            />
                            <RemainingList
                                idGame={idGame}
                                token={token}
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
                                soloGame={game.soloGame}
                            />
                        </BoardContainer>
                    ) : (
                        <BoardContainer>
                            <span>Game not found !</span>
                            <span>Go choose another</span>
                        </BoardContainer>
                    )}
                </LoadingZone>
                <ButtonContainer>
                    <Link href="/">
                        <Button>Back to home</Button>
                    </Link>
                </ButtonContainer>
            </Container>
        );
    }
}

Game.propTypes = {
    idGame: PropTypes.number.isRequired,
    game: PropTypes.object.isRequired,
    token: PropTypes.string,
    loaded: PropTypes.bool,
};

export default Game;
