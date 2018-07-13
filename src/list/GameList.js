import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Link from 'next/link';
import Button from '../ui/Button';

const ListTitle = styled('span')`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 0 4px;
    text-align: center;
    margin: 10px 4px;
    background-color: purple;
    border-radius: 3px;
    color: white;
    line-height: 50px;
`;

const ListDataContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const ListContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid purple;
    border-radius: 3px;
`;

class GameList extends Component {
    state = {
        list: [],
        loaded: false,
    };

    static getDerivedStateFromProps = props => {
        return { list: props.list, loaded: true };
    };

    render() {
        const { list, loaded } = this.state;
        return (
            <ListContainer>
                <ListTitle>Watch a game</ListTitle>
                {list ? (
                    <ListDataContainer>
                        {' '}
                        {list.map((row, rowKey) => {
                            return (
                                <Link
                                    prefetch
                                    key={rowKey}
                                    href={{
                                        pathname: '/Game',
                                        query: { idGame: row.idGame },
                                    }}
                                >
                                    <Button>{`Game #${row.idGame}`}</Button>
                                </Link>
                            );
                        })}
                    </ListDataContainer>
                ) : (
                    loaded || (
                        <ListDataContainer>
                            <span>No game found !</span>
                            <span>Wait to someone to create one</span>
                        </ListDataContainer>
                    )
                )}
            </ListContainer>
        );
    }
}

GameList.propTypes = {
    list: PropTypes.array.isRequired,
    loaded: PropTypes.bool,
};

export default GameList;
