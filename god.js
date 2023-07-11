const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1:27017/gasDB"
);
const app = express();
let names;
let mail;
let pswd;
let phno;
let Gas;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  names = req.body.name;
  mail = req.body.email;
  phno = req.body.phno;
  pswd = req.body.password;
  res.render("second", { coded: names });
  console.log(names);

  const gasSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Why no name?"],
    },
    email: {
      type: String,
      required: [true, "Why no email?"],
    },
    phno: {
      type: Number,
      required: [true, "Why no phone number?"],
    },
    password: {
      type: String,
      required: [true, "Why no password?"],
    },
  });

  Registers = mongoose.model("Registers", gasSchema);

  const ideal = new Registers({
    name: names,
    email: mail,
    phno: phno,
    password: pswd,
  });
  ideal.save();
});

app.post("/booking", function (req, res) {
  res.render("booking", { typer: "" });
});

app.post("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.post("/signup", function (req, res) {
  res.redirect("/");
});

app.post("/signupPost", function (req, res) {
  let loginName = req.body.loginName;
  let loginPassword = req.body.loginPassword;
  //  res.send(loginName,loginPassword);
  //  console.log(loginName,loginPassword);

  const gasSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Why no name?"],
    },
    email: {
      type: String,
      required: [true, "Why no email?"],
    },
    phno: {
      type: Number,
      required: [true, "Why no phone number?"],
    },
    password: {
      type: String,
      required: [true, "Why no password?"],
    },
  });

  Registers = mongoose.model("Registers", gasSchema);

  const ideal = new Registers({
    name: names,
    email: mail,
    phno: phno,
    password: pswd,
  });

  console.log(loginName);

  Registers.find({}, function (error, datas) {
    if (error) {
      console.log(error);
    } else {
      let bags = [];
      datas.forEach((dat) => {
        // console.log(dat.name);
        if (dat.name === loginName && dat.password === loginPassword) {
          console.log(`right here we are${dat.name}`);
          names = loginName;
          pswd = loginPassword;
          res.render("second", { coded: loginName });
        } else {
          console.log(`Username or password is wrong`);
          // console.log(false);
          // bags.push(false);
        }
      });
   
    }
  });
});

app.post("/booked", function (req, res) {
  let address = req.body.address;
  let card_number = req.body.card_number;
  let card_type = req.body.optionsRadios;
  let cvv = req.body.cvv_number;
  let card_date = req.body.upto_date;
  let today = new Date();
  let dd = today.getDate();
  let time = today.getTime();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  let seconds = today.getSeconds();
  let minutes = today.getMinutes();
  let hours = today.getHours();
  let ampm = hours >= 12 ? "pm" : "am";

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = dd + "-" + mm + "-" + yyyy;
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;

  let detailsSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Why no name?"],
    },
    password: {
      type: String,
      required: [true, "Why no password?"],
    },
    card_number: {
      type: Number,
      required: [true, "Why no card number?"],
    },
    card_date: {
      type: Date,
      required: [true, "Why there is no date ?"],
    },
    cvv: {
      type: Number,
      required: [true, "Why no cvv number?"],
    },
    cardType: {
      type: String,
      required: [true, "Why does'nt select any card?"],
    },
    address: {
      type: String,
      required: [true, "Why no address?"],
    },
  });

  let Info = mongoose.model("Info", detailsSchema);

  const suf = new Info({
    name: names,
    password: pswd,
    card_number: card_number,
    cvv: cvv,
    card_date: card_date,
    cardType: card_type,
    address: address,
  });
  suf.save();
  res.render("reciept", {
    lastName: names,
    lastAddress: address,
    lastDate: today,
    lastTime: strTime,
    lastMins: time,
  });
});

app.post("/feedback", function (req, res) {
  res.render("feedback", { gotit: "Complaint" });
});

app.post("/last", function (req, res) {
  res.send("complaint updated");
});
app.post("/status", function (req, res) {
  res.send("this page is not available right now");
});
app.listen(3000, function () {
  console.log("server is boosted");
});
