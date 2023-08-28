"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.auth = exports.login = exports.signUp = void 0;
const database_1 = __importDefault(require("../database/database"));
const user_entity_1 = __importDefault(require("../entities/user.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utility_1 = require("../helpers/utility");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const userRepo = database_1.default.getRepository(user_entity_1.default);
        // Create a new user entity
        const newUser = new user_entity_1.default();
        newUser.username = username;
        newUser.email = email;
        newUser.password = yield (0, utility_1.encryptor)(password);
        // Save the user entity to the database
        const savedUser = yield userRepo.save(newUser);
        res.status(201).json(savedUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_1.default.getRepository(user_entity_1.default);
        let { email, password } = req.body;
        const user = yield userRepository.findOne({ where: { email } });
        const result = yield bcrypt_1.default.compare(password, user.password);
        if (!result) {
            res.status(400).json({ status: "error", error: "failed to login, enter valid details" });
        }
        else {
            const token = yield (0, utility_1.tokenGen)({ username: user.username, pk: user.pk });
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            res.status(200).json({ userWithoutPassword, token });
        }
    }
    catch (err) {
        res.status(400).json({ status: "error", error: err.message });
    }
});
exports.login = login;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
});
exports.auth = auth;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = database_1.default.getRepository(user_entity_1.default);
    let users = yield userRepository.find();
    let usersWithoutPassword = users.map(user => {
        return {
            pk: user.pk,
            username: user.username,
            email: user.email
        };
    });
    res.json({
        status: 'success',
        users: usersWithoutPassword
    });
});
exports.getUsers = getUsers;
