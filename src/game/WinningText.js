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
    ({ youWon, watchOnly }) => ({
        color: youWon ? 'green' : watchOnly ? 'blue' : 'red',
    }),
);

const getWinningText = (closed, youWon, winnerId) => {
    if (!closed) return '';
    if (youWon) {
        return 'Congratulation, you won !!';
    }
    if (winnerId > 0) {
        return `Player ${winnerId} won.`;
    }
    return "It's a draw";
};

const WinningText = ({ youWon, watchOnly, closed, winnerId }) => (
    <WinningTextTextContainer youWon={youWon} watchOnly={watchOnly}>
        {getWinningText(closed, youWon, winnerId)}
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
