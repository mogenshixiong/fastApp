let HTTP = axios.create();
HTTP.defaults.baseURL = '';
HTTP.defaults.timeout = 30000;
HTTP.defaults.headers["mogenshixiong"] = "\\u771f\\u5e05";

// 请求拦截器
let httpLoading;
let httpTimeout;
HTTP.interceptors.request.use(req => {
  console.log(req);
  httpTimeout = setTimeout(function(){
    httpLoading = layer.load(0, {
      icon:  2, //0,1,2 　　loading风格
      shade: false, // 是否有遮罩，true表示有遮罩
      //time: 2*1000, //设定最长等待时间,设置时间之后，loading会在时间到之后自动关闭
    });
  },300);//超过300ms请求，将显示loading
  
  return req; // 该返回的数据则是axios.then(res)中接收的数据
}, err => {
  clearTimeout(httpTimeout);
  layer.close(httpLoading);
  return Promise.reject(err); // 该返回的数据则是axios.catch(err)中接收的数据
});
// 响应拦截器
HTTP.interceptors.response.use(res => {
  clearTimeout(httpTimeout);
  layer.close(httpLoading);
  return res; // 该返回的数据则是axios.then(res)中接收的数据
}, err => {
  clearTimeout(httpTimeout);
  layer.close(httpLoading);
  return Promise.reject(err); // 该返回的数据则是axios.catch(err)中接收的数据
})

MG.post = async (url, data) => {
  return new Promise((resolve, reject) => {
    HTTP({
      method: 'post',
      url: url,
      data: Qs.stringify(data)
    }).then((res) => {
      resolve(res.data);
    }).catch(function (err) {
      reject(err);
    });
  });
}