import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SingleDog from './pages/SingleDogs'

const DogSearchApp = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/:name" element={<SingleDog />}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default DogSearchApp
