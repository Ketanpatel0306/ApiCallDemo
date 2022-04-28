import React, { useEffect, useState } from 'react'

export const Remember = () => {
  const [data, setData] = useState([])
  const [newData, setNewData] = useState([])
  const [state, setState] = useState("")
  const [stateCity, setStateCity] = useState("")
  const [vaccine, setVaccine] = useState(0)
  const [vaccine1, setVaccine1] = useState(0)
  const [recover, setRecover] = useState("")
  const [recover1, setRecover1] = useState("")
  const [confirms, setConfirms] = useState("")
  const [confirms1, setConfirms1] = useState("")
  const [hideBtn, setHideBtn] = useState(false)
  const [hideBtn2, setHideBtn2] = useState(false)
  const [hideBtn4, setHideBtn4] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [extra, setExtra] = useState(0)



  const CovidData = async () => {
    const responce = await fetch(
      "https://data.covid19india.org/v4/min/data.min.json"
    );
    const listItem = await responce.json();
    let ar = [];
    // console.log(listItem);
    Object.keys(listItem).map((st) => {
      "districts" in listItem[st] &&
        Object.keys(listItem[st].districts).map((dis) => {
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
    setData(ar)
    setNewData(ar)
    // console.log(ar, "ar");
  };
  const FetchData = async () => {
    try {
      await CovidData()
    } catch (err) {
      console.log(err.stack);
    }
  }
  useEffect(() => {
    setHideBtn(true)
    setHideBtn2(true)
    setHideBtn4(true)
    FetchData()
  }, [])





  let filterState = (a, b) => {
    return a.filter(
      (data1) => data1.state.toLowerCase().includes(b.toLowerCase())
    )
  }
  let filterCity = (c, d) => {
    return c.filter(
      (data2) => data2.city.toLowerCase().includes(d.toLowerCase())
    )
  }
  //   vaccinated  /////
  let filterVaccine = (c) => {
    return c.filter(
      ((data2) => data2.vaccinated >= vaccine)
    )
  }
  let filterVaccine1 = (c) => {
    return c.filter(
      ((data2) => data2.vaccinated <= vaccine1)
    )
  }

  // recovered////
  let filterRecovered = (c) => {
    return c.filter(
      ((data2) => data2.recoverd >= recover)
    )

  }
  let filterRecovered1 = (c) => {
    return c.filter(
      ((data2) => data2.recoverd <= recover)
    )

  }
  // confirmed//////
  let filterConfirmed = (c) => {
    return c.filter(
      ((data1) => data1.confirmed >= confirms)
    )
  }
  let filterConfirmed1 = (c) => {
    return c.filter(
      ((data1) => data1.confirmed <= confirms1)
    )
  }

  //////--------------------->     start button       <-------------------------------/////
  const HiltMe = (search, where) => {

    // const [input, setInput] = useState(false)
    var abc = []
    //////    state    ////////
    if (where == 'state') {
      var s = search.trim()
      if (!/[^a-zA-Z]/.test(s)) {
        abc = filterState(newData, s)
      } else {
        alert("plz enter valid value")
        return;
      }
      setData(abc)
    }


    /////// City /////////

    if (where == 'city') {
      var def = []
      var s = search.trim()
      if (!/[^a-zA-Z]/.test(s)) {
        def = filterCity(newData, s)
      } else {
        alert("plz enter valid value")
        return;
      }
      setData(def)
    }


    //   vaccinated  /////
    if (vaccine != 0 && vaccine1 != 0) {
      let a = vaccine
      let b = vaccine1
      let c = parseInt(a)
      let d = parseInt(b)
      let newArr = []
      if (c <= d) {
        newArr = def.filter((data) => data.vaccinated >= a && data.vaccinated <= b)
      } else {
        alert("please enter valid data");
      }
      setData(newArr)
    }
    else {
      if (vaccine != 0) {

        var vac = []
        if (!/[^0-9]/.test(vaccine)) {
          vac = filterVaccine(newData, vaccine)
        } else {
          alert("Please Enter valid value");
          return;
        }
        setData(vac)
      } else if (vaccine1 != 0) {

        var vac1 = []
        if (!/[^0-9]/.test(vaccine1)) {
          vac1 = filterVaccine1(newData, vaccine1)
        }
        else {
          alert("Please Enter valid value");
          return;
        }
        setData(vac1)


      }
    }
    // recovered ///////
    if (recover != 0 && recover1 != 0) {
      let a = recover
      let b = recover1
      let c = parseInt(a)
      let d = parseInt(b)
      let newArr = []
      if (c <= d) {
        newArr = newData.filter((data) => data.recoverd >= a && data.recoverd <= b)
      } else {
        alert("please enter valid data");
      }
      setData(newArr)

    } else {
      if (recover != 0) {
        var rec = []
        if (!/[^0-9]/.test(recover)) {
          rec = filterRecovered(newData, recover)
        } else {
          alert("Please Enter valid value");
          return;
        }
        setData(rec)
      } else if (recover1 != 0) {
        var rec1 = []
        if (!/[^0-9]/.test(recover1)) {
          rec1 = filterRecovered1(newData, recover1)
        } else {
          alert("Please Enter valid value");
          return;
        }
        setData(rec1)
      }

    }

    // confirmed //////
    if (confirms != 0 && confirms1 != 0) {
      let a = confirms
      let b = confirms1
      let c = parseInt(a)
      let d = parseInt(b)
      let newArrr = []
      if (c <= d) {
        newArrr = newData.filter((data1) => data1.confirmed >= a && data1.confirmed <= b)
      }
      else {
        alert("please enter valid data");
      }
      setData(newArrr)
    } else {
      if (confirms != 0) {
        var con = []
        if (!/[^0-9]/.test(confirms)) {
          con = filterConfirmed(newData, confirms)
        } else {
          alert("Please Enter Valid Value")
          return;
        }
        setData(con)
      } else if (confirms1 != 0) {
        var con1 = []
        if (!/[^0-9]/.test(confirms)) {
          con1 = filterConfirmed1(newData, confirms)
        } else {
          alert("Please Enter Valid Value")
          return;
        }
        setData(con1)
      }
    }
  }





  // vacation assenting - dissenting



  const vaccinatedFirsta = () => {
    let newDataa = []
    newDataa = [...newData].sort((a, b) => {
      if (hideBtn) {
        return a.vaccinated - b.vaccinated
      } else {
        return b.vaccinated - a.vaccinated
      }
    })
    setHideBtn(!hideBtn)
    setData(newDataa)
  }

  // recovered assenting - dissenting


  const recoveredAssenting = () => {
    let updateData = []
    updateData = [...newData].sort((a, b) => {
      if (hideBtn2) {
        return a.recoverd - b.recoverd
      } else {
        return b.recoverd - a.recoverd
      }
    })
    setHideBtn2(!hideBtn2)
    setData(updateData)
  }


  // confirmed  assenting - dissenting
  const confirmedAssenting = () => {
    let updateData1 = []
    updateData1 = [...newData].sort((a, b) => {
      if (hideBtn4) {
        return a.confirmed - b.confirmed
      } else {
        return b.confirmed - a.confirmed
      }

    })
    setHideBtn4(!hideBtn4)
    setData(updateData1)
  }

  return (
    <div style={{ padding: "0px 5%" }} >
      <h2 style={{ marginTop: "10%", textAlign: "center", marginBottom: "50px" }}>Covid Data</h2>
      <table className="table" >
        <thead style={{ backgroundColor: "#C697CD", color: "white" }}>
          <tr >
            <th scope="col">state

            </th>
            <th scope="col">city</th>
            <th scope="col">vaccinated
              <button style={{ margin: '0px 5px', cursor: "pointer", color: "white", backgroundColor: "black" }}
                onClick={() => vaccinatedFirsta()} >{!hideBtn ? '∧' : "∨"}</button>
            </th>
            <th scope="col">recoverd
              <button style={{ margin: '0px 5px', cursor: "pointer", color: "white", backgroundColor: "black" }}
                onClick={() => recoveredAssenting()} >{!hideBtn2 ? '∧' : "∨"}</button>

            </th>
            <th scope="col">confirmed
              {hideBtn4 ? <button style={{ margin: '0px 5px', cursor: "pointer", color: "white", backgroundColor: "black" }}
                onClick={() => confirmedAssenting()}>&#8744;</button> : <button style={{ margin: '0px 5px', cursor: "pointer", color: "white", backgroundColor: "black" }}
                  onClick={() => confirmedAssenting()}>&#8743;</button>}
            </th>
          </tr>
        </thead>
        <tr>
          <th>
            <input required type="text" placeholder='State'
              onChange={(event) => {
                setState(event.target.value)
                setEmpty(false)
                HiltMe(event.target.value, 'state')
                // var abc = []
                // var s = event.target.value.trim()
                // if (!/[^a-zA-Z]/.test(s)) {
                //   abc = filterState(newData, s)
                // } else {
                //   alert("plz enter valid value")
                //   return;
                // }
                // setData(abc)
              }} />
            <br />
            {empty && <span>hello</span>}
          </th>
          <th>
            <input type="text" required placeholder='City'
              onChange={(event) => {
                setStateCity(event.target.value)
                HiltMe(event.target.value, 'city')
              }} />
          </th>
          <th>
            <input type="number" placeholder='greater' required style={{ marginBottom: '10px' }}
              onChange={(event) => {
                setVaccine(event.target.value)
                HiltMe(event.target.value)

              }} />
            <input type="number" required placeholder='less' onChange={(event) => {
              setVaccine1(event.target.value)
              HiltMe(event.target.value)

            }} />
          </th>
          <th>
            <input type="number" required placeholder='gether' style={{ marginBottom: '10px' }}
              onChange={(event) => {
                setRecover(event.target.value)
                HiltMe(event.target.value)

              }} />
            <input type="number" required placeholder='less'
              onChange={(event) => {
                setRecover1(event.target.value)
                HiltMe(event.target.value)

              }} />
          </th>
          <th>
            <input type="number" required placeholder='gether' style={{ marginBottom: '10px' }}
              onChange={(e) => {
                setConfirms(e.target.value)
                HiltMe(e.target.value, "gether")
              }} />
            <input type="number" required placeholder='less'
              onChange={(e) => {
                setConfirms1(e.target.value)
                HiltMe(e.target.value, "less")
              }} />
          </th>
        </tr>
        <tr>
          <th style={{ width: "100%" }}>
            <button style={{ margin: "10px 0px", cursor: "pointer" }} onClick={() => HiltMe()}>Submit</button>
          </th>
        </tr>
        <tbody>

          {data.map((Item, k) => {

            return (
              <tr key={k + "covid"} style={{ backgroundColor: k % 2 == 0 ? "#EBCAC3" : "#C6E8B2" }}>

                <td>{Item.state}</td>
                <td>{Item.city}</td>
                <td>{Item.vaccinated}</td>
                <td>{Item.recoverd}</td>
                <td>{Item.confirmed}</td>

              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  )
}
