module.exports = () => {
  return {
    verbose: true,
    rootDir: "./src",
    moduleDirectories: ["node_modules", "<rootDir>"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
      "^.+\\.(css|less|scss)$": "babel-jest",
    },
    testEnvironment: "jsdom",
  };
};
