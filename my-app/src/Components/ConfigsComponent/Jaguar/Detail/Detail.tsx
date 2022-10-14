import { FunctionComponent, useState } from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';

interface Props {
  openModal: boolean;
  createMode: boolean;
  loading?: boolean;
  setOpenModal: any;
}

const JaguarDetail: FunctionComponent<Props> = (props) => {

  const { openModal, createMode, setOpenModal } = props;

  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
    >
      <Modal.Header>{createMode ? "Adicionar Onça" : "Editar Onça"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='First name' placeholder='First name' />
              <Form.Input fluid label='Last name' placeholder='Last name' />
              <Form.Select
                fluid
                label='Gender'
                options={options}
                placeholder='Gender'
              />
            </Form.Group>
            <Form.TextArea label='About' placeholder='Tell us more about you...' />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpenModal(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpenModal(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default JaguarDetail

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]