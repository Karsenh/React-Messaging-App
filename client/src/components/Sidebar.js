import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Conversations from './Conversations';
import Contacts from './Contacts';
import NewConversationModal from './modals/NewConversationModal';
import NewContactModal from './modals/NewContactModal';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Bool value to determine if conversations is open
  const isConversationOpen = activeKey === CONVERSATIONS_KEY;

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div style={{ width: '250px' }} className='d-flex flex-column'>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='border-right overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className='p-2 border-top border-right small'>
          Your ID: <span className='text-muted'>{id}</span>
        </div>
        <Button className='rounded' onClick={() => setIsModalOpen(true)}>
          New {isConversationOpen ? 'Conversation' : 'Contact'}
        </Button>
      </Tab.Container>

      {/* Show = bool for if our modal is open or not */}
      {/* onHide = function to close our modal */}
      <Modal show={isModalOpen} onHide={closeModal}>
        {isConversationOpen ? (
          // Pass in the closeModal function to have the ability to close them with an 'x' button within
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
