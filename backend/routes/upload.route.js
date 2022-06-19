import express from 'express'
import cloudinary from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import multer from 'multer'

dotenv.config()

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

router.post('/image', fileUpload({ useTempFiles: true }), (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        msg: 'No files were uploaded',
      })
    }

    const file = req.files.file
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath)
      return res.status(400).json({
        msg: 'Size too large',
      })
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath)
      return res.status(400).json({
        msg: 'File format is incorrect',
      })
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: 'signs' },
      async (error, result) => {
        if (error) throw error
        removeTmp(file.tempFilePath)
        res.json({ public_id: result.public_id, url: result.secure_url })
      }
    )
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
})

router.post('/image/destroy', (req, res) => {
  try {
    const { public_id } = req.body
    if (!public_id) {
      return res.status(400).json({
        msg: 'No images selected',
      })
    }
    cloudinary.v2.uploader.destroy(public_id, async (error, result) => {
      if (error) {
        throw error
      }
      res.json({
        msg: 'Deleted image',
      })
    })
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    })
  }
})
const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error
  })
}

router.post('/audio', async (req, res) => {
  // Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split('.').pop()
      const filename = `${new Date().getTime()}.${fileExt}`
      cb(null, filename)
    },
  })

  // Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/mpeg') {
      cb(null, true)
    } else {
      cb(
        {
          message: 'Unsupported File Format',
        },
        false
      )
    }
  }

  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  }).single('audio')

  // upload to cloudinary
  upload(req, res, (err) => {
    if (err) {
      return res.send(err)
    }

    // SEND FILE TO CLOUDINARY

    const { path } = req.file // file becomes available in req at this point
    const fName = req.file.originalname.split('.')[0]
    cloudinary.v2.uploader.upload(
      path,
      {
        resource_type: 'raw',
        public_id: `audio/${fName}`,
      },

      // Send cloudinary response or catch error
      (err, audio, io) => {
        if (err) return res.send(err)

        fs.unlinkSync(path)
        res.json({ public_id: audio.public_id, url: audio.secure_url })
      }
    )
  })
})

// module.exports = router
export default router
