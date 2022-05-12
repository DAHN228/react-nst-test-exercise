import React, { useState } from 'react';
import Axios from 'axios';
import Toast from '../UI/Toast';
import cl from './AddForm.module.css';

function AddForm() {
  const [list, setList] = useState([]);
  let toastProperties = null;
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
          title: 'Внимание!',
          description: 'Введите корректные данные',
          backgroundColor: '#d9534f',
        };
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };

  const url = 'http://localhost:3004/people';
  const [data, setData] = useState({
    id: 0,
    firstName: '',
    lastName: '',
  });
  function submit() {
    // if (data.firstName.value != null && data.lastName.value != null) {
    Axios.post(url, {
      firstName: data.firstName,
      lastName: data.lastName,
    });
    // fetch(url, {
    //   method: 'POST',
    //   body: {
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //   }
    //     .then((response) => {
    //       if (!response.ok) {
    //         showToast('warning');
    //       } else {
    //         showToast('success');
    //       }
    //     })
    // });
    showToast('success');
    // } else {
    // e.preventDefault();
    //   showToast('danger');
    // }
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <div>
      <form className={cl.form} onSubmit={(e) => submit(e)}>
        <input
          onChange={(e) => handle(e)}
          id="firstName"
          value={data.firstName}
          name="firstName"
          type="text"
          placeholder="Введите имя содрудника"
        />
        {/* {data.firstName.value == null ? (
          <span style={{ color: 'red' }}>Поле имени не может быть пустым!</span>
        ) : (
          <span />
        )} */}
        <input
          onChange={(e) => handle(e)}
          id="lastName"
          value={data.lastName}
          name="lastName"
          type="text"
          placeholder="Введите фамилию содрудника"
        />
        {/* {data.lastName.value == null ? (
          <span style={{ color: 'red' }}>Поле фамилии не может быть пустым!</span>
        ) : (
          <span />
        )} */}
        <button type="submit">Сохранить</button>
      </form>
      <Toast toastlist={list} position="buttom-right" setList={setList} />
    </div>
  );
}

export default AddForm;
