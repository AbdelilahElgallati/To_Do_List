/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import Lottie from "lottie-react";
import doneAnimation from "../../animations/done.json";

const Home = () => {
  const nbTacheAfaire = () => {
    const tachesAFaire = tache.filter((item) => item.etat === "à faire");
    return tachesAFaire.length;
  };

  const [tache, setTache] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/taches/")
      .then((res) => {
        setTache(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [filtre, setFiltre] = useState(tache);
  const filtrage = (tache) => {
    switch (filtre) {
      case "toutes":
        return true;
      case "aFaire":
        return tache.etat === "à faire";
      case "completes":
        return tache.etat === "complétée";
      default:
        return true;
    }
  };

  function handelDelete(id) {
    console.log(id);
    axios
      .delete("http://localhost:3000/taches/delete/" + id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "fr-FR",
      options
    );
    return formattedDate;
  };

  return (
    <div className="home-page">
      <div className="filtrageTache">
        <button onClick={() => setFiltre("toutes")}>Toutes les tâches</button>
        <button onClick={() => setFiltre("aFaire")}>Les tâches à faire</button>
        <button onClick={() => setFiltre("completes")}>
          Les tâches complétées
        </button>
      </div>
      <div className="liste-tache">
        <h2 style={{ textAlign: "center" }}>
          Le nombre de tâches à faire est {nbTacheAfaire()}
        </h2>

        {tache.filter(filtrage).map((item) => {
          if (item.etat !== "à faire") {
            return (
              <article key={item._id}>
                <p style={{ display: "flex", fontSize: "18px" }}>
                  <Lottie
                    loop={false}
                    style={{ height: 26 }}
                    animationData={doneAnimation}
                  />
                  {item.tache}
                </p>
                <div style={{ display: "flex" }}>
                  <p>{formatDate(item.date_fin)}</p>
                  <Link to={`update/${item._id}`} className="upd">
                    Update
                  </Link>
                  <button className="del">Supprimer</button>
                </div>
              </article>
            );
          } else {
            const currentDate = new Date();
            if (new Date(item.date_fin) < currentDate) {
              return (
                <article 
                  className="datePasse"
                  key={item._id}
                >
                  <p>{item.tache}</p>
                  <div style={{ display: "flex" }}>
                    <p style={{ borderBottom: "2px solid red" }}>{formatDate(item.date_fin)}</p>
                    <Link to={`update/${item._id}`} className="upd">
                      Update
                    </Link>
                    <button
                      className="del"
                      onClick={(e) => handelDelete(item._id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </article>
              );
            } else {
              return (
                <article key={item._id}>
                  <p>{item.tache}</p>
                  <div style={{ display: "flex" }}>
                    <p>{formatDate(item.date_fin)}</p>
                    <Link to={`update/${item._id}`} className="upd">
                      Update
                    </Link>
                    <button
                      className="del"
                      onClick={(e) => handelDelete(item._id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </article>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default Home;
