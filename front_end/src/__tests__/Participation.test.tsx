import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ParticipationScreen, { Participation } from '../pages/participation';
import ParticipationForm from '../pages/participation/participationForm';

afterEach(cleanup);

global.ResizeObserver = require('resize-observer-polyfill');

describe('<Pariticipation />', () => {
  test('should display a blank participation form', async () => {
    const { getByRole } = render(<ParticipationScreen />);

    await waitFor(() => getByRole('form'));

    expect(getByRole('form')).toHaveFormValues({
      firstName: '',
      lastName: '',
      participation: null,
    });
  });

  test('should submit the form with firstName, lastName, and participation', async () => {
    const { findByTestId, getByTestId } = render(<ParticipationScreen />);
    const firstName = await waitFor(() => findByTestId('firstName'));
    const lastName = await waitFor(() => findByTestId('lastName'));
    const participation = await waitFor(() => findByTestId('participation'));
    const submit = await waitFor(() => findByTestId('submit'));

    userEvent.type(firstName, 'test');
    userEvent.type(lastName, 'password');
    userEvent.type(participation, '18');
    userEvent.click(submit);

    expect(getByTestId('firstName')).toHaveValue('test');
    expect(getByTestId('lastName')).toHaveValue('password');
    expect(getByTestId('participation')).toHaveValue(18);
  });
});
