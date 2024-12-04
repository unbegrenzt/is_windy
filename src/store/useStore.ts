// src/store/useStore.ts
import { OSMResponseObj } from '@/components/atoms/ResultsList/ResultList.types';
import { ForecastData } from '@/utils/Interfaces';
import { create } from 'zustand';

interface StoreState {
  selectedResult: OSMResponseObj | null;
  setSelectedResult: (result: OSMResponseObj) => void;
  forecastData: ForecastData[];
  setForecastData: (data: ForecastData[]) => void;
}

const useStore = create<StoreState>((set) => ({
  selectedResult: null,
  setSelectedResult: (result) => set({ selectedResult: result }),
  forecastData: [],
  setForecastData: (data) => set({ forecastData: data }),
}));

export default useStore;
