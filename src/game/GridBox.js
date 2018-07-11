import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

const GridBox = props => (
    <Box
        enabled={props.enabled}
        boxValue={props.boxValue}
        label={`gridbox_${props.boxValue}_x${props.x}_y${props.y}`}
        winningBox={props.winningBox}
        goodBox={props.goodPlace}
        boxSize="60"
    />
);

GridBox.defaultProps = {
    enabled: true,
};

GridBox.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    boxValue: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    clickable: PropTypes.bool,
    winningBox: PropTypes.bool.isRequired,
    goodPlace: PropTypes.bool,
};

export default GridBox;
