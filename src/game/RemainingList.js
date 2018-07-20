import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import RemainingBox from './RemainingBox';

const ListContainer = styled('div')`
    display: flex;
    flex-direction: raw;
    justify-content: center;
    flex-wrap: wrap;
`;

const RemainingList = props => (
    <ListContainer>
        {Object.keys(props.list).map(pieceKey => {
            if (!props.list[pieceKey].used) {
                return (
                    <RemainingBox
                        key={pieceKey}
                        idGame={props.idGame}
                        token={props.token}
                        boxValue={String(props.list[pieceKey].id)}
                        enabled={!props.readOnly}
                        clickable={!props.readOnly && props.activeZone}
                        selected={
                            props.selectedPiece == props.list[pieceKey].id
                        }
                        badPiece={
                            props.badPieces.indexOf(props.list[pieceKey].id) >=
                            0
                        }
                        soloGame={props.soloGame}
                    />
                );
            }
        })}
    </ListContainer>
);

RemainingList.defaultProps = {
    readOnly: true,
};

RemainingList.propTypes = {
    idGame: PropTypes.number.isRequired,
    token: PropTypes.string,
    list: PropTypes.object.isRequired,
    readOnly: PropTypes.bool,
    selectedPiece: PropTypes.number,
    activeZone: PropTypes.bool,
    badPieces: PropTypes.array.isRequired,
    soloGame: PropTypes.bool,
};

export default RemainingList;
