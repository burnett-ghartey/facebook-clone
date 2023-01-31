import { useRef } from "react";
import { useState } from "react";
import ProfilePicture from "../../components/ProfilePicture"

export default function ProfilePictureInfos({ profile, visitor, photos }) {
  const [show, setShow] = useState(false)
  const pRef = useRef()
  return (
    <div className="profile_img_wrap">
      {
        show && (
          <ProfilePicture setShow={setShow} pRef={pRef} photos={photos}/>
        )
      }
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg" ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile?.picture})`,
            }}
          ></div>
          { !visitor && <div className="profile_circle" onClick={() => setShow(true)}>
            <i className="camera_filled_icon"></i>
          </div>}
        </div>
        <div className="profile_w_col">
            <div className="profile_name">
                {profile.first_name} {profile.last_name}
            </div>
            <div className="othername">(othername)</div>
            <div className="profile_friend_count"></div>
            <div className="profile_friend_imgs"></div>
        </div>
      </div>

    {
      visitor ? ("") : (  <div className="profile_w_right">
      <div className="blue_btn">
          <img className="invert" src="../../../icons/plus.png" alt="" />
          <span>Add to story</span>
      </div>
      <div className="gray_btn">
          <img src="../../../icons/edit.png" alt="" />
          <span>Edit profile</span>
      </div>
    </div>)
    }
    </div>
  );
}
