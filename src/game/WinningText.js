import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const WinningTextTextContainer = styled('span')(
    {
        padding: '2px',
        height: '50px',
        lineHeight: '50px',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    props => ({
        color: props.youWon ? 'green' : props.watchOnly ? 'blue' : 'red',
    }),
);

const WinningText = props => (
    <WinningTextTextContainer youWon={props.youWon} watchOnly={props.watchOnly}>
        {getWinningText(props)}
    </WinningTextTextContainer>
);

WinningText.defaultProps = {
    closed: false,
    youWon: false,
    winnerId: 0,
    watchOnly: true,
};

WinningText.propTypes = {
    closed: PropTypes.bool,
    youWon: PropTypes.bool,
    winnerId: PropTypes.number,
    watchOnly: PropTypes.bool,
};

export default WinningText;

const getWinningText = props => {
    if (!props.closed) return '';
    if (props.youWon) {
        return 'Congratulation, you won !!';
    }
    if (props.winnerId > 0) {
        return `Player ${props.winnerId} won.`;
    }
    return "It's a draw";
};
