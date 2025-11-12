const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/user/profile/", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    res.redirect("/user/profile/");
  } else {
    console.log("Login failed, evaluate route and credentials.");
    res.redirect("/login?error=Invalid credentials");
  }
});

app.get("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    res.status(404).send("File not found");
  }
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
