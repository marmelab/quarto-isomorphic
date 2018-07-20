import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import { selectPiece, askAIMove } from '../services/gameService';

const RemainingBox = props => {
    const {
        idGame,
        boxValue,
        enabled,
        selected,
        clickable,
        token,
        badPiece,
        soloGame,
    } = props;
    const handleClick = async () => {
        if (idGame && boxValue > 0 && enabled && !selected && clickable) {
            await selectPiece(idGame, boxValue, token);
            if (soloGame) await askAIMove(idGame);
        }
    };
    return (
        <Box
            boxSize="40"
            enabled={enabled}
            clickable={clickable}
            boxValue={boxValue}
            label={`remainingbox_${boxValue}${selected ? '_selected' : ''}`}
            selected={selected}
            badBox={badPiece}
            handleClick={handleClick}
            context="remaining"
        />
    );
};

RemainingBox.defaultProps = {
    enabled: true,
};

RemainingBox.propTypes = {
    idGame: PropTypes.number.isRequired,
    token: PropTypes.string,
    boxValue: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    clickable: PropTypes.bool,
    selected: PropTypes.bool,
    badPiece: PropTypes.bool,
    soloGame: PropTypes.bool,
};

export default RemainingBox;
