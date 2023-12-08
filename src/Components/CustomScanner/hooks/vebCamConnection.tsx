import { ChangeEventHandler, useEffect, useState, useCallback } from 'react'
import { isMediaDevicesSupported } from './utils'
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser'
import type { RefObject } from 'react'
import type { Result, Exception } from '@zxing/library'

type Props = {
  videoRef: RefObject<HTMLVideoElement>
}

type OnResultFunction = (
  result?: Result,
  error?: Exception,
  controls?: IScannerControls
) => void

const DELAY = 500

export const useVebCamConnection = ({ videoRef }: Props) => {
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([])
  const [errors, setErrors] = useState(false)
  const [data, setData] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  /* const [videoStream, setVideoStream] = useState(null) */
  const [controlsRef, setControlsRef] = useState<IScannerControls | undefined>(
    undefined
  )

  const onResult: OnResultFunction = useCallback(async (result, err) => {
    if (result) {
      const text = result.getText()
      setSuccess(true)
      setData(text)
    } else if (err) {
      setSuccess(false)
    }
  }, [])
  const [errorMessage, setErrorMessage] = useState('')

  const setCamera = useCallback(
    (id: string, video: HTMLVideoElement) => {
      if (id && video && isMediaDevicesSupported()) {
        navigator.mediaDevices
          .getUserMedia({ video: { deviceId: { exact: id } } })
          .then((stream) => {
            /* video.srcObject = stream */
            const codeReader = new BrowserQRCodeReader(undefined, {
              delayBetweenScanAttempts: DELAY,
              delayBetweenScanSuccess: 5 * DELAY,
            })
            codeReader
              .decodeFromStream(stream, video, onResult)
              .then((controls: IScannerControls) => setControlsRef(controls))
              .catch((error: Error) => {
                console.error(error)
              })
          })
          .catch((e) => {
            console.error(e)
          })
      }
    },
    [onResult]
  )

  const changeCamera = useCallback(
    (id: string) => {
      const video = videoRef.current
      if (id && video && isMediaDevicesSupported()) {
        setDeviceId(id)
        setCamera(id, video)
      }
    },
    [setCamera, videoRef]
  )

  const handleCameraChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const video = videoRef.current
    if (video) {
      video.srcObject = null
    }
    changeCamera(event.target.value)
  }

  useEffect(() => {
    if (isMediaDevicesSupported()) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          )
          if (devices.length) {
            const mainCamera = videoDevices.find(
              (val) => val.label && val.label.includes('back')
            )
            if (videoDevices) {
              setCameras(videoDevices)
              if (mainCamera) {
                changeCamera(mainCamera.deviceId)
              } else {
                changeCamera(videoDevices[0].deviceId)
              }
            }
          }
        })
        .catch((e) => {
          setErrors(true)
          setErrorMessage(e)
          console.error(e)
        })
    } else {
      setData('camera not found')
    }
    return () => {
      if (controlsRef) {
        controlsRef.stop()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeCamera, setData, videoRef])

  return {
    onCameraChange: handleCameraChange,
    cameras,
    deviceId: deviceId || cameras[0]?.deviceId || '',
    success,
    data,
    errors,
    setErrors,
    errorMessage,
    setErrorMessage,
  }
}
