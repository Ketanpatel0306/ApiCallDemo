import React, { useEffect, useState } from "react";
import Data from "./Data";

const App = () => {
  const [num, setNum] = useState([]);
  const [plus, setPlus] = useState("");
  // city search field
  const [secound, setSecound] = useState("");
  const [sim, setSim] = useState("");

  const fatchData = () => {
    let Arr = [];
    Object.keys(Data).forEach((curElm) => {
      Object.keys(Data[curElm].districts).forEach((curElm1) => {
        let val = Data[curElm].districts[curElm1].total;
        let a = val.confirmed;

        let b = val.deceased;

        let d = val.tested;

        let e = val.vaccinated1;

        const main = {
          State: curElm,
          City: curElm1,
          confirmed: a,
          deceased: b,
          tested: d,
          vaccinated: e,
        };
        Arr.push(main);
      });
    });
    console.log(Arr, "push Arr");
    setNum(Arr);
  };

  useEffect(() => {
    fatchData();
  }, []);

  const onFire = () => {
    console.log("");
    let mop = [];
    Object.keys(Data).forEach((a) => {
      Object.keys(Data[a].districts).forEach((val) => {
        // console.log(a)

        var xyz = Data[a].districts[val].total;
        let p = xyz.confirmed;

        let q = xyz.deceased;

        let s = xyz.tested;

        let t = xyz.vaccinated1;
        if (plus === a || secound === val ) {
          // console.log(sim, "a");
          const mn = {
            State: a,
            City: val,
            confirmed: p,
            deceased: q,
            tested: s,
            vaccinated: t,
          };
          mop.push(mn);
        }
      });
    });
    setNum(mop);
  };
  return (
    <>
      <center>
        <h1>India Covid-19 </h1>
        <table>
          <tr>
            <th>State</th>
            <th>City</th>
            <th>confirmed</th>
            <th>deceased</th>
            <th>tested</th>
            <th>vaccinated</th>
          </tr>
          <tr>
            <th>
              <input
                type="text"
                value={plus}
                placeholder="State"
                onChange={(event) => {
                  setPlus(event.target.value);
                  console.log(event.target.value, "fatch");
                }}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="City"
                value={secound}
                onChange={(event) => {
                  console.log(event.target.value, "setsecound");
                  setSecound(event.target.value);
                }}
              />
            </th>

            <th>
              <input
                type="number"
                placeholder="Confirmed"
                value={sim}
                onChange={(event) => {
                  setSim(event.target.value);
                }}
              />
            </th>
            <th>
              <input type="number" placeholder="Deceased" />
            </th>
            <th>
              <input type="number" placeholder="Tested" />
            </th>
            <th>
              <input type="number" placeholder="Vaccinated" />
            </th>
          </tr>
          <button onClick={onFire}>click me</button>

          {num.map((num) => {
            return (
              <tr id="val">
                <th>{num.State}</th>
                <th>{num.City}</th>
                <th>{num.confirmed}</th>
                <th>{num.deceased}</th>
                <th>{num.tested}</th>
                <th>{num.vaccinated}</th>
              </tr>
            );
          })}
        </table>
      </center>
    </>
  );
};

export default App;
