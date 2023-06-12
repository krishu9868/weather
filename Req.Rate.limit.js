const rateLimit = require('express-rate-limit')
const {winstonLooger} = require("./Middleware/Winston")

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 15 minutes
    max: 100, // Max number of requests per windowMs
    handler: (req, res) => {
        winstonLooger.error("Rate limit exceeded")
        res.status(429).send({ error: 'Rate limit exceeded. Please try again later.' });
            
      }

  });



module.exports = {limiter}

