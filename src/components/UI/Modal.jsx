/* eslint-disable jsx-a11y/click-events-have-key-events,
 jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import cl from './Modal.module.css';
import cross from '../../assets/cancel.png';

function Modal({
  active, setActive, title, children,
}) {
  Modal.propTypes = {
    active: PropTypes.node.isRequired,
    setActive: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
  };
  const rootClasses = [cl.modal];
  if (active) {
    rootClasses.push(cl.active);
  }
  const modalClasses = [cl.modal__content];
  if (active) {
    modalClasses.push(cl.active);
  }
  return (
    <div className={rootClasses.join(' ')}>
      <div aria-hidden className={modalClasses.join(' ')} onClick={(e) => e.stopPropagation()}>
        <div className={cl.firstRow}>
          <span>{title}</span>
          <img src={cross} alt="close" onClick={() => setActive(false)} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
