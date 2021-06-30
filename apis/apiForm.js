import ApiService from '../ApiService'

const URI_PREFIX = process.env.VUE_APP_API_URI
const USE_APIGW = process.env.VUE_APP_APIGWUSE
const VUE_APP_LOCAL = process.env.VUE_APP_LOCAL
const VUE_APP_GWA_URL = process.env.VUE_APP_GWA_URL
/**
 * API Form
 * @param form 폼 생성 인자값
 */
function ApiForm(form) {
  this.form = form
  // uriPrefix: (선택) 호출 URL PREFIX [기본값=기본 API URI]
  this.uriPrefix = form.uriPrefix || `${URI_PREFIX}`
  // url: 호출 URL
  this.url = form.url || undefined
  this.apigwResolve()
  // method: 호출 HTTP Methods
  this.method = form.method || 'get'
  // pathParams: url에 들어가는 호출 인자값
  this.pathParams = form.pathParams || {}
  // params: 호출 인자값
  this.params = form.params || {}
  // headers: Request Headers
  this.headers = form.headers || {}
  // accept: Header Accept 값
  this.accept = form.accept || undefined
  // isJsonp: JSONP 여부 [기본값=false]
  this.isJsonp = form.isJsonp || false
  // callback: 결과값 전처리 콜백
  this.callback = form.callback || undefined
  // header contentType 설정
  this.contentType = form.contentType || undefined
}

export const nowapi_xhmac = 'nowapi-xhmac'
const APIGW_MAP_PATH_LOCAL = {
  'nowcms-api-xhmac': '/now_web/nowcms-api-xhmac',
  'now-chat-api': '/now_web/now-chat-api',
  'nowapi-xhmac': `/now_web/${nowapi_xhmac}`
}
const APIGW_MAP_PATH_ONLINE = {
  'nowcms-api-xhmac': `${VUE_APP_GWA_URL}now_web/nowcms-api-xhmac`,
  'now-chat-api': `${VUE_APP_GWA_URL}now_web/now-chat-api`,
  'nowapi-xhmac': `${VUE_APP_GWA_URL}now_web/${nowapi_xhmac}`
}
ApiForm.prototype.apigwResolve = function (params) {
  const apigwType = this.form.apigwType
  if (apigwType) {
    /**
     * LOCAL: proxy eg: /now_web/nowcms-api-xhmac/cms/v1/shows/1/
     * ONLINE: cors eg: https://stg.apis.naver.com/now_web/nowcms-api-xhmac/cms/v1/shows/1/
     */
    VUE_APP_LOCAL === 'Y'
      ? (this.uriPrefix = APIGW_MAP_PATH_LOCAL[apigwType])
      : (this.url = `${APIGW_MAP_PATH_ONLINE[apigwType]}${this.url}`)
  }
}

/**
 * 현재 API Form 정보로 호출
 */
ApiForm.prototype.$call = function (params) {
  if (this.form.apigw && USE_APIGW === 'YES') {
    this.url = this.form.apigw || undefined
    if (params) {
      Object.keys(params).forEach(key => {
        const reg = /[A-Z]/g
        const value = params[key]
        let match = reg.exec(key)
        if (!match) {
          return
        }
        delete params[key]
        while (match) {
          key =
            match.index === 0
              ? key.replace(match[0], `${match[0].toLowerCase()}`)
              : key.replace(match[0], `_${match[0].toLowerCase()}`)
          match = reg.exec(key)
        }
        params[key] = value
      })
    }
  }
  return ApiService.$call(this, params)
}

export default ApiForm
