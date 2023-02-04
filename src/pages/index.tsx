import Globe from "@/components/common/Globe";
import Layout from "@/components/common/Layout";
import { defaultMapMarkers } from "@/static/DefaultMapMarkers";
import Head from "next/head";

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
            <div className="pt-32">
              <h1 className="text-7xl font-semibold">Drop</h1>
              <h2 className="text-xl text-slate-400 pt-4">
                Your next adventure awaits
              </h2>
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
