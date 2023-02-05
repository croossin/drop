import Layout from "@/components/common/Layout";
import Map from "@/components/map/Map";
import { Location } from "@/utils/mapbox";
import { redisClient } from "@/utils/redisClient";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  views: number;
  following: number;
  location: Location;
}

function ShortKey({ views, following, location }: Props) {
  const router = useRouter();
  const { shortKey } = router.query as { shortKey: string };
  return (
    <>
      <Head>
        <title>
          {location.geometry.coordinates[1]}, {location.geometry.coordinates[0]}
        </title>
      </Head>
      <Layout>
        <div>
          <div className="flex flex-row-reverse mb-4">
            <span className="inline-flex items-center rounded-md border-white/10 bg-gray-400/10 px-2.5 py-1 text-sm font-medium text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              {views} views
            </span>
          </div>
          <h1 className="text-3xl text-center">
            {location.geometry.coordinates[1]},{" "}
            {location.geometry.coordinates[0]}
          </h1>
          <div className="pt-4">
            <Map
              long={location.geometry.coordinates[0]}
              lat={location.geometry.coordinates[1]}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-8">
            <button
              type="button"
              className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `http://maps.google.com/maps?z=9&t=m&q=loc:${location.geometry.coordinates[1]}+${location.geometry.coordinates[0]}`,
                  "_blank"
                );
              }}
            >
              Directions
            </button>
            <button
              type="button"
              className=" rounded-md border border-white/10 bg-gray-400/10  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                try {
                  navigator.share({
                    url: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${shortKey}`,
                  });
                } catch (e) {
                  console.warn(
                    "Your browser doesn't support native share sheets"
                  );
                }
              }}
            >
              Share
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ShortKey;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.shortKey as string;

  // Fetch the short id from upstash
  const res = await redisClient.hgetall(query);

  // If we have something - redirect to the page
  if (!res) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  // Update view count
  await redisClient.hincrby(query, "views", 1);

  return {
    props: {
      views: Number(res.views) + 1,
      following: Number(res.following),
      location: JSON.parse(res.location),
    },
  };
};
