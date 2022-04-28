import React, { useEffect, useState } from "react";
import Data from "./Data";
function Meee() {
  const [data, setData] = useState([]); //main state
  const [record, setRecord] = useState([]); // filter state
  const [state, setState] = useState(""); // state input state
  const [city, setCity] = useState(""); // city input state
  const [lesVaccinated, setlesVaccinated1] = useState(""); // if  vaccineted input value  less than
  const [getVaccinated, setgetVaccinated1] = useState(""); // if  vaccineted input value  gretar than
  const [lesRecoverd, setLesRecoverd] = useState(""); // if  vaccineted input value  less than
  const [getRecoverd, setgetRecoverd] = useState(""); // if  vaccineted input value  gretar than
  const [lesConfirmed, setLesConfirmed] = useState(""); // if  vaccineted input value  less than
  const [getConfirmed, setgetConfirmed] = useState(""); // if  vaccineted input value  gretar than
  const obj = [];
  const fatchData = () => {
    Object.keys(Data).forEach((sta) => {
      Object.keys(Data[sta].districts).forEach((dis) => {
        var tot = Data[sta].districts[dis].total;
        var vc1 = tot.vaccinated1;
        var con = tot.confirmed;
        var rec = tot.recovered;
        if (vc1 === undefined) {
          vc1 = 0;
        }
        if (con === undefined) {
          con = 0;
        }
        if (rec === undefined) {
          rec = 0;
        }
        var s = {
          state1: sta,
          city1: dis,
          vaccinated1: vc1,
          confirm: con,
          recover: rec,
        };
        obj.push(s);
      });
    });
    setData(obj);
    setRecord(obj);
  };
  useEffect(() => {
    fatchData();
  }, []);
  let filterState = (a, query) => {
    return a.filter(
      (data) => data.state1.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };
  //===================================state filter===================================
  let filterCity = (a, query) => {
    // var andra = allRecord.filter((st) => st.state === "an");
    // console.log("Andrapradesh", andra);
    return a.filter(
      (data) => data.city1.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };
  //===================================gretarthan vaccinated filter===================================
  let filtergetVaccinated = (a) => {
    return a.filter((data) => data.vaccinated1 >= getVaccinated);
  };
  //===================================lessthan Vaccinated filter===================================
  let filterletVaccinated = (a) => {
    return a.filter((data) => data.vaccinated1 <= lesVaccinated);
  };
  //===================================gretarthan reciverd filter===================================
  let filtergetrecoverd = (a) => {
    return a.filter((data) => data.recover >= getRecoverd);
  };
  //===================================lessthan recoverd filter===================================
  let filterletRecoverd = (a) => {
    return a.filter((data) => data.recover <= lesRecoverd);
  };
  //===================================gretarthan reciverd filter===================================
  let filtergetConfirmed = (a) => {
    return a.filter((data) => data.confirm >= getConfirmed);
  };
  //===================================lessthan recoverd filter===================================
  let filterletConfirmed = (a) => {
    return a.filter((data) => data.confirm <= lesConfirmed);
  };
  //===================================filterletVaccinated filter===================================
  const click = async () => {
    //===================================state filter===================================
    var s = state.trim();
    if (!/[^a-zA-Z]/.test(s)) {
      var abc = filterState(record, s);
    } else {
      alert("Please Enter valid value");
      return;
    }
    setData(abc);
    // console.log("state", abc);
    //===================================city filter===================================
    var c = city.trim();
    if (!/[^a-zA-Z]/.test(c)) {
      var ct = filterCity(abc, c);
      //console.log("city",typeof(c));
    } else {
      alert("Please Enter valid value");
      return;
    }
    setData(ct);

    //===================================less thanvaccinated filter===================================
    var temp = ct;
    if (getVaccinated != 0 && lesVaccinated == 0) {
      if (!/[^0-9]/.test(getVaccinated)) {
        // console.log("object",typeof(getVaccinated));
        var getvacci = filtergetVaccinated(temp);
      } else {
        alert("Please Enter number value only");
        return;
      }
      setData(getvacci);
      // console.log("gretarthan vaaccineted", getvacci);
    } else if (lesVaccinated != 0 && getVaccinated == 0) {
      if (!/[^0-9]/.test(getVaccinated)) {
        var letvacci = filterletVaccinated(temp);
      } else {
        alert("Please Enter number value only");
        return;
      }
      // console.log("less than vaccinated", letvacci);
      setData(letvacci);
    } else if (getVaccinated != 0 && lesVaccinated != 0) {
      var a = getVaccinated;
      var b = parseInt(a);
      // console.log("a",typeof(a));
      // console.log("b",typeof(b));
      var e = lesVaccinated;
      var f = parseInt(e);
      if (b < f) {
        var newAr = ct.filter(
          (data) =>
            data.vaccinated1 >= getVaccinated &&
            data.vaccinated1 <= lesVaccinated
        );
      } else {
        alert("Please Enter gretar value smaller than less than value");
        return;
      }
      setData(newAr);
    }
    //===================================gretar than recoverd filter===================================
    if (getRecoverd != 0 && lesRecoverd == 0) {
      if (!/[^0-9]/.test(getRecoverd)) {
        var getrec = filtergetrecoverd(temp);
      } else {
        alert("Please Enter number value only");
        return;
      }
      setData(getrec);
      // console.log("gretarthan vaaccineted", getvacci);
    } else if (lesRecoverd != 0 && getRecoverd == 0) {
      if (!/[^0-9]/.test(lesRecoverd)) {
        var letrec = filterletRecoverd(temp);
      } else {
        alert("Please Enter number value only");
        return;
      }
      // console.log("less than vaccinated", letvacci);
      setData(letrec);
    } else if (getRecoverd != 0 && lesRecoverd != 0) {
      var gr = getRecoverd;
      var fgr = parseInt(gr);
      var lr = lesRecoverd;
      var flr = parseInt(lr);
      if (fgr < flr) {
        var newAr1 = ct.filter(
          (data) => data.recover >= getRecoverd && data.recover <= lesRecoverd
        );
      } else {
        alert("Please Enter gretar value smaller than less than value");
        return;
      }
      setData(newAr1);
    }
    //=================================== confiremd filter===================================
    if (getConfirmed != 0 && lesConfirmed == 0) {
      if (!/[^0-9]/.test(getConfirmed)) {
        var getcon = filtergetConfirmed(temp);
      } else {
        alert("Please Enter number value only");
        return;
      }
      setData(getcon);
      // console.log("gretarthan vaaccineted", getvacci);
    } else if (lesConfirmed != 0 && getConfirmed == 0) {
      if (!/[^0-9]/.test(lesConfirmed)) {
        var lescon = filterletConfirmed(temp);
      } else {
        alert("Please Enter number value only");
      }
      // console.log("less than vaccinated", letvacci);
      setData(lescon);
    } else if (getConfirmed != 0 && lesConfirmed != 0) {
      var gc = getConfirmed;
      var fgc = parseInt(gc);
      var lc = lesConfirmed;
      var flc = parseInt(lc);
      if (fgc < flc) {
        var newAr2 = ct.filter(
          (data) => data.confirm >= getConfirmed && data.confirm <= lesConfirmed
        );
      } else {
        alert("Please Enter gretar value smaller than less than value");
        return;
      }
      setData(newAr2);
    }
  };
  //===================================all data  filter===================================
  //   const asen = () => {
  //     console.log('asending');
  //     const asending = [...data].sort((a,b) => {
  //       return(
  //         a.vaccinated1 - b.vaccinated1,
  //         a.recover - b.recover,
  //         a.confirm - b.confirm
  //         )
  //     })
  //     setData(asending);
  //   }
  //   const dese = () => {
  //     console.log('asending');
  //     const desending = [...data].sort((a,b) => {
  //       return(
  //         b.vaccinated1 - a.vaccinated1,
  //         b.recover - a.recover,
  //         b.confirm - a.confirm
  //         )
  //     })
  //     setData(desending);
  //  }
  //===================================vaccinated  filter===================================
  const asenvac = () => {
    // console.log('asending');
    const asending = [...data].sort((a, b) => {
      return a.vaccinated1 - b.vaccinated1;
    });
    setData(asending);
  };
  const desevac = () => {
    // console.log('asending');
    const desending = [...data].sort((a, b) => {
      return b.vaccinated1 - a.vaccinated1;
    });
    setData(desending);
  };
  //===================================recover  filter===================================
  const asenrec = () => {
    //console.log('asending');
    const asending = [...data].sort((a, b) => {
      return a.recover - b.recover;
    });
    setData(asending);
  };
  const deserec = () => {
    // console.log('asending');
    const desending = [...data].sort((a, b) => {
      return b.recover - a.recover;
    });
    setData(desending);
  };
  //===================================confirmed  filter===================================
  const asencon = () => {
    // console.log('asending');
    const asending = [...data].sort((a, b) => {
      return a.confirm - b.confirm;
    });
    setData(asending);
  };
  const desecon = () => {
    // console.log('asending');
    const desending = [...data].sort((a, b) => {
      return b.confirm - a.confirm;
    });
    setData(desending);
  };
  return (
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
                value={state}
                onChange={(event) => {
                  setState(event.target.value);
                }}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="city"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="enter Gretar than value"
                value={getVaccinated}
                onChange={(event) => {
                  setgetVaccinated1(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="enter less than value"
                value={lesVaccinated}
                onChange={(event) => {
                  setlesVaccinated1(event.target.value);
                }}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Recoverd greatrer than"
                value={getRecoverd}
                onChange={(event) => {
                  setgetRecoverd(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Recoverd less than"
                value={lesRecoverd}
                onChange={(event) => {
                  setLesRecoverd(event.target.value);
                }}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Confirmed greatrer than"
                value={getConfirmed}
                onChange={(event) => {
                  setgetConfirmed(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Confirmed less than"
                value={lesConfirmed}
                onChange={(event) => {
                  setLesConfirmed(event.target.value);
                }}
              />
            </th>
          </tr>
          <tr>
            <th colspan="5">
              <button onClick={click}>Submit</button>
              {/* <button onClick={asen}> 🠉 </button><button onClick={dese}>  🠋 </button> */}
            </th>
          </tr>
          <thead>
            <tr style={{ color: "red" }}>
              <th>State</th>
              <th>City</th>
              <th>
                vaccinated<button onClick={asenvac}> 🠉 </button>
                <button onClick={desevac}> 🠋 </button>
              </th>
              <th>
                Recoverd<button onClick={asenrec}> 🠉 </button>
                <button onClick={deserec}> 🠋 </button>
              </th>
              <th>
                Confirmed<button onClick={asencon}> 🠉 </button>
                <button onClick={desecon}> 🠋 </button>
              </th>
            </tr>
          </thead>
          {data.map((val) => {
            return (
              <tr>
                <td>{val.state1}</td>
                <td>{val.city1}</td>
                <td>{val.vaccinated1}</td>
                <td>{val.confirm}</td>
                <td>{val.recover}</td>
              </tr>
            );
          })}
        </table>
      </center>
    </div>
  );
}
export default Meee;
