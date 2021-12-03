import { NextApiRequest, NextApiResponse } from "next";
import { makeApiRecoverPassword } from "@/data/factories/recover-password-factory";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
	return makeApiRecoverPassword().handle(req, res)
}