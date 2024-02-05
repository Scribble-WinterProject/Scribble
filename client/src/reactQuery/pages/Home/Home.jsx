import React from 'react'
import { getSession } from '../../../appwrite/api'

export const Home = () => {
    const session = getSession();

  return (
    <div>Home</div>
  )
}
