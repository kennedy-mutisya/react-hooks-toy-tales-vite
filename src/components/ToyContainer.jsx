import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} />
      ))}
    </div>
  );
}

export default ToyContainer;
