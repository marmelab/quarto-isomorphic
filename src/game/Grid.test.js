import React from 'react';
import Grid from './Grid';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('Grid tests', () => {
    test('Test grid 16 render', () => {
        const { getAllByLabelText, queryAllByLabelText } = render(
            <Grid
                idGame={100}
                grid={[
                    ['.', '.', '.', '.'],
                    ['.', '.', '.', '.'],
                    ['.', '.', '.', '.'],
                    ['.', '.', '.', '.'],
                ]}
                winningLine={[]}
                goodPlaces={[]}
            />,
        );

        const grid = getAllByLabelText('gridbox', {
            exact: false,
        });
        expect(grid).toHaveLength(16);

        const gridvide = queryAllByLabelText('gridbox_.', {
            exact: false,
        });
        expect(gridvide).toHaveLength(16);

        const rowof4 = queryAllByLabelText('x0', {
            exact: false,
        });
        expect(rowof4).toHaveLength(4);

        const columnof4 = queryAllByLabelText('y3', {
            exact: false,
        });
        expect(columnof4).toHaveLength(4);

        const x0y0 = getAllByLabelText('gridbox_._x0_y0');
        expect(x0y0).toBeTruthy();

        const x3y0 = getAllByLabelText('gridbox_._x3_y0');
        expect(x3y0).toBeTruthy();
    });

    test('Test grid 9 render', () => {
        const { getAllByLabelText } = render(
            <Grid
                idGame={100}
                grid={[['.', '3', '.'], ['.', '.', '.'], ['.', '7', '.']]}
                winningLine={[]}
                goodPlaces={[]}
            />,
        );

        const grid = getAllByLabelText('gridbox', {
            exact: false,
        });
        expect(grid).toHaveLength(9);

        const x1y0 = getAllByLabelText('gridbox_3_x1_y0');
        expect(x1y0).toBeTruthy();

        const x3y0 = getAllByLabelText('gridbox_._x2_y0');
        expect(x3y0).toBeTruthy();

        const x1y2 = getAllByLabelText('gridbox_7_x1_y2');
        expect(x1y2).toBeTruthy();
    });
});
