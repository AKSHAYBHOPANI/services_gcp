import { useState, useEffect, useRef, useCallback } from "react"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null
  }

  // // create ref for the StyledModalWrapper component
  // const modalWrapperRef = useRef()

  // // check if the user has clicked inside or outside the modal
  // // useCallback is used to store the function reference, so that on modal closure, the correct callback can be cleaned in window.removeEventListener
  // const backDropHandler = useCallback((e) => {
  //   console.log("backDropHandler", modalWrapperRef, modalWrapperRef?.current?.contains(e.target), e.target)
  //   if (!modalWrapperRef?.current?.contains(e.target)) {
  //     window.removeEventListener("click", backDropHandler)
  //     onClose()
  //   }
  // }, [])

  // useEffect(() => {
  //   // We wrap it inside setTimeout in order to prevent the eventListener to be attached before the modal is open.
  //   setTimeout(() => {
  //     window.addEventListener("click", backDropHandler)
  //   })
  // }, [])

  // useEffect(() => {
  //   // remove the event listener when the modal is closed
  //   return () => window.removeEventListener("click", backDropHandler)
  // }, [])

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ position: "relative" }} data-aos="fade-up" data-aos-offset="200">
        <FontAwesomeIcon icon={faCircleXmark} style={{ width: "25px", height: "25px", color: "#f7da73", position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} onClick={onClose}></FontAwesomeIcon>
        {children}
      </div>
    </div>
  )
}

export default Modal
