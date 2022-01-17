import { Button, FormControl, Input, Stack } from '@chakra-ui/react';
import React, { useState, FormEvent } from 'react';
import { Participation } from '.';

interface Props {
  participationInputValue: Participation;
  setParticipationInputValue:
    | React.Dispatch<React.SetStateAction<Participation>>
    | any;
  handleSubmit: any;
}

function ParticipationForm({
  participationInputValue,
  setParticipationInputValue,
  handleSubmit,
}: Props): JSX.Element {
  const [submiting, setSubmiting] = useState(false);

  const sendOnClick = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setSubmiting(true);
    await handleSubmit(participationInputValue);
    setSubmiting(false);
  };

  const handleChange = ({ target }): void => {
    setParticipationInputValue({
      ...participationInputValue,
      [target.name]: target.value,
    });
  };

  return (
    <form onSubmit={sendOnClick} name="participation-form">
      <Stack direction="row" spacing={5}>
        <FormControl style={{ flex: 0.3 }} isRequired>
          <Input
            data-testid="firstName"
            name="firstName"
            value={participationInputValue.firstName}
            onChange={handleChange}
            bg="white"
            size="lg"
            placeholder="First name"
          />
        </FormControl>

        <FormControl style={{ flex: 0.3 }} isRequired>
          <Input
            data-testid="lastName"
            name="lastName"
            value={participationInputValue.lastName}
            onChange={handleChange}
            bg="white"
            size="lg"
            placeholder="Last name"
          />
        </FormControl>

        <FormControl style={{ flex: 0.3 }} isRequired>
          <Input
            data-testid="participation"
            name="participation"
            value={participationInputValue.participation}
            onChange={handleChange}
            bg="white"
            size="lg"
            placeholder="Participation"
            type="number"
            min={1}
            max={100}
          />
        </FormControl>

        <Button
          data-testid="submit"
          type="submit"
          style={{ flex: 0.1 }}
          size="lg"
          isLoading={submiting}
        >
          SEND
        </Button>
      </Stack>
    </form>
  );
}

export default ParticipationForm;
