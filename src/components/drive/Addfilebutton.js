import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useAuth } from '../../contexts/AuthContext';
import { storage, database } from '../../firebase';
import { ROOT_FOLDER } from '../hooks/useFolder';
import { v4 as uuidV4 } from 'uuid';
import { Toast, ProgressBar } from 'react-bootstrap';

export default function Addfilebutton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const { currentUser } = useAuth();
  function handleupload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;
    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);
    const filepath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join('/')}/${file.name}`
        : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`;
    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filepath}`)
      .put(file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress=snapshot.bytesTransferred/snapshot.totalBytes
        setUploadingFiles(prevUploadingFiles=>{
         return prevUploadingFiles.map(uploadfile=>{
          if(uploadfile.id===id){
            return { ...uploadfile,progress:progress}
          }
          return uploadfile
         })
        })
      },
      () => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files.add({
            url: url,
            name: file.name,
            createdAt: database.getCurrentTimeStamp(),
            userId: currentUser.uid,
            folderId: currentFolder.id,
          });
        });
      }
    );
  }
  return (
    <>
      <label className='btn btn-outline-success  m-0 mr-2'>
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type='file'
          onChange={handleupload}
          style={{ opacity: 0, position: 'absolute', left: '-999px' }}
        ></input>
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              maxWidth: '250px',
            }}
          >
            {uploadingFiles.map((file) => {
              <Toast key={file.id}>
                <Toast.Header closeButton={file.error}  className='text-truncate w-100 d-block'>
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={file.error}
                    variant={file.error ? 'danger' : 'primary'}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? 'error'
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>;
            })}
          </div>,
          document.body
        )}
    </>
  );
}
