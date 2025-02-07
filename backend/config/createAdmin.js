require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const connectDB = require("./db");


const createAdmin = async () => {
  await connectDB(); 

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await Admin.create({ name: "Super Admin", email, password: hashedPassword });

  console.log("Admin created successfully.");
};

createAdmin().then(() => mongoose.connection.close());
