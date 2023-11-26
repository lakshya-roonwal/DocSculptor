import React, { useState } from 'react';

const DragAndDrop = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div
      className={`drop-zone ${dragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drag & Drop files here</p>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={() => document.querySelector('input').click()}>
        Select Files
      </button>
      <div>
        {files.map((file) => (
          <div key={file.name}>{file.name}</div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDrop;
