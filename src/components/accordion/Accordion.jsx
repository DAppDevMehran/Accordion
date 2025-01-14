import { useState } from "react";
import data from "./data.js";
import "./styles.css";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (id) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const toggleMultiSelection = () => {
    setEnableMultiSelection((prev) => !prev);
  };

  const handleMultiSelection = (id) => {
    setMultiple((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <div className="wrapper">
      <button onClick={toggleMultiSelection}>
        {enableMultiSelection
          ? "Disable Multi Selection"
          : "Enable Multi Selection"}
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div className="item" key={item.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(item.id)
                    : () => handleSingleSelection(item.id)
                }
                className="title"
              >
                <h3>{item.question}</h3>
                <span>
                  {enableMultiSelection
                    ? multiple.includes(item.id)
                      ? "-"
                      : "+"
                    : selected === item.id
                    ? "-"
                    : "+"}
                </span>
              </div>
              {enableMultiSelection && multiple.includes(item.id) && (
                <div className="content">{item.answer}</div>
              )}
              {!enableMultiSelection && selected === item.id && (
                <div className="content">{item.answer}</div>
              )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}
