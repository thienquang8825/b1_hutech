import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomeScreen = () => {
  const [data1, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/users')
      setData(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      {data1.map((d, index) => (
        <div key={index}>
          {d.name} - {d.email}
        </div>
      ))}
    </div>
  )
}

export default HomeScreen
