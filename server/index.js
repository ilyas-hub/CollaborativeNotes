const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const http = require("http");
const { initSocket } = require("./utils/socket");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const cors = require("cors");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();


database.connect();


const app = express();
const server = http.createServer(app);

app.use(cors());


app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);


app.use(express.static(path.join(_dirname, "/frontend/dist")));


app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});


initSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`APP IS RUNNING AT PORT ${PORT}`);
});
