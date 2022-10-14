import { FunctionComponent, useState } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

interface Props {
  openModal: boolean;
  setOpenModal: any;
}

const JaguarDetail: FunctionComponent<Props> = (props) => {

  const { openModal, setOpenModal } = props;

  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
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