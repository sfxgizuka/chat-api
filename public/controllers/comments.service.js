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
exports.makeComment = void 0;
const database_1 = __importDefault(require("../database/database"));
const comments_entity_1 = require("../entities/comments.entity");
const post_entity_1 = require("../entities/post.entity");
const makeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        console.log(req.params);
        const postPk = +req.params.postId;
        const commentRepository = database_1.default.getRepository(comments_entity_1.Comments);
        const postRepository = database_1.default.getRepository(post_entity_1.Post);
        const post = yield postRepository.findOne({ where: { pk: postPk } });
        if (!post) {
            return res.status(404).json({
                status: 'error',
                message: 'no post associated with id'
            });
        }
        const commentPayload = new comments_entity_1.Comments();
        commentPayload.content = content;
        commentPayload.post = post;
        let savedComment = yield commentRepository.save(commentPayload);
        res.json({
            status: 'success',
            comment: savedComment
        });
    }
    catch (err) {
    }
});
exports.makeComment = makeComment;
