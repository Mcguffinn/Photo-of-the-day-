//Defunct Code

// import React, { Fragment, useState } from "react";
// import "./App.css";
// import axiosCall, { api_key } from "./hooks/nasaCall";

// function getFormattedDate(date) {
//   let year = date.getFullYear();
//   let month = (1 + date.getMonth()).toString().padStart(2, "0");
//   let day = date.getDate().toString().padStart(2, "0");

//   return `${year}-${month}-${day}`;
// }

// function App() {
//   // const [selectedDate, setSelectedDate] = useState(null);
//   const [config, setconfig] = useState({
//     method: "GET",
//     url: "/planetary/apod",

//     params: {
//       date: getFormattedDate(new Date()),
//       api_key,
//     },
//   });

//   const [{ data, loading, error }, api] = axiosCall(config, { manual: true });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     api(config);
//   };

//   const handleChange = (e) => {
//     setconfig({
//       method: "GET",
//       url: "/planetary/apod",
//       params: {
//         date: e.target.value,
//         api_key,
//       },
//     });
//     // setSelectedDate(e.target.value);
//     // console.debug("Date Changed:", selectedDate);
//   };

//   if (loading) return "null";
//   if (error) return <img src={defaultImg} />;
//   // if(!data) return <img src={defaultImg}/>;
//   const isImageValid = data?.url && data?.media_type === "image";
//   const isVideoValid = data?.url && data?.media_type === "mp3";

//   return (
//     <div className="container">
//       <div className="hero-image">
//         <section className="masthead" role="img" aria-label="Image Description">
//           <h1>Call to the Stars</h1>
//           {/* {!data && <img src={defaultImg} alt="space"/>}
//             {data?.media_type === "image" && <img src={data?.url} alt="space"/>} */}

//           {isImageValid ? <img src={data?.url} /> : <img src={defaultImg} />}
//           <pre>
//             {/* <code>{JSON.stringify({ data, selectedDate }, null, 2)}</code> */}
//           </pre>
//         </section>
//       </div>

//       <div>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="date"
//             id="picker"
//             name="date"
//             min="1970-01-01"
//             max={getFormattedDate(new Date())}
//             onChange={handleChange}
//           />
//           <button type="submit">Explore</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;
