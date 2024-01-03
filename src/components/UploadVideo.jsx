import { UploadFile } from '@mui/icons-material'
import React from 'react'

export default function UploadVideo() {
    async function uploadVideo(event){
        event.preventDefault()
        const video = event.target.video.file
        console.log(video, event.target.video.files[0])
    }
  return (
    <div className="main">
        <form onSubmit={uploadVideo} encType='multipart/form-data'><input type="file" name="video" id="video" />
        <button type="submit">Submit</button></form>
    </div>
  )
}