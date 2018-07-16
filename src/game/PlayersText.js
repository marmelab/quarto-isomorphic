import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const PlayersTextContainer = styled('span')(
    {
        padding: '2px',
        height: '60px',
        lineHeight: '60px',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    props => ({
        color: props.youWon ? 'green' : props.watchOnly ? 'blue' : 'red',
    }),
);

const AvatarContainer = styled('img')`
    width: 60px;
    height: auto;
    vertical-align: middle;
`;

const AvatarLine = styled('div')`
    color: #00a6e8;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const PlayersText = props => (
    <PlayersTextContainer youWon={props.youWon} watchOnly={props.watchOnly}>
        {props.avatarWinner ? (
            <AvatarContainer
                src={`https://robohash.org/${props.avatarWinner}.png`}
            />
        ) : (
            <AvatarLine>
                <div>
                    <span>{props.avatarPlayerOne}</span>
                    <AvatarContainer
                        src={`https://robohash.org/${
                            props.avatarPlayerOne
                        }.png`}
                    />
                </div>
                <div>
                    <AvatarContainer
                        src={`https://robohash.org/${
                            props.avatarPlayerTwo
                        }.png`}
                    />
                    <span>{props.avatarPlayerTwo}</span>
                </div>
            </AvatarLine>
        )}
        {getWinningText(props)}
    </PlayersTextContainer>
);

PlayersText.defaultProps = {
    closed: false,
    youWon: false,
    winnerId: 0,
    watchOnly: true,
};

PlayersText.propTypes = {
    closed: PropTypes.bool,
    youWon: PropTypes.bool,
    winnerId: PropTypes.number,
    watchOnly: PropTypes.bool,
    avatarWinner: PropTypes.string,
    avatarPlayerOne: PropTypes.string,
    avatarPlayerTwo: PropTypes.string,
};

export default PlayersText;

const getWinningText = props => {
    if (!props.closed) return '';
    if (props.youWon) {
        return 'Congratulation, you won !!';
    }
    if (props.avatarWinner) {
        return `${props.avatarWinner} won.`;
    }
    return "It's a draw";
};
