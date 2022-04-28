import React, { useEffect, useState } from "react";
import Data from "./Data";

const Practice = () => {
  const [main, setMain] = useState([]);
  const [newMain, setNewMain] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [recav, setRecav] = useState("");
  const [recav1, setRecav1] = useState("");
  const [conf, setConf] = useState("");
  const [conf1, setConf1] = useState("");
  const fatchData = () => {
    let obj = [];
    Object.keys(Data).forEach((st) => {
      Object.keys(Data[st].districts).forEach((dis) => {
        const tol = Data[st].districts[dis].total;
        let confirmed = tol.confirmed;
        let recovered = tol.recovered;
        let vaccinated = tol.vaccinated1;
        // console.log(Data);
        if (confirmed === undefined) {
          confirmed = 0;
        }
        if (recovered === undefined) {
          recovered = 0;
        }
        if (vaccinated === undefined) {
          vaccinated = 0;
        }
        let ktn = {
          state: st,
          city: dis,
          recovered: recovered,
          confirmed: confirmed,
          vaccinated: vaccinated,
        };
        obj.push(ktn);
      });
    });
    setMain(obj);
    setNewMain(obj);
    // console.log(obj,"final");
  };

  useEffect(() => {
    fatchData();
  }, []);

  const fireClick = () => {
    const stateFilter = (a, b) => {
      return a.filter(
        (data1) => data1.state.toLowerCase().indexOf(b.toLowerCase()) !== -1
      );
    };
    var abc = stateFilter(main, state);
    setNewMain(abc);
    const cityFilter = (e, d) => {
      return e.filter(
        (data2) => data2.city.toLowerCase().indexOf(d.toLowerCase()) !== -1
      );
    };
    var def = cityFilter(abc, city);
    setNewMain(def);

    if (recav != 0 && recav1 != 0) {
      let a = recav;
      let b = parseInt(a);
      let c = recav1;
      let d = parseInt(c);
      if (b <= d) {
        let newAr = def.filter(
          (data) => data.recovered >= recav && data.recovered <= recav1
        );

        setNewMain(newAr);
      } else {
        alert("plz enter valid data");
      }
    } else {
      if (recav !== 0) {
        const recaveredFilter = (e) => {
          return e.filter((data) => data.recovered >= recav);
        };
        let klm = recaveredFilter(def, recav);
        setNewMain(klm);
      } else if (recav1 !== 0) {
        const recaveredFilter1 = (e) => {
          return e.filter((data) => data.recovered <= recav1);
        };
        let mno = recaveredFilter1(def, recav1);
        setNewMain(mno);
      }
    }

    // if (conf !== 0) {
    //   const confilter = (e) => {
    //     return e.filter((data) => data.confirmed >= conf);
    //   };
    //   let lom = confilter(def, conf);
    //   setNewMain(lom);
    // }
    // else if (conf1 !== 0) {
    //   const confilter = (e) => {
    //     return e.filter((data) => data.confirmed <= conf1);
    //   };
    //   let mom = confilter(def, conf1);
    //   setNewMain(mom);
    // }
  };
  return (
    <>
      <div>
        <h1>Covid-19 Data</h1>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>city</th>
              <th>recoverd</th>
              <th>confirmed</th>
              <th>vaccinated</th>
            </tr>
            <tr>
              <th>
                <input
                  type="text"
                  placeholder="enter state"
                  onChange={(event) => {
                    setState(event.target.value);
                  }}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="enter state"
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Greater recovered case"
                  onChange={(event) => {
                    setRecav(event.target.value);
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder=" less recovered case"
                  onChange={(event) => {
                    setRecav1(event.target.value);
                  }}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Greater confirmed"
                  onChange={(event) => {
                    setConf(event.target.value);
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder="Less confirmed"
                  onChange={(event) => {
                    setConf1(event.target.value);
                  }}
                />
              </th>
              <th>
                <input type="text" placeholder="Total vaccinated" />
              </th>
              <button onClick={fireClick}>Click</button>
            </tr>
            {newMain.map((val) => {
              return (
                <tr>
                  <th>{val.state}</th>
                  <th>{val.city}</th>
                  <th>{val.recovered}</th>
                  <th>{val.confirmed}</th>
                  <th>{val.vaccinated}</th>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    </>
  );
};

export default Practice;
