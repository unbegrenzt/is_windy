"use client";

import SearchBar from "@/components/molecules/SearchBar";
import WeatherCard from "@/components/organisms/WeatherCard";
import useStore from '@/store/useStore';

export default function Home() {
  const selectedResult = useStore((state) => state.selectedResult);

  return (
    <>
      <header className="flex flex-col justify-center items-center p-3">
        <h1 className="font-bold text-left self-start text-3xl">Weather App</h1>
        <SearchBar />
      </header>
      <main className="flex p-3 justify-center items-center">
        {selectedResult && <WeatherCard {...selectedResult} />}
      </main>
      <footer>
      </footer>
    </>
  );
}
