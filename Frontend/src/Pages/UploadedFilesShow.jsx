import React, { useEffect, useState } from 'react';

const FilesShow = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8000/filesshow', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Type: 'Heart',
      },
    })
      .then(response => response.json())
      .then(data => {
        setFiles(data.files);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Files Show</h2>
      <ul>
        {files.map(file => (
          <li key={file.fileName}>
            <br />
            {file.filePath.endsWith('.pdf') && (
              <iframe src={`http://localhost:8000/${file.filePath}`} width="650" height="200" title="PDF Viewer" />
            )}
            <a href={`http://localhost:8000/${file.filePath}`} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilesShow;
