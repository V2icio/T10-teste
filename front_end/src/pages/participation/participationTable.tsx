/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Participation } from '.';
import { api } from '../../services/api';

interface Props {
  participations: Participation[];
  setParticipations: React.Dispatch<React.SetStateAction<Participation[]>>;
  setParticipationInputValue: React.Dispatch<
    React.SetStateAction<Participation>
  >;
}

function PopoverConfirmation({
  index,
  deleteParticipation,
}: {
  index: number;
  deleteParticipation;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteOnClick = async (): Promise<void> => {
    try {
      setLoadingDelete(true);
      await deleteParticipation(index);
    } catch (error) {
      setLoadingDelete(false);
      onClose();
    }
  };

  return (
    <Popover
      placement="right"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <IconButton aria-label="Delete" icon={<MdDelete />} />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Are you sure you want to delete this participation?
          <ButtonGroup d="flex" justifyContent="flex-end" pt={5}>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              isLoading={loadingDelete}
              onClick={deleteOnClick}
            >
              Delete
            </Button>
          </ButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
const styleTest = {
  paddingTop: 8,
  paddingBottom: 8,
  paddingRight: 12,
  paddingLeft: 12,
};
function ParticipationTable({
  participations,
  setParticipations,
  setParticipationInputValue,
}: Props): JSX.Element {
  const toast = useToast();

  const editOnClick = (index: number): void => {
    setParticipationInputValue(participations[index]);
    const participationsAux = participations;
    participationsAux.splice(index, 1);
    setParticipations([...participationsAux]);
  };

  const deleteParticipation = async (index: number): Promise<void> => {
    try {
      await api.delete(`/participations/${participations[index].id}`);
      const participationsAux = participations;
      participationsAux.splice(index, 1);
      setParticipations([...participationsAux]);
    } catch (error) {
      toast({
        title: 'Deletion error.',
        description: 'Unable to delete record.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      throw new Error();
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th style={styleTest} />
          <Th style={styleTest}>First name</Th>
          <Th style={styleTest}>Last name</Th>
          <Th style={styleTest} textAlign="center">
            Participation
          </Th>
          <Th style={styleTest} textAlign="center" />
        </Tr>
      </Thead>
      <Tbody>
        {participations.map((participation, i) => (
          <Tr key={participation.id}>
            <Td style={styleTest}>{i + 1}</Td>
            <Td style={styleTest}>{participation.firstName}</Td>
            <Td style={styleTest}>{participation.lastName}</Td>
            <Td style={styleTest} textAlign="center">
              {`${participation.participation}%`}{' '}
            </Td>
            <Td style={styleTest}>
              <Stack direction="row">
                <IconButton
                  aria-label="Edit"
                  icon={<MdEdit />}
                  onClick={() => editOnClick(i)}
                />
                <PopoverConfirmation
                  index={i}
                  deleteParticipation={deleteParticipation}
                />
              </Stack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ParticipationTable;
