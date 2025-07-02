import { Response, Request, NextFunction } from 'express';
import TokenAdmin from '../classes/token';




export const verificarTokenAdmin = ( req: any, res: Response, next: NextFunction ) => {

    const adminToken = req.get('x-tokenadmin') || '' ;
    TokenAdmin.comprobarToken( adminToken )
         .then( (decoded: any)  => {
             console.log('Decoded', decoded );
             req.admin = decoded.admin;
             next();
         }).catch ( err => {
             res.json({
                 ok: false,
                 mensaje: 'token no es correcto'
             });
         });
}

