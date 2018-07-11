import React from 'react';
import ActionText from './ActionText';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('ActionText tests', () => {
    test('Test actionText watch_only locked unclosed render', () => {
        const { getAllByText } = render(
            <ActionText
                closed={false}
                locked={true}
                selectedPiece={2}
                watchOnly={true}
            />,
        );
        const testaction = getAllByText(
            '(Watch only) Admire competitors talent',
        );
        expect(testaction).toBeTruthy();
    });

    test('Test actionText watch_only locked closed render', () => {
        const { getAllByText } = render(
            <ActionText
                closed={true}
                locked={true}
                selectedPiece={2}
                watchOnly={true}
            />,
        );
        const testaction = getAllByText('The game is over !!');
        expect(testaction).toBeTruthy();
    });

    test('Test actionText watch_only locked closed render', () => {
        const { getAllByText } = render(
            <ActionText
                closed={true}
                locked={true}
                selectedPiece={2}
                watchOnly={true}
            />,
        );
        const testaction = getAllByText('The game is over !!');
        expect(testaction).toBeTruthy();
    });

    test('Test actionText closed locked render', () => {
        const { getAllByText } = render(
            <ActionText
                closed={true}
                locked={true}
                selectedPiece={2}
                watchOnly={false}
            />,
        );
        const testaction = getAllByText('The game is over !!');
        expect(testaction).toBeTruthy();
    });

    test('Test actionText closed unlocked render', () => {
        const { getAllByText } = render(
            <ActionText
                closed={true}
                locked={false}
                selectedPiece={2}
                watchOnly={false}
            />,
        );
        const testaction = getAllByText('The game is over !!');
        expect(testaction).toBeTruthy();
    });

    test('Test actionText unlocked unclosed selected render', () => {
        const { getAllByText } = render(
            <ActionText
                closed={false}
                locked={false}
                selectedPiece={2}
                watchOnly={true}
            />,
        );
        const testaction = getAllByText('Place your piece on the board');
        expect(testaction).toBeTruthy();
    });

    test('Test actionText unlocked unclosed unselected render', () => {
        const { getAllByText } = render(
            <ActionText
                closed={false}
                locked={false}
                selectedPiece={0}
                watchOnly={true}
            />,
        );
        const testaction = getAllByText('Choose a piece for your opponent');
        expect(testaction).toBeTruthy();
    });

    test('Test actionText locked unclosed selected render', () => {
        const { getAllByText } = render(
            <ActionText
                closed={false}
                locked={true}
                selectedPiece={2}
                watchOnly={false}
            />,
        );
        const testaction = getAllByText('Meditate while waiting for your turn');
        expect(testaction).toBeTruthy();
    });

    test('Test actionText locked unclosed unselected render', () => {
        const { getAllByText } = render(
            <ActionText
                closed={false}
                locked={true}
                selectedPiece={0}
                watchOnly={false}
            />,
        );
        const testaction = getAllByText('Meditate while waiting for your turn');
        expect(testaction).toBeTruthy();
    });
});
