const UserSchema = require('../model/v2/users')


/*
                CREATE USER
*/

const sign_up_user = async (new_user,callback)=>{
    
    try{
        const user = new UserSchema(new_user)
        await user.save()
            .then(async (user_data)=>{
                const token  = await user_data.generateAuthToken()
                callback(undefined,201,user_data, token)
        })
        .catch((e)=>{
                callback(e.message, 400, undefined,undefined)
        })
    }
    catch(e){
        callback(e.message, 400, undefined,undefined)
    }
    
} 


/*
                LOGIN USER
*/

const login_user = async (credentials,callback)=>{
    
    try{
        const user = await UserSchema.Login_find_credentials(credentials)    
        const token = await user.generateAuthToken()
        callback(undefined,200,user, token)
    }
    catch(err){
        callback(err.message,403,undefined,undefined)
    }
    
}

/*
                LOGOUT USER 
*/

const logout_user = async (user, user_login_token, callback)=>{
        
    user.tokens = user.tokens.filter((token)=>{
        return token.token !== user_login_token
    })

    await user.save()
    .then((user_data)=>{
        callback(undefined, 200, user_data)
    })
    .catch((e) =>{
        callback('Error in Logout',401,undefined)
    })
    
}


/*
                LOGOUT ALL USERS 
*/

const logout_all_tokens = async (user,callback)=>{
    user.tokens = []
    user.save()
    .then((user_data)=>{
        callback(undefined, 200,user_data)
    })
    .catch((e)=>{
        callback( e.message,500,undefined)
    })
}

/*
        GET USER
*/

const get_user_by_name_admin_function = (user_id,callback) =>{

    UserSchema.findOne({name: user_id}).select({ _id: 0, __v: 0 })
    .then((users)=>{
        if(!users){
           callback('User did not found',404,undefined)
        }
        callback(undefined,200,users)
    })
    .catch((e)=>{
        callback(e,500,undefined)
    })
}

/*
        UPDATE ACCOUNT 
*/

const update_user = async (user, update_values,update_body,callback)=>{
    try{
        
        update_values.forEach((value)=>{
            user[value] = update_body[value]
        })

        await user.save()

        if(!user){
            callback("User "+user.name+" did not found",404,undefined)
        }
        callback(undefined,200,user)
    }
    catch(e){
        callback(e.message,400,undefined)
    }
}


const update_user_by_name_admin_function = async (user_id, update_values,update_body,callback)=>{
    try{
        const user = await UserSchema.findOne({name: user_id}).select({__v: 0 })
        
        update_values.forEach((value)=>{
            user[value] = update_body[value]
        })

        await user.save()

        if(!user){
            callback("User "+user_id+" did not found",404,undefined)
        }
        callback(undefined,200,user)
    }
    catch(e){
        callback(e.message,400,undefined)
    }
}

/*
        DELETE OTHER USERS ACCOUNT
*/  

const delete_user_admin_function = async (user_id,callback)=>{
    
    //find user and after delete him
    UserSchema.findOneAndDelete({name: user_id}).select({_id: 0, __v:0})
    .then((data)=>{
        if(!data){
            callback("Invalid User "+user_id,404,undefined);
        }
        callback(undefined,200,data)
    })
    .catch((e)=>{
        callback(e.message,500,undefined)
    })
}

/*
        REMOVE MY ACCOUNT
*/

const remove_user_account = async (user,callback)=>{
    await user.remove()
    .then((data)=>{
        callback(undefined, 200, data)
    })
    .catch((e)=>{   
        callback({Error: 'Delete profile fail'},500,undefined)
    })
}



module.exports = {
    sign_up_user,
    login_user,
    logout_user,
    logout_all_tokens,
    remove_user_account,
    update_user,
    delete_user_admin_function,
    get_user_by_name_admin_function,
    update_user_by_name_admin_function
}