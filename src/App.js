import logo from "./logo.svg";
import "./App.css";
import { useReducer, useState } from "react";
import { reducer } from "./reducer";

const initialState = {
  data: "",
  loading: false,
  error: "",
};

function App() {
  // const [data, setData] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, error } = state;

  const fetchDog = () => {
    // setLoading(true);
    // setError("");
    // setData("");

    dispatch({ type: "FETCH_START" });

    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // setLoading(false);
        // setData(res.message);
        dispatch({ type: "FETCH_SUCCESS", payload: res.message });
      })
      .catch((e) => {
        // setLoading(false);
        // setError("Error fetching data: " + e);
        dispatch({ type: "FETCH_ERROR", payload: "Error fetching data" });
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={fetchDog} disabled={loading}>
          Fetch Dog
        </button>
        {data && (
          <div>
            <img src={data} alt="Randomdog" />
          </div>
        )}
        {error && <p>{error}</p>}
      </header>
    </div>
  );
}

export default App;
