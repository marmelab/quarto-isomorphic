import React, { Component } from 'react';
import styled from 'react-emotion';
import Link from 'next/link';
import Button from '../src/ui/Button';
import ButtonContainer from '../src/ui/ButtonContainer';
import PropTypes from 'prop-types';
import GameList from '../src/list/GameList';
import NameForm from '../src/ui/NameForm';
import Container from '../src/ui/Container';
import { listGames } from '../src/services/gameService';
import { retrieveGameTokenList } from '../src/services/storageService';
import Colors from '../src/ui/Colors';

const MultiListContainer = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 300px;
    width: 100%;
`;

class HomeQuarto extends Component {
    state = {
        currentlist: [],
        openedlist: [],
        onlyWatchlist: [],
        loaded: false,
    };

    static async getInitialProps() {
        const currentlist = await listGames('current');
        const openedlist = await listGames('opened');
        const onlyWatchlist = await listGames('onlywatch');
        return {
            currentlist: Array.isArray(currentlist) ? currentlist : [],
            openedlist: Array.isArray(openedlist) ? openedlist : [],
            onlyWatchlist: Array.isArray(onlyWatchlist) ? onlyWatchlist : [],
            loaded: !!currentlist && !!openedlist && !!onlyWatchlist,
        };
    }

    static getDerivedStateFromProps = props => {
        return props;
    };

    componentDidMount = async () => {
        const tokenList = retrieveGameTokenList();
        const currentlist = await listGames('current', tokenList);
        const openedlist = await listGames('opened', tokenList);
        const onlyWatchlist = await listGames('onlywatch', tokenList);
        this.setState({
            currentlist: Array.isArray(currentlist) ? currentlist : [],
            openedlist: Array.isArray(openedlist) ? openedlist : [],
            onlyWatchlist: Array.isArray(onlyWatchlist) ? onlyWatchlist : [],
            loaded: true,
        });
    };

    handleChangeAvatar = value => {
        this.setState({ avatar: value });
    };

    render() {
        const { currentlist, openedlist, onlyWatchlist, avatar } = this.state;

        return (
            <Container>
                <div>
                    <img src="/static/boardTitle.jpg" alt="logo" />
                    <h2>Welcome to Quarto-isomorphic</h2>
                </div>
                <NameForm action={this.handleChangeAvatar} />
                <ButtonContainer>
                    <Link
                        href={{
                            pathname: '/Game',
                            query: {
                                avatar: avatar,
                            },
                        }}
                    >
                        <Button>Create a new game in duo</Button>
                    </Link>
                </ButtonContainer>
                <MultiListContainer>
                    <GameList
                        color={Colors.green}
                        title="Continue a game"
                        list={currentlist}
                    />
                    <GameList
                        color={Colors.blue}
                        title="Join a game"
                        register={true}
                        list={openedlist}
                        avatar={avatar}
                    />
                    <GameList
                        color={Colors.purple}
                        title="Watch a game"
                        list={onlyWatchlist}
                    />
                </MultiListContainer>
            </Container>
        );
    }
}

HomeQuarto.propTypes = {
    currentlist: PropTypes.array.isRequired,
    openedlist: PropTypes.array.isRequired,
    onlyWatchlist: PropTypes.array.isRequired,
    loaded: PropTypes.bool,
};

export default HomeQuarto;
