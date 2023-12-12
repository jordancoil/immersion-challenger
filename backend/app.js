require("dotenv").config()
const { createServer } = require("./server");


const app = createServer();

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})