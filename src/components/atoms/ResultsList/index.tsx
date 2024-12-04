"use client";

import React from 'react';
import { ResultsListProps } from './ResultList.types';
import useStore from '@/store/useStore';

const ResultsList: React.FC<ResultsListProps> = ({ results, onResultClick }) => {
  const setSelectedResult = useStore((state) => state.setSelectedResult);

  return (
    <ul>
      {results.map((result) => (
        <button
          key={result.place_id}
          className="p-2 border-b last:border-b-0 text-lg text-[#FAFAFA] cursor-pointer hover:bg-indigo-500 text-left w-full rounded-lg rounded-b-none last:rounded-b-lg"
          onClick={() => {
            setSelectedResult(result);
            onResultClick();
          }}
        >
          {result.display_name}
        </button>
      ))}
    </ul>
  );
};

export default ResultsList;
