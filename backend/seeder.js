import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import User from './models/user.model.js'
import connectDB from './config/mongoose.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()

    await User.insertMany(users)

    console.log('Data imported!!!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()

    console.log('Data destroyed!!!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
