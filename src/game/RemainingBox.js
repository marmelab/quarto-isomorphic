import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

const RemainingBox = props => (
    <Box
        boxSize="40"
        enabled={props.enabled}
        boxValue={props.boxValue}
        label={'remainingbox'}
        selected={props.selected}
        badBox={props.badPiece}
    />
);

RemainingBox.defaultProps = {
    enabled: true,
};

RemainingBox.propTypes = {
    onPress: PropTypes.func.isRequired,
    boxValue: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    clickable: PropTypes.bool,
    selected: PropTypes.bool,
    badPiece: PropTypes.bool,
};

export default RemainingBox;
