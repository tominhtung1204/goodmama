const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config");
const bodyParser = require("body-parser");
const compression = require("compression");

const userRouter = require("./routers/user");
const infoRouter = require("./routers/info");
const bannerRouter = require("./routers/banner");
const categoryBlogRouter = require("./routers/categoriesBlog");
const blogRouter = require("./routers/blog");
const testimonialRouter = require("./routers/testimonial");
const categoriesProductRouter = require("./routers/categoriesProduct");
const partnerRouter = require("./routers/partner");
const productRouter = require("./routers/product");
const menuRouter = require("./routers/menu");
const videoRouter = require("./routers/video");
const pageRouter = require("./routers/page");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const robotsOptions = {
  root: "/var/tmp",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  }
};

const server = express();

server.use(compression());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use("/tmp", express.static("/tmp"));
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header("Set-Cookie", "HttpOnly;Secure;SameSite=none");
  next();
});
server.use(userRouter);
server.use(infoRouter);
server.use(bannerRouter);
server.use(categoryBlogRouter);
server.use(categoriesProductRouter);
server.use(blogRouter);
server.use(partnerRouter);
server.use(productRouter);
server.use(testimonialRouter);
server.use(menuRouter);
server.use(videoRouter);
server.use(pageRouter);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`API on port ${PORT}`));
