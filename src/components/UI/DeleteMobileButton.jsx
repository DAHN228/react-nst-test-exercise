/* eslint-disable jsx-a11y/click-events-have-key-events,
 jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import cl from './MobileButton.module.css';

function DeleteMobileButton({
  icon, handleDelete, id,
}) {
  DeleteMobileButton.propTypes = {
    icon: PropTypes.node.isRequired,
    handleDelete: PropTypes.node.isRequired,
    id: PropTypes.node.isRequired,
  };
  return (
    <div
      aria-hidden
      onClick={() => { handleDelete(id); }}
      className={cl.MobileButton}
    >
      <img src={icon} alt="button" />
    </div>
  );
}
export default DeleteMobileButton;
