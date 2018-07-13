import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameList from '../src/list/GameList';
import Container from '../src/ui/Container';
import { listGames } from '../src/services/gameService';

class HomeQuarto extends Component {
    static async getInitialProps() {
        const onlyWatchlist = await listGames('onlywatch');
        return {
            onlyWatchlist: Array.isArray(onlyWatchlist) ? onlyWatchlist : [],
            loaded: !!onlyWatchlist,
        };
    }

    render() {
        const { onlyWatchlist } = this.props;
        return (
            <Container>
                <div>
                    <img src="/static/boardTitle.jpg" alt="logo" />
                    <h2>Welcome to Quarto-isomorphic</h2>
                </div>
                <GameList list={onlyWatchlist} />
            </Container>
        );
    }
}

HomeQuarto.propTypes = {
    onlyWatchlist: PropTypes.array.isRequired,
    loaded: PropTypes.bool,
};

export default HomeQuarto;
