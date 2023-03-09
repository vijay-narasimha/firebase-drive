import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Folder({ folder }) {
  return (
    <Button
      variant='outline-dark'
      as={Link}
      to={ `/folder/${folder.id}`}
      className='text-truncate w-100'
    >
      <FontAwesomeIcon icon={faFolder} style={{ marginRight: '10px' }} />
      {folder.name}
    </Button>
  );
}
