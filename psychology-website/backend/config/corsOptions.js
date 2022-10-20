const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:8081/auth",
];
// const corsOptions = {
//   origin: (origin, callback) => {
//     console.log(whitelist.indexOf(origin));
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not Allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };
const corsOptions = function (req, callback) {
  let corsOption;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOption = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOption = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOption); // callback expects two parameters: error and options
};

module.exports = corsOptions;
