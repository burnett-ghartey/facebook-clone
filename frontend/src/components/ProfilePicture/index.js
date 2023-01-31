import './styles.css'
import { useRef, useState } from 'react'
import UpdateProfilePicture from './UpdateProfilePicture'
import  useOnClickOutside from "../../helpers/clickOutside"
import { useSelector } from 'react-redux'


export default function ProfilePicture({setShow, pRef, photos}) {

    const inputRef = useRef(null)
    const popup = useRef(null)
    const [image, setImage] = useState('')
    const [error, setError] = useState('')

    const {user} = useSelector((state) => ({...state}))

    // useOnClickOutside(popup, () => setShow(false))

    const handleImage = (e) => {
        let file = e.target.files[0];

          if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/webp" &&
            file.type !== "image/gif"
          ) {
            setError(`${file.name} format is unsupported, only jpeg,png,webp are allowed.`)
            return
          }else if(file.size > 1024 * 1024 * 5){
            setError(`${file.name} size is too large max 5mb is allowed.`)
            return
          }
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            setImage(e.target.result);
          };
        
      };

      

  return (
    <div className='blur'>
        <input type="file" ref={inputRef} hidden onChange={handleImage} accept="image/jpeg,image/png,image/webp,image/gif" />
        <div className="postbox pictureBox" ref={popup}>
            <div className="box_header">
                <div className="small_circle" onClick={() => setShow(false)}>
                    <i className="exit_icon"></i>
                </div>
                <span>Update profile picture</span>
            </div>
            <div className="update_picture_wrap">
                <div className="update_picture_buttons">
                    <button className="light_blue_btn" onClick={() => inputRef.current.click()}>
                        <i className="plus_icon filter_blue"></i>Upload photo
                    </button>
                    <button className="gray_btn">
                        <i className="frame_icon"></i>Add frame
                    </button>
                </div>
            </div>
            {
                error && (
                   <div className="postError comment_error">
                    <div className="postError_error">{error}</div>
                    <button className="blue_btn" onClick={() => setError("")}>Try again</button>
                   </div>
                )
            }
            <div className="old_pictures_wrap scrollbar">
              <h4>Your profile pictures</h4>
              <div className="old_pictures">
                 {photos.filter((img) => img.folder === `${user.username}/profile_pictures`).map((photo) => (
                <img src={photo.secure_url} key={photo.public_id} alt="" onClick={() => setImage(photo.secure_url)}/>
              ))
              }
              </div>
              <h4>Other pictures</h4>
              <div className="old_pictures">
                 {photos.filter((img) => img.folder !== `${user.username}/profile_pictures`).map((photo) => (
                <img src={photo.secure_url} key={photo.public_id} alt="" onClick={() => setImage(photo.secure_url)} />
              ))
              }
              </div>
             
            </div>
        </div>
        {image && (<UpdateProfilePicture image={image}setImage={setImage} setError={setError} setShow={setShow} pRef={pRef} />)}
    </div>
  )
}
