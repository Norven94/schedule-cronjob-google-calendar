require('dotenv').config();

const express = require('express');
const cron = require('node-cron')
const scraper = require('./scraper')
const app = express();


app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello world");
})

app.get("/run-cron", async (req, res) => {
    try {
        const data = await scraper();
        return res.status(200).json({
          result: data,
        });
      } catch (err) {
        return res.status(500).json({
          err: err.toString(),
        });
      }
})

const runCron = () => {
  scraper()
}

app.listen(3000, () => console.log('Server ready on port 3000.'));

cron.schedule('*/2 * * * *', runCron)

module.exports = app;