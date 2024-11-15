import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";

export const CommunitiesContext = createContext();

export const CommunitiesProvider = ({ children }) => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = Constants.expoConfig.extra.apiUrl;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/communities`);
        setCommunities(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <CommunitiesContext.Provider value={{ communities, loading, error }}>
      {children}
    </CommunitiesContext.Provider>
  );
};
