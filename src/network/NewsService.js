//导入axios  和 阿里的请求Code
import axios from 'axios'
import { AppCode } from './AppCode'

//获取所有的 新闻类别  Channels(频道) async 异步  await 等待
export async function getNewsChannels() {
  let res = await axios.get("http://ali-news.showapi.com/channelList", {
    headers: {
      Authorization: `APPCODE ${AppCode}`
    }
  })

  return res.data.showapi_res_body.channelList
}



//获取所有的新闻频道id 页码  (对应频道中的数据)
export async function getNews(channelId, page = 1, maxResult = 10) {
  let res = await axios.get("http://ali-news.showapi.com/newsList", {
    headers: {
      Authorization: `APPCODE ${AppCode}`
    },
    params: {
      channelId,
      page,
      maxResult,
      needAllList: false,
      needContent: 1,
    }
  })
  return res.data.showapi_res_body.pagebean
}
/**
 * channelid 新闻频道id
 * maxResult 每页最大请求数,默认是20
 * page 页数，默认1。每页最多20条记录。
 */