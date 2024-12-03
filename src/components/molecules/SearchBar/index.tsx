"use client";

import React from 'react';
import Input from '@/components/atoms/Input';
import ResultsList from '@/components/atoms/ResultsList';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useSearchOSM from '@/hooks/useSearchOSM';

import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("@/components/atoms/LottieAnimation"), {
  ssr: false,
});

const SearchBar: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const { results } = useSearchOSM(query);

  return (
    <div className="relative w-3/4 lg:max-w-96">
      <div className="flex items-center rounded-full border border-gray-300 p-2.5">
        {/* {loading ? ( */}
        <LottieAnimation />
        {/* // ) : (
        //   <FontAwesomeIcon icon={faSearch} className="mr-2" />
        // )} */}
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {results && results.length > 0 && (
        <div className="absolute z-10 w-full border bg-slate-500 border-gray-300 mt-4 rounded-lg">
          <ResultsList results={results} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
