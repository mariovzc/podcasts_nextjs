import React, { Fragment } from 'react';
import { Link } from '../routes';
import slug from '../helpers/slug';

export default ({ channels }) => (
  <Fragment>
    <div className="channels">
      {channels.map(channel => (
        <Link 
          route="channel"
          params={{
            slug: slug(channel.title),
            id: channel.id
          }}
          key={channel.id} prefetch>
          <a className="channel">
            <img 
              src={ channel.urls.logo_image.original }
              alt={ channel.title }/>
            <h2>{ channel.title }</h2>
          </a>
        </Link>
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
      a.channel {
        display: block;
        margin-bottom: 0.5em;
        color: #333;
        text-decoration: none;
      }
      .channel img{
        width: 100%;
      }
      h2{
        padding: 5px;
        font-size: 0.9em;
        font-weight: 600;
        margin: 0;
        text-align:center;
      }
    `}</style>
  </Fragment>
);