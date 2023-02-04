import Layout from "@/components/common/Layout";
import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import Head from "next/head";
import { queryPlaces, Location } from "@/utils/mapbox";

function NewDrop() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [location, setLocation] = useState("");
  const [queryResults, setQueryResults] = useState<Array<Location>>([]);

  const search = useCallback(
    debounce(async (location) => {
      console.log("Searching: ", location);
      const locations = await queryPlaces(location);
      setQueryResults(locations);
    }, 300),
    []
  );

  useEffect(() => {
    if (location) {
      search(location);
    }
  }, [location]);

  useEffect(() => {
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
            id="text"
            ref={inputRef}
            type="text"
            className="block w-full rounded-r-[10px] rounded-l-[10px] pl-6 focus:ring-0 focus:outline-none focus:ring-offset-0 sm:text-sm min-h-[50px] lowercase text-black"
            placeholder={""}
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            autoComplete="off"
          />
          <div>
            <ul
              role="list"
              className="mt-3 grid grid-cols-1 gap-3  bg-transparent"
            >
              {queryResults &&
                location &&
                queryResults.map((result) => {
                  return (
                    <li
                      key={result.id}
                      className="col-span-1 flex rounded-md shadow-sm text-left bg-transparent"
                    >
                      <div className="flex flex-1 items-center justify-between truncate rounded-md border-t border-r border-b border-gray-200 bg-white">
                        <div className="flex-1 truncate px-4 py-2 text-sm">
                          <span className="font-medium text-gray-900 hover:text-gray-600">
                            {result.text}
                          </span>
                          <p className="text-gray-500 text-xs">
                            {result.properties.address}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default NewDrop;
