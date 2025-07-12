import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
		await user.type(input, 'Chuck Norris');
		await user.selectOptions(dropdown, 'pizza');
		await user.click(submit);
		// expect(screen.getByText('Success! Chuck Norris likes pizza')); // this fails because the text is not immediately in the DOM
		// expect(
		// 	await screen.findByText('Success! Chuck Norris likes pizza')
		// ).toBeVisible();
		await waitFor(() => {
			expect(
				screen.getByText('Success! Chuck Norris likes pizza')
			).toBeVisible();
			expect(dropdown).toHaveValue('-- select favorite food --'); // this is the default value after reset
			expect(input).toHaveValue('');
		});
	});
});
