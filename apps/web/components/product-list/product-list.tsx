"use client";

import { useHatsContext } from "../../contexts/hats";
import { HatCard } from "../hat-card";

function ProductListSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <div
            key={i}
            className="bg-neutral-400/20 rounded-md shadow-md flex flex-col items-center w-[240px]"
          >
            <div className="p-2 w-full">
              <div className="bg-neutral-400/60 rounded-lg p-6 shadow-layers-skeleton w-full animate-pulse">
                <div className="w-full h-[222px]" />
              </div>
            </div>
            <div className="mt-4 p-2 w-full">
              <h5 className="w-full h-5 bg-neutral-400/60 rounded-lg animate-pulse"></h5>
              <div className="flex flex-col items-stretch justify-between flex-wrap w-full">
                <h5 className="w-1/2 h-4 bg-neutral-400/60 mt-2"></h5>
                <button className="bg-neutral-400/60 h-10 text-white/90 px-3 py-2 rounded-md mt-3 hover:bg-accent transition animate-pulse"></button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function ProductListErrored() {
  return <div />;
}

export function ProductList() {
  const { hats, isLoading, isError } = useHatsContext();

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
      <ProductListContent />
    </div>
  );

  function ProductListContent() {
    if (isLoading) {
      return <ProductListSkeleton />;
    }

    if (isError) {
      return <ProductListErrored />;
    }

    return (
      <>
        {hats.map((hat) => (
          <HatCard name={hat.name} price={hat.price} imageUrl={hat.imageUrl} />
        ))}
      </>
    );
  }
}
