// 存储文件信息
import { defineStore } from "pinia";
import { LatestFiles, getFiles, getDeleteFiles, recoverFile, deleteFile, getCollectFiles,collectFile,cancelCollectFile } from "@/api/files/files";
import { recoverFolder } from '@/api/files/folder'

interface File {
    fileId: string;
    fileName: string;
    fileType: string;
    createDate: string;
    lastDate: string;
    folderId: string;
    creator: string;
    content: string | null;
    deleteType: string;
    collectType: string;
}
interface deleteData {
    fileId?: string;
    fileName?: string;
    fileType?: string;
    creator?: string;
    lastDate: string;
    content?: string | null;
    deleteType: string;
    collectType: string;
    userId?: string;
    createDate?: string;
    collectDate: string;
    folderDelete?: string;

}
interface State {
    latestList: File[],
    filesList: File[],
    deleteList: deleteData[]
}

export const useFileStore = defineStore('files', {
    state: (): State => ({
        // 最近文件列表
        latestList: [],
        // 文件列表
        filesList: [],
        // 回收站文件列表
        deleteList: []
    }),
    getters: {
        getLasteList: (state) => {
            console.log(state.latestList)
            return state.latestList
        },
        getFileList: (state) => {
            // console.log()
            return state.filesList
        },
        getDeleteList: (state) => {
            return state.deleteList
        }
    },
    actions: {
        // 获取最近文件列表
        async setLatesList() {
            try {
                const response = await LatestFiles()
                this.latestList = response
            } catch (err) {
                console.log(err)
            }
        },
        // 获取指定文件列表
        async setFileList(folderId: string) {
            try {
                const response = await getFiles({ params: { folderId: folderId } })
                this.filesList = response
            } catch (err) {
                console.log(err)
            }
        },
        // 回收站文件
        async setDeleteList() {
            const response = await getDeleteFiles()
            console.log(response)
            this.deleteList = response
        },
        // 回收站恢复
        async recoverData(id: string, type: string) {
            if (type === 'file') {
                console.log('恢复文件')
                await recoverFile({ params: { fileId: id } })
            }
            if (type === 'folder') {
                console.log("恢复文件夹")
                await recoverFolder({ params: { folderId: id } })
            }
        },
        async delete(fileId: string) {
            await deleteFile({ params: { fileId: fileId } })
        },
        // 显示收藏文件
        async setCollect() {
            // this.filesList = await getCollectFiles
            const response = await getCollectFiles();
            this.filesList = response
        },
        // 收藏文件
        async addCollect(fileId: string) {
            await collectFile({ params: { fileId: fileId } })
        },
        // 取消收藏文件
        async deleteCollect(fileId: string) {
            await cancelCollectFile({ params: { fileId: fileId } })
        }
    }
})

// export default useFileStore;