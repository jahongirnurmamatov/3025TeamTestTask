import { useState } from "react";
import "./generateUrl.css";
import useUrlStore from "../store/useUrlStore";

export const GenerateUrl = () => {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiresIn, setExpiresIn] = useState("");

  const { shortenUrl, shortUrl, isShortening,error } = useUrlStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await shortenUrl(url, alias, expiresIn);
  };

  return (
    <div className="container">
      <h1>Short URL Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="input">Enter Url</label>
          <input
            onChange={(e) => setUrl(e.target.value)}
            required
            type="text"
            placeholder="Type your url..."
          />
        </div>
        <div className="input">
          <label htmlFor="input">Optional Alias</label>
          <input
            onChange={(e) => setAlias(e.target.value)}
            type="text"
            placeholder="Type your alias..."
          />
        </div>
        <div className="input">
          <label htmlFor="input">Expires in hours</label>
          <input
            onChange={(e) => setExpiresIn(e.target.value)}
            type="number"
            placeholder="Enter hours"
          />
        </div>
        <button disabled={isShortening} className="generate">
          Shorten
        </button>
      </form>
      <hr />
      <div className="result">
        <h2>Result:</h2>
        <div className="short-url-input">
          <p>{shortUrl}</p>
          {error&& <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default GenerateUrl;
