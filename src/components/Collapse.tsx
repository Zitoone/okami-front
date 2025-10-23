import React, { useState } from "react"
import { FaHandPointUp } from "react-icons/fa"

export type CollapseProps={
    title?: React.ReactNode // pour accepter tous les types,
    children: React.ReactNode 
}

const Collapse = ({title, children }:CollapseProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
    <div className="collapse">
        <span>
            <h3 onClick={() => setIsCollapsed(!isCollapsed)}>{title}</h3>
            <button type='button' className="collapse-button" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? "▲" : "▼"}</button>
        </span>
        {isCollapsed &&(      
            <div className="collapse-content">
                {children}
                <div>
                    <button type='button' className="btn" onClick={()=> setIsCollapsed(false)}><FaHandPointUp /></button>
                </div>
            </div>
            
        )}
    </div>
    )
}
export default Collapse
