import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'antd';

const DeleteButtonResource = ({ id, onDelete }) => {
  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    axios.delete(`http://localhost:8071/resources/${id}`)
      .then(res => {
        onDelete(); // Callback to update the UI after successful deletion
        setVisible(false); // Close the modal after deletion
      })
      .catch(err => {
        console.error(err);
        alert('Error deleting resource.');
      });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="danger" className="btn btn-danger" onClick={showModal} style={{backgroundColor:"red", border: 'none', width: '100px'}}>
        Delete
      </Button>
      <Modal
        title="Confirm Delete"
        visible={visible}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </>
  );
};

export default DeleteButtonResource;
