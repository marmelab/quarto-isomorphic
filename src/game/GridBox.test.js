import React from 'react';
import GridBox from './GridBox';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('GridBox tests', () => {
    test('Test gridBox 10 render', () => {
        const { getAllByLabelText } = render(
            <GridBox
                idGame={100}
                boxValue="10"
                x={2}
                y={1}
                winningBox={false}
            />,
        );
        const testbox = getAllByLabelText('gridbox_10_x2_y1');
        expect(testbox).toBeTruthy();
    });

    test('Test gridBox 7 render', () => {
        const { getAllByLabelText } = render(
            <GridBox
                idGame={100}
                boxValue="7"
                x={0}
                y={0}
                winningBox={false}
            />,
        );
        const testbox = getAllByLabelText('gridbox_7_x0_y0');
        expect(testbox).toBeTruthy();
    });
});
