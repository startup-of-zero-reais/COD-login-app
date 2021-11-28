import { NextApiRequest, NextApiResponse } from "next";
import { usersApi } from "@/data/requester";

type Data = {
	token?: string
	name: string;
}

type LoginResponse = {
	token: string;
	user: {
		name: string;
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { email, password } = req.body

	const [ { token, user }, err ] = await usersApi.post<LoginResponse>("/auth", JSON.stringify({
		email,
		password
	}))


	if (err) {
		return res.status(400).json(err)
	}

	return res.status(200).json({
		name: user.name,
		token,
	})
}