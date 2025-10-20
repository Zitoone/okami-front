import { useState } from "react"
import { FaHandPointUp } from "react-icons/fa"

export type CollapseProps={
    title: string,
    children: React.ReactNode // pour accepter tous les types
}

const Collapse = ({title, children }:CollapseProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
    <div className="collapse">
        <span>
            <h2 onClick={() => setIsCollapsed(!isCollapsed)}>{title}</h2>
            <button type='button' className="collapse-button btn" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? "▲" : "▼"}</button>
        </span>
        {isCollapsed &&(      
            <div className="collapse-content">
                {children}
                <div>
                    <button type='button' className="collapse-button btn" onClick={()=> setIsCollapsed(false)}><FaHandPointUp /></button>
                </div>
            </div>
            
        )}
    </div>
    )
}
export default Collapse
