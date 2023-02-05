import Globe from "@/components/common/Globe";
import Layout from "@/components/common/Layout";
import { defaultMapMarkers } from "@/static/DefaultMapMarkers";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Drop | Your next adventure</title>
        <meta name="description" content="Your next adventure awaits" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <div className="flex flex-col text-center">
            <div className="pt-16 md:pt-32">
              <h1 className="text-7xl font-semibold font-fjalla tracking-wider">
                Drop
              </h1>
              <h2 className="text-xl text-slate-400 pt-4 font-light">
                Your next adventure awaits
              </h2>
              <div className="mt-6">
                <Link
                  href="/new"
                  className="rounded-md border border-white/10 bg-gray-400/10  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                >
                  Create your drop
                </Link>
              </div>
            </div>
            <div>
              <Globe
                markers={defaultMapMarkers.map((x) => {
                  return { location: x, size: 0.05 };
                })}
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
