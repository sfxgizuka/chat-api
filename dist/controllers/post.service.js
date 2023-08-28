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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostPostMakers = exports.makePost = void 0;
const database_1 = __importDefault(require("../database/database"));
const user_entity_1 = __importDefault(require("../entities/user.entity"));
const post_entity_1 = require("../entities/post.entity");
const makePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, message } = req.body;
        const userPk = +req.params.id;
        const userRepository = database_1.default.getRepository(user_entity_1.default);
        const postRepository = database_1.default.getRepository(post_entity_1.Post);
        const user = yield userRepository.findOne({ where: { pk: userPk } });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'no user with id specified'
            });
        }
        const postPayload = new post_entity_1.Post();
        postPayload.title = title;
        postPayload.message = message;
        postPayload.user = user;
        const savedPost = postRepository.save(postPayload);
        res.json({
            status: 'success',
            message: savedPost
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
});
exports.makePost = makePost;
const getMostPostMakers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postRepository = database_1.default.getRepository(user_entity_1.default);
        const queryBuilder = postRepository.createQueryBuilder('users')
            .leftJoinAndSelect('users.post', 'posts')
            .leftJoinAndSelect('posts.comment', 'comments')
            .select(['users.pk as pk', 'users.username as name', 'posts.title as title', 'comments.content as content'])
            .where('comments."createdAt" = (SELECT MAX("createdAt") FROM comments WHERE comments."postPk" = posts."pk")')
            .orderBy('(SELECT COUNT(post."pk") FROM post WHERE post."userPk" = users."pk")', 'DESC')
            .limit(3);
        const result = yield queryBuilder.getRawMany();
        res.json(result);
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});
exports.getMostPostMakers = getMostPostMakers;
