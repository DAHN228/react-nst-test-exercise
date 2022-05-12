/* eslint-disable jsx-a11y/click-events-have-key-events,
 jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import cl from './MobileButton.module.css';

function ModalMobileButton({
  icon, setModalActive,
}) {
  ModalMobileButton.propTypes = {
    icon: PropTypes.node.isRequired,
    setModalActive: PropTypes.node.isRequired,
  };
  return (
    <div
      aria-hidden
      onClick={() => { setModalActive(true); }}
      className={cl.MobileButton}
    >
      <img src={icon} alt="button" />
    </div>
  );
}
export default ModalMobileButton;
