
import React from 'react';
import { UploadedFile } from '../types';
import { UploadIcon, FileIcon, ImageIcon } from './icons';

interface FileBrowserProps {
  files: UploadedFile[];
  selectedFile: UploadedFile | null;
  onFileSelect: (file: UploadedFile) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileBrowser: React.FC<FileBrowserProps> = ({ files, selectedFile, onFileSelect, onFileUpload }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-ch-accent-magenta" />;
    }
    return <FileIcon className="w-5 h-5 text-ch-text-secondary" />;
  };

  return (
    <div className="w-64 bg-ch-primary flex flex-col p-4 border-r border-ch-secondary">
      <h2 className="text-lg font-bold text-ch-text-primary mb-4">File Explorer</h2>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileUpload}
        className="hidden"
        multiple
      />
      <button
        onClick={handleUploadClick}
        className="flex items-center justify-center gap-2 w-full bg-ch-accent-magenta text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all mb-4"
      >
        <UploadIcon className="w-5 h-5" />
        Upload File
      </button>
      <div className="flex-grow overflow-y-auto pr-1">
        {files.length === 0 ? (
          <p className="text-ch-text-secondary text-sm text-center mt-4">Upload a file to get started.</p>
        ) : (
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                <button
                  onClick={() => onFileSelect(file)}
                  className={`w-full text-left p-2 my-1 rounded-md flex items-center gap-3 transition-colors ${
                    selectedFile?.id === file.id
                      ? 'bg-ch-accent-magenta/30 text-ch-text-primary'
                      : 'hover:bg-ch-secondary text-ch-text-secondary'
                  }`}
                >
                  <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                  <span className="truncate text-sm">{file.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileBrowser;
