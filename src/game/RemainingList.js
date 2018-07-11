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
    <ListContainer className="RemainingList">
        {Object.keys(props.list).map(pieceKey => {
            if (!props.list[pieceKey].used) {
                return (
                    <RemainingBox
                        key={pieceKey}
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
    list: PropTypes.object.isRequired,
    readOnly: PropTypes.bool,
    selectedPiece: PropTypes.number,
    activeZone: PropTypes.bool,
    badPieces: PropTypes.array.isRequired,
};

export default RemainingList;
