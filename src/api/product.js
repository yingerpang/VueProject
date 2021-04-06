import request from '@/utils/axios'

//模块接口URL
const API = {
  productList: '/api/product/page',
  delProduct:'/api/product/removeBatchProduct',
  productAdd:'/api/product/add',
  productUpdate:'/api/product/update',
  productDetail:'/api/product/getDetail',
  productSupplier:'/api/product/selectSupplier'

}

/**
 *模块接口方法
 */

/**
 * 获取主题列表
 * @param parameter
 * @returns {*}
 */
export async function getProductList (params=null) {
  console.log("parameter",params);
  const { data,status } = await request({
    config: {
      method: "GET",
      url: API.productList,
      params
    }
  });
  if (status === 200 || status === 201) {
    return Promise.resolve(data)
  }
  return Promise.reject(data)
}

export async function delProductByIds (Ids=null) {
  const { data,status } = await request({
    config: {
      method: "DELETE",
      url: `${API.delProduct}?ids=${Ids}`,
    }
  });
  if (status === 200 || status === 201) {
    return Promise.resolve(data)
  }
  return Promise.reject(data)
}


export async function productAdd (params=null) {
  const { data,status } = await request({
    config: {
      method: "POST",
      url: `${API.productAdd}`,
      data:params
    }
  });
  if (status === 200 || status === 201) {
    return Promise.resolve(data)
  }
  return Promise.reject(data)
}

export async function productUpdate (params=null) {
  const { data,status } = await request({
    config: {
      method: "PUT",
      url: `${API.productUpdate}`,
      data:params
    }
  });
  if (status === 200 || status === 201) {
    return Promise.resolve(data)
  }
  return Promise.reject(data)
}

export async function productDetail (params=null) {
  const { data,status } = await request({
    config: {
      method: "GET",
      url: `${API.productDetail}`,
      params
    }
  });
  if (status === 200 || status === 201) {
    return Promise.resolve(data)
  }
  return Promise.reject(data)
}


export async function productSupplier (params=null) {
  const { data,status } = await request({
    config: {
      method: "GET",
      url: `${API.productSupplier}`,
      params
    }
  });
  if (status === 200 || status === 201) {
    return Promise.resolve(data)
  }
  return Promise.reject(data)
}






