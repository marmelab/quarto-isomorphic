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
    ({ color }) => ({
        backgroundColor: color,
    }),
);

const ListDataContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 400px;
`;

const AvatarListContainer = styled('img')`
    width: 28px;
    height: auto;
    vertical-align: middle;
    background-color: white;
    margin: 0px 4px;
    border-radius: 3px;
    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
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
    ({ color }) => ({
        borderColor: color,
    }),
);

class GameList extends Component {
    state = {
        list: [],
        color: 'green',
        register: false,
        loaded: false,
    };

    static getDerivedStateFromProps = ({
        list,
        title,
        color,
        register,
        avatar,
    }) => {
        return {
            list: list,
            title: title,
            color: color,
            register: register,
            avatar: avatar,
            loaded: true,
        };
    };

    render() {
        const { title, list, loaded, color, register, avatar } = this.state;
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
                                                avatar: avatar,
                                                token: row.token,
                                            },
                                        }}
                                    >
                                        <Button>
                                            {`Game #${row.idGame} (${
                                                row.soloGame ? 'single' : 'dual'
                                            })`}
                                            <AvatarListContainer
                                                src={`https://robohash.org/${
                                                    row.playerOneName
                                                }.png`}
                                            />
                                            {row.playerTwoName && (
                                                <AvatarListContainer
                                                    src={`https://robohash.org/${
                                                        row.playerTwoName
                                                    }.png`}
                                                />
                                            )}
                                        </Button>
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
    avatar: PropTypes.string,
};

export default GameList;
