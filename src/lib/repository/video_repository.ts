// src/lib/repository/video_repository.ts


import {Video} from "lucide-svelte";

let data = require('data')


/**
 * 1.
 * 从🆔获取视频 - list
 * Parma: ids[]
 *
 * */
export async function getVideoById(id: string): Promise<Video> {
    return await data.getVideoById(id)
}

/**
 * 2.
 *  discover视频 - list
 *  Parma: action
 * */
export async function getVideoList(id: string): Promise<Video> {
    return await data.getVideoById(id)
}