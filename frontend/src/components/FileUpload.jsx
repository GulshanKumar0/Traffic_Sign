import { useState } from 'react';

const FileUpload = ({ onFileChange, extractedPreview }) => {
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    onFileChange(file);
  };

  return (
    <div
      className={`upload-box ${dragOver ? 'drag-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <p>{fileName ? `Selected: ${fileName}` : 'Drag & drop JPG/PNG/PDF or click to browse'}</p>
      {extractedPreview && (
        <details>
          <summary>Extracted Text Preview</summary>
          <pre>{extractedPreview}</pre>
        </details>
      )}
    </div>
  );
};

export default FileUpload;
