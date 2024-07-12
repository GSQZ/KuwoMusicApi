// import encryptQuery from "./encrypt.js"; KuwoDES寿终正寝，我们不需要它
import axios from "axios";

const QualityMap = {
  standard: { br: "128kmp3", format: "mp3" },
  exhigh: { br: "320kmp3", format: "mp3" },
  lossless: { br: "2000kflac", format: "flac" },
  hires: { br: "4000kflac", format: "flac" }
}

const handleGetMusicUrl = async (id, quality) => {
  console.log('---获取链接---', id, quality)
  const oq = quality
  quality = QualityMap[quality]
  if (!quality) quality = QualityMap.standard
  try {
    const url = 'https://nmobi.kuwo.cn/mobi.s?f=web&type=convert_url_with_sign&source=kwplayer_ar_5.1.0.0_B_jiakong_vh.apk&br=' + quality.br + '&rid=' + id
    // console.log(url)
    const request = await axios.post(url, { "user-agent": "okhttp/3.10.0" })
    const result = request.data
    // console.log(result)
    if (result.code !== 200 || !result.data || result.data.bitrate === 1) {
      return {
        msg: result.msg ? result.msg : "failed",
        quality: oq,
        url: null
      }
    } else {
      return {
        msg: "success",
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