import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const BoxContainer = styled('div')(
    {
        backgroundColor: 'lightblue',
        margin: '2px',
        padding: '2px',
    },
    props => ({
        height: props.boxSize,
        width: props.boxSize,
    }),
);

const ImgContainer = styled('img')`
    max-width: 100%;
    height: auto;
`;

const Box = props => (
    <BoxContainer
        accessible={true}
        accessibilityLabel={props.label}
        boxSize={props.boxSize}
    >
        {props.boxValue == '.' || (
            <ImgContainer
                src={'/static/pieceImage' + String(props.boxValue) + '.png'}
            />
        )}
    </BoxContainer>
);

Box.defaultProps = {
    enabled: true,
    boxSize: 60,
};

Box.propTypes = {
    classname: PropTypes.string,
    boxValue: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    selected: PropTypes.bool,
    winningBox: PropTypes.bool,
    badBox: PropTypes.bool,
    goodBox: PropTypes.bool,
    boxSize: PropTypes.number.isRequired,
};

export default Box;
