

export default function MenuItem({icon, title, subtitle, img}) {
  return (
    <li className="hover 1">
        { img ? <img src={img} alt={img}/> : <i className={icon}></i>}
        <div className="post_menu_text">
            <span>{title}</span>
            {subtitle && <span className="menu_post_col">{subtitle}</span>}
        </div>
    </li>
  )
}
