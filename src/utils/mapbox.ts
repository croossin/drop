import axios from "axios";

const networking = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
});

export const queryPlaces = async (query: string): Promise<Array<Location>> => {
  const resp = await networking.get(`/${query}.json`, {
    params: {
      types: "poi",
      access_token: process.env.NEXT_PUBLIC_MAPBOX_API,
    },
  });
  return resp.data.features;
};

// Mapbox types
export interface Location {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface Context {
  id: string;
  text: string;
  wikidata?: string;
  short_code?: string;
}

export interface Geometry {
  coordinates: number[];
  type: string;
}

export interface Properties {
  foursquare: string;
  landmark: boolean;
  address: string;
  category: string;
}
