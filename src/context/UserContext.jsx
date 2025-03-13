import { createContext, useContext, useState } from 'react'

const userContext = createContext();

const provider = () => {
    const [user, setUser] = useState(null);
}

