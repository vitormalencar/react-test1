import React, { useEffect, useState } from "react";
import faker from "faker";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get("repositories");
      setRepositories(data);
    }
    fetchData();
  }, []);

  async function handleAddRepository() {
    let techs = faker.random.words().split(" ");
    const { data } = await api.post("repositories", {
      title: faker.internet.userName(),
      url: faker.internet.url(),
      techs: techs,
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repoList = repositories.filter((repo) => repo.id !== id);

    setRepositories(repoList);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            <h1>{repo.title}</h1>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
