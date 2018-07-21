import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Colors from '../ui/Colors';

const BoxContainer = styled('div')(
    {
        padding: '2px',
        margin: '2px',
    },
    ({
        boxSize,
        winningBox,
        selected,
        clickable,
        context,
        imgNumber,
        badBox,
        goodBox,
    }) => ({
        height: boxSize,
        width: boxSize,
        backgroundColor: winningBox
            ? Colors.winningBox
            : selected
                ? Colors.selected
                : badBox && clickable
                    ? Colors.badBox
                    : goodBox && clickable
                        ? Colors.goodBox
                        : Colors.boxBlue,
        ':hover': clickable
            ? {
                  cursor: 'pointer',
                  background: Colors.buttonHover,
                  boxShadow: '2px 2px 2px 0 rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  top: context !== 'grid' ? '-10px' : '',
                  transition: 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
                  backgroundImage:
                      imgNumber > 0
                          ? `url("/static/pieceImage${imgNumber}.png");`
                          : '',
                  backgroundSize: 'contain',
              }
            : {},
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
        selected={selected}
        clickable={clickable}
        onClick={handleClick}
        context={context}
        winningBox={winningBox}
        imgNumber={selectedPiece}
        goodBox={goodBox}
        badBox={badBox}
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
