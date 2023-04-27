import express from "express";
import cors from "cors";
import "dotenv/config.js";
import logger from "./utilities/logger.js";
import connectDatabase from "./config/database.js";
import deliveryRouter from "./routes/delivery.js";
import itemRoute from "./routes/item.route.js";
import payRouter from "./routes/payment.js";
import uploadImage from "./uploadimage.js"
import sendEmail from "./utils/sendEmail.js";
import Driverrouter from "./routes/Driver.js";

const app = express();
const PORT = process.env.PORT || 8091;

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get('/', (req, res) => {s
    res.send('Server is running');
})

//Image
// app.post("/uploadImage", (req, res) => {
//     uploadImage(req.body.itemImage).then((url) => {
//         res.send(url)
//     }).catch((err) => {
//         res.status(500).send(err)
//     })
// })

app.use("/delivery",deliveryRouter);

app.use("/item", itemRoute);

app.use("/payment", payRouter);
app.use("/Driver", Driverrouter);
//ROUTE
app.post("/api/sendEmail", async (req, res) => {
    const {email} = req.body;
    try {
        const send_to=email;
        const sent_from=process.env.EMAIL_USER;
        const reply_to=email;
        const subject ="Thank you message";
        const message = `
        <h3>Hello ! ..............</h3>
        <p>Thank you for your order..................</p>
        <p>We received your order and will contact you as soon as your package is shipped.......</p>
        <p>Have a nice day.......</p>

    `;
    
        await sendEmail(subject,message,send_to,sent_from,reply_to);
        res.status(200).json({success: true, message:"Email sent"})
    } catch (error) {
        res.status(500).json(error.message);
    }
});


app.listen(PORT, () => {
    logger.info("Server has started and running on port " + PORT);
    connectDatabase();
})

app.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image).then((url) => {
        res.send(url)
    }).catch((err) => {
        res.status(500).send(err)
    }) 
})


app.get('/api/drivers', async (req, res) => {
    try {
      const drivers = await driver.find();
      res.json(drivers);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

