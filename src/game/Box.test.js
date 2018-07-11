import React from 'react';
import Box from './Box';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('Box tests', () => {
    test('Test box render', () => {
        const { getAllByLabelText } = render(
            <Box boxValue="10" label="testbox" selected={false} boxSize="20" />,
        );
        const testbox = getAllByLabelText('testbox');
        expect(testbox).toBeTruthy();
    });
});
