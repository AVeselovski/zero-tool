const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["picsum.photos"],
  },
  // env: {
  //   MONGODB_URI: "",
  // },
};
