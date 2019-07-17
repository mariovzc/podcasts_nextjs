import fetch from 'isomorphic-fetch';
import Error from './_error';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

const Index = ({ channels, statusCode }) => {

  if (statusCode != 200) {
    return <Error statusCode={statusCode} />
  }

  return(
    <Layout title="Podcasts">
      <ChannelGrid channels={channels} />
    </Layout>
  );
}

Index.getInitialProps = async ({ res }) => {
  try {
    let req = await fetch('https://api.audioboom.com/channels/recommended');
    let channels = await req.json();
    return { channels: channels.body, statusCode: 200 }  
  } catch(e) {
    res.statusCode = 503;
    return { channels: null, statusCode: 503 }
  }
}

export default Index;