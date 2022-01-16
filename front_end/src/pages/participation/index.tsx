/* eslint-disable react/jsx-props-no-spreading */
import React, { FormEvent, useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
} from '@chakra-ui/react';
import { ResponsivePie } from '@nivo/pie';
import ParticipationChart from './participationChart';

interface Participation {
  id?: number;
  firstName: string;
  lastName: string;
  participation: string;
}

function Participation(): JSX.Element {
  const [participationInputValue, setParticipationInputValue] =
    useState<Participation>({
      firstName: '',
      lastName: '',
      participation: '',
    });

  const [participationData, setParticipationData] = useState<Participation[]>(
    [],
  );

  const handleChange = ({ target }): void => {
    setParticipationInputValue({
      ...participationInputValue,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setParticipationData([...participationData, participationInputValue]);
    setParticipationInputValue({
      firstName: '',
      lastName: '',
      participation: '',
    });
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

              <Button type="submit" style={{ flex: 0.1 }} size="lg">
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 10,
            }}
          >
            <Heading>Data</Heading>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 10,
            }}
          >
            Data of participants
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div style={{ margin: 15, width: '50%' }}>
              <Table>
                <Thead>
                  <Tr>
                    <Th />
                    <Th>First name</Th>
                    <Th>Last name</Th>
                    <Th textAlign="center">Participation</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {participationData.map((participation, i) => (
                    <Tr>
                      <Td>{i}</Td>
                      <Td>{participation.firstName}</Td>
                      <Td>{participation.lastName}</Td>
                      <Td textAlign="center">
                        {`${participation.participation}%`}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
            <div style={{ height: 300, width: '50%' }}>
              <ParticipationChart
                data={participationData.map((participationElement) => {
                  return {
                    id: `${participationElement.firstName} ${participationElement.lastName}`,
                    label: `${participationElement.firstName} ${participationElement.lastName}`,
                    value: parseInt(participationElement.participation, 10),
                  };
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Participation;
