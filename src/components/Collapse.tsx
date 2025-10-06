import { useState } from "react"

export type CollapseProps={
    title: string,
    children: React.ReactNode // pour accepter tous les types
}

const Collapse = ({title, children }:CollapseProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="collapse">
        <span>
            <h4>{title}</h4>
            <button className="collapse-button" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? " ↑" : "↓"}</button>
        </span>
        {isCollapsed &&(      
            <div className="collapse-content">
                {children}
            </div>
        )}
    </div>
  )
}
export default Collapse