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

const positionInclude = (placesList, x, y) =>
    placesList.some(place => place[0] === y && place[1] === x);

const Grid = props => (
    <GridContainer>
        {props.grid.map((row, rowKey) => (
            <RowContainer key={rowKey}>
                {row.map((boxValue, boxKey) => (
                    <GridBox
                        key={boxKey}
                        idGame={props.idGame}
                        token={props.token}
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

Grid.propTypes = {
    idGame: PropTypes.number.isRequired,
    token: PropTypes.string,
    grid: PropTypes.array.isRequired,
    winningLine: PropTypes.array.isRequired,
    readOnly: PropTypes.bool,
    goodPlaces: PropTypes.array.isRequired,
    activeZone: PropTypes.bool,
};

export default Grid;
