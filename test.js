jwt = require('jsonwebtoken')
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6InNsYXZhIiwidXNlcklkIjoiNjE5MTNkYWY2MTkxODNhZWQ2NjZjN2I2IiwiaWF0IjoxNjM2OTA4NTA3LCJleHAiOjE2MzY5MTU3MDd9.Z72IPjCcRicerRmuI0hmNunJ3ik-u0yuX4VX4uiqOM0"
try {
    const decoded = jwt.verify(token, "secure");
    console.log(decoded)
  } catch (err) {
    console.log(err);
  }