import fetch from 'isomorphic-fetch';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

const Index = ({ channels }) => {
    return(
        <Layout title="Podcasts">
            <ChannelGrid channels={channels} />
        </Layout>
    );
}

Index.getInitialProps = async () => {
    let req = await fetch('https://api.audioboom.com/channels/recommended');
    let channels = await req.json();
    return { channels: channels.body }
}

export default Index;