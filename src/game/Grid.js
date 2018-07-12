import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import GridBox from './GridBox';

const GridContainer = styled('div')`
    display: flex;
    flex-direction: column;
`;

const RowContainer = styled('div')`
    display: flex;
    flex-direction: raw;
    justify-content: center;
`;

const Grid = props => (
    <GridContainer>
        {props.grid.map((row, rowKey) => (
            <RowContainer key={rowKey}>
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
            </RowContainer>
        ))}
    </GridContainer>
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
