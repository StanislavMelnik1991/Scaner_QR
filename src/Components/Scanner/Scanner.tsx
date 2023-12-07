'use client'
import { useState, useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import styles from './Scanner.module.scss'
import dynamic from 'next/dynamic';
export const Scanner = () => {
  const [data, setData] = useState('No result');
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState('rear')

  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        if (devices.length) {
          const back = videoDevices.find((val)=>val.label && val.label.includes('back'))
          setCameras(videoDevices);
          back && setDeviceId(back.deviceId)
        }
      });
    } else {
      setData('camera not found')
    }
  }, []);


  const CustomQrReader = dynamic(() => import('./CustomQrReader/CustomQrReader'))

  const handleCameraChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setDeviceId(event.target.value);
  };
  return (
    <div className={styles.wrapper} style={{ padding: '0' }}>
      <select name="select" onChange={handleCameraChange}>
        {cameras.map((camera) => (
          <option key={camera.deviceId} value={camera.deviceId}>
            {camera.label || `Camera ${camera.deviceId}`}
          </option>
        ))}
      </select>
      <CustomQrReader facingMode={deviceId} deviceId={deviceId} setData={setData} />
      <p>{data}</p>
    </div>
  )
}