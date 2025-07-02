import jwt from 'jsonwebtoken'

export default class TokenAdmin {

    private static seed: string = 'Aqui-termina-la-anecdota-pero-el-te-mato-Da-via-da-Para-Mas';
    private static caducidad: string = '30d'

    constructor() {}

    static getJwtToken( payload: any ): string {
       return jwt.sign({
           admin: payload
       }, this.seed, { expiresIn: this.caducidad });
    }

    static comprobarToken( adminToken: string ) {
        return new Promise( (resolve, reject) => {
            jwt.verify( adminToken, this.seed, (err, decoded ) => {
                if( err ) {
                    reject();
                }else {
                    resolve( decoded );
                }
            } )
        });
    }
}

