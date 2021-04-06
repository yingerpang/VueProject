import request from '@/utils/axios'

export async function CommonRequestSelectData (method,url,params=null,) {
  const { data,status } = await request({
    config: {
      method: method,
      url: url,
      params
    }
  });
  if (status === 200 || status === 201) {
    return Promise.resolve(data)
  }
  return Promise.reject(data)
}





