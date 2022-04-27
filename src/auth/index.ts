import { ethers } from "ethers"
import jwt from "jsonwebtoken"
import { config } from "../config";
import { InvalidAuthToken } from "./error";

interface Account {
    address: string;
    nonce?: string;
}

interface MockDatabase {
    accounts: { [key: string]: Account }
    scores: { [key: string]: number[] }
}

export const db: MockDatabase = {
    accounts: {},
    scores: {}
}


export const setAuthNonce = (address: string, nonce: string) => {
    db.accounts[address] = {
        address, nonce
    }
}

export const clearNonce = (address: string) => {
    db.accounts[address] = {
        ...db.accounts[address],
        nonce: undefined
    }
}

export const getAddressNonce = (address: string): string | null => {
    if (!db.accounts[address] || !db.accounts[address].nonce) return null
    return db.accounts[address].nonce || null
}

export const initializeAuth = (address: string) => {
    const nonce = (Math.random() * 1000).toString()
    setAuthNonce(address, nonce)
    return nonce
}

export const verifyAuth = (address: string, signature: string) => {
    const nonce = getAddressNonce(address)
    if (!nonce) {
        throw new Error("invalid nonce")
    }

    const _address = ethers.utils.verifyMessage(nonce, signature)
    if (_address.toLowerCase() !== address.toLowerCase()) {
        throw new Error("invalid address")
    }


    clearNonce(address)
    return generateJwt(address)
}

export const setScore = (address: string, score: number) => {
    if (db.scores[address]) {
        db.scores[address].push(score)
    } else {
        db.scores[address] = [score]
    }
}

export const getScores = (address: string) => {
    if (!db.scores[address]) return []
    return db.scores[address].sort((a, b) => a - b)
}

export interface AuthData {
    address: string;
}

export const generateJwt = (address: string): string => {
    const authtoken = jwt.sign({ address }, config.authKey)
    return authtoken
}

export const verifyJwt = (authToken: string): AuthData => {
    try {
        return jwt.verify(authToken, config.authKey) as AuthData
    } catch (err: any) {
        throw new InvalidAuthToken(err && err.message ? err.message : "")
    }
}