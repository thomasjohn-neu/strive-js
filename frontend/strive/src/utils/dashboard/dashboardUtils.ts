import * as apiRequestUtils from '../requestUtils/api-request-utils';

export const getPersonalWidgetData = async function(params:any){
    let url:string = 'dashboard/'
    if(params.challengeType !== null) {
      url = url+'?userId='+sessionStorage.getItem('userId')+'&challengeId='+params.challengeId;
    }
    const data = await apiRequestUtils.getReq(url);  
    return data;
  }

  export const getGroupWidgetData = async function(params:any){
    let url:string = 'dashboard/'+params.challengeId+'?challengeId='+params.challengeId
    if(params.challengeType !== null) {
      url = url;
    }
    const data = await apiRequestUtils.getReq(url);  
    return data;
  }