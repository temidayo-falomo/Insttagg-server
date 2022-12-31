"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _userRoutes = _interopRequireDefault(require("../routes/user-routes.js"));
var _postRoutes = _interopRequireDefault(require("../routes/post-routes.js"));
var _bookmarkRoutes = _interopRequireDefault(require("../routes/bookmark-routes.js"));
var _messageRoutes = _interopRequireDefault(require("../routes/message-routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const app = (0, _express.default)();
app.use((0, _cors.default)({
  origin: ["https://insttagg.herokuapp.com", "https://api.cloudinary.com", "http://localhost:3000", "https://insttagg-client.vercel.app"],
  credentials: true,
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));
app.use(_express.default.json());
app.use((0, _cookieParser.default)());
app.set("trust proxy", 1);
app.use("/api", _userRoutes.default);
app.use("/api/posts", _postRoutes.default);
app.use("/api/bookmarks", _bookmarkRoutes.default);
app.use("/api/messages", _messageRoutes.default);
_mongoose.default.set("strictQuery", false);
_mongoose.default.connect(`mongodb+srv://temidayo:H26VmfkBFuvc5Het@undev.nc7mk.mongodb.net/undev?retryWrites=true&w=majority`).then(() => {
  app.listen(process.env.PORT || 9000);
}).then(() => {
  console.log("Connected To Database....");
}).catch(err => {
  console.log(err);
});