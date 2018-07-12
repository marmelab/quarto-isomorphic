import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameList from '../src/list/GameList';
import Container from '../src/ui/Container';
import { listGames } from '../src/services/gameservice';

class HomeQuarto extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        loaded: PropTypes.bool,
    };

    static async getInitialProps() {
        const list = await listGames('onlywatch');
        return {
            list: list,
            loaded: !!list,
        };
    }

    render() {
        const { list } = this.props;
        return (
            <Container>
                <div>
                    <img src="/static/boardTitle.jpg" alt="logo" />
                    <h2>Welcome to Quarto-isomorphic</h2>
                </div>
                <GameList list={list} />
            </Container>
        );
    }
}

export default HomeQuarto;
