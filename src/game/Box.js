import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, cx } from 'react-emotion';
import Colors from '../ui/Colors';

const winningBoxColorClass = css`
    background-color: ${Colors.winningBox};
`;

const selectedColorClass = css`
    background-color: ${Colors.selected};
`;

const badBoxColorClass = css`
    background-color: ${Colors.badBox};
`;

const goodBoxColorClass = css`
    background-color: ${Colors.goodBox};
`;

const hoverUpperClass = css`
    &:hover {
        top: -10px;
    }
`;

const hoverImageClass = imgNumber =>
    css({
        ':hover': {
            backgroundImage:
                imgNumber > 0
                    ? `url("/static/pieceImage${imgNumber}.png");`
                    : '',
        },
    });

const clickableClass = css`
    &:hover {
        cursor: pointer;
        background: ${Colors.buttonHover};
        boxshadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.3);
        position: relative;

        transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);

        background-size: contain;
    }
`;

const BoxContainer = styled('div')(
    {
        padding: '2px',
        margin: '2px',
        backgroundColor: Colors.boxBlue,
    },
    ({ boxSize }) => ({
        height: boxSize,
        width: boxSize,
    }),
);

const ImgContainer = styled('img')`
    max-width: 100%;
    height: auto;
`;

const Box = ({
    label,
    boxSize,
    boxValue,
    selected,
    selectedPiece,
    clickable,
    handleClick,
    context,
    winningBox,
    goodBox,
    badBox,
}) => (
    <BoxContainer
        aria-label={label}
        aria-required="true"
        boxSize={boxSize}
        onClick={handleClick}
        className={cx(
            { [goodBoxColorClass]: goodBox && clickable },
            { [badBoxColorClass]: badBox && clickable },
            { [selectedColorClass]: selected },
            { [winningBoxColorClass]: winningBox },
            { [clickableClass]: clickable },
            { [hoverImageClass(selectedPiece)]: context === 'grid' },
            { [hoverUpperClass]: context !== 'grid' },
        )}
    >
        {boxValue == '.' || (
            <ImgContainer
                src={'/static/pieceImage' + String(boxValue) + '.png'}
                alt={String(clickable)}
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
    selectedPiece: PropTypes.number,
    winningBox: PropTypes.bool,
    badBox: PropTypes.bool,
    goodBox: PropTypes.bool,
    boxSize: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    context: PropTypes.string,
};

export default Box;
