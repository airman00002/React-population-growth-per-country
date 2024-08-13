import axios from 'axios'

export const fetchPopulationData = () => {


    return axios.get("https://population-growth-per-country.up.railway.app/populationGrowthPerCountry")
    .then(response => response.data)
    .catch (error => {
    console.error("Error fatch data from spring service", error);
    throw error;
  });
};
