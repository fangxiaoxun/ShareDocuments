import api from '@/utils/request'
enum API {
    BASE_URL = 'http://localhost:3000',
    LATEST_URL = BASE_URL+'/file/getLatest',
    MYDOC_URL = BASE_URL+'/file/getFile',
    FILE_URL = BASE_URL + '/file/getFileType',
}
// 最近文件列表
export async function LatestFiles() {
    const response = await api.get(API.LATEST_URL)
    return response.data
}



// 我的文档
export async function myDocFiles(data:any) {
    const response = await api.get(API.MYDOC_URL,data)
    return response.data
}

export async function getFiles(data:any){
    const response = await api.get(API.BASE_URL,data)
    return response
}




