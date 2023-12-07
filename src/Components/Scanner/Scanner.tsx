'use client'
import { useState, useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import styles from './Scanner.module.scss'
import { CustomQrReader } from './CustomQrReader/CustomQrReader';
export const Scanner = () => {
  const [data, setData] = useState('No result');
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [facingMode, setFacingMode] = useState('environment')

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      setCameras(videoDevices);
      setFacingMode(videoDevices[videoDevices.length - 1].deviceId)
    });
  }, []);

  const handleCameraChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setFacingMode(event.target.value);
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
      <CustomQrReader facingMode={facingMode} setData={setData} />
      <p>{data}</p>
    </div>
  )
}