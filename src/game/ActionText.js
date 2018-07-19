import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const ActionTextContainer = styled('span')`
    display: flex;
    flex-direction: raw;
    justify-content: center;
    flex-wrap: wrap;
    height: 80px;
    line-height: 80px;
`;

const ActionText = props => (
    <ActionTextContainer>{getActionText(props)}</ActionTextContainer>
);

ActionText.defaultProps = {
    closed: false,
};

ActionText.propTypes = {
    closed: PropTypes.bool,
    locked: PropTypes.bool,
    selectedPiece: PropTypes.number.isRequired,
    watchOnly: PropTypes.bool,
};

export default ActionText;

const getActionText = props => {
    if (props.closed) {
        return 'The game is over !!';
    }
    if (!props.locked) {
        if (props.selectedPiece > 0) {
            return 'Place your piece on the board';
        }
        return 'Choose a piece for your opponent';
    }
    if (props.watchOnly) {
        return '(Watch only) Admire competitors talent';
    }
    return 'Meditate while waiting for your turn';
};
