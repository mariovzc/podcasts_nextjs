import React, { useState } from 'react';
import fetch from 'isomorphic-fetch';
import Error from './_error';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import Podcasts from '../components/Podcasts';

const Channel = ({ channel, audioClips, series, statusCode }) => {

  const [openPodcast, setPodcasts] = useState(null);
    
  const setOpenPodcast = (event, podcast) => {
    event.preventDefault();
    setPodcasts(podcast)
  };

  if (statusCode != 200) {
    return <Error statusCode={statusCode} />
  }
  return(
    <Layout title={channel.title}>
      <div 
        className="banner"
        style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }}
      />
      { openPodcast && <div>TIENES UN PODCAST ABIERTO</div>}
      {series.length > 0 &&
        <div>
          <h1>Series</h1>
          <ChannelGrid channels={series} />
        </div>
      }
      {audioClips.length > 0 &&
        <Podcasts 
          audioClips={audioClips} 
          setOpenPodcast={setOpenPodcast}
        />
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
  )
};

Channel.getInitialProps = async ({ query, res }) => {
    const channel_id = query.id;

    try{
      let [reqChannel,reqAudios, reqSeries ] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${channel_id}`),
        fetch(`https://api.audioboom.com/channels/${channel_id}/audio_clips`),
        fetch(`https://api.audioboom.com/channels/${channel_id}/child_channels`)
      ])

      if (reqChannel.status >= 400) {
        res.statusCode = reqChannel.status;
        return {channel: null, audioClips: null, series: null, statusCode: reqChannel.status}  
      }


      let [dataChannel, dataAudios, dataSeries] = await Promise.all([
        reqChannel.json(),
        reqAudios.json(),
        reqSeries.json()
      ])

      let channel = dataChannel.body.channel;
      let audioClips = dataAudios.body.audio_clips;
      let series = dataSeries.body.channels;

      return { channel, audioClips, series, statusCode: 200 }
    } catch(e){
      res.statusCode = 503;
      return {channel: null, audioClips: null, series: null, statusCode: 503}
    }
}

export default Channel;