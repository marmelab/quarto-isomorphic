import React from 'react';
import PlayersText, { getWinningText } from './PlayersText';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('PlayersText tests', () => {
    test('Test players text 10 render', () => {
        const { getAllByText } = render(
            <PlayersText
                closed={true}
                youWon={true}
                watchOnly={false}
                avatarPlayerOne={'john'}
                avatarPlayerTwo={'michel'}
                avatarWinner={''}
            />,
        );
        const item1 = getAllByText('michel', { strict: false });
        expect(item1).toBeTruthy();
        const item2 = getAllByText('john', { strict: false });
        expect(item2).toBeTruthy();
    });
    test('Test getWinningText you won', () => {
        const testProps = {
            closed: true,
            youWon: true,
            avatarWinner: 'michel',
        };
        const text = getWinningText(testProps);
        expect(text).toEqual('Congratulation, you won !!');
    });

    test('Test getWinningText not closed', () => {
        const testProps = {
            closed: false,
            youWon: true,
            avatarWinner: 'michel',
        };
        const text = getWinningText(testProps);
        expect(text).toEqual('');
    });

    test('Test getWinningText you loose', () => {
        const testProps = {
            closed: true,
            youWon: false,
            avatarWinner: 'michel',
        };
        const text = getWinningText(testProps);
        expect(text).toEqual('michel won.');
    });
});
