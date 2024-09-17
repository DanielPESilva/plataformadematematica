import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { URL } from 'url';

const AuthMiddleware = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer')) {
      res.status(400).json({ Error: 'Token not provided'})
    } else {
      const token = auth.split(' ')[1]
      try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
      } catch (error) {
        return res.status(401).json({ Error: 'Incorrect Token' });
      }
    }
  } catch (err) {
    return res.status(401).json({ Error: 'Incorrect Token' });
  }

}
export default AuthMiddleware;