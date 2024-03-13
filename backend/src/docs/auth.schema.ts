/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The user managing API
 * /api/v1/auth/login:
 *   post:
 *     summary: Make a login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *       200:
 *         description: Login successfully.
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token key is signed contain authentication information
 *             schema:
 *               type: string
 *             example: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
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
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *       201:
 *         description: Register successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterUserResponse'
 *       409:
 *         description: Email is already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                msg: string
 *       500:
 *         description: Some server error
 *
 * /api/v1/auth/logout:
 *   post:
 *     summary: Make a logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successfully.
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token key is unsigned
 *             schema:
 *               type: string
 *             example: refreshToken=null
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                msg: string
 *       401:
 *         description: Unauthorized user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                msg: string
 *                status: string
 *       500:
 *         description: Some server error
 *
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: generate a new access token using refresh token
 *     tags: [Auth]
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *          type: string
 *         required: true
 *         description: fetch refresh token stored in client's cookies
 *     responses:
 *       200:
 *         description: Generate new access token successfully.
 *         headers:
 *           Set-Cookie:
 *             description: User id is signed
 *             schema:
 *               type: string
 *             example: userId=HDSANM31312BCMSABAJKD
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                accessToken: string
 *       400:
 *         description: Unauthorized user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                msg: string
 *                status: string
 *       500:
 *         description: Some server error
 *
 * /api/v1/auth/isAuthenticated:
 *   get:
 *     summary: Check if user token is authenticated or not
 *     tags: [Auth]
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *          type: string
 *         required: true
 *         description: fetch refresh token stored in client's cookies
 *     responses:
 *       200:
 *         description: Logout successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                isAuth:
 *                  type: boolean
 *       403:
 *         description: Session is expired, ask to login again
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                msg: string
 *                status: string
 *       500:
 *         description: Some server error
 */

// Schema
/**
 * @swagger
 *   components:
 *    schemas:
 *     RegisterUserInput:
 *      type: object
 *      required:
 *       - email
 *       - password
 *       - username
 *      properties:
 *       email:
 *        type: string
 *        default: admin@example.com
 *       password:
 *        type: string
 *        default: strongPassword123
 *       username:
 *        type: string
 *        default: username123
 *     LoginUserInput:
 *      type: object
 *      required:
 *       - email
 *       - password
 *      properties:
 *       email:
 *        type: string
 *        default: admin@example.com
 *       password:
 *        type: string
 *        default: strongPassword123
 *     LoginUserResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *        user:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *            username:
 *             type: string
 *            password:
 *             type: string
 *            img:
 *             type: string
 *            _id:
 *             type: string
 *            createdAt:
 *             type: string
 *            updatedAt:
 *             type: string
 *     RegisterUserResponse:
 *      type: object
 *      properties:
 *         user:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *            username:
 *             type: string
 *            password:
 *             type: string
 *            img:
 *             type: string
 *            _id:
 *             type: string
 *            createdAt:
 *             type: string
 *            updatedAt:
 *             type: string
 */
