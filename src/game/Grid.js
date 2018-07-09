import React from 'react';
import PropTypes from 'prop-types';
import GridBox from './GridBox';

const Grid = props => (
    <div>
        {props.grid.map((row, rowKey) => (
            <div key={rowKey}>
                {row.map((boxValue, boxKey) => (
                    <GridBox
                        key={boxKey}
                        boxValue={String(boxValue)}
                        x={boxKey}
                        y={rowKey}
                        enabled={!props.readOnly}
                        clickable={!props.readOnly && props.activeZone}
                        winningBox={props.winningLine.indexOf(boxValue) >= 0}
                        goodPlace={positionInclude(
                            props.goodPlaces,
                            boxKey,
                            rowKey,
                        )}
                    />
                ))}
            </div>
        ))}
    </div>
);

const positionInclude = (placesList, x, y) => {
    return placesList.some(place => {
        return place[0] == y && place[1] == x;
    });
};

Grid.propTypes = {
    grid: PropTypes.array.isRequired,
    winningLine: PropTypes.array.isRequired,
    readOnly: PropTypes.bool,
    goodPlaces: PropTypes.array.isRequired,
    activeZone: PropTypes.bool,
};

export default Grid;
