import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const ActionTextContainer = styled('span')`
    display: flex;
    flex-direction: raw;
    justify-content: center;
    flex-wrap: wrap;
    height: 100px;
    line-height: 100px;
`;

const ActionText = props => (
    <ActionTextContainer>{getActionText(props)}</ActionTextContainer>
);

ActionText.defaultProps = {
    closed: false,
};

ActionText.propTypes = {
    closed: PropTypes.bool.isRequired,
    locked: PropTypes.bool.isRequired,
    selectedPiece: PropTypes.number.isRequired,
    watchOnly: PropTypes.bool.isRequired,
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
    } else if (props.watch_only) {
        return '(Watch only) Admire competitors talent';
    }
    return 'Meditate while waiting for your turn';
};
