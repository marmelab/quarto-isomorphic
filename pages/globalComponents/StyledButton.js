import styled from 'react-emotion';

export const StyledButton = styled('button')`
    display: inline-block;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    cursor: pointer;
    padding: 10px 20px;
    border: 1px solid #018dc4;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    font: normal medium/normal Arial, Helvetica, sans-serif;
    color: rgba(255, 255, 255, 0.9);
    -o-text-overflow: clip;
    text-overflow: clip;
    background: #0199d9;
    -webkit-box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
    text-shadow: -1px -1px 0 rgba(15, 73, 168, 0.66);
    -webkit-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
    -moz-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
    -o-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
    transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);

    &:hover {
        border: 1px solid #007cad;
        background: rgba(0, 142, 198, 1);
        -webkit-box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.3);
        -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
        -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
        -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
        transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    }

    &:active {
        border: 1px solid #018dc4;
        background: #00a6e8;
        -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2) inset;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2) inset;
        text-shadow: none;
        -webkit-transition: all 50ms cubic-bezier(0.42, 0, 0.58, 1);
        -moz-transition: all 50ms cubic-bezier(0.42, 0, 0.58, 1);
        -o-transition: all 50ms cubic-bezier(0.42, 0, 0.58, 1);
        transition: all 50ms cubic-bezier(0.42, 0, 0.58, 1);
    }
`;
