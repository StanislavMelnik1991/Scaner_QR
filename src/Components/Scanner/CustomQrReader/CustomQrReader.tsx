import { QrReader } from "react-qr-reader";
import { VideoFinder } from "./VideoFinder/VideoFinder";

type Props = {
  setData: (val: string) => void
  delay?: number
  aspectRatio?: ConstrainDouble;
  autoGainControl?: ConstrainBoolean;
  channelCount?: ConstrainULong;
  deviceId?: ConstrainDOMString;
  displaySurface?: ConstrainDOMString;
  echoCancellation?: ConstrainBoolean;
  facingMode?: ConstrainDOMString;
  frameRate?: ConstrainDouble;
  groupId?: ConstrainDOMString;
  height?: ConstrainULong;
  noiseSuppression?: ConstrainBoolean;
  sampleRate?: ConstrainULong;
  sampleSize?: ConstrainULong;
  width?: ConstrainULong;
}

const CustomQrReader = ({ setData, delay = 100, ...constraints }: Props) => {
  return <QrReader
    scanDelay={delay}
    constraints={constraints}
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
    videoContainerStyle={{ width: 'fit-content', height: 'fit-content', padding: '0' }}
    videoId='videoFinder'
  />
}

export default CustomQrReader