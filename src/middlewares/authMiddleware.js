const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Token em formato inválido.' });
    }
    const authToken = tokenParts[1];

    try {

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);


        req.user = decoded;


        next();

    } catch (error) {

        res.status(401).json({ message: 'Token inválido.' });
    }
}

module.exports = authMiddleware;