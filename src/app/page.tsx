"use client";

import { useEffect, useState } from "react";
import List from "@/components/List";
import Map from "@/components/Map";
import Filter from "@/components/Filter";
import fetchData from "@/utils/fetchData";
import removeSpacesAndCapitalize from "@/utils/removeSpacesAndCapitalize";

// Borough coordinates for map centering
const boroughCoordinates = {
  Manhattan: { lat: 40.7831, lng: -73.9712 },
  Brooklyn: { lat: 40.6782, lng: -73.9442 },
  Queens: { lat: 40.7282, lng: -73.7949 },
  Bronx: { lat: 40.8448, lng: -73.8648 },
  StatenIsland: { lat: 40.5795, lng: -74.1502 },
};

interface Record {
  name: string;
  address: string;
  phone?: string;
  website?: string;
  borough: string;
  latitude: number;
  longitude: number;
}

const Home = () => {
  const [data, setData] = useState<Record[]>([]);
  const [filteredData, setFilteredData] = useState<Record[]>([]);
  const [borough, setBorough] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
    boroughCoordinates.Manhattan
  ); // Default to Manhattan

  useEffect(() => {
    const getData = async () => {
      const records = await fetchData();
      setData(records);
      setFilteredData(records);
    };
    getData();
  }, []);

  useEffect(() => {
    if (borough) {
      const filteredData = data.filter((record) => record.borough === borough);
      setFilteredData(filteredData);
      // Update the map center when borough changes
      const nornalizedBorough = removeSpacesAndCapitalize(borough);
      const newCenter =
        boroughCoordinates[
          nornalizedBorough as keyof typeof boroughCoordinates
        ] || boroughCoordinates.Manhattan;
      setMapCenter(newCenter);
    } else {
      setFilteredData(data);
      setMapCenter(boroughCoordinates.Manhattan); // Default to Manhattan if no borough is selected
    }
  }, [borough, data]);

  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">NYC Service Explorer</h1>
      <Filter setBorough={setBorough} />
      <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <List data={filteredData} />
        <Map data={filteredData} mapCenter={mapCenter} />
      </div>
    </div>
  );
};

export default Home;
