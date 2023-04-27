import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  driverId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const Driver = mongoose.model('Driver', driverSchema);


export default  Driver;