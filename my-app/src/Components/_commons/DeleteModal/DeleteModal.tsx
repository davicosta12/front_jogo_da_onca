import { FunctionComponent, useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

interface Props {
  openModal: boolean;
  loading?: boolean;
  setOpenModal: any;
  title: string;
  subtitle: string;
}

const DeleteModal: FunctionComponent<Props> = (props) => {

  const {
    openModal,
    loading,
    setOpenModal,
    title,
    subtitle
  } = props;

  return (
    <Modal
      basic
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
      size='small'
    >
      <Header icon>
        <Icon name='archive' />
        {title}
      </Header>
      <Modal.Content>
        <p>
          {subtitle}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
          <Icon name='remove' /> Não
        </Button>
        <Button color='green' inverted onClick={() => setOpenModal(false)}>
          <Icon name='checkmark' /> Sim
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteModal