import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const tokenGen = async (data: Record<string,any>)=>{    
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(data,secret);
    return token;
}

const encryptor = async (pass:string):Promise<string> =>{
    const Salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass, Salt)
}

export { tokenGen, encryptor }