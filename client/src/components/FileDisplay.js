import React from 'react'

const FileDisplay = ({fileId, filename, originalname, mimetype, size, uploadDate}) => {
  return (
    <div key={fileId}>
    <h2>File Information</h2>
    <p><strong>File Name:</strong> {filename}</p>
    <p><strong>Original Name:</strong> {originalname}</p>
    <p><strong>MIME Type:</strong> {mimetype}</p>
    <p><strong>Size:</strong> {size} bytes</p>
    <p><strong>Upload Date:</strong>{uploadDate}</p>
  </div>
  )
}

export default FileDisplay
