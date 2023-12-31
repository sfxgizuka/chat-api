"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_service_1 = require("../controllers/comments.service");
const user_service_1 = require("../controllers/user.service");
const post_service_1 = require("../controllers/post.service");
const joi_middleware_1 = require("../middleware/joi.middleware");
const comment_schema_1 = require("../schemas/comment.schema");
const router = (0, express_1.Router)();
//comment to a post
router.post('/:postId/comments', user_service_1.auth, (0, joi_middleware_1.validateInput)(comment_schema_1.commentSchema), comments_service_1.makeComment);
//fetch top 3 poster's
router.get('/highest', user_service_1.auth, post_service_1.getMostPostMakers);
exports.default = router;
