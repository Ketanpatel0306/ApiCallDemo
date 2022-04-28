import React, { useEffect, useState } from "react";

const Api = () => {
  const [main, setMain] = useState([]);
  const [newMain, setNewMain] = useState([]);

  const [state, setState] = useState("");
  const [dis, setDis] = useState("");
  const [vas, setVas] = useState("");
  const [vas1, setVas1] = useState("");

  const FatchData = async () => {
    const responce = await fetch(
      "https://data.covid19india.org/v4/min/data.min.json"
    );
    const data = await responce.json();

    let ar = [];
    Object.keys(data).map((er) => {
      console.log(er, "data");
      "districts" in data[er] &&
        Object.keys(data[er].districts).map((j) => {
          let an = data[er].districts[j]?.total?.vaccinated1;
          let am = data[er].districts[j]?.total?.confirmed;
          let ao = data[er].districts[j]?.total?.recovered;
          if (an === undefined) {
            an = 0;
          }
          if (am === undefined) {
            am = 0;
          }
          if (ao === undefined) {
            ao = 0;
          }

          let obj = {
            state: er,
            city: j,
            vaccinated: an,
            confirmed: am,
            recovered: ao,
          };
          ar.push(obj);
        });
    });
    setNewMain(ar);
    setMain(ar);
    console.log(ar, "imp");
  };
  useEffect(() => {
    FatchData();
  }, []);

  let filterState = (a, b) => {
    return a.filter(
      (data) => data.state.toLowerCase().indexOf(b.toLowerCase()) !== -1
    );
  };

  let filtercity = (a, b) => {
    return a.filter(
      (data) => data.city.toLowerCase().indexOf(b.toLowerCase()) !== -1
    );
  };
  let filtervas = (e) => {
    return e.filter((data) => data.vaccinated >= vas);
  };
  let filtervas1 = (e) => {
    return e.filter((data) => data.vaccinated <= vas1);
  };

  const hitMe = () => {


    var s = state.trim();
    if (!/[^a-zA-z]/.test(s)) {
      var abc = filterState(newMain, s);
    } else {
      alert("pls enter vaild value");
      return;
    }
    setMain(abc);

    var c = dis.trim();
    if (!/[^a-zA-Z]/.test(c)) {
      var bcd = filtercity(abc, c);
    } else {
      alert("pls enter vaild value");
      return;
    }
    setMain(bcd);

    if (vas != 0 && vas1 != 0) {
      let a = vas;
      let b = parseInt(a);
      let c = vas1;
      let d = parseInt(c);
      if (b <= d) {
        let newarr = bcd.filter(
          (data) => data.vaccinated <= vas && data.vaccinated >= vas1
        );
        setMain(newarr);
      } else {
        alert("plz enter vaild value");
        return;
      }
    } else {
      if (vas != 0) {
        if (!/[^0-9]/.test(vas)) {
          let mrf = filtervas(bcd, vas);
          setMain(mrf);
        } else {
          alert("pls enetr vaild value");
          return;
        }
      } else if (vas1 != 0) {
        if (!/[^0-9]/.test(vas1)) {
          let mrf1 = filtervas1(bcd, vas1);
          setMain(mrf1);
        } else {
          alert("ls enter vaild value");
          return;
        }
      }
    }
  };

  const onfire = () => {
    const asending = [...main].sort((a, b) => {
      return a.vaccinated - b.vaccinated;
    });
    setMain(asending);
  };
  const onfire1 = () => {
    const disend = [...main].sort((a, b) => {
      return b.vaccinated - a.vaccinated;
    });
    setMain(disend);
  };

  return (
    <>
      <div className="main-div">
        <div className="secound-div">
          <h1>Covid-19 India Data</h1>
          <div className="tbl_div">
            <table>
              <tr>
                <th>
                  <input
                    type="text"
                    placeholder="state"
                    onChange={(event) => {
                      setState(event.target.value);
                    }}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="district"
                    onChange={(event) => {
                      setDis(event.target.value);
                    }}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="greater"
                    onChange={(event) => {
                      setVas(event.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="less"
                    onChange={(event) => {
                      setVas1(event.target.value);
                    }}
                  />
                </th>
                <th>
                  <input type="text" placeholder="Data" />
                </th>
                <th>
                  <input type="text" placeholder="Data" />
                </th>
              </tr>
              <thead>
                <tr>
                  <th>State</th>
                  <th>District</th>
                  <th>
                    Vaccinated<button onClick={onfire}>?</button>
                    <button onClick={onfire1}>?</button>
                  </th>
                  <th>Recoverd</th>
                  <th>Confirmd</th>
                </tr>
              </thead>
              <tr>
                <th colSpan="5">
                  <button onClick={hitMe}>click</button>
                </th>
              </tr>
              <tbody>
                {main.map((val) => {
                  return (
                    <tr>
                      <th>{val.state}</th>
                      <th>{val.city}</th>
                      <th>{val.vaccinated}</th>
                      <th>{val.recovered}</th>
                      <th>{val.confirmed}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Api;
