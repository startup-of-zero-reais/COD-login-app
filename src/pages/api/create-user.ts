import { NextApiRequest, NextApiResponse } from "next";
import { makeApiCreateAccount } from "@/data/factories/create-account-factory";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
	return makeApiCreateAccount().handle(req, res)
}