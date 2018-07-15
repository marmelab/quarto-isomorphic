import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Link from 'next/link';
import Button from '../ui/Button';
import LoadingZone from '../ui/LoadingZone';

const ListTitle = styled('span')(
    {
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '10px 4px',
        borderRadius: '3px',
        color: 'white',
        lineHeight: '50px',
    },
    props => ({
        backgroundColor: props.color,
    }),
);

const ListDataContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const ListContainer = styled('div')(
    {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        border: '1px solid',
        borderRadius: '3px',
        margin: '0 4px',
        width: '33%',
    },
    props => ({
        borderColor: props.color,
    }),
);

class GameList extends Component {
    state = {
        list: [],
        color: 'green',
        register: false,
        loaded: false,
    };

    static getDerivedStateFromProps = props => {
        return {
            list: props.list,
            title: props.title,
            color: props.color,
            register: props.register,
            loaded: true,
        };
    };

    render() {
        const { title, list, loaded, color, register } = this.state;
        return (
            <ListContainer color={color}>
                <ListTitle color={color}>{title}</ListTitle>
                <LoadingZone loaded={loaded}>
                    {list.length > 0 ? (
                        <ListDataContainer>
                            {' '}
                            {list.map((row, rowKey) => {
                                return (
                                    <Link
                                        key={rowKey}
                                        href={{
                                            pathname: '/Game',
                                            query: {
                                                idGame: row.idGame,
                                                register,
                                            },
                                        }}
                                    >
                                        <Button>{`Game #${row.idGame}`}</Button>
                                    </Link>
                                );
                            })}
                        </ListDataContainer>
                    ) : (
                        <ListDataContainer>
                            <span>No game found !</span>
                            <span>Wait to someone to create one</span>
                        </ListDataContainer>
                    )}
                </LoadingZone>
            </ListContainer>
        );
    }
}

GameList.propTypes = {
    list: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    loaded: PropTypes.bool,
    register: PropTypes.bool,
};

export default GameList;
