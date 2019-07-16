import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import Podcasts from '../components/Podcasts';

const Channel = ({ channel, audioClips, series }) => (
    <Layout title={channel.title}>
        <div 
            className="banner"
            style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }}
        />
        {series.length > 0 &&
          <div>
              <h1>Series</h1>
              <ChannelGrid channels={series} />
          </div>
        }
        {audioClips.length > 0 &&
          <Podcasts audioClips={audioClips} />
        }

        

        <style jsx>{`
        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
        }
        h1 {
          font-weight: 600;
          padding: 15px;
        }
      `}</style>
    </Layout>
);

Channel.getInitialProps = async ({ query }) => {
    const channel_id = query.id;

    let [reqChannel,reqAudios, reqSeries ] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${channel_id}`),
        fetch(`https://api.audioboom.com/channels/${channel_id}/audio_clips`),
        fetch(`https://api.audioboom.com/channels/${channel_id}/child_channels`)
    ])

    let [dataChannel, dataAudios, dataSeries] = await Promise.all([
        reqChannel.json(),
        reqAudios.json(),
        reqSeries.json()
    ])

    let channel = dataChannel.body.channel;
    let audioClips = dataAudios.body.audio_clips;
    let series = dataSeries.body.channels;


    return { channel, audioClips, series }

}

export default Channel;