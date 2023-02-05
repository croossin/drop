import Layout from "@/components/common/Layout";
import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import Head from "next/head";
import { queryPlaces, Location } from "@/utils/mapbox";
import Map from "@/components/map/Map";

function NewDrop() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [locationQuery, setLocationQuery] = useState("");
  const [queryResults, setQueryResults] = useState<Array<Location>>([]);

  const search = useCallback(
    debounce(async (locationQuery) => {
      const locations = await queryPlaces(locationQuery);
      setSelectedLocation(null);
      setQueryResults(locations);
    }, 300),
    []
  );

  useEffect(() => {
    if (locationQuery) {
      search(locationQuery);
    }
  }, [locationQuery]);

  useEffect(() => {
    // Focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Head>
        <title>New Drop</title>
      </Head>
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl text-left pb-4">Enter your drop location</h1>
          <input
            ref={inputRef}
            type="text"
            required
            className="w-full min-w-0 h-12 appearance-none rounded-md border-white/10 bg-gray-400/10 px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base leading-7 text-white placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
            value={selectedLocation ? selectedLocation.text : locationQuery}
            onChange={(e) => {
              setLocationQuery(e.target.value);
            }}
            placeholder="Javier's"
          />
          <div>
            <ul
              role="list"
              className="mt-3 grid grid-cols-1 gap-3  bg-transparent"
            >
              {queryResults &&
                locationQuery &&
                !selectedLocation &&
                queryResults.map((result) => {
                  return (
                    <li
                      key={result.id}
                      className="col-span-1 flex rounded-md shadow-sm text-left bg-transparent hover:cursor-pointer"
                      onClick={() => {
                        setSelectedLocation(result);
                      }}
                    >
                      <div className="flex flex-1 items-center justify-between truncate rounded-md border border-b border-white/10 bg-gray-400/10">
                        <div className="flex-1 truncate px-4 py-2 text-sm">
                          <span className="font-medium text-white hover:text-gray-600">
                            {result.text}
                          </span>
                          <p className="text-gray-400 text-xs">
                            {result.properties.address}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          {selectedLocation && (
            <div className="mt-8">
              <div>
                <h1 className=" text-3xl">
                  {selectedLocation.geometry.coordinates[1]},{" "}
                  {selectedLocation.geometry.coordinates[0]}
                </h1>
              </div>
              <div className="mt-2">
                <Map
                  long={selectedLocation.geometry.coordinates[0]}
                  lat={selectedLocation.geometry.coordinates[1]}
                />
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default NewDrop;
