/**
 * Date              Author           Des
 *----------------------------------------------
 * 2021-3-22           庞颖       axios的封装和拦截器
 * */

import axios from "axios";
import Antd from 'ant-design-vue'
import notification from 'ant-design-vue/es/notification'
axios.defaults.retry = 0;
axios.defaults.retryDelay = 1000;

/**
 * axios拦截器
 */
axios.interceptors.request.use(
	config => {
		if (config.method == 'post') {
			config.data = {
				...config.data,
				_t: Date.parse(new Date()) / 1000
			}
		} else if (config.method == 'get') {
			config.params = {
				_t: Date.parse(new Date()) / 1000,
				...config.params
			}
		}
		return config
	}, function (error) {
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(

	response => {
		const {
			data: { errCode },
		} = response;
        if (errCode && errCode !== 0) {
			const error = { response };
			return Promise.reject(error);
		}
		return Promise.resolve(response);
	},
	error => {
		const { config } = error;

		// if (!config || !config.retry) return Promise.reject(error);

		if (!config || (config.retry && config.retry === 0))
			return Promise.reject(error);

		// Set the variable for keeping track of the retry count
		config.retryCount = config.retryCount || 0;

		// Check if we've maxed out the total number of retries
		if (config.retryCount >= config.retry) {
			if (error.response) {
				switch (error.response.status) {
					case 401: {
						// return Promise.resolve(error.response);
						return axios
							.get(`/content-approval/auth-configs`)
							.then(({ data: { address, clientId } }) => {
								window.location.href = `${address}?clientId=${clientId}&gotoPage=${`${
									window.location.href
									}`}`;
							});
					}
					default:
						break;
				}
			}
			// Reject with the error
			return Promise.reject(error);
		}

		// Increase the retry count
		config.retryCount += 1;

		// Create new promise to handle exponential backoff
		const backoff = new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, config.retryDelay || 1);
		});

		// Return the promise in which recalls axios to retry the request
		return backoff.then(() => axios(config));
	}
);

const codeMessage = {
	200: "服务器成功返回请求的数据",
	201: "新建或修改数据成功",
	202: "一个请求已经进入后台排队（异步任务）",
	204: "删除数据成功",
	400: "发出的请求有错误，服务器没有进行新建或修改数据的操作",
	401: "用户没有权限（令牌、用户名、密码错误）",
	403: "用户得到授权，但是访问是被禁止的。",
	404: "发出的请求针对的是不存在的记录，服务器没有进行操作",
	406: "请求的格式不可得",
	410: "请求的资源被永久删除，且不会再得到的",
	422: "当创建一个对象时，发生一个验证错误",
	500: "服务器发生错误，请检查服务器",
	502: "网关错误",
	503: "服务不可用，服务器暂时过载或维护",
	504: "网关超时",
};

const checkStatus = response => {
	if (response.status >= 200 && response.status < 300) {
		return;
	}
	// TODO 处理后台返回的错误信息
	const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
		message: `请求错误 ${response.status}: ${response.config.url}`,
		description: errortext,
		style: {
			width: 484,
			marginLeft: 384 - 484,
		},
	});
};

/**
 * ajax请求同意封装
 *
 * @param    {{config: object axios请求配置, success: object 请求成功配置, error: object 请求失败配置}}
 * @return   {Promise} response   ajax请求结果
 *
 * @date     2021-3-22
 * @author   庞颖
 */
const request = ({ config, success, error }) =>
	axios(config).then(
		response => {
			if (success) {
				Antd.notification.success(success);
			}
			return Promise.resolve(response);
		},
		({ response }) => {
			if (error) {
				Antd.notification.error(error);
			} else {
				checkStatus(response);
			}
			return Promise.reject(response);
		}
	);

export default request;
