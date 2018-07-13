import React from 'react';
import Box from './Box';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('Box tests', () => {
    test('Test box render', () => {
        const handleClick = async () => {};

        const { getAllByLabelText } = render(
            <Box
                handleClick={handleClick}
                boxValue="10"
                label="testbox"
                selected={false}
                boxSize="20"
            />,
        );
        const testbox = getAllByLabelText('testbox');
        expect(testbox).toBeTruthy();
    });
});
