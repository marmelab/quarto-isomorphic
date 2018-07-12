import React from 'react';
import RemainingBox from './RemainingBox';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('RemainingBox tests', () => {
    test('Test remainingBox 10 render', () => {
        const { getAllByLabelText } = render(
            <RemainingBox boxValue="10" selected={false} />,
        );
        const testbox = getAllByLabelText('remainingbox_10');
        expect(testbox).toBeTruthy();
    });

    test('Test remainingBox 15 selected render', () => {
        const { getAllByLabelText } = render(
            <RemainingBox boxValue="15" selected={true} />,
        );
        const testbox = getAllByLabelText('remainingbox_15_selected');
        expect(testbox).toBeTruthy();
    });
});
