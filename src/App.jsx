import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [locations, setLocations] = useState([]);
  const [total_sqft, setTotal_sqft] = useState(1000);
  const [bhk, setBhk] = useState(2);
  const [bath, setBath] = useState(2);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");

  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${backend}/get_location_names`);
        setLocations(res.data.locations);
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchLocations();
  }, [location]);

  const onClickedEstimatePrice = async () => {
    try {
      const formData = new FormData();
      formData.append("total_sqft", total_sqft);
      formData.append("bhk", bhk);
      formData.append("bath", bath);
      formData.append("location", selectedLocation);

      const res = await axios.post(`${backend}/predict_home_price`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(bhk, bath, total_sqft, selectedLocation);
      setEstimatedPrice(res.data.estimated_price);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handler for location selection

  return (
    <>
      <div className="app">
        <div className="img"></div>
        <form className="form">
          <h2>Area (Square Feet)</h2>
          <input
            className="area"
            type="text"
            id="uiSqft"
            name="Squareft"
            defaultValue={1000}
            onChange={(e) => setTotal_sqft(e.target.value)}
          />
          <h2>BHK</h2>
          <div className="switch-field">
            <input
              type="radio"
              id="radio-bhk-1"
              name="uiBHK"
              value={1}
              checked={bhk === 1}
              onChange={() => setBhk(1)}
            />
            <label htmlFor="radio-bhk-1">1</label>
            <input
              type="radio"
              id="radio-bhk-2"
              name="uiBHK"
              value={2}
              checked={bhk === 2}
              onChange={() => setBhk(2)}
            />
            <label htmlFor="radio-bhk-2">2</label>
            <input
              type="radio"
              id="radio-bhk-3"
              name="uiBHK"
              value={3}
              checked={bhk === 3}
              onChange={() => setBhk(3)}
            />
            <label htmlFor="radio-bhk-3">3</label>
            <input
              type="radio"
              id="radio-bhk-4"
              name="uiBHK"
              value={4}
              checked={bhk === 4}
              onChange={() => setBhk(4)}
            />
            <label htmlFor="radio-bhk-4">4</label>
            <input
              type="radio"
              id="radio-bhk-5"
              name="uiBHK"
              value={5}
              checked={bhk === 5}
              onChange={() => setBhk(5)}
            />
            <label htmlFor="radio-bhk-5">5</label>
          </div>
        </form>

        <form className="form">
          <h2>Bath</h2>
          <div className="switch-field">
            <input
              type="radio"
              id="radio-bath-1"
              name="uiBathrooms"
              value={1}
              checked={bath === 1}
              onChange={() => setBath(1)}
            />
            <label htmlFor="radio-bath-1">1</label>
            <input
              type="radio"
              id="radio-bath-2"
              name="uiBathrooms"
              value={2}
              checked={bath === 2}
              onChange={() => setBath(2)}
            />
            <label htmlFor="radio-bath-2">2</label>
            <input
              type="radio"
              id="radio-bath-3"
              name="uiBathrooms"
              value={3}
              checked={bath === 3}
              onChange={() => setBath(3)}
            />
            <label htmlFor="radio-bath-3">3</label>
            <input
              type="radio"
              id="radio-bath-4"
              name="uiBathrooms"
              value={4}
              checked={bath === 4}
              onChange={() => setBath(4)}
            />
            <label htmlFor="radio-bath-4">4</label>
            <input
              type="radio"
              id="radio-bath-5"
              name="uiBathrooms"
              value={5}
              checked={bath === 5}
              onChange={() => setBath(5)}
            />
            <label htmlFor="radio-bath-5">5</label>
          </div>

          <h2>Location</h2>
          <div>
            <select
              className="location"
              name=""
              id="uiLocations"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="" disabled="disabled" selected="selected">
                Choose a Location
              </option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <button
            className="submit"
            onClick={() => onClickedEstimatePrice()}
            type="button"
          >
            Estimate Price
          </button>
          <div id="uiEstimatedPrice" className="result">
            {" "}
            {estimatedPrice}
            <h2 />{" "}
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
