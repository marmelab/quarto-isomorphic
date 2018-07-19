import React from 'react';
import RemainingList from './RemainingList';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('RemainingList tests', () => {
    test('Test remainingList 3 with selected 2 render', () => {
        const { getAllByLabelText } = render(
            <RemainingList
                idGame={100}
                list={{
                    1: { id: 1, used: false },
                    2: { id: 2, used: false },
                    3: { id: 3, used: false },
                }}
                selectedPiece={2}
                badPieces={[]}
            />,
        );

        const testlist = getAllByLabelText('remainingbox', {
            exact: false,
        });
        expect(testlist).toHaveLength(3);

        const testselected = getAllByLabelText('remainingbox_2_selected');
        expect(testselected).toBeTruthy();

        const testnotselected = getAllByLabelText('remainingbox_3');
        expect(testnotselected).toBeTruthy();
    });

    test('Test remainingList 16 no selected render', () => {
        const { getAllByLabelText, queryAllByLabelText } = render(
            <RemainingList
                idGame={100}
                list={{
                    1: { id: 1, used: false },
                    2: { id: 2, used: false },
                    3: { id: 3, used: false },
                    4: { id: 4, used: false },
                    5: { id: 5, used: false },
                    6: { id: 6, used: false },
                    7: { id: 7, used: false },
                    8: { id: 8, used: false },
                    9: { id: 9, used: false },
                    10: { id: 10, used: false },
                    11: { id: 11, used: false },
                    12: { id: 12, used: false },
                    13: { id: 13, used: false },
                    14: { id: 14, used: false },
                    15: { id: 15, used: false },
                    16: { id: 16, used: false },
                }}
                selectedPiece={0}
                badPieces={[]}
            />,
        );

        const testlist = getAllByLabelText('remainingbox', {
            exact: false,
        });
        expect(testlist).toHaveLength(16);

        const testselected = queryAllByLabelText('selected', {
            exact: false,
        });
        expect(testselected).toHaveLength(0);
    });
});
