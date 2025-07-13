import React, { createContext, useState, useEffect } from "react"

export const UserContext = createContext()

const UserContextProvider = (props) => {
  const [profile, setProfile] = useState()

  return <UserContext.Provider value={{ profile, setProfile }}>{props.children}</UserContext.Provider>
}
export default UserContextProvider
