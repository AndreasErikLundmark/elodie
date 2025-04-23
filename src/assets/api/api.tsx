// import { ahrefResponseObject, textResponseObject } from "../types/types";
// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const GET_URL = "https://audiostreamer-697604347968.us-central1.run.app/audio/";

export const fetchSong = async (song_name: string): Promise<string> => {
    const urlWithParams = GET_URL + encodeURIComponent(song_name);
  
    try {
      const response = await fetch(urlWithParams, {
        method: "GET",
        headers: {
          Range: "bytes=0-1023",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch song. Status: ${response.status}`);
      }
  
      const blob = await response.blob(); 
      return URL.createObjectURL(blob); 
    } catch (error) {
      console.error("Error fetching song:", error);
      throw error;
    }
  };
  
