import React, { useEffect, useState } from "react";


function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStates, setSelectedStates] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch("https://crio-location-selector.onrender.com/countries");
      const data = await res.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        );
        const data = await res.json();
        setStates(data);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry && selectedStates) {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedStates}/cities`
        );
        const data = await res.json();
        setCities(data);
      }
    };
    fetchCities();
  }, [selectedStates, selectedCountry]);

  return (
    <div>
      <select
        className="select-box"
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          setSelectedStates("");
          setSelectedCity("");
          setStates([]);
          setCities([]);
        }}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        className="select-box"
        value={selectedStates}
        onChange={(e) => {
          setSelectedStates(e.target.value);
          setSelectedCity("");
          setCities([]);
        }}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        className="select-box"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedStates}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCountry && selectedStates && selectedCity && (
        <p>
          You selected {selectedCity}, {selectedStates}, {selectedCountry}
        </p>
      )}
    </div>
  );
}

export default LocationSelector;