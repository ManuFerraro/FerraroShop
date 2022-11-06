import jwt from 'jsonwebtoken';


export const singToken = (_id: string, email: string) => {
  
    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWF- Revisar variables de entorno')
    }

    return jwt.sign(
        //payload
        {_id, email},

        //seed
        process.env.JWT_SECRET_SEED,

        //Opciones
        {expiresIn: '30d'}
    )
}

export const isValidToken = (token: string):Promise<String> => {
    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWF- Revisar variables de entorno')
    }

    if (token.length <= 10 ) {
        Promise.reject('JWT no es válido');
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
               if( err ) return reject('JWT no es válido');

               const { _id } = payload as {_id: string};

              resolve(_id);
            })
        } catch (error) {
            reject('JWT no es válido')
        }
    })
}