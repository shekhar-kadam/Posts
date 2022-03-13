module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        97: "28rem",
        98: "29rem",
        99: "30rem",
        100: "44rem",
        101: "46rem",
        102: "50rem",
      },
      height: {
        29: "7.6rem",
      },
      backgroundImage: (theme) => ({
        backGroundImage: "url('./src/Images/Group 13831.png')",
      }),
    },
  },
  plugins: [],
};
