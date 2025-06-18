import axios from "axios";
import { geoCode } from "../../../utils/geoCode";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { origin, destination } = await req.json();

  try {
    // fetching coordinates based on input locations
    const originCoords = await geoCode(origin);
    const destinationCoords = await geoCode(destination);

    if (!originCoords || !destinationCoords)
      return NextResponse.json(
        { message: "Invalid origin or destination" },
        { status: 400 }
      );
      
      // fetching distance between fetched coordinates
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/matrix/driving-car",
      {
        locations: [originCoords, destinationCoords],
        metrics: ["distance"],
      },
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const distance = response.data.distances?.[0]?.[1] / 1000;
    if (!distance)
      return NextResponse.json(
        { message: "Failed to fetch distance" },
        { status: 400 }
      );
      
    return NextResponse.json(
      { data: distance, message: "Distance fetched successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
