/* eslint-disable react/jsx-props-no-spreading */
import React, { FormEvent, useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  Input,
  Stack,
  Heading,
  Container,
  Text,
  useToast,
} from '@chakra-ui/react';
import ParticipationChart from './participationChart';
import ParticipationTable from './participationTable';

import { api } from '../../services/api';

export interface Participation {
  id?: string;
  firstName: string;
  lastName: string;
  participation: string;
}

function Participation(): JSX.Element {
  const toast = useToast();
  const [participationInputValue, setParticipationInputValue] =
    useState<Participation>({
      firstName: '',
      lastName: '',
      participation: '',
    });
  const [participationData, setParticipationData] = useState<Participation[]>(
    [],
  );
  const [submiting, setSubmiting] = useState(false);

  const getParticipations = async (): Promise<void> => {
    try {
      const response = await api.get('/participations');
      let participations: Participation[] = response.data;
      participations = participations.sort(
        (a, b) => parseInt(a.participation, 10) - parseInt(b.participation, 10),
      );
      setParticipationData(participations);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getParticipations();
  }, []);

  const handleChange = ({ target }): void => {
    setParticipationInputValue({
      ...participationInputValue,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      setSubmiting(true);

      if (participationInputValue.id) {
        await api.put(
          `/participations/${participationInputValue.id}`,
          participationInputValue,
        );
      } else {
        const response = await api.post(
          '/participations',
          participationInputValue,
        );
        participationInputValue.id = response.data.id;
      }

      let newParticipationData = [
        ...participationData,
        participationInputValue,
      ];
      newParticipationData = newParticipationData.sort(
        (a, b) => parseInt(a.participation, 10) - parseInt(b.participation, 10),
      );
      setParticipationData(newParticipationData);
      setParticipationInputValue({
        firstName: '',
        lastName: '',
        participation: '',
      });
      toast({
        title: 'Participation was save.',
        description: 'Participation data has been saved and added to the list.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'An error has occurred.',
        description:
          'Sorry. An error occurred and the data could not be saved.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#00b8e2',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '75%', padding: 45 }}>
          <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={5}>
              <FormControl style={{ flex: 0.3 }} isRequired>
                <Input
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
                type="submit"
                style={{ flex: 0.1 }}
                size="lg"
                isLoading={submiting}
              >
                SEND
              </Button>
            </Stack>
          </form>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '75%' }}>
          <Container centerContent mt={5} mb={10}>
            <Stack textAlign="center" spacing={5}>
              <Heading>Data</Heading>
              <Text>Data of participants</Text>
            </Stack>
          </Container>

          <Stack direction="row">
            <div style={{ width: '50%' }}>
              <ParticipationTable
                participations={participationData}
                setParticipations={setParticipationData}
                setParticipationInputValue={setParticipationInputValue}
              />
            </div>
            <div style={{ height: 250, width: '50%' }}>
              <ParticipationChart
                data={participationData.map((participationElement, i) => {
                  return {
                    id: `${i + 1} - ${participationElement.firstName}`,
                    label: `${participationElement.firstName} ${participationElement.lastName}`,
                    value: parseInt(participationElement.participation, 10),
                  };
                })}
              />
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Participation;
