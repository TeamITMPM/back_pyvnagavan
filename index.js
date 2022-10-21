import express from "express";
import mongoose from "mongoose";
import Post from "./Post.js";

const PORT = 5000;
const DB_URL =
  "mongodb+srv://admin:20041994@cluster0.pc5fot0.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  const { author, title, content, picture } = req.body;
  const post = await Post.create({ author, title, content, picture });
  console.log(req.body);
  res.json(post);
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log("Server  working " + PORT));
  } catch (err) {
    console.log(err);
  }
}

startApp();
