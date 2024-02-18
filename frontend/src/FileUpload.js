import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log("FILE UPLOAD SUCCESSFUL!");

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error('Error:', error));

    // try {
    //   const response = await axios.post('YOUR_BACKEND_ENDPOINT/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   setDownloadLink(response.data.downloadLink)

    // } catch (error) {
    //   console.error("Error uploading file: ", error);
    // }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
      {downloadLink && <a href={downloadLink} download>Download CSV</a>}
    </div>
  );
}

export default FileUpload;

