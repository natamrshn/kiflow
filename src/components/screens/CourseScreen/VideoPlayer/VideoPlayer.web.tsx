import { Box } from '@/src/components/ui/box';
import type MuxPlayerElement from '@mux/mux-player';
import MuxPlayer from '@mux/mux-player-react';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from './useInView';

interface VideoPlayerProps {
  uri?: string;
  mux?: string;
  thumbnail?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ uri, mux }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const muxPlayerRef = useRef<MuxPlayerElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);
  const { ref: viewRef, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });

  // Disable Cast SDK globally when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).cast = undefined;
      (window as any).chrome = (window as any).chrome || {};
      (window as any).chrome.cast = undefined;
    }
  }, []);

  // Set playback rate for mux player
  useEffect(() => {
    if (mux && muxPlayerRef.current) {
      muxPlayerRef.current.playbackRate = 1.25;
    }
  }, [mux]);

  // Native video: play/pause based on inView
  useEffect(() => {
    if (!uri) return;
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.playsInline = true;
    videoElement.controls = true;
    videoElement.muted = isMuted;
    if (inView) {
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
  }, [inView, uri, isMuted]);

  // MuxPlayer: play/pause based on inView
  useEffect(() => {
    if (!mux || !muxPlayerRef.current) return;
    if (
      typeof muxPlayerRef.current.play === 'function' &&
      typeof muxPlayerRef.current.pause === 'function'
    ) {
      if (inView) {
        muxPlayerRef.current.play();
      } else {
        muxPlayerRef.current.pause();
      }
    }
  }, [inView, mux]);

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
    >
      {uri ? (
        <>
          <video
            ref={videoRef}
            src={uri || undefined}
            style={{ width: '100%', height: '80%', objectFit: 'cover' }}
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
      ) : mux ? (
        // <View>ddkd</View>
        <MuxPlayer
          ref={muxPlayerRef}
          playbackId={mux}
          streamType='on-demand'
          style={{ width: '100%', height: '80%', objectFit: 'cover' }}
          autoPlay={inView}
          muted
          cast={false}
          disableRemotePlayback={true}
          noCast={true}
          castDisabled={true}
        />
      ) : null}
    </Box>
  );
};

export default VideoPlayer;