import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { MEDITATION_CONFIG } from '../config/constants';

interface AudioPlayerProps {
  isPlaying: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying }) => {
  // const playerRef = useRef<any>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (playerRef.current && isReady) {
      try {
        if (isPlaying) {
          playerRef.current.playVideo();
          playerRef.current.setVolume(MEDITATION_CONFIG.MUSIC_VOLUME);
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (error) {
        console.error('YouTube player error:', error);
      }
    }
  }, [isPlaying, isReady]);

  const onReady = (event: { target: YT.Player }) => {
    try {
      playerRef.current = event.target;
      event.target.setVolume(MEDITATION_CONFIG.MUSIC_VOLUME);
      setIsReady(true);
    } catch (error) {
      console.error('YouTube player initialization error:', error);
    }
  };

  const onError = (error: { target: YT.Player } ) => {
    console.error('YouTube player error:', error);
  };

  return (
    <div className="hidden">
      <YouTube
        videoId={MEDITATION_CONFIG.YOUTUBE_VIDEO_ID}
        opts={{
          height: '0',
          width: '0',
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: MEDITATION_CONFIG.YOUTUBE_VIDEO_ID,
            origin: window.location.origin,
            enablejsapi: 1,
          },
        }}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
};