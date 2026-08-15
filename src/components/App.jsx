import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET - Fetch all toys when the application loads
  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  // Show or hide the toy form
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // POST - Create a new toy
  function handleAddToy(newToy) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((createdToy) => {
        setToys((currentToys) => [...currentToys, createdToy]);
        setShowForm(false);
      });
  }

  // DELETE - Donate a toy
  function handleDeleteToy(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((currentToys) => currentToys.filter((toy) => toy.id !== id));
    });
  }

  // PATCH - Increase a toy's likes
  function handleLikeToy(toy) {
    const updatedToy = {
      ...toy,
      likes: toy.likes + 1,
    };

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedToy.likes,
      }),
    })
      .then((response) => response.json())
      .then((updatedToyFromServer) => {
        setToys((currentToys) =>
          currentToys.map((currentToy) =>
            currentToy.id === updatedToyFromServer.id
              ? updatedToyFromServer
              : currentToy,
          ),
        );
      });
  }

  return (
    <>
      <Header />

      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;
