import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import { selectPiece } from '../services/gameService';

const RemainingBox = props => {
    const handleClick = async () => {
        if (
            props.idGame &&
            props.boxValue > 0 &&
            props.enabled &&
            !props.selected &&
            props.clickable
        ) {
            await selectPiece(props.idGame, props.boxValue, props.token);
        }
    };
    return (
        <Box
            boxSize="40"
            enabled={props.enabled}
            clickable={props.clickable}
            boxValue={props.boxValue}
            label={`remainingbox_${props.boxValue}${
                props.selected ? '_selected' : ''
            }`}
            selected={props.selected}
            badBox={props.badPiece}
            handleClick={handleClick}
            contxt="remaining"
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
};

export default RemainingBox;
