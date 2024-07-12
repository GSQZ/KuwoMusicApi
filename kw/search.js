import axios from "axios";

const INFO_RXP = /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/

const handleMusicSearch = async(keyword, page = 1) => {
  if (!keyword) throw new Error("search keyword is required!")
  console.log("---执行搜索---", keyword, page)
  try {
    const url = "http://search.kuwo.cn/r.s?client=kt&all=" +
      encodeURIComponent(keyword.toString()) +
      "&pn=" + (page - 1) + 
      "&rn=10&uid=naiy&ver=kwplayer_ar_9.2.2.1&vipver=1" +
      "&show_copyright_off=1&newver=1&ft=music&cluster=0&strategy=2012&encoding=utf8" +
      "&rformat=json&vermerge=1&mobi=1&issubtitle=1"

    const request = await axios.get(url)
    const result = request.data
    // console.log(result)
    if (!result || !result.abslist) return {
      msg: "failed",
      data: []
    }

    let res = []
    for (const item of result.abslist) {
      let info = {
        album: item.ALBUM,
        album_id: parseInt(item.ALBUMID),
        artist: item.ARTIST,
        duration: parseInt(item.DURATION),
        name: item.SONGNAME,
        // 至于为什么不用replace，相信经历过那次酷我程序员
        // 动他们的史山代码导致洛雪音源全体炸锅的人都知道
        // 对于酷我来讲一个能够经过变通的代码是多么的重要
        id: parseInt(item.MUSICRID.split("_")[1]),
        quality: {}
      }
      const raw_quality = item.N_MINFO.split(";")
      for (let q of raw_quality) {
        q = q.match(INFO_RXP)
        if (q) {
          switch (q[2]) {
            case '4000':
              info.quality.hires = {
                size: q[4].toLocaleUpperCase()
              }
              break
            case '2000':
              info.quality.lossless = {
                size: q[4].toLocaleUpperCase()
              }
              break
            case '320':
              info.quality.exhigh = {
                size: q[4].toLocaleUpperCase()
              }
              break
            case '128':
              info.quality.standard = {
                size: q[4].toLocaleUpperCase()
              }
              break
            default:
              break
          }
        }
      }
      res.push(info)
    }
  return {
    msg: "success",
    data: res
  }
  } catch (e) {
    console.log("搜索处理失败...", e)
    return {
      msg: e.toString(),
      data: []
    }
  }
}

export default handleMusicSearch