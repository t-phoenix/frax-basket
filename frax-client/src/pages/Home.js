import React from "react"
import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate = useNavigate()
    return(
        <div >
            <h1>Hello! Welcome To Frax Basket</h1>
        </div>
    )
}