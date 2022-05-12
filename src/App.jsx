import React, { useState } from 'react';
import './App.css';
import Modal from './components/UI/Modal';
import ModalMobileButton from './components/UI/ModalMobileButton';
import AddForm from './components/Forms/AddForm';
import PersonList from './components/PersonList';
import add from './assets/add-user.png';

function App() {
  const windowWidth = window.innerWidth;
  const [modalActive, setModalActive] = useState(false);
  return (
    <div className="container">
      <Modal title="Создание сотрудника" active={modalActive} setActive={setModalActive}>
        <AddForm />
      </Modal>
      <PersonList />
      {windowWidth <= 600 && (
        <div className="row">
          <ModalMobileButton setModalActive={setModalActive} icon={add} />
        </div>
      )}
      {windowWidth > 600 && (
        <button type="button" className="addPerson" onClick={() => setModalActive(true)}>
          Добавить сотрудника
        </button>
      )}
    </div>
  );
}

export default App;
