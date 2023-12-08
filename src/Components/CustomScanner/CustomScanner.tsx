
"use client"
import { useRef, useState } from 'react';
import styles from './CustomScanner.module.scss'
import classNames from 'classnames';
import { useVebCamConnection } from './hooks/vebCamConnection';

export const CustomScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { onCameraChange, cameras, deviceId, data, success } = useVebCamConnection({ videoRef })

  return (
    <div className={classNames(
      styles.wrapper,
      {
        [styles.success]: success,
        [styles.error]: errors,
      }
    )}>
      {cameras && !!cameras.length && cameras.length > 1 && (
        <select name="select" onChange={onCameraChange} value={deviceId}>
          {cameras.map((camera) => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label || `Camera ${camera.deviceId}`}
            </option>
          ))}
        </select>
      )}
      <video
        ref={videoRef}
        className={styles.video}
        onError={(error) => {
          const val = error.currentTarget.srcObject
          console.error(error)
          setErrors(true)
          setErrorMessage(`error${String(!!val)}`)
        }}
      />
      {!!data && <p>{data}</p>}
      <br />
      <p>{errorMessage}</p>
    </div>
  )
}