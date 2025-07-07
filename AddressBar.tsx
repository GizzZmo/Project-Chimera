
import React, { useState } from 'react';
import Spinner from './Spinner';
import { SearchIcon } from './icons';

interface AddressBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const AddressBar: React.FC<AddressBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-grow max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-ch-text-secondary" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question or enter a topic to search the web..."
          className="w-full bg-ch-primary border border-ch-secondary text-ch-text-primary rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-ch-accent-magenta"
          disabled={isLoading}
        />
        {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Spinner />
            </div>
        )}
      </div>
    </form>
  );
};

export default AddressBar;
