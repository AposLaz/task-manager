const roleAuth = async (req,res,next)=>{

    try{
        if(req.user.role != 'ADMIN'){
            throw new Error('You do not have access in this resource')
        }

        next()
    }
    catch(e){
        res.status(403).send({Error: e.message})
    }
    
}


module.exports = roleAuth
