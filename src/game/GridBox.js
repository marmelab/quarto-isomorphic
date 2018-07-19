import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import { placePiece } from '../services/gameService';

const GridBox = props => {
    const {
        idGame,
        boxValue,
        enabled,
        x,
        y,
        clickable,
        token,
        winningBox,
        goodPlace,
    } = props;
    const handleClick = async () => {
        if (
            idGame &&
            boxValue === '.' &&
            enabled &&
            x >= 0 &&
            y >= 0 &&
            clickable
        ) {
            await placePiece(idGame, x, y, token);
        }
    };
    return (
        <Box
            enabled={enabled}
            clickable={clickable && boxValue === '.'}
            boxValue={boxValue}
            label={`gridbox_${boxValue}_x${x}_y${y}`}
            winningBox={winningBox}
            goodBox={goodPlace}
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
