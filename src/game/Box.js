import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const BoxContainer = styled('div')(
    {
        padding: '2px',
        margin: '2px',
    },
    props => ({
        height: props.boxSize,
        width: props.boxSize,
        backgroundColor: props.winningBox
            ? 'lightgreen'
            : props.selected
                ? '#80ffbf'
                : 'lightblue',
        ':hover': props.clickable
            ? {
                  cursor: 'pointer',
                  background: 'rgba(0, 142, 198, 1)',
                  boxShadow: '2px 2px 2px 0 rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  top: props.context !== 'grid' ? '-10px' : '',
                  transition: 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
              }
            : {},
    }),
);

const ImgContainer = styled('img')`
    max-width: 100%;
    height: auto;
`;

const Box = props => (
    <BoxContainer
        aria-label={props.label}
        aria-required="true"
        boxSize={props.boxSize}
        selected={props.selected}
        clickable={props.clickable}
        onClick={props.handleClick}
        context={props.context}
        winningBox={props.winningBox}
    >
        {props.boxValue == '.' || (
            <ImgContainer
                src={'/static/pieceImage' + String(props.boxValue) + '.png'}
                alt={String(props.clickable)}
            />
        )}
    </BoxContainer>
);

Box.defaultProps = {
    enabled: true,
    boxSize: 60,
    clickable: false,
};

Box.propTypes = {
    boxValue: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    clickable: PropTypes.bool,
    selected: PropTypes.bool,
    winningBox: PropTypes.bool,
    badBox: PropTypes.bool,
    goodBox: PropTypes.bool,
    boxSize: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    context: PropTypes.string,
};

export default Box;
