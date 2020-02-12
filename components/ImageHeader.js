import {getCode} from '../utils/helperFunctions';
import Head from 'next/head';


export default () =>
    <div className="image-header">
        <Head>
            <title>Auction Hub</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link href="https://fonts.googleapis.com/css?family=Merriweather:400,700|Open+Sans:300,400|Oswald:300,400&display=swap" rel="stylesheet"></link>

        </Head>
        <h1>Auction Hub</h1>
        <div className="login-header-info">
            <p>Join the Auction Hub {getCode(38)} Bid Today{getCode(33)}</p>
        </div>
    </div>;