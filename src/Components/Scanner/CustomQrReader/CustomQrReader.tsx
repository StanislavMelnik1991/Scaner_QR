import { QrReader } from "react-qr-reader";
import { useState, useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import styles from './CustomQrReader.module.scss'

type Props = {
  setData: (val: string) => void
  delay?: number
  aspectRatio?: ConstrainDouble;
}

const CustomQrReader = ({ setData, delay = 100, aspectRatio }: Props) => {

  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState('')

  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        if (devices.length) {
          const back = videoDevices.find((val) => val.label && val.label.includes('back'))
          setCameras(videoDevices);
          back && setDeviceId(back.deviceId)
        }
      }).catch((e) => console.log(e))
    } else {
      setData('camera not found')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (deviceId === '' && cameras.length) {
      setDeviceId(cameras[0].deviceId)
    }
  }, [cameras, deviceId])

  const handleCameraChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setDeviceId(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <select name="select" onChange={handleCameraChange} value={deviceId} className={styles.select}>
        {cameras.map((camera) => (
          <option key={camera.deviceId} value={camera.deviceId}>
            {camera.label || `Camera ${camera.deviceId}`}
          </option>
        ))}
      </select>
      <QrReader
        scanDelay={delay}
        constraints={{ aspectRatio, facingMode: deviceId, deviceId }}
        onResult={(result, error) => {
          if (result) {
            setData(result.getText());
          }

          if (error) {
            console.info(error);
          }
        }}

        containerStyle={{ display: 'flex' }}
        videoContainerStyle={{ width: 'fit-content', height: 'fit-content', padding: '0' }}
        videoStyle={{ position: 'relative' }}
      />
    </div>
  )
}

export default CustomQrReader