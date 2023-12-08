
"use client"
import { useRef } from 'react';
import styles from './CustomScanner.module.scss'
import classNames from 'classnames';
import { useVebCamConnection } from './hooks/vebCamConnection';

export const CustomScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const { onCameraChange, cameras, deviceId, data, success } = useVebCamConnection({ videoRef })

  return (
    <div className={classNames(styles.wrapper, { [styles.success]: success })}>
      {cameras && cameras.length && cameras.length > 1 && (
        <select name="select" onChange={onCameraChange} value={deviceId}>
          {cameras.map((camera) => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label || `Camera ${camera.deviceId}`}
            </option>
          ))}
        </select>
      )}
      <video ref={videoRef} className={styles.video} />
      {data && <p>{data}</p>}
    </div>
  )
}