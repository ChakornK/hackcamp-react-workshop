import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Tier from "./components/Tier";

import initialData from "../data.json";

const colors = {
  A: "#ed8796",
  B: "#f6ad55",
  C: "#e0af68",
  D: "#a6da95",
  F: "#8aadf4",
};

function App() {
  const [tierA, setTierA] = useState([]);
  const [tierB, setTierB] = useState([]);
  const [tierC, setTierC] = useState([]);
  const [tierD, setTierD] = useState([]);
  const [tierF, setTierF] = useState([]);

  const [selectedTier, setSelectedTier] = useState("A");
  const [imgUrl, setImgUrl] = useState("");
  const [itemName, setItemName] = useState("");

  const [importData, setImportData] = useState("");

  const handleDataImport = useCallback((importData) => {
    const data = typeof importData === "string" ? JSON.parse(importData) : importData;
    setTierA(data.A || []);
    setTierB(data.B || []);
    setTierC(data.C || []);
    setTierD(data.D || []);
    setTierF(data.F || []);
  });
  useEffect(() => {
    if (initialData) {
      handleDataImport(JSON.stringify(initialData));
    }
  }, []);

  return (
    <div className="app">
      <div className="controls">
        <select
          name="Select tier"
          id="tier-select"
          onChange={(e) => {
            setSelectedTier(e.target.value);
          }}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
        <input
          type="text"
          placeholder="Item name"
          onInput={(e) => {
            setItemName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Image URL"
          onInput={(e) => {
            setImgUrl(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (!selectedTier || !itemName || !imgUrl) return alert("ts not right twin 🥀");
            const newItem = {
              name: itemName,
              image: imgUrl,
              key: Date.now() + crypto.randomUUID(),
            }; // You can change this to an object if needed
            if (selectedTier === "A") {
              setTierA([...tierA, newItem]);
            } else if (selectedTier === "B") {
              setTierB([...tierB, newItem]);
            } else if (selectedTier === "C") {
              setTierC([...tierC, newItem]);
            } else if (selectedTier === "D") {
              setTierD([...tierD, newItem]);
            } else if (selectedTier === "F") {
              setTierF([...tierF, newItem]);
            }
          }}
        >
          Add item
        </button>

        <hr />

        <textarea name="import-data" id="import-data" onChange={(e) => setImportData(e.target.value)} value={importData}></textarea>
        <button
          onClick={() => {
            try {
              handleDataImport(importData);
            } catch (e) {
              alert("ts pmo sm icl twin 🥀💔");
            }
          }}
        >
          Import
        </button>
        <button
          onClick={() => {
            const data = JSON.stringify({ A: tierA, B: tierB, C: tierC, D: tierD, F: tierF });
            navigator.clipboard.writeText(data);
            setImportData(data);
            alert("Copied to clipboard (W speed ❤️‍🩹)");
          }}
        >
          Export
        </button>
      </div>
      <div className="tierlist-scroll">
        <div className="tierlist-container">
          <Tier name="A" color={colors.A} items={tierA} setItems={setTierA} />
          <Tier name="B" color={colors.B} items={tierB} setItems={setTierB} />
          <Tier name="C" color={colors.C} items={tierC} setItems={setTierC} />
          <Tier name="D" color={colors.D} items={tierD} setItems={setTierD} />
          <Tier name="F" color={colors.F} items={tierF} setItems={setTierF} />
        </div>
      </div>
    </div>
  );
}

export default App;
