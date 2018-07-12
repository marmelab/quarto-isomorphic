import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import { placePiece } from '../services/gameservice';

const GridBox = props => {
    const handleClick = async () => {
        if (
            props.idGame &&
            props.boxValue > 0 &&
            props.enabled &&
            props.x &&
            props.y &&
            props.clickable
        ) {
            await placePiece(props.idGame, props.x, props.y);
            console.log('placePiece');
        }
    };
    return (
        <Box
            enabled={props.enabled}
            boxValue={props.boxValue}
            label={`gridbox_${props.boxValue}_x${props.x}_y${props.y}`}
            winningBox={props.winningBox}
            goodBox={props.goodPlace}
            boxSize="60"
            handleClick={handleClick}
        />
    );
};

GridBox.defaultProps = {
    enabled: true,
};

GridBox.propTypes = {
    idGame: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    boxValue: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    clickable: PropTypes.bool,
    winningBox: PropTypes.bool.isRequired,
    goodPlace: PropTypes.bool,
};

export default GridBox;
