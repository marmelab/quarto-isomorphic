import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import avatarService from '../services/avatarService.js';
import Colors from '../ui/Colors';

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
        color: props.youWon
            ? Colors.green
            : props.watchOnly
                ? Colors.blue
                : Colors.red,
    }),
);

const AvatarContainer = styled('img')`
    width: 60px;
    height: auto;
    vertical-align: middle;
`;

const AvatarLine = styled('div')`
    color: ${Colors.textBlue};
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const getWinningText = props => {
    if (!props.closed) return '';
    if (props.youWon) {
        return 'Congratulation, you won !!';
    }
    if (props.avatarWinner) {
        return `${props.avatarWinner} won.`;
    }
    return "It's a draw";
};

const PlayersText = props => (
    <PlayersTextContainer youWon={props.youWon} watchOnly={props.watchOnly}>
        {props.avatarWinner ? (
            <AvatarContainer src={avatarService(props.avatarWinner)} />
        ) : (
            <AvatarLine>
                <div>
                    <span>{props.avatarPlayerOne}</span>
                    <AvatarContainer
                        src={avatarService(props.avatarPlayerOne)}
                    />
                </div>
                <div>
                    <AvatarContainer
                        src={avatarService(props.avatarPlayerTwo)}
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
