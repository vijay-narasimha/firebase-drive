import React from 'react';
import { Breadcrumb } from 'react-bootstrap';


import { Link } from 'react-router-dom';

export default function FolderCrumbs({ currentFolder }) {

let path=[]
  if (currentFolder)  path = [...path, ...currentFolder.path];


  let route = path.map((folder, index) => {
    return (
      <Breadcrumb.Item
        key={folder.id}
        linkAs={Link}
        linkProps={{
          to: {
            pathname:folder.id? `/folder/${folder.id}` : '/',
    
        }
        }}
        className='text-truncate d-inline-block'
        style={{ maxWidth: '150px' }}
      >
        {folder.name}
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb
      className='flex-grow-1 '
      listProps={{ className: 'bg-white  m-0 pl-0' }}
    >
      {route}

      {currentFolder && (
        <Breadcrumb.Item
          className='text-truncate d-inline-block'
          style={{ maxWidth: '200px' }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}
