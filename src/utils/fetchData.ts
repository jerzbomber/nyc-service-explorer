import toCapitalCase from "@/utils/toCapitalCase";

interface Resource {
  name_1: string;
  name_2: string;
  street_1: string;
  street_2: string;
  city: string;
  zip: string;
  phone: string;
  latitude: string;
  longitude: string;
  flag_mc: string;
  flag_md: string;
  flag_pi: string;
  flag_gl: string;
  flag_hv: string;
  flag_yad: string;
  website: string;
}

// Borough mapping
const boroughMapping: Record<string, string> = {
  // Manhattan
  "New York": "Manhattan",

  // Bronx
  Bronx: "Bronx",

  // Brooklyn
  Brooklyn: "Brooklyn",

  // Staten Island
  "Staten Island": "Staten Island",

  // Queens (Expanded List)
  "Addisleigh Park": "Queens",
  Arverne: "Queens",
  Astoria: "Queens",
  Auburndale: "Queens",
  Bayside: "Queens",
  "Bay Terrace": "Queens",
  Bayswater: "Queens",
  Beechhurst: "Queens",
  "Belle Harbor": "Queens",
  Bellerose: "Queens",
  "Breezy Point": "Queens",
  Briarwood: "Queens",
  "Broad Channel": "Queens",
  "Broadway–Flushing": "Queens",
  "Cambria Heights": "Queens",
  Chinatown: "Queens",
  "College Point": "Queens",
  Corona: "Queens",
  "Douglaston–Little Neck": "Queens",
  "East Elmhurst": "Queens",
  Edgemere: "Queens",
  Elmhurst: "Queens",
  "Far Rockaway": "Queens",
  "Floral Park": "Queens",
  Flushing: "Queens",
  "Forest Hills": "Queens",
  "Fresh Meadows": "Queens",
  "Fresh Pond": "Queens",
  Glendale: "Queens",
  "Glen Oaks": "Queens",
  Hammels: "Queens",
  Hillside: "Queens",
  Hollis: "Queens",
  Holliswood: "Queens",
  "Howard Beach": "Queens",
  "Jackson Heights": "Queens",
  Jamaica: "Queens",
  "Jamaica Estates": "Queens",
  "Jamaica Hills": "Queens",
  "Kew Gardens": "Queens",
  "Kew Gardens Hills": "Queens",
  Koreatown: "Queens",
  Laurelton: "Queens",
  "Locust Manor": "Queens",
  "Long Island City": "Queens",
  Maspeth: "Queens",
  Meadowmere: "Queens",
  "Middle Village": "Queens",
  Neponsit: "Queens",
  "Ozone Park": "Queens",
  Pomonok: "Queens",
  Queens: "Queens",
  "Queensboro Hill": "Queens",
  Queensbridge: "Queens",
  "Queens Village": "Queens",
  "Rego Park": "Queens",
  "Richmond Hill": "Queens",
  Ridgewood: "Queens",
  "Rochdale Village": "Queens",
  Rockaway: "Queens",
  "Rockaway Beach": "Queens",
  "Rockaway Park": "Queens",
  Rosedale: "Queens",
  Roxbury: "Queens",
  "St. Albans": "Queens",
  Seaside: "Queens",
  "South Jamaica": "Queens",
  "South Ozone Park": "Queens",
  "Springfield Gardens": "Queens",
  Sunnyside: "Queens",
  "Sunnyside Gardens": "Queens",
  "The Hole": "Queens",
  Whitestone: "Queens",
  "Willets Point": "Queens",
  Woodhaven: "Queens",
  Woodside: "Queens",
  "Wyckoff Heights": "Queens",
};

/**
 * Returns the borough of the given neighborhood (city).
 * @param {string} city - The neighborhood to get the borough of.
 * @returns {string} - The borough of the neighborhood.
 */
const getBorough = (city: string): string => {
  return boroughMapping[city] || city; // Default to capital-cased city if no match exists
};

/**
 * Fetches data from the API and normalizes it.
 * @returns {Promise<Array>} - The normalized data.
 */
const fetchData = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "");
  const data = await response.json();

  return data.map(
    ({
      name_1 = "",
      name_2 = "",
      street_1 = "",
      street_2 = "",
      city = "",
      phone,
      website,
      latitude = "0",
      longitude = "0",
    }: Resource) => {
      const normalizedCity = toCapitalCase(city.trim());

      return {
        name: `${name_1} ${name_2}`.trim(),
        address:
          [street_1, street_2].filter(Boolean).join(" ") +
          `, ${normalizedCity}`,
        city: normalizedCity,
        phone: phone || undefined,
        website: website || undefined,
        borough: getBorough(city),
        latitude: latitude,
        longitude: longitude,
      };
    }
  );
};

export default fetchData;
