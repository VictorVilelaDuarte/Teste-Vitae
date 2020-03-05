import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './config/ReactotronConfig';

import GlobalStyle from './global';
import {
  Container,
  FilterRow,
  FilterInput,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from './styles';

function App() {
  const [person, setPerson] = useState([]);
  const [planet, setPlanet] = useState([]);
  const [film, setFilm] = useState([]);
  const [specie, setSpecie] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [eyes, setEyes] = useState('');
  const [hair, setHair] = useState('');
  const [nSpecie, setnSpecie] = useState('');
  const [nPlanet, setnPlanet] = useState('');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  async function searchPersons(url = 'https://swapi.co/api/people/') {
    await axios
      .get(url)
      .then(async resp => {
        resp.data.results.map(item => {
          const PersonObj = {
            name: item.name,
            films: item.films,
            planet: item.homeworld,
            species: item.species[0],
          };
          setPerson(personArray => [...personArray, PersonObj]);
        });
        if (resp.data.next) {
          searchPersons(resp.data.next);
        }
      })
      .catch(async e => console.log(e));
  }

  useEffect(async () => {
    async function searchSpecies(url = 'https://swapi.co/api/species/') {
      await axios
        .get(url)
        .then(async resp => {
          resp.data.results.map(item => {
            const SpecieObj = {
              name: item.name,
              url: item.url,
            };
            setSpecie(specieArray => [...specieArray, SpecieObj]);
          });
          if (resp.data.next) {
            searchSpecies(resp.data.next);
          } else {
            searchPersons();
          }
        })
        .catch(async e => console.log(e));
    }
    async function searchPlanets(url = 'https://swapi.co/api/planets/') {
      await axios
        .get(url)
        .then(async resp => {
          resp.data.results.map(item => {
            const PlanetObj = {
              name: item.name,
              url: item.url,
            };
            setPlanet(planetArray => [...planetArray, PlanetObj]);
          });
          if (resp.data.next) {
            searchPlanets(resp.data.next);
          } else {
            searchSpecies();
          }
        })
        .catch(async e => console.log(e));
    }
    async function searchFilms(url = 'https://swapi.co/api/films/') {
      await axios
        .get(url)
        .then(async resp => {
          resp.data.results.map(item => {
            const filmObj = {
              title: item.title,
              url: item.url,
            };
            setFilm(filmsArray => [...filmsArray, filmObj]);
          });
          searchPlanets();
        })
        .catch(async e => console.log(e));
    }

    searchFilms();
  }, []);

  async function toogleModal(index) {
    setModal(!modal);
    const id = index + 1;
    await axios
      .get(`https://swapi.co/api/people/${id}/`)
      .then(async resp => {
        setName(resp.data.name);
        setEyes(resp.data.eye_color);
        setHair(resp.data.hair_color);
        setnSpecie(resp.data.species[0]);
        setnPlanet(resp.data.homeworld);
      })
      .catch(async e => console.log(e));
  }

  return (
    <div>
      <GlobalStyle />
      <Container>
        <FilterRow>
          <FilterInput
            placeholder="Pesquise por nome"
            onChange={e => setsearchPerson(e.target.value)}
          />
          <FilterInput
            placeholder="Pesquise por planeta"
            onChange={e => setsearchPlanet(e.target.value)}
          />
          <FilterInput
            placeholder="Pesquise por filme"
            onChange={e => setsearchFilm(e.target.value)}
          />
          <FilterInput
            placeholder="Pesquise por espécie"
            onChange={e => setsearchSpecie(e.target.value)}
          />
        </FilterRow>

        <Table>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Planeta</TableHead>
            <TableHead>Filmes</TableHead>
            <TableHead>Especie</TableHead>
          </TableRow>
          <tbody>
            {person.map((i, index) => (
              <TableRow>
                <TableCell onClick={() => toogleModal(index)}>
                  {i.name}
                </TableCell>
                {planet.map(p =>
                  p.url === i.planet ? <TableCell>{p.name}</TableCell> : <></>
                )}
                <TableCell>
                  {i.films.map(pf =>
                    film.map(f =>
                      pf === f.url ? (
                        <>
                          {f.title}
                          <br />
                        </>
                      ) : (
                        <></>
                      )
                    )
                  )}
                </TableCell>
                {specie.map(s =>
                  s.url === i.species ? <TableCell>{s.name}</TableCell> : <></>
                )}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal style={customStyles} isOpen={modal} contentLabel="Example Modal">
        <button onClick={() => toogleModal()}>Fechar</button>
        <p>
          <b>Nome: </b> {name}
        </p>
        <p>
          <b>Cor dos olhos: </b>
          {eyes}
        </p>
        <p>
          <b>Cor do cabelo: </b>
          {hair}
        </p>
        {specie.map(s =>
          s.url === nSpecie ? (
            <p>
              <b>Espécie: </b> {s.name}
            </p>
          ) : (
            <></>
          )
        )}
        {planet.map(p =>
          p.url === nPlanet ? (
            <p>
              <b>Planeta natal: </b> {p.name}
            </p>
          ) : (
            <></>
          )
        )}
      </Modal>
    </div>
  );
}

export default App;
