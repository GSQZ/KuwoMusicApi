import { encryptQuery } from './kwDES.js'; // 确保路径正确
import axios from "axios";

/**
 * 获取酷我音乐歌曲 ID
 * @param {string} keyword - 搜索关键字
 * @returns {Promise<any>}
 */
const getKuwoSongId = async (keyword) => {
  try {
    const url =
      "http://search.kuwo.cn/r.s?&correct=1&stype=comprehensive&encoding=utf8" +
      "&rformat=json&mobi=1&show_copyright_off=1&searchapi=6&all=" +
      keyword.toString();
    const result = await axios.get(url);
    if (
      !result.data ||
      result.data.content.length < 2 ||
      !result.data.content[1].musicpage ||
      result.data.content[1].musicpage.abslist.length < 1
    ) {
      return null;
    }
    const songId = result.data.content[1].musicpage.abslist[0].MUSICRID;
    return songId.slice("MUSIC_".length);
  } catch (error) {
    console.error("获取酷我音乐歌曲 ID 失败：", error);
    return null;
  }
};

/**
 * 获取酷我音乐歌曲 URL
 * @param {string} keyword - 搜索关键字
 * @returns {Promise<any>}
 */
const getKuwoSongUrl = async (keyword) => {
  try {
    const songId = await getKuwoSongId(keyword);
    if (!songId) return null;
    console.info("酷我解灰歌曲 ID：", songId);
    const url = encryptQuery
      ? "http://mobi.kuwo.cn/mobi.s?f=kuwo&q=" +
        encryptQuery(
          "corp=kuwo&source=kwplayer_ar_5.1.0.0_B_jiakong_vh.apk&p2p=1&type=convert_url2&sig=0&format=mp3" +
            "&rid=" +
            songId,
        )
      : "http://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=MUSIC_" +
        songId;
    const result = await axios.get(url, { "user-agent": "okhttp/3.10.0" });
    if (result.data) {
      const urlMatch = result.data.match(/http[^\s$"]+/)[0];
      console.info("酷我解灰歌曲 URL：", urlMatch);
      return urlMatch;
    }
    return null;
  } catch (error) {
    console.error("获取酷我音乐歌曲 URL 失败：", error);
    return null;
  }
};

/**
 * 获取给定关键字的音乐 URL
 * @param {string} keyword - 关键字
 * @returns {Promise<?string>} 音乐 URL
 */
const getNeteaseMusicUrl = async (keyword) => {
  try {
    const kuwoSongUrl = await getKuwoSongUrl(keyword);
    if (kuwoSongUrl) {
      return kuwoSongUrl;
    }
    return null;
  } catch (error) {
    console.error("获取解灰 URL 全部失败：", error);
    return null;
  }
};

export default getNeteaseMusicUrl;
