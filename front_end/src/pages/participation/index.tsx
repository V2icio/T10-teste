import React, { useState, useEffect } from 'react';
import { Stack, Heading, Container, Text, useToast } from '@chakra-ui/react';
import ParticipationForm from './participationForm';
import ParticipationTable from './participationTable';
import ParticipationChart from './participationChart';

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

  const getParticipations = async (): Promise<Participation[]> => {
    try {
      const response = await api.get('/participations');
      let participations: Participation[] = response.data;
      participations = participations.sort(
        (a, b) => parseInt(a.participation, 10) - parseInt(b.participation, 10),
      );
      return participations;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    let isMounted = true;
    getParticipations().then((participations) => {
      if (isMounted) {
        setParticipationData(participations);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (participation: Participation): Promise<void> => {
    try {
      const participationAux = { ...participation };
      if (participationAux.id) {
        await api.put(
          `/participations/${participationAux.id}`,
          participationAux,
        );
      } else {
        const response = await api.post('/participations', participation);
        participationAux.id = response.data.id;
      }

      let newParticipationData = [...participationData, participationAux];
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
          <ParticipationForm
            participationInputValue={participationInputValue}
            setParticipationInputValue={setParticipationInputValue}
            handleSubmit={handleSubmit}
          />
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
