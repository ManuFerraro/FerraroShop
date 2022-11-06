import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import User from '../../../models/User'
import { jwt } from '../../../utils';


type Data = 
| {   message: string }
| {
    token: string;
    user: {
        email: string;
        name: string;
        role: string;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
      switch (req.method) {
        case 'GET':
            return checkJWT(req, res)
            
      
        default:
            return res.status(400).json({ message: 'Bad request'})
      }


   
}

async function checkJWT(req: NextApiRequest, res: NextApiResponse<Data>) {
       
     const { token = '' } = req.cookies;
      
     let userId = '';

     try {
        userId  = await (await jwt.isValidToken( token )).toString();

     } catch (error) {
        return res.status(401).json({
            message: 'Token de autorización no es válido'
        })
     }

    await db.connect();
    const user = await User.findById(userId).lean();
    await db.disconnect();

    if( !user ) {
        return res.status(400).json({ message: 'No existe user con ese id'})
    }
    
    const {_id, email, role, name } = user;
    
    return res.status(200).json({
        token: jwt.singToken( _id, email ),
        user: {
            email,
             role,
             name
        }
    
    })
}
