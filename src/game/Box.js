import React from 'react';
import PropTypes from 'prop-types';

const Box = props => (
    <div accessible={true} accessibilityLabel={props.label}>
        {props.boxValue == '.' || (
            <img src={'/static/pieceImage' + String(props.boxValue) + '.png'} />
        )}
    </div>
);

Box.defaultProps = {
    enabled: true,
};

Box.propTypes = {
    boxValue: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    selected: PropTypes.bool,
    winningBox: PropTypes.bool,
    badBox: PropTypes.bool,
    goodBox: PropTypes.bool,
};

export default Box;
