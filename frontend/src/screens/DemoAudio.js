import React, { useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading/Loading'

export default function DemoAudio() {
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)

  const styleUpload = {
    display: images ? 'block' : 'none',
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0]
      let formData = new FormData()
      formData.append('audio', file)
      setLoading(true)
      const res = await axios.post('/api/upload/audio', formData)
      setLoading(false)
      setImages(res.data)
      console.log(res.data)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const handleDestroy = async () => {
    try {
      setLoading(true)
      await axios.post('/api/destroy', { public_id: images.public_id })
      setLoading(false)
      setImages(false)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  // return (
  //   <div className='create_product'>
  //     <div className='upload'>
  //       <input
  //         type='file'
  //         name='file'
  //         id='file_up'
  //         onChange={handleUpload}
  //       ></input>
  //       {loading ? (
  //         <div id='file_img'>
  //           <Loading></Loading>
  //         </div>
  //       ) : (
  //         <div id='file_img' style={styleUpload}>
  //           <img src={images ? images.url : ''} alt=''></img>
  //           <span onClick={handleDestroy}>Delete</span>

  //           <audio controls className='w-100'>
  //             <source src={images.url}></source>
  //           </audio>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )

  return (
    <div style={{ width: '500px', height: '500px', border: '2px solid red' }}>
      <input type='file' name='file' onChange={handleUpload}></input>
      {loading ? (
        <div>
          <Loading></Loading>
        </div>
      ) : (
        <div>
          {/* <img src={images ? images.url : ''} alt=''></img>
          <span onClick={handleDestroy}>Delete</span> */}

          <audio controls className='w-100'>
            <source src={images.url}></source>
          </audio>
        </div>
      )}
    </div>
  )
}
