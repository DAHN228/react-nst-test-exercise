import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Toast.module.css';

function Toast({ toastlist, position, setList }) {
  Toast.propTypes = {
    toastlist: PropTypes.node.isRequired,
    position: PropTypes.node.isRequired,
    setList: PropTypes.node.isRequired,
  };
  const deleteToast = useCallback(
    (id) => {
      const toastListItem = toastlist.filter((e) => e.id !== id);
      setList(toastListItem);
    },
    [toastlist, setList],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastlist.length) {
        deleteToast(toastlist[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toastlist, deleteToast]);

  return (
    <div className={`${styles.container} ${styles[position]}`}>
      {toastlist.map((toast, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={`${styles.notification} ${styles.toast} ${styles[position]}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button type="button" onClick={() => deleteToast(toast.id)}>
            X
          </button>
          <div>
            <p className={styles.title}>{toast.title}</p>
            <p className={styles.description}>{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Toast;
