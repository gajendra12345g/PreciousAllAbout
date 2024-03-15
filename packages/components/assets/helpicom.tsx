import React from "react"

interface Props{
    color?:string,
}

const HelpIcon =(props:Props)=>(
    <>
    <svg width="24" height="24"  fill={props.color??"black"} xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1957 19.1522C8.36 19.1522 5.23913 16.0313 5.23913 12.1957C5.23913 8.36 8.36 5.23913 12.1957 5.23913C16.0313 5.23913 19.1522 8.36 19.1522 12.1957C19.1522 16.0313 16.0313 19.1522 12.1957 19.1522ZM12.1957 3.5C7.40087 3.5 3.5 7.40087 3.5 12.1957C3.5 16.9904 7.40087 20.8913 12.1957 20.8913C16.9904 20.8913 20.8913 16.9904 20.8913 12.1957C20.8913 7.40087 16.9904 3.5 12.1957 3.5ZM11.3261 17.413H13.0652V15.6739H11.3261V17.413ZM12.1957 6.97826C10.2774 6.97826 8.71739 8.53826 8.71739 10.4565H10.4565C10.4565 9.49739 11.2365 8.71739 12.1957 8.71739C13.1548 8.71739 13.9348 9.49739 13.9348 10.4565C13.9348 11.4157 13.1548 12.1957 12.1957 12.1957H11.3261V14.8043H13.0652V13.8252C14.5643 13.4374 15.6739 12.0739 15.6739 10.4565C15.6739 8.53826 14.1139 6.97826 12.1957 6.97826Z" />
    </svg>
    </>

)

export default HelpIcon