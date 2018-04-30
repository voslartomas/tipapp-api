module.exports = {
  apps : [{
    name: "Tipapp API",
    cwd: "./build",
    script : "index.js",
    env: {
      "NODE_ENV": "production",
      "REACT_APP_ENV": "production"
    }
  }]
}
