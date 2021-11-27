import { NextPage } from "next";
import { paginate, usersApi } from "@/data/requester"

type LoginProps = {
	name: string;
}

const Login: NextPage<LoginProps> = ({ name }) => {
	return (
		<>Hello {name}</>
	)
}

Login.getInitialProps = async () => {
	const obj = await usersApi.get("/users", paginate("1", "20"))
	console.log(obj)
	const { name } = await fetch("http://localhost:3000/api/hello").then(res => res.json())

	return {
		name,
	}
}

export default Login;