import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import { placePiece } from '../services/gameService';

const GridBox = props => {
    const handleClick = async () => {
        if (
            props.idGame &&
            props.boxValue === '.' &&
            props.enabled &&
            props.x >= 0 &&
            props.y >= 0 &&
            props.clickable
        ) {
            await placePiece(props.idGame, props.x, props.y, props.token);
        }
    };
    return (
        <Box
            enabled={props.enabled}
            clickable={props.clickable && props.boxValue === '.'}
            boxValue={props.boxValue}
            label={`gridbox_${props.boxValue}_x${props.x}_y${props.y}`}
            winningBox={props.winningBox}
            goodBox={props.goodPlace}
            boxSize="60"
            handleClick={handleClick}
            context="grid"
        />
    );
};

GridBox.defaultProps = {
    enabled: true,
};

GridBox.propTypes = {
    idGame: PropTypes.number.isRequired,
    token: PropTypes.string,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    boxValue: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    clickable: PropTypes.bool,
    winningBox: PropTypes.bool.isRequired,
    goodPlace: PropTypes.bool,
};

export default GridBox;
