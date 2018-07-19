import styled from 'react-emotion';
import Colors from './Colors';

const Button = styled('button')`
    display: inline-block;
    min-height: 40px;
    margin: 4px;
    box-sizing: content-box;
    cursor: pointer;
    padding: 0px 20px;
    border: 1px solid ${Colors.buttonBorder};
    border-radius: 3px;
    font: normal medium/normal Arial, Helvetica, sans-serif;
    color: rgba(255, 255, 255, 0.9);
    text-overflow: clip;
    background: ${Colors.buttonBlue};
    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
    text-shadow: -1px -1px 0 rgba(15, 73, 168, 0.66);
    transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);

    &:hover {
        border: 1px solid ${Colors.buttonBorderHover};
        background: ${Colors.buttonHover};
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.3);
        transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    }

    &:active {
        border: 1px solid ${Colors.buttonBorder};
        background: ${Colors.textBlue};
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2) inset;
        text-shadow: none;
        transition: all 50ms cubic-bezier(0.42, 0, 0.58, 1);
    }
`;

export default Button;
