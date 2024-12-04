"use client";

import React from 'react';
import Input from '@/components/atoms/Input';
import ResultsList from '@/components/atoms/ResultsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useSearchOSM from '@/hooks/useSearchOSM';

import dynamic from "next/dynamic";

const LoadingAnimationNoSSR = dynamic(() => import("@/components/atoms/LoadingAnimation"), {
  ssr: false,
});

const SearchBar: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [isResultsVisible, setIsResultsVisible] = React.useState(true);
  const { results, loading } = useSearchOSM(query);

  const handleResultClick = () => {
    setIsResultsVisible(false);
  };

  return (
    <div className="relative w-3/4 lg:max-w-96">
      <div className="flex items-center rounded-full border border-gray-300 p-2.5">
        {loading ? (
          <LoadingAnimationNoSSR />
        ) : (
          <FontAwesomeIcon icon={faSearch} className="mr-2" data-testid="search-icon" />
        )}
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsResultsVisible(true)
          }}
          onFocus={() => setIsResultsVisible(true)}
        />
      </div>
      {isResultsVisible && results && results.length > 0 && (
        <div className="absolute z-10 w-full border bg-slate-500 border-gray-300 mt-4 rounded-lg">
          <ResultsList results={results} onResultClick={handleResultClick} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
