import { useState, useRef } from "react";
import MenuItem from "./MenuItem";
import useClickOutside from "../../helpers/clickOutside"



export default function PostMenu({postUserId, userId, imagesLength, setShowMenu}) {
    const [test, setTest] = useState(postUserId === userId ? true : false)
    const menu = useRef(null)

useClickOutside(menu, () => setShowMenu(false))

  return (
    <ul className="post_menu" ref={menu}>
        {
            test && (<MenuItem icon="pin_icon" title="Pin Post"/>)
            
        }
        <MenuItem icon="save_icon" title="Save Post" subtitle="Add this to your saved items."/>
        <div className="line"></div>
       { test &&  <MenuItem icon="edit_icon" title="Edit Post"/>}
       { !test &&  <MenuItem icon="turnOnNotification_icon" title="Turn on notifications for this post"/>}
       { imagesLength &&  <MenuItem icon="download_icon" title="Download"/>}
       { imagesLength &&  <MenuItem icon="fullscreen_icon" title="Enter Fullscreen"/>}
       { test &&  <MenuItem img="../../../icons/lock.png" title="Edit Audience"/>}
       { test &&  <MenuItem icon="turnOffNotifications_icon" title="Turn off notifications for this post"/>}
       { test &&  <MenuItem icon="date_icon" title="Edit Date"/>}
       { test &&  <MenuItem icon="refresh_icon" title="Refresh Share Attachment"/>}
       { test &&  <MenuItem icon="archive_icon" title="Move to archive"/>}
       { test &&  <MenuItem icon="trash_icon" title="Move to trash" subtitle="Items in our trash are deleted after 30 days"/>}
       { !test && (<div className="line"></div>)}
       { !test &&  <MenuItem img="../../../report.png" title="Report post" subtitle="I am concerned about this post"/>}
    </ul>
  )
}
