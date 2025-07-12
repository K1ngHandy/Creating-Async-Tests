import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

describe('App component', () => {
	let input, dropdown, submit, user;
	beforeEach(() => {
		render(<App />);
		user = userEvent.setup();
		input = screen.getByPlaceholderText('Type Username');
		dropdown = screen.getByTestId('fav-food');
		submit = screen.getByText('Submit Form');
	});
	test('form submits and display message correctly', async () => {
		await user.type(input, 'chucknorris');
		await user.selectOptions(dropdown, 'pizza');
		await user.click(submit);
		expect(
			screen.getByText('Success! chucknorris likes pizza')
		).toBeVisible();
		expect(input).toHaveValue('');
	});
});
