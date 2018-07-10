import React from 'react';
import Grid from '../src/game/Grid';
import RemainingList from '../src/game/RemainingList';
import Link from 'next/link';
import Button from '../src/ui/Button';
import Container from '../src/ui/Container';
import config from '../config/config.dist';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import io from 'socket.io-client';

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
        /* const idgame = { true: 479, false: 480 };
        let i = true;
        this.interval = setInterval(async () => {
            let url = `http://${config.apiUrl}/${idgame[i]}`;
            const res = await fetch(url);
            const data = await res.json();
            this.handleMessage(data);
            i = !i;
        }, 3000); */
        this.socket = io();
        this.socket.on('game', this.handleGame);
    };

    componentWillUnmount = async () => {
        //clearInterval(this.interval);
        this.socket.off('game', this.handleGame);
        this.socket.close();
    };

    handleGame = game => {
        console.log('handleGame');
        console.log(game.idGame);
        this.setState({ game: game });
    };

    render() {
        const { game, loaded } = this.state;
        console.log(game.idGame);
        return (
            <Container>
                {game.grid ? (
                    <div>
                        <span>{game.idGame}</span>
                        <Grid
                            grid={game.grid}
                            goodPlaces={game.winningPlaces}
                            winningLine={game.winningLine}
                            readOnly={game.locked}
                            activeZone={game.selectedPiece > 0}
                        />
                        {game.locked &&
                            !game.closed &&
                            !game.watch_only && (
                                <span>Wait for your own turn</span>
                            )}
                        {game.closed && (
                            <div>
                                <div />
                                <span>End of game</span>
                            </div>
                        )}
                        <span>Do something</span>
                        <RemainingList />
                    </div>
                ) : (
                    loaded || (
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
    }
}

export default Game;
