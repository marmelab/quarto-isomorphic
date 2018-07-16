import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const LoadingZoneContainer = styled('div')`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    width: 100%;
    margin: auto;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
`;

const LoadingZone = ({ loaded, children }) => {
    return (
        <div>
            {loaded ? (
                children
            ) : (
                <LoadingZoneContainer>
                    <img src="/static/spinning-circles.svg" alt="loading" />
                    <span>Loading ...</span>
                </LoadingZoneContainer>
            )}
        </div>
    );
};

LoadingZone.defaultProps = {
    loaded: false,
};

LoadingZone.propTypes = {
    loaded: PropTypes.bool,
    children: PropTypes.element.isRequired,
};

export default LoadingZone;
