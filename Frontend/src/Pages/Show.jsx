import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DocumentDisplay() {
  const [pdfUrls, setPdfUrls] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8000/get-doc', {
          headers: {
            Authorization: `Bearer ${token}`,
            type: 'brain'
          },
          responseType: 'arraybuffer',
        });

        const uint8Array = new Uint8Array(response.data);
        const pdfSeparator = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // PDF file signature: %PDF
        const pdfDataArray = splitPdfData(uint8Array, pdfSeparator);

        const urls = pdfDataArray.map((pdfData, index) => {
          const blob = new Blob([pdfData], { type: 'application/pdf' });
          return URL.createObjectURL(blob);
        });

        setPdfUrls(urls);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocuments();
  }, []);

  const splitPdfData = (uint8Array, separator) => {
    const pdfDataArray = [];
    let start = 0;
    let end = 0;

    while (end < uint8Array.length) {
      if (isMatch(uint8Array, separator, end)) {
        if (end > start) {
          const pdfData = uint8Array.subarray(start, end);
          pdfDataArray.push(pdfData);
        }
        start = end;
      }
      end++;
    }

    if (end > start) {
      const pdfData = uint8Array.subarray(start, end);
      pdfDataArray.push(pdfData);
    }

    return pdfDataArray;
  };

  const isMatch = (uint8Array, separator, index) => {
    for (let i = 0; i < separator.length; i++) {
      if (uint8Array[index + i] !== separator[i]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      <h1>PDF Documents</h1>
      <div style={{ display: 'flex' }}>
        {pdfUrls.length > 0 ? (
          pdfUrls.map((url, index) => (
            <div
              key={index}
              style={{
                width: 'calc(100% / 3)',
                height: '400px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <iframe
                src={url}
                style={{ width: '100%', height: '100%', transform: 'scale(0.6)' }}
                title={`PDF ${index + 1}`}
              />
            </div>
          ))
        ) : (
          <p>No PDFs found.</p>
        )}
      </div>
    </div>
  );
}

export default DocumentDisplay;
