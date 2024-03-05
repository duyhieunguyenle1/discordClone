/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 * /api/v1/user/get-users:
 *   get:
 *     summary: Get all users expect current user
 *     tags: [User]
 *     parameters:
 *       - in: cookie
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: get userId assigned in cookies
 *     responses:
 *       200:
 *         description: Get all users successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUsersResponse'
 *       401:
 *         description: Unauthorized user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                msg: string
 *       500:
 *         description: Some server error
 *
 * /api/v1/user/current-user:
 *   get:
 *     summary: Get current user after login
 *     tags: [User]
 *     parameters:
 *       - in: cookie
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: get userId assigned in cookies
 *     responses:
 *       200:
 *         description: Get current user successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserResponse'
 *       401:
 *         description: Unauthorized user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                msg: string
 *       500:
 *         description: Some server error
 *
 * /api/v1/user/get-user/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: get userId by params
 *     responses:
 *       200:
 *         description: Get user by id successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                msg: string
 *       500:
 *         description: Some server error
 */

// Schema
/**
 * @swagger
 *   components:
 *    schemas:
 *     GetUsersResponse:
 *      type: object
 *      properties:
 *        users:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           username:
 *             type: string
 *           password:
 *             type: string
 *           img:
 *             type: string
 *           _id:
 *             type: string
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 *     GetUserResponse:
 *      type: object
 *      properties:
 *        user:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           username:
 *             type: string
 *           password:
 *             type: string
 *           img:
 *             type: string
 *           _id:
 *             type: string
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 */
