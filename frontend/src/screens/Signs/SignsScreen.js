import React, { useState } from 'react'
import axios from 'axios'
//import { GlobalState } from "../../../GlobalState";
import Loading from '../../components/Loading/Loading'
//import { useNavigate, useParams } from "react-router-dom";

export default function CreateProduct() {
  //const state = useContext(GlobalState);
  //const [product, setProduct] = useState(initoalState);
  //const [brands] = state.brandAPI.brand;
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)
  //const [isAdmin] = state.userAPI.isAdmin;
  //const [token] = state.token;
  //const history = useNavigate();
  //const param = useParams();
  //const [products] = state.productsAPI.products;
  //const [onEdit, setOnEdit] = useState(false);
  //const [callback, setCallback] = state.productsAPI.callback;

  const styleUpload = {
    display: images ? 'block' : 'none',
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0]
      if (!file) {
        return alert('File not exist')
      }
      if (file.size > 1024 * 1024) {
        return alert('Size too large')
      }
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return alert('File format is incorrect')
      }
      let formData = new FormData()
      formData.append('file', file)
      setLoading(true)
      const res = await axios.post('/api/upload', formData)
      setLoading(false)
      setImages(res.data)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const handleDestroy = async () => {
    try {
      setLoading(true)
      await axios.post('/api/upload/destroy', { public_id: images.public_id })
      setLoading(false)
      setImages(false)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  return (
    <div className='create_product'>
      <div className='upload'>
        <input
          type='file'
          name='file'
          id='file_up'
          onChange={handleUpload}
        ></input>
        {loading ? (
          <div id='file_img'>
            <Loading></Loading>
          </div>
        ) : (
          <div id='file_img' style={styleUpload}>
            <img src={images ? images.url : ''} alt=''></img>
            <span onClick={handleDestroy}>Delete</span>
          </div>
        )}
      </div>
    </div>
  )
}
