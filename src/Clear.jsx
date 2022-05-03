import React, { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import _ from "lodash";

export const Clear = () => {
  const vaccineGRef = useRef(null);
  const vaccineLRef = useRef(null);
  const [storeData, setStoreData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [minVaccinatedValue, setMinVaccinatedValue] = useState(0);
  const [greaterVaccine, setGreaterVaccine] = useState(0);
  const [LessVaccine, setLessVaccine] = useState(0);
  const [lessRecovered, setLessRecovered] = useState(0);
  const [greaterThenRecovered, setGreaterThenRecovered] = useState(0);
  const [minRecoveredValue, setMinRecoveredValue] = useState(0);
  const [greaterThenConfirmed, setGreaterThenConfirmed] = useState(0);
  const [lessThenConfirmed, setLessThenConfirmed] = useState(0);
  const [minConfirmedValue, setMinConfirmedValue] = useState(0);

  const CovidDataFetch = async () => {
    const Data = await fetch(
      "https://data.covid19india.org/v4/min/data.min.json"
    );

    // console.log(Data, "Data loggg");
    const Response = await Data.json();
    // console.log(Response, "Response");

    let array = [];
    let minVaccinated = 0;
    let minRecovered = 0;
    let minConfirmed = 0;

    Object.keys(Response).map((State) => {
      "districts" in Response[State] &&
        Object.keys(Response[State].districts).map((Districts) => {
          // console.log(Response, "Districts");
          let vaccinated =
            Response[State].districts[Districts]?.total?.vaccinated1;
          let Recovered =
            Response[State].districts[Districts]?.total?.recovered;
          let Confirmed =
            Response[State].districts[Districts]?.total?.confirmed;
          if (vaccinated === undefined) {
            vaccinated = 0;
          }
          if (Recovered === undefined) {
            Recovered = 0;
          }
          if (Confirmed === undefined) {
            Confirmed = 0;
          }
          let Object = {
            State: State,
            Districts: Districts,
            vaccinated: vaccinated,
            Recovered: Recovered,
            Confirmed: Confirmed,
          };
          minVaccinated =
            minVaccinated <= vaccinated ? vaccinated : minVaccinated;
          minRecovered = minRecovered <= Recovered ? Recovered : minRecovered;
          minConfirmed = minConfirmed <= Confirmed ? Confirmed : minConfirmed;
          array.push(Object);
        });
    });
    setMinVaccinatedValue(minVaccinated);
    setMinRecoveredValue(minRecovered);
    setMinConfirmedValue(minConfirmed);
    setStoreData(array);
    setFilterData(array);
  };

  const CovidError = () => {
    try {
      CovidDataFetch();
    } catch (err) {
      console.log(err.stack);
    }
  };

  useEffect(() => {
    CovidError();
  }, []);
  ///////-------------------------------------    Filter start     ------------------------------------////

  ///////-------------------------------------   state Filter     ------------------------------------////
  const FilterState = (a, b) => {
    return a.filter((data) =>
      data.State.toLowerCase().includes(b.toLowerCase())
    );
  };
  ///////-------------------------------------   District Filter     ------------------------------------////
  const FilterDistrict = (a, b) => {
    return a.filter((data) =>
      data.Districts.toLowerCase().includes(b.toLowerCase())
    );
  };
  ///////-------------------------------------   Sort For Vaccine    ------------------------------------////
  const SortByVaccinated = (data) => {
    return data.sort((a, b) => a.vaccinated - b.vaccinated);
  };
  ///////-------------------------------------   Sort For Recovered    ------------------------------------////
  const SortByRecovered = (data) => {
    return data.sort((a, b) => a.Recovered - b.Recovered);
  };
  ///////-------------------------------------   Sort For Confirmed    ------------------------------------////
  const SortByConfirmed = (data) => {
    return data.sort((a, b) => a.Confirmed - b.Confirmed);
  };

  ///////-------------------------------------   End Filter    ------------------------------------////\

  ///////-------------------------------------  start  Button    ------------------------------------////

  const clickMe = (change, update) => {
    let state = filterData;
    let isError = false;
    ///////-------------------------------------   {state} Change     ------------------------------------////
    let stateValue =
      update == "StateClick" ? change.trim() : stateFilter.trim();
    if (!/[^a-zA-Z]/.test(stateValue)) {
      state = FilterState(filterData, stateValue);
    }
    ///////-------------------------------------   District Change     ------------------------------------////
    let districtValue =
      update == "DistrictClick" ? change.trim() : districtFilter.trim();
    if (!/[^a-zA-Z]/.test(districtValue)) {
      state = FilterDistrict(state, districtValue);
    }

    ///////-------------------------------------   Vaccine Change     ------------------------------------////
    if (update == "VaccineGreater") {
      setGreaterVaccine(change != "" ? parseInt(change) : 0);
    }
    if (update == "VaccineLess") {
      setLessVaccine(change != "" ? parseInt(change) : 0);
    }
    let VaccineGreater =
      update == "VaccineGreater"
        ? parseInt(change.trim())
        : greaterVaccine == ""
        ? 0
        : greaterVaccine;
    let LessGreater =
      update == "VaccineLess"
        ? parseInt(change.trim())
        : LessVaccine == ""
        ? minVaccinatedValue
        : LessVaccine;
    if (LessGreater >= VaccineGreater) {
      vaccineGRef.current.style.borderColor = "black";
      if (!/[^0-9]/.test(VaccineGreater)) {
        state = state.filter((item) => item.vaccinated >= VaccineGreater);
        state = state.filter((item) => LessGreater > item.vaccinated);
        if (change) {
          state = SortByVaccinated(state);
        }
      }
    } else {
      vaccineGRef.current.style.borderColor = "red";
      isError = true;
      alert("Invalid Value");
    }

    ///////-------------------------------------   Recovered Change     ------------------------------------////
    if (update == "LessRecovered") {
      setLessRecovered(change != "" ? parseInt(change) : 0);
    }
    if (update == "GreaterRecovered") {
      setGreaterThenRecovered(change != "" ? parseInt(change) : 0);
    }
    let GreaterRecovered =
      update == "GreaterRecovered"
        ? parseInt(change.trim())
        : greaterThenRecovered == ""
        ? 0
        : greaterThenRecovered;
    let LessRecovered =
      update == "LessRecovered"
        ? parseInt(change.trim())
        : lessRecovered == ""
        ? minRecoveredValue
        : lessRecovered;
    if (LessRecovered >= GreaterRecovered) {
      if (!/[^0-9]/.test(GreaterRecovered)) {
        state = state.filter((item) => item.Recovered >= GreaterRecovered);
        state = state.filter((item) => LessRecovered > item.Recovered);
        if (change) {
          state = SortByRecovered(state);
        }
      }
    } else {
      alert("Invalid Value");
    }
    ///////-------------------------------------   Confirmed Change     ------------------------------------////
    if (update == "GreaterConfirmed") {
      setGreaterThenConfirmed(change != "" ? parseInt(change) : 0);
    }
    if (update == "LessConfirmed") {
      setLessThenConfirmed(change != "" ? parseInt(change) : 0);
    }
    let GreaterConfirmed =
      update == "GreaterConfirmed"
        ? parseInt(change.trim())
        : greaterThenConfirmed == ""
        ? 0
        : greaterThenConfirmed;
    let LessConfirmed =
      update == "LessConfirmed"
        ? parseInt(change.trim())
        : lessThenConfirmed == ""
        ? minConfirmedValue
        : lessThenConfirmed;
    if (LessConfirmed >= GreaterConfirmed) {
      if (!/[^0-9]/.test(GreaterConfirmed)) {
        state = state.filter((item) => item.Confirmed >= GreaterConfirmed);
        state = state.filter((item) => LessConfirmed > item.Confirmed);
        if (change) {
          state = SortByConfirmed(state);
        }
      }
    } else {
      alert("Invalid Value");
    }
    setStoreData(state);
  };

  ///////-------------------------------------  End  Button    ------------------------------------////
  return (
    <div style={{ padding: "0px 10%", marginTop: "10%" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              State <br />
              <input
                type="text"
                onChange={(e) => {
                  setStateFilter(e.target.value);
                  clickMe(e.target.value, "StateClick");
                }}
              />
            </th>

            <th>
              City <br />
              <input
                type="text"
                onChange={(e) => {
                  setDistrictFilter(e.target.value);
                  clickMe(e.target.value, "DistrictClick");
                }}
              />
            </th>
            <th>
              <input
                ref={vaccineLRef}
                placeholder="Less"
                type="text"
                onChange={_.debounce((e) => {
                  clickMe(e.target.value, "VaccineLess");
                })}
              />
              <br />
              {"> vaccinated <"} <br />
              <input
                ref={vaccineGRef}
                placeholder="Greater"
                type="text"
                onChange={_.debounce((e) => {
                  clickMe(e.target.value, "VaccineGreater");
                })}
              />
            </th>
            <th>
              <input
                type="number"
                placeholder="Less"
                onChange={_.debounce((e) => {
                  clickMe(e.target.value, "LessRecovered");
                }, 500)}
              />
              <br />
              {" > recovered <"}
              <br />
              <input
                type="number"
                placeholder="Greater"
                onChange={_.debounce((e) => {
                  clickMe(e.target.value, "GreaterRecovered");
                }, 500)}
              />
            </th>

            <th>
              <input
                type="number"
                placeholder="Less"
                onChange={_.debounce((e) => {
                  clickMe(e.target.value, "LessConfirmed");
                }, 500)}
              />
              <br />
              {"> confirmed <"}
              <br />
              <input
                type="number"
                placeholder="Greater"
                onChange={_.debounce((e) => {
                  clickMe(e.target.value, "GreaterConfirmed");
                }, 500)}
              />
            </th>
          </tr>
          <Button
            type="submit"
            style={{ margin: "20px 0px" }}
            onClick={() => clickMe()}
          >
            Search
          </Button>
        </thead>
        <tbody>
          {storeData.length > null ? (
            storeData.map((Item, keys) => {
              return (
                <tr key={keys + "CovidData"}>
                  <td>{Item.State} </td>
                  <td>{Item.Districts}</td>
                  <td>{Item.vaccinated}</td>
                  <td>{Item.Recovered}</td>
                  <td>{Item.Confirmed}</td>
                </tr>
              );
            })
          ) : (
            <div>Data not Found</div>
          )}
        </tbody>
      </Table>
    </div>
  );
};
