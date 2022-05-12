import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toast from '../UI/Toast';

function UpdateForm({ person }) {
  UpdateForm.propTypes = {
    person: PropTypes.node.isRequired,
  };
  const [data, setData] = useState({
    id: person.id,
    firstName: person.firstName,
    lastName: person.lastName,
  });
  const [list, setList] = useState([]);
  let toastProperties = null;
  const showToast = (type) => {
    switch (type) {
      case 'success':
        toastProperties = {
          id: list.length + 1,
          title: 'Успешно',
          description: 'Пользователь успешно отредактирован',
          backgroundColor: '#5cb85c',
        };
        break;
      case 'danger':
        toastProperties = {
          id: list.length + 1,
          title: 'Внимание!',
          description: 'Введите корректные данные',
          backgroundColor: '#d9534f',
        };
        break;
      case 'info':
        toastProperties = {
          id: list.length + 1,
          title: 'Удален',
          description: 'Пользователь успешно добавлен',
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

  function updateUser() {
    fetch(`http://localhost:3004/people/${person.id}`, {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    }).then((result) => {
      result.json();
    });
  }

  function submit() {
    // if (data.firstName.value != null && data.lastName.value != null) {
    updateUser(person);
    showToast('success');
    // } else {
    //   e.preventDefault();
    //   showToast('danger');
    // }
    // updateUser(person);
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e, person)}>
        <input
          onChange={(e) => handle(e)}
          id="firstName"
          value={data.firstName}
          name="firstName"
          type="text"
          placeholder="Введите имя содрудника"
        />
        {data.firstName.value == null ? (
          <span style={{ color: 'red' }}>Поле имени не может быть пустым!</span>
        ) : (
          <span />
        )}
        <input
          onChange={(e) => handle(e)}
          id="lastName"
          value={data.lastName}
          name="lastName"
          type="text"
          placeholder="Введите фамилию содрудника"
        />
        {data.lastName.value == null ? (
          <span style={{ color: 'red' }}>Поле фамилии не может быть пустым!</span>
        ) : (
          <span />
        )}
        <button type="submit">Сохранить</button>
      </form>
      <Toast toastlist={list} position="buttom-right" setList={setList} />
    </div>
  );
}

export default UpdateForm;
