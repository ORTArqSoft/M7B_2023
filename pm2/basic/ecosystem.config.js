module.exports = {
    apps: [{
      name: "add",
      script: "./add.js"
    },
    {
      name: "multiply",
      script: "./multiply.js",
      restart_delay: 10000
    },
    {
      name: "divide",
      script: "./divide.js",
      autorestart: false
    }
           
    ]
  }
  