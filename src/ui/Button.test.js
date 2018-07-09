import React from 'react';
import Button from './Button';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('Button tests', () => {
    test('Test button render', () => {
        const { getByText } = render(<Button>Useful button</Button>);

        const button = getByText('Useful button');
        expect(button).toBeTruthy();
    });
});
