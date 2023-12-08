import { ChangeEventHandler, RefObject, useEffect, useState } from "react"
import { isMediaDevicesSupported } from "./utils"
import { useScanner } from "./scanner"

type Props = {
  videoRef: RefObject<HTMLVideoElement>
}

const DELAY = 500

export const useVebCamConnection = ({ videoRef }: Props) => {
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);

  const { data, setData, success } = useScanner({ delay: DELAY, videoRef })

  const handleCameraChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setDeviceId(event.target.value);
  };

  useEffect(() => {
    if (isMediaDevicesSupported()) {
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
  }, [setData]);

  useEffect(() => {
    if (!deviceId && cameras.length) {
      setDeviceId(cameras[0].deviceId)
    }
  }, [cameras, deviceId])

  useEffect(() => {
    if (deviceId && isMediaDevicesSupported()) {
      navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: deviceId } } })
        .then((stream) => {
          const video = videoRef.current;
          if (!video) {
            return
          }
          video.srcObject = stream;
          video.play();
        })
        .catch(err => {
          console.log("An error occurred: " + err);
        });
    }
  }, [deviceId, videoRef])

  return {
    onCameraChange: handleCameraChange,
    cameras,
    deviceId: deviceId || cameras[0]?.deviceId || '',
    success,
    data,
  }
}