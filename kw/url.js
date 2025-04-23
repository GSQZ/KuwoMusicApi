// import encryptQuery from "./encrypt.js"; KuwoDES寿终正寝，我们不需要它
import axios from "axios";

const source = ''
const QualityMap = {
  standard: { br: "", format: "mp3", bitrate: 128 }, // 经测试br写128kmp3有返回aac的可能，所以空着吧QAQ
  exhigh: { br: "320kmp3", format: "mp3", bitrate: 320 },
  lossless: { br: "2000kflac", format: "flac", bitrate: 2000 },
  hires: { br: "4000kflac", format: "flac", bitrate: 4000 }
}

const handleGetMusicUrl = async (id, quality) => {
  console.log('---获取链接---', id, quality)
  const oq = quality
  quality = QualityMap[quality]
  if (!quality) quality = QualityMap.standard
  try {
    const url = 'https://nmobi.kuwo.cn/mobi.s?f=web&type=convert_url_with_sign&source=' + source + '&br=' + quality.br + '&rid=' + id + '&format=' + quality.format
    // console.log(url)
    const request = await axios.post(url, { "user-agent": "okhttp/3.10.0" })
    const result = request.data
    console.log('bitrate', result.data.bitrate)
    if (result.code !== 200 || !result.data || result.data.bitrate === 1) {
      return {
        msg: result.msg ? result.msg : "failed",
        quality: oq,
        url: null
      }
    } else {
      return {
        msg: (result.data.bitrate == quality.bitrate) ? "success" : 'quality uatched, br=' + result.data.bitrate,
        quality: oq,
        url: result.data.url.split('?')[0]
      }
    }
  } catch (e) {
    console.error("音频播放地址获取失败...")
    return {
      msg: e.toString(),
      quality: oq,
      url: null
    }
  }
}

export default handleGetMusicUrl
