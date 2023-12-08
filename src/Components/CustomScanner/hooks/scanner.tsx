import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { useCallback, useEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { Result, Exception } from '@zxing/library';

type Props = {
  delay: number,
  videoRef: RefObject<HTMLVideoElement>
}

type OnResultFunction = (
  result?: Result,
  error?: Exception,
  controls?: IScannerControls
) => void;

export const useScanner = ({ delay, videoRef }: Props) => {
  const [data, setData] = useState<string | null>(null)
  const [success, setSuccess] = useState(false);

  const onResult: OnResultFunction = useCallback( async (result, err, controls) => {
    if (result) {
      const text = result.getText()
      if (text !== data) {
        setSuccess(true)
        setData(text)
      }
    } else if (err) {
      setSuccess(false)
    }
  }, [data])

  useEffect(() => {
    if (videoRef.current) {
      const codeReader = new BrowserQRCodeReader(undefined, {
        delayBetweenScanAttempts: delay,
        delayBetweenScanSuccess: 5 * delay,
      })
      codeReader.decodeFromVideoElement(videoRef.current, onResult)
        }
  }, [delay, onResult, videoRef])

  return {
    data,
    setData,
    success,
  }
}