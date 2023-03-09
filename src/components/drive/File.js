import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faFile } from '@fortawesome/free-solid-svg-icons'
export default function File({file}) {
  return (
    <a href={file.url} target='_blank' className='btn btn-outline-dark text-truncate w-100'> 
    <FontAwesomeIcon icon={faFile} style={{marginRight:'10px'}} />{file.name}
    </a>
  )
}
