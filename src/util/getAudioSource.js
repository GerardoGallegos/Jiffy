import encodeUrl from 'encodeurl'

const getAudioSource = ({ text, lang }) => {
  return `https://google-translate-proxy.herokuapp.com/api/tts?query=${encodeUrl(text)}&language=${lang}&speed=1`
}

export default getAudioSource