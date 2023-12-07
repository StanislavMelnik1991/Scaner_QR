'use client'
import { useState } from 'react';
import styles from './Scanner.module.scss'
import { QrReader } from 'react-qr-reader';
import { VideoFinder } from './VideoFinder/VideoFinder';

export const Scanner = () => {
  const [data, setData] = useState('No result');
  return (
    <div className={styles.wrapper} style={{ padding: '0' }}>
      <QrReader
        constraints={{ facingMode: 'user' }}
        onResult={(result, error) => {
          if (result) {
            setData(result.getText());
          }

          if (error) {
            console.info(error);
          }
        }}
        ViewFinder={VideoFinder}
        containerStyle={{ width: 'fit-content', height: 'fit-content' }}
        videoContainerStyle={{ width: 'fit-content', height: 'fit-content',  padding: '0' }}
        videoId='videoFinder'
      />
      <p>{data}</p>
    </div>
  )
}