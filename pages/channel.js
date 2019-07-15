const Channel = ({ channel, audioClips, series }) => (
    <div>
        <header>PodCast</header>

        <h1>{ channel.title }</h1>


        <h2>Series</h2>
        <div>
            {series.map((serie) => (
                <div> 
                    { serie.title }
                </div>
            ))}
        </div>

        <h2>Clips</h2>
        <div>
            {audioClips.map((clip) => (
                <div> 
                    { clip.title }
                </div>
            ))}
        </div>

        <style jsx>{`
            header{
                color: #fff;
                background: #8757ca;
                padding: 15px;
                text-align: center;
            }
            .channels {
                display: grid;
                grid-gap: 15px;
                padding: 15px;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            }
            .channel {
                display: block;
                border-radius: 3px;
                box-shadow: 02px 6px rgba(0,0,0,0.15);
                margin-bottom: 0.5em;
                border-width: 0.5px 2px 0px 2px;
                border-color: rgba(0,0,0,0.15);
                border-style: solid;
                text-decoration: none;
            }
            .channel img{
                width: 100%;
            }
            h1{
                font-weight: 600;
                padding: 15px;
            }
            h2{
                padding: 5px;
                font-size: 0.9em;
                font-weight: 600;
                margin: 0;
                text-align:center;
            }        
        `}</style>
        <style jsx global>{`
            body{
                margin:0;
                font-family: system-ui;
                background: white;
            }
        `}</style>
    </div>
);

Channel.getInitialProps = async ({ query }) => {
    const channel_id = query.id;

    let reqChannel = await fetch(`
        https://api.audioboom.com/channels/${channel_id}`);
    let dataChannel = await reqChannel.json();
    let channel = dataChannel.body.channel;

    let reqAudios = await fetch(`
        https://api.audioboom.com/channels/${channel_id}/audio_clips`);
    let dataAudios = await reqAudios.json();
    let audioClips = dataAudios.body.audio_clips;

    let reqSeries = await fetch(
        `https://api.audioboom.com/channels/${channel_id}/child_channels`);
    let dataSeries = await reqSeries.json();
    let series = dataSeries.body.channels;


    return { channel, audioClips, series }

}

export default Channel;