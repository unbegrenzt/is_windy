import SearchBar from "@/components/molecules/SearchBar";

export default function Home() {
  return (
    <>
      <header className="flex flex-col justify-center items-center p-3">
        <h1 className="font-bold text-left self-start text-3xl">Weather App</h1>
        <SearchBar />
      </header>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

        </footer>
      </div>
    </>
  );
}
