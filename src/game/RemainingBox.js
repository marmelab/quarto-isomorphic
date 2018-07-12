import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import { selectPiece } from '../services/gameservice';

const RemainingBox = props => {
    const handleClick = async () => {
        if (
            props.idGame &&
            props.boxValue > 0 &&
            props.enabled &&
            !props.selected &&
            props.clickable
        ) {
            await selectPiece(props.idGame, props.boxValue);
            console.log('selectPiece');
        }
    };
    return (
        <Box
            boxSize="40"
            enabled={props.enabled}
            boxValue={props.boxValue}
            label={`remainingbox_${props.boxValue}${
                props.selected ? '_selected' : ''
            }`}
            selected={props.selected}
            badBox={props.badPiece}
            handleClick={handleClick}
        />
    );
};

RemainingBox.defaultProps = {
    enabled: true,
};

RemainingBox.propTypes = {
    idGame: PropTypes.number.isRequired,
    boxValue: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    clickable: PropTypes.bool,
    selected: PropTypes.bool,
    badPiece: PropTypes.bool,
};

export default RemainingBox;
