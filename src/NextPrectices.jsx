import React, { useEffect, useState } from 'react'

 const NextPrectices = () => {
  const [data, setData] = useState([])

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
    setData(ar)
    console.log(ar, "list");

  };
  const FetchData = async () => {
    try {
      await CovidData()
    } catch (err) {
      console.log(err.stack);
    }
  }
  useEffect(() => {
    FetchData()
    console.log("FetchData", FetchData);
  }, [])
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>

          {data.map((Item) => {
            return (
              <tr>

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

export default NextPrectices