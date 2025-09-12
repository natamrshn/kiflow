import { Box } from '@/src/components/ui/box';
import React, { useEffect, useRef, useState } from 'react';

import { useInView } from './useInView';

interface VideoPlayerProps {
  uri?: string;
  mux?: string;
  thumbnail?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ uri, mux }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);
  const { ref: viewRef, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });

  // Set playback rate for video player
  useEffect(() => {
    if (mux && videoRef.current) {
      videoRef.current.playbackRate = 1.25;
    }
  }, [mux]);

  // Video: play/pause based on inView
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    videoElement.playsInline = true;
    videoElement.controls = true;
    videoElement.muted = isMuted;
    
    if (inView && (uri || mux)) {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((error: Error) => {
          console.warn('Autoplay prevented:', error);
          setNeedsUserInteraction(true);
        });
      }
    } else {
      videoElement.pause();
    }
  }, [inView, uri, mux, isMuted]);

  const handleUserPlay = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.muted = false;
    setIsMuted(false);
    const playPromise = videoElement.play();
    playPromise
      .then(() => {
        setNeedsUserInteraction(false);
      })
      .catch((error: Error) => {
        console.error('Play failed even after user interaction:', error);
      });
  };

  return (
    <Box
      // @ts-expect-error Box component type definition issue
      ref={viewRef}
      className='relative h-full w-full flex-1 items-center justify-center bg-black'
      style={{
        width: '100%',
        height: '100vh',       
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {(uri || mux) ? (
        <>
          <video
            ref={videoRef}
            src={uri || (mux ? `https://stream.mux.com/${mux}.m3u8` : undefined)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            preload='auto'
          />
          {needsUserInteraction && inView && (
            <button
              className='absolute z-10 rounded bg-black/70 px-4 py-3 text-base text-white'
              onClick={handleUserPlay}
            >
              Натисніть для відтворення зі звуком
            </button>
          )}
        </>
      ) : null}
    </Box>
  );
};

export default VideoPlayer;
