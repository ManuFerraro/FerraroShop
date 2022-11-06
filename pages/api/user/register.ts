import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import User from '../../../models/User'
import bcrypt from 'bcryptjs';
import { jwt, validation } from '../../../utils';

type Data = {   message: string }
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
        case 'POST':
            return registerUser(req, res)
            
      
        default:
            return res.status(400).json({ message: 'Bad request'})
      }


   
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
       
     const {email = '', password = '', name= ''} = req.body as {email: string, password: string, name: string};
     
   
    if (password.length < 6 ) {
        return res.status(400).json({ message: 'La contraseña debe tener más de 6 caracteres'})
    }

    if (name.length < 2 ) {
        return res.status(400).json({ message: 'El nombre debe tener más de 2 caracteres'})
    }

    // if (email)
    
     if( !validation.isValidEmail( email )) {
        return res.status(400).json({ message: 'El formato de correo no es válido'})
     }

    await db.connect();
    const user = await User.findOne({ email });
    
     if ( user ) {
        return res.status(400).json({message: 'El correo ya existe'});
     }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name,
    });

    try {
        await newUser.save({validateBeforeSave: true });
    } catch (error) {
        return res.status(500).json({message: 'Revisar logs del servidor'})
    }
    
    const {  _id, role } = newUser;

    const token = jwt.singToken(_id, email);
    
    return res.status(200).json({
        token, //json token
        user: {
            email,
             role,
             name,
        }
    
    })
}
