import React from 'react';
import Navbar from './Navbar';
import { Container } from 'react-bootstrap';
import Addfolderbutton from './Addfolderbutton';
import { useFolder } from '../hooks/useFolder';
import Folder from './Folder';
import File from './File';
import { useParams  } from 'react-router-dom';
import FolderCrumbs from './FolderCrumbs';
import Addfilebutton from './Addfilebutton';
export default function Dashboard() {
  const { folderId } = useParams();
  
  const { folder, childFolders ,childFiles} = useFolder(folderId);

  
  return (
    <>
      <Navbar />
      <Container fluid>
        <div className='d-flex align-items-center'>
          <FolderCrumbs currentFolder={folder} />
          <Addfilebutton currentFolder={folder}/>
          <Addfolderbutton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFolders.map((childfolder) => (
              <div
                key={childfolder.id}
                style={{ maxWidth: '250px' }}
                className='p-2'
              >
                <Folder folder={childfolder}></Folder>
              </div>
            ))}
          </div>
        )}
        {childFolders.length>0 && childFiles.length>0 && <hr/>}

         {childFiles.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFiles.map((childfile) => (
              <div
                key={childfile.id}
                style={{ maxWidth: '250px' }}
                className='p-2'
              >
                <File file={childfile}></File>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
