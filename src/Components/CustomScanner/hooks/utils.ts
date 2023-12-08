export const isMediaDevicesSupported = () => {
  const isMediaDevicesSupported =
    typeof navigator !== 'undefined' && !!navigator.mediaDevices

  if (!isMediaDevicesSupported) {
    console.warn(
      `[ReactQrReader]: MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"`
    )
  }

  return isMediaDevicesSupported
}
