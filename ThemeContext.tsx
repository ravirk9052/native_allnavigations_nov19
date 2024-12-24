import React from "react";

const ThemeContext=React.createContext({
    toggleTheme:false,
    changeThemeMode:(p0?: boolean)=>{}
})

export default ThemeContext
