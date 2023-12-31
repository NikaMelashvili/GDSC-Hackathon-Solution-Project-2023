import express from 'express'
import { auth } from 'firebase-admin';
import { random,authentication } from '../helpers';
const admin = require('firebase-admin');

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { firstname,lastname,email,username, password } = req.body;
        if(!firstname || !lastname || !email || !username || !password) {
            return res.status(400).json({message: 'missing fields'})
        }

        const existingUser = await admin.firestore().collection('users').where('email','==',email).get()
        if(!existingUser.empty) {
            return res.status(400).json({message: 'user already exists'})
        }
        const salt = process.env.SECRET
        const hashedPassword = authentication(salt,password)    
        const newUserRef = await admin.firestore().collection('users').add({...req.body,auth: {password:hashedPassword,sessionId:random()}})
        const userDoc = await newUserRef.get()

        return res.status(200).json({message: 'user created',user: userDoc.data(),id: userDoc.id})

    } catch (error ) {
        console.log(error.message)
        return res.status(500).json(error)
    }
}
export const login = async (req: express.Request, res: express.Response) => {
    const {email,password} = req.body

    if (!email || !password) {
        console.log(req.body)
        return res.status(400).json({message: 'missing fields or cant parse request body'})
    } 
    const newUserRef = await admin.firestore().collection('users').where('email','==',email).limit(1)
    const userDoc = await newUserRef.get()
    
    if (userDoc.empty) {
        return res.status(400).json({message: 'user with that email not found'})
    }

    const user = userDoc.docs[0].data()
    const userId = userDoc.docs[0].id
    const expectedHash = authentication(process.env.SECRET,password)
    
    if (user.auth.password !== expectedHash) {
        console.log(expectedHash,user.auth.password)
        return res.status(400).json({message: 'incorrect password'})
    }

    const sessionId = random()
    await admin.firestore().collection('users').doc(userId).update({...user,auth:{password: user.auth.password,sessionId}})

    res.cookie('sessionId',sessionId,{httpOnly:true,secure:true,domain:'localhost',path:'/'})
    const psw = user.auth.password
    return res.status(200).json({...user,auth:{password: psw,sessionId},id: userId})
}

