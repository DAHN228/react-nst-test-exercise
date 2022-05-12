import React, { useState, useRef } from 'react';
import useScroll from '../hooks/useScroll';
import cl from './PersonList.module.css';
import Toast from './UI/Toast';
import Modal from './UI/Modal';
import UpdateForm from './Forms/UpdateForm';
import userpic from '../assets/user.png';
import ModalMobileButton from './UI/ModalMobileButton';
import DeleteMobileButton from './UI/DeleteMobileButton';
import update from '../assets/writing.png';
import trash from '../assets/trash.png';

function PersonList() {
  const [modalActive, setModalActive] = useState(false);

  const windowWidth = window.innerWidth;

  const [list, setList] = useState([]);
  let toastProperties = null;

  const refreshPage = () => {
    window.location.reload();
  };

  const showToast = (type) => {
    switch (type) {
      case 'success':
        toastProperties = {
          id: list.length + 1,
          title: 'Успешно',
          description: 'Пользователь успешно добавлен',
          backgroundColor: '#5cb85c',
        };
        break;
      case 'danger':
        toastProperties = {
          id: list.length + 1,
          title: 'Danger',
          description: 'This is a danger toast component',
          backgroundColor: '#d9534f',
        };
        break;
      case 'info':
        toastProperties = {
          id: list.length + 1,
          title: 'Удален',
          description: 'Пользователь успешно ',
          backgroundColor: '#5bc0de',
        };
        break;
      case 'warning':
        toastProperties = {
          id: list.length + 1,
          title: 'Warning',
          description: 'This is a warning toast component',
          backgroundColor: '#f0ad4e',
        };
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const parentRef = useRef();
  const childRef = useRef();

  function fetchPersons() {
    fetch(`http://localhost:3004/people?_page=${page}&_limit=${limit}`)
      .then((response) => response.json())
      .then((json) => {
        setPersons((prev) => [...prev, ...json]);
        setPage((prev) => prev + 1);
      });
  }
  // eslint-disable-next-line no-unused-vars
  const intersected = useScroll(parentRef, childRef, () => fetchPersons(page, limit));

  function deleteUser(id) {
    fetch(`http://localhost:3004/people/${id}`, {
      method: 'DELETE',
    }).then((result) => {
      result.json();
    });
  }

  const handleDelete = (id) => {
    deleteUser(id);
    refreshPage();
    showToast('info');
  };

  const lis = persons.map((person) => (
    <li key={person.id}>
      <img src={userpic} alt="userpic" />
      <span className={cl.firstName}>{person.firstName}</span>
      <span className={cl.lastName}>{person.lastName}</span>
      {person.id > 0 ? (
        <span>
          {windowWidth <= 600
            && <ModalMobileButton setModalActive={setModalActive} icon={update} />}
          {windowWidth > 600 && (
            <button type="button" onClick={() => setModalActive(true)}>
              Редактировать
            </button>
          )}
          {windowWidth <= 600 && (
            <DeleteMobileButton
              id={person.id}
              handleDelete={handleDelete}
              icon={trash}
            />
          )}
          {windowWidth > 600 && (
            <button
              type="button"
              onClick={() => handleDelete(person.id)}
            >
              Удалить
            </button>
          )}
          <Modal title="Редактирование сотрудника" active={modalActive} setActive={setModalActive}>
            <UpdateForm person={person} />
          </Modal>
        </span>
      ) : (
        <div
          style={windowWidth > 600 ? {
            height: 5, width: 260, background: '#eee',
          }
            : {
              height: 5, width: 45, background: '#eee',
            }}
        />
      )}
    </li>
  ));

  return (
    <div ref={parentRef} className={cl.container}>
      <ul className={cl.personsList}>{lis}</ul>
      <div
        style={{
          height: '1vw', width: '10vw', background: '#fff', marginTop: 100,
        }}
        ref={childRef}
      />
      <Toast toastlist={list} position="buttom-right" setList={setList} />
    </div>
  );
}

export default PersonList;
