import Head from "next/head";

type HeadingProps = {
    title: string;
}

export const Heading = ( { title }: HeadingProps ) => {
    return (
        <Head>
            <title>{ title }</title>
        </Head>
    )
}