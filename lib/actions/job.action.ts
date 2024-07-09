"use server";
import { JobFilterParams } from "./shared.types";

interface Country {
  name: {
    common: string;
  };
}

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const result: Country[] = await response.json();

    // Sort countries alphabetically by name
    result.sort((a: Country, b: Country) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchLocation = async (): Promise<string> => {
  const response = await fetch("http://ip-api.com/json/?fields=country");
  const location = await response.json();
  return location.country;
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { page, query } = filters;
  console.log("fetchJobs query:", query);

  const headers: Record<string, string> = {
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
  if (apiKey) {
    headers["X-RapidAPI-Key"] = apiKey;
  }

  const options = {
    method: "GET",
    headers,
  };

  const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`;

  const response = await fetch(url, options);

  const result = await response.json();

  return result.data;
};
