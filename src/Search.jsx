// import React, { useEffect, useState } from "react";
// import Data from "./Data";
// function Home() {
//   const [data, setData] = useState([]);
//   const [main, setMain] = useState([]);

//   const [state, setState] = useState();
//   const [city, setCity] = useState();
//   const [vaccinated, setVaccinated1] = useState();
//   const obj = [];
//   const fatchData = () => {
//     Object.keys(Data).forEach((sta) => {
//       Object.keys(Data[sta].districts).forEach((dis) => {
//         var tot = Data[sta].districts[dis].total;
//         var vc1 = tot.vaccinated1;
//         var con = tot.confirmed;
//         var rec = tot.recovered;
//         var s = {
//           state: sta,
//           city: dis,
//           vaccinated1: vc1,
//           confirm: con,
//           recover: rec,
//         };
//         obj.push(s);
//       });
//     });
//     setData(obj);
//     setMain(obj);
//     //setAllRecord(obj);
//   };
//   useEffect(() => {
//     fatchData();
//   }, []);
//   const click = () => {
//     let filterState = (a,query) => {
//         return a.filter(
//             data => data.state.toLowerCase().indexOf(query.toLowerCase()) !==-1,
//         )
//     } 
    // setMain(filterState);
    // console.log((filterState,main,state));
    // Object.keys(Data).forEach((a) => {
    //   Object.keys(Data[a].districts).forEach((ct) => {
    //     if (state === a || city === ct) {
//     //       var tot = Data[a].districts[ct].total;
//     //       var vc = tot.vaccinated1;
//     //       var con = tot.confirmed;
//     //       var rec = tot.recovered;
//     //       var sp = {
//     //         state: a,
//     //         city: ct,
//     //         vaccinated1: vc,
//     //         confirm: con,
//     //         recover: rec,
//     //       };
//     //       arr.push(sp);
//     //     }
//     //   });
//     // });
//     // setData(arr);
//     // console.log(arr);
//   };
//   return (
//     <div>
//       <center>
//         <h1>Covid Data</h1>
//         <br />
//         <table>
//           <tr>
//             <th>
//               <input
//                 type="text"
//                 placeholder="state"
//                 value={state}
//                 onChange={(event) => {
//                   setState(event.target.value);
//                 }}
//               />
//             </th>
//             <th>
//               <input
//                 type="text"
//                 placeholder="city"
//                 value={city}
//                 onChange={(event) => {
//                   setCity(event.target.value);
//                 }}
//               />
//             </th>
//             <th>
//               <input
//                 type="text"
//                 placeholder="vaccinated 1"
//                 value={vaccinated}
//                 onChange={(event) => {
//                   setVaccinated1(event.target.value);
//                 }}
//               />
//             </th>
//             <th>
//               <input type="text" placeholder="Recoverd" />
//             </th>
//             <th>
//               <input type="text" placeholder="Confirmed" />
//             </th>
//           </tr>
//           <tr>
//             <th colspan="5">
//               <button onClick={click}>Submit</button>
//             </th>
//           </tr>
//           <thead>
//             <tr style={{ color: "red" }}>
//               <th>State</th>
//               <th>City</th>
//               <th>vaccinated1</th>
//               <th>Recoverd</th>
//               <th>Confirmed</th>
//             </tr>
//           </thead>
//           {/* {data.filter((val) => {
//               if (state === "") {
//                 return val;
//               } else if (
//                 val.state.toLowerCase().includes(state.toLowerCase())
//               ) {
//                 return val;
//               }
//             })
//             .map((val) => {
//               return (
//                 <tr>
//                   <td>{val.state}</td>
//                   <td>{val.city}</td>
//                   <td>{val.vaccinated1}</td>
//                   <td>{val.confirm}</td>
//                   <td>{val.recover}</td>
//                 </tr>
//               );
//             })} */}
//           {data.map((val) => {
//             return (
//               <tr>
//                 <td>{val.state}</td>
//                 <td>{val.city}</td>
//                 <td>{val.vaccinated1}</td>
//                 <td>{val.confirm}</td>
//                 <td>{val.recover}</td>
//               </tr>
//             );
//           })}
//         </table>
//       </center>
//     </div>
//   );
// }
// export default Home;
