const app = require('./app');
const dotenv = require("dotenv");
const connectDB = require("./config/db"); 
dotenv.config();

const PORT = process.env.PORT || 8085;
console.log(`PORT: ${PORT}`);



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
});