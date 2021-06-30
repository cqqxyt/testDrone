import ApiForm, { nowapi_xhmac } from '@/services/ApiService/apiForm'

const Apis = {
  airlist: new ApiForm({
    url: '/nnow/v2/stream/livelist/',
    apigwType: nowapi_xhmac
  }),
  airListDetail(ids) {
    return new ApiForm({
      url: `/nnow/v2/stream/${ids}/content/`,
      method: 'get',
      apigwType: nowapi_xhmac
    })
  },
  getSubscripeInfo(stream_id) {
    return new ApiForm({
      url: `/nnow/v1/stream/${stream_id}/push/?time=${+new Date()}`
    })
  },
  featureList: new ApiForm({
    url: '/nnow/v1/stream/bannertable/'
  }),
  showList: new ApiForm({
    url: '/nnow/v1/stream/timetable/'
  })
}

export default Apis
