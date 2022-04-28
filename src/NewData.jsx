import React, { useEffect, useState } from "react";

const NewData = () => {
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

  const CovidData = async () => {
    const responce = await fetch(
      "https://data.covid19india.org/v4/min/data.min.json"
    );
    const listItem = await responce.json();
    let ar = [];
    // console.log(listItem);
    Object.keys(listItem).forEach((st) => {
      "districts" in listItem[st] &&
        Object.keys(listItem[st].districts).forEach((dis) => {
          var vas = listItem[st].districts[dis]?.total?.vaccinated1;
          var rec = listItem[st].districts[dis]?.total?.confirmed;
          var conf = listItem[st].districts[dis]?.total?.recovered;

          if (vas === undefined) {
            vas = 0;
          }
          if (rec === undefined) {
            rec = 0;
          }
          // console.log(st,dis,"log");
          if (conf === undefined) {
            conf = 0;
          }
          let obj = {
            state: st,
            city: dis,
            vaccinated: vas,
            recoverd: rec,
            confirmed: conf,
          };
          ar.push(obj);
        });
    });
    console.log(ar, "list");
    setMain(ar);
    setNewMain(ar);
  };

  const fatchData = async () => {
    try {
      await CovidData();
    } catch (err) {
      console.log(err.stack);
    }
  };

  useEffect(() => {
    fatchData();
    // console.log(fatchData,'imp');
  }, []);
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

  // butoon click
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
      let a = vaction;
      let b = parseInt(a);
      let c = vaction1;
      let d = parseInt(c);
      if (b <= d) {
        let newAr = def.filter(
          (data) => data.vaccinated >= vaction && data.vaccinated <= vaction1
        );
        setNewMain(newAr);
      } else {
        alert("please enter valid data");
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
      let e = recoveds;
      let f = parseInt(e);
      let g = recoved1;
      let i = parseInt(g);
      if (f <= i) {
        let newArr = def.filter(
          (data) => data.recoverd >= recoveds && data.vaccinated <= recoved1
        );
        setNewMain(newArr);
      } else {
        alert("please enter valid data");
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
      var j = confim;
      var k = parseInt(j);
      var l = confim1;
      var m = parseInt(l);
      if (k <= m) {
        let newArrs = def.filter(
          (data) => data.confirmed >= confim && data.confirmed <= confim1
        );

        setNewMain(newArrs);
      } else {
        alert("please enter valid data");
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
      <h1>Covid-19 Data</h1>
      <div className="imp">
        <table className="table table-hover">
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
                onChange={(event) =>
                  setDist(event.target.value)}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="greter vaccinated 1"
                style={{ margin: "10px 0px" }}
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
                style={{ margin: "10px 0px" }}
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
                style={{ margin: "10px 0px" }}
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
          <thead className="thead-dark">
            <tr>
              <th>state</th>
              <th>Districts</th>
              <th>
                vaccinated1
                <button onClick={asendvac} style={{ margin: "0px 10px", cursor: "pointer" }}> &#8744;</button>
                <button onClick={disendvac} style={{ cursor: "pointer" }} >&#8743;</button>
              </th>
              <th>
                Recoverd
                <button onClick={asendrec} style={{ margin: "0px 10px", cursor: 'pointer' }}> &#8744;</button>
                <button onClick={disendrec} style={{ cursor: "pointer" }}>&#8743;</button>
              </th>
              <th>
                Confirmed
                <button onClick={asendcon} style={{ margin: "0px 10px", cursor: "pointer" }}> &#8744;</button>
                <button onClick={disendcon} style={{ cursor: "pointer" }}>&#8743;</button>
              </th>
            </tr>
          </thead>
          <tr>
            <th colspan="5">
              <button onClick={Click} style={{ margin: "10px 0px", cursor: "pointer" }}>Submit</button>
            </th>
          </tr>
          <tbody>
            {newMain.map((val, k) => {

              return (
                <tr style={{ backgroundColor: k % 2 == 0 ? "	#FAEBD7" : "#FFF0F5" }}>
                  <th style={{ padding: "6px 0px", color: "" }}> {val.state} </th>
                  <td>{val.city}</td>
                  <td>{val.vaccinated}</td>
                  <td>{val.recoverd}</td>
                  <td>{val.confirmed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NewData;
