import createHttpError from "http-errors";

import * as authServices from "../services/auth.js";

const setupSession = (res, session)=> {
    const {_id, refreshToken, refreshTokenValidUntil} = session;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil
    });

    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil
    });
}

export const registerController = async(req, res)=> {
    const data = await authServices.register(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully registerd user",
    })
}

export const verifyController = async(req, res)=> {
    const {token} = req.query;
    await authServices.verify(token);

    res.json({
        status: 200,
        message: "User verify successfully"
    })
}

export const loginController = async(req, res)=> {
    const session = await authServices.login(req.body);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully login user",
        data: {
            accessToken: session.accessToken,
        }
    })
}

export const refreshSessionController = async(req, res)=> {
    const session = await authServices.refreshUserSession(req.cookies);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully refresh session",
        data: {
            accessToken: session.accessToken,
        }
    })
}

export const logoutController = async(req, res)=> {
    if(req.cookies.sessionId) {
        await authServices.logout(req.cookies.sessionId);
    }

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
}
