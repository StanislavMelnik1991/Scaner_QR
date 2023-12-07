import { QrReader } from "react-qr-reader";
import { VideoFinder } from "./VideoFinder/VideoFinder";

type Props = {
  setData: (val: string) => void
  delay?: number
  facingMode: ConstrainDOMString
}

const CustomQrReader = ({setData, delay = 100, facingMode}: Props)=>{
  return <QrReader
  scanDelay={delay}
  constraints={{ facingMode }}
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