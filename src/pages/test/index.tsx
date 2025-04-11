import AudioController from '@/components/audio-controller';
import React, { useState } from 'react';

const Test: React.FC = () => {
  const [audioFile, setAudioFile] = useState<Blob | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    } else {
      alert('Please upload a valid audio file.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Test Audio Upload</h1>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {audioFile && (
        <div className="mt-4">
          <AudioController source={audioFile} />
        </div>
      )}
    </div>
  );
};

export default Test;
