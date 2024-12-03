"use client";

import React from 'react';

interface OSMResponseObj {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
}

interface ResultsListProps {
  results: OSMResponseObj[];
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  return (
    <ul>
      {results.map((result) => (
        <li key={result.place_id} className="p-2 border-b last:border-b-0 text-lg text-[#FAFAFA] cursor-default hover:bg-indigo-500">
          {result.display_name}
        </li>
      ))}
    </ul>
  );
};

export default ResultsList;
