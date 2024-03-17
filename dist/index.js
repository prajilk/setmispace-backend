"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const routes_1 = require("./routes");
const routes_2 = require("./routes");
const routes_3 = require("./routes");
const routes_4 = require("./routes");
//Connect to database
require("./config/db");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "200mb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "https://setmispace.vercel.app",
    // origin: [
    //     "http://localhost:3000",
    //     "http://localhost:5173",
    //     "https://setmispace.vercel.app",
    //     "https://admin-setmispace.vercel.app",
    // ],
    credentials: true,
}));
app.use("/api/admin", routes_1.adminRouter);
app.use("/api/business", routes_2.businessRouter);
app.use("/api/hot-selling", routes_3.hotSellingRouter);
app.use("/api/contact", routes_4.contactRouter);
app.get("/", (req, res) => {
    res.send("Server created successfully!");
});
app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
//# sourceMappingURL=index.js.map