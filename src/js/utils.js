
/**
 * 随机loading图
 * @param  {int} num 指定验证码
 * @return {stirng}
 */ 
function loading(num=null) {
    if (!num) num = Math.floor(Math.random() * (10-1+1)+1)
    return `loading${num}.gif`
}

/**
 * 获取地址栏GET参数
 * @param  {string} key 要获取的参数
 * @return {stirng}
 */
function getParams(key)
{
       var params = window.location.search.substring(1); // cat=28&a=1&b=2
       var paramsArr = params.split("&")
       for (var i=0;i<paramsArr.length;i++) 
       {
            var temp = paramsArr[i].split("=")
            if(temp[0] == key) return decodeURI(temp[1])
       }
       return '';
}