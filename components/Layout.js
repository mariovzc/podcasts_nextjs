import Link from 'next/link';
import Head from 'next/head';

export default ({children, title}) => (
    <React.Fragment>
        <Head>
            <title> { title } </title>
        </Head>
        <header>
            <Link href="/">
                <a>
                    { title }
                </a>
            </Link>
        </header>

        { children }

        <style jsx>{`
            header{
                color: #fff;
                background: #8757ca;
                padding: 15px;
                text-align: center;
            }
            header a{
                color: #fff;
                text-decoration: none;
            }
        `}</style>
        <style jsx global>{`
            body{
                margin:0;
                font-family: system-ui;
                background: white;
            }
        `}</style>
    </React.Fragment>
)
