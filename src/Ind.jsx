import React, { useEffect, useState } from "react";
import Data from "./Data";

const Ind = () => {
  const [newMain, setNewMain] = useState([]);
  const [main, setMain] = useState([]);
  // state
  const [city, setCity] = useState("");
  // dist
  const [dist, setDist] = useState("");
  // vaccation
  const [vaction, setVaction] = useState("");
  const [vaction1, setVaction1] = useState("");
  // recovred
  const [recoveds, setRecoveds] = useState("");
  const [recoved1, setRecoved1] = useState("");

  // Confirmed

  const [confim, setconfim] = useState("");
  const [confim1, setconfim1] = useState("");

  useEffect(() => {
    fatchData();
  }, []);

  const fatchData = () => {
    let ar = [];
    Object.keys(Data).forEach((curElm) => {
      Object.keys(Data[curElm].districts).forEach((dis) => {
        let tol = Data[curElm].districts[dis].total;
        let vas = tol.vaccinated1;
        let rec = tol.recovered;
        let conf = tol.confirmed;
        if (vas === undefined) {
          vas = 0;
        }
        if (rec === undefined) {
          rec = 0;
        }
        if (conf === undefined) {
          conf = 0;
        }
        let obj = {
          state: curElm,
          city: dis,
          vaccinated: vas,
          recoverd: rec,
          confirmed: conf,
        };
        ar.push(obj);
      });
    });
    setMain(ar);
    setNewMain(ar);
    console.log(ar);
  };

  // function

  // =========== state =======
  let filterState = (a, b) => {
    // console.log(b,'value');
    return a.filter(
      (data1) => data1.state.toLowerCase().indexOf(b.toLowerCase()) !== -1
    );
  };

  //========= district =======

  let filterDist = (c, d) => {
    return c.filter(
      (data2) => data2.city.toLowerCase().indexOf(d.toLowerCase()) !== -1
    );
  };

  //============= vaccinated =========
  //  greter
  let filterVact = (e) => {
    return e.filter((data3) => data3.vaccinated >= vaction);
  };

  // less
  let filterVact1 = (e) => {
    return e.filter((data4) => data4.vaccinated <= vaction1);
  };
  //========= Recoverd =========
  // greater
  let filterRec = (e) => {
    return e.filter((data4) => data4.recoverd >= recoveds);
  };
  // less
  let filterRec1 = (e) => {
    return e.filter((data4) => data4.recoverd <= recoved1);
  };

  //====== Confirmed ========
  // greater
  let filterCon = (e) => {
    return e.filter((data4) => data4.confirmed >= confim);
  };
  // less

  let filterCon1 = (e) => {
    return e.filter((data4) => data4.confirmed <= confim1);
  };

  //================ button ================
  const Click = async () => {
    // on click state
    var s = city.trim();
    if (!/[^a-zA-Z]/.test(s)) {
      var abc = filterState(main, s);
    } else {
      alert("Please Enter valid value");
      return;
    }
    setNewMain(abc);
    console.log("aaa", abc);
    // console.log("city", city);
    //setNewMain(filterState);
    //console.log(filterState);

    // on click district

    var s = dist.trim();
    if (!/[^a-zA-Z]/.test(s)) {
      var def = filterDist(abc, s);
    } else {
      alert("Please Enter valid value");
      return;
    }
    // console.log(abc, dist, "am2");
    setNewMain(def);
    // console.log(def, "am");

    // vaccinated
    //  between

    if (vaction != 0 && vaction1 != 0) {
      var a = vaction;
      var b = parseInt(a);
      var x = vaction1;
      var y = parseInt(x);
      if (b <= y) {
        let newAr = def.filter(
          (data) => data.vaccinated >= vaction && data.vaccinated <= vaction1
        );
        setNewMain(newAr);
      } else {
        alert("Please Enter valid value");
      }
    } else {
      if (vaction != 0) {
        // greter
        if (!/[^0-9]/.test(vaction)) {
          var ghi = filterVact(def, vaction);
        } else {
          alert("Please Enter valid value");
          return;
        }

        setNewMain(ghi);
      } else if (vaction1 != 0) {
        console.log("secound");
        // less
        if (!/[^0-9]/.test(vaction1)) {
          var jkl = filterVact1(def, vaction1);
        } else {
          alert("Please Enter valid value");
          return;
        }
        setNewMain(jkl);
      }
    }

    // recoverd

    if (recoveds != 0 && recoved1 != 0) {
      var d = recoveds;
      var c = parseInt(d);
      var f = recoved1;
      var g = parseInt(f);
      if (c <= g) {
        let newArr = def.filter(
          (data) => data.recoverd >= recoveds && data.vaccinated <= recoved1
        );

        setNewMain(newArr);
      } else {
        alert("please enter valid value");
      }
    } else {
      if (recoveds != 0) {
        // greater
        if (!/[^0-9]/.test(recoveds)) {
          var ghi = filterRec(def, recoveds);
        } else {
          alert("Please Enter valid value");
          return;
        }

        setNewMain(ghi);
      } else if (recoved1 != 0) {
        // console.log("secound");
        // less
        if (!/[^0-9]/.test(recoved1)) {
          var jkl = filterRec1(def, recoved1);
        } else {
          alert("Please Enter valid value");
          return;
        }
        setNewMain(jkl);
      }
    }

    // confirmed

    if (confim != 0 && confim1 != 0) {
      var k = confim;
      var l = parseInt(k);
      var m = confim1;
      var n = parseInt(m);
      if (l <= n) {
        let newArrs = def.filter(
          (data) => data.confirmed >= confim && data.confirmed <= confim1
        );
        setNewMain(newArrs);
      }else{
        alert("please enter valid data")
      }
    } else {
      if (confim != 0) {
        // greater
        if (!/[^0-9]/.test(confim)) {
          var ghi = filterCon(def, confim);
        } else {
          alert("Please Enter valid value");
          return;
        }

        setNewMain(ghi);
      } else if (confim1 != 0) {
        // console.log("secound");

        if (!/[^0-9]/.test(confim1)) {
          var jkl = filterCon1(def, confim1);
        } else {
          alert("Please Enter valid value");
          return;
        }
        setNewMain(jkl);
      }
    }

    //  =================== all Data Filter ==============
  };

  //Click
  // ========= vaccinated filter =====
  const asendvac = () => {
    const asending = [...newMain].sort((a, b) => {
      return a.vaccinated - b.vaccinated;
    });
    setNewMain(asending);
  };
  const disendvac = () => {
    const desending = [...newMain].sort((a, b) => {
      return b.vaccinated - a.vaccinated;
    });
    setNewMain(desending);
  };
  //  ===========recovered filter =============
  const asendrec = () => {
    const asending = [...newMain].sort((a, b) => {
      return a.recoverd - b.recoverd;
    });
    setNewMain(asending);
  };
  const disendrec = () => {
    const desending = [...newMain].sort((a, b) => {
      return b.recoverd - a.recoverd;
    });
    setNewMain(desending);
  };

  // confirmd filter
  const asendcon = () => {
    const asending = [...newMain].sort((a, b) => {
      return a.confirmed - b.confirmed;
    });
    setNewMain(asending);
  };
  const disendcon = () => {
    const desending = [...newMain].sort((a, b) => {
      return b.confirmed - a.confirmed;
    });
    setNewMain(desending);
  };
  return (
    <>
      <div>
        <center>
          <h1>Covid Data</h1>
          <br />
          <table>
            <tr>
              <th>
                <input
                  type="text"
                  placeholder="state"
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="city"
                  onChange={(event) => setDist(event.target.value)}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="greter vaccinated 1"
                  onChange={(event) => {
                    setVaction(event.target.value);
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder="less vaccinated 1"
                  onChange={(event) => {
                    setVaction1(event.target.value);
                  }}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="gretar Recoverd"
                  onChange={(event) => {
                    setRecoveds(event.target.value);
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder=" less Recoverd"
                  onChange={(event) => {
                    setRecoved1(event.target.value);
                  }}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Greter Confirmed"
                  onChange={(event) => {
                    setconfim(event.target.value);
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder="Less Confirmed"
                  onChange={(event) => {
                    setconfim1(event.target.value);
                  }}
                />
              </th>
            </tr>
            <tr>
              <th colspan="5">
                <button onClick={Click}>Submit</button>
              </th>
            </tr>
            <thead>
              <tr>
                <th>State</th>
                <th>City</th>
                <th>
                  vaccinated1
                  <button onClick={asendvac}>🠉</button>
                  <button onClick={disendvac}>🠉</button>
                </th>
                <th>
                  Recoverd
                  <button onClick={asendrec}>🠉</button>
                  <button onClick={disendrec}>🠉</button>
                </th>
                <th>
                  Confirmed
                  <button onClick={asendcon}>🠉</button>
                  <button onClick={disendcon}>🠉</button>
                </th>
              </tr>
            </thead>
            {newMain.map((val) => {
              return (
                <tr>
                  <td>{val.state}</td>
                  <td>{val.city}</td>
                  <td>{val.vaccinated}</td>
                  <td>{val.recoverd}</td>
                  <td>{val.confirmed}</td>
                </tr>
              );
            })}
          </table>
        </center>
      </div>
      );
    </>
  );
};

export default Ind;
