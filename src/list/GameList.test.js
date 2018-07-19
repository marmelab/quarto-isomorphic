import React from 'react';
import GameList from './GameList';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

jest.mock('next/link', () => {
    return ({ children }) => {
        return children;
    };
});

describe('GameList tests', () => {
    test('Test gameList 3 render', () => {
        const { queryAllByText } = render(
            <GameList
                list={[{ idGame: 27 }, { idGame: 28 }, { idGame: 29 }]}
                title="Jean"
                color="pink"
            />,
        );

        const testlist = queryAllByText('Game #', {
            exact: false,
        });
        expect(testlist).toHaveLength(3);

        const testselected = queryAllByText('Game #27');
        expect(testselected).toBeTruthy();

        const testnotselected = queryAllByText('Game #28');
        expect(testnotselected).toBeTruthy();
    });

    test('Test gameList 0 render', () => {
        const { queryAllByText } = render(
            <GameList list={[]} title="Michel" color="yellow" />,
        );

        const testlist = queryAllByText('Game #', {
            exact: false,
        });
        expect(testlist).toHaveLength(0);
    });
});
