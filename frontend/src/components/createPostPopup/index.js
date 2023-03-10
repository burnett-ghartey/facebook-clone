import { useState, useRef, useEffect  } from "react"
import { PulseLoader } from "react-spinners";


import "./styles.css"
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import EmojiPickerBackground from "./EmojiPickerBackground";
import useClickOutside from "../../helpers/clickOutside"
import { createPost } from "../../functions/post";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";




export default function CreatePostPopup({user, setVisible}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [text, setText] = useState("")
    const [showPrev, setShowPrev] = useState(false)
    const [images, setImages] = useState([])
    const [background, setBackground] = useState([])
    const popup = useRef(null)
    

    useClickOutside(popup, () => {
        setVisible(false)
    })

    const postSubmit = async() => {
        if(background.length > 0){
            setLoading(true)
            const response = await createPost(null, background, text, null, user.id, user.token)
            setLoading(false)

            if (response === "ok"){
                setBackground("")
                setText("")
                setVisible(false)
            }else{
                setError(response)
            }
            
        }else if(images && images.length){
            setLoading(true)
            const postImages = images.map((img) => {
                return dataURItoBlob(img)
            })
           const path = `${user.username}/post_images`
           let formData = new FormData()
           formData.append("path", path)
           postImages.forEach((image) => {
            formData.append("file", image)
           })
           const response = await uploadImages(formData, path, user.token)
           const res = await createPost(null, null, text, response, user.id, user.token)
          if(res === "ok"){
            setLoading(false)
            setImages([])
            setText("")
            setVisible(false)
          }else{
            setError(res)
          }
        }else if(text){
            setLoading(true)
            const response = await createPost(null, null, text, null, user.id, user.token)
            setLoading(false)
            
            if (response === "ok"){
                setBackground("")
                setText("")
                setVisible(false)
            }else{
                setError(response)
            }
        }else{
            console.log("nothing")
        }
    }

  return (
    <div className="blur">
        <div className="postbox" ref={popup}>
            {
                error && <PostError error={error} setError={setError}/>
            }
            <div className="box_header">
                <div className="small_circle" onClick={() => {setVisible(false)}}>
                    <i className="exit_icon"></i>
                </div>
                <span>Create Post</span>
            </div>
            <div className="box_profile">
                <img className="box_profile_img" src={user?.picture} alt="" />
                <div className="box_col">
                    <div className="box_profile_name">
                        {user?.first_name} {user?.last_name}
                    </div>
                    <div className="box_privacy">
                        <img src="../../../icons/public.png" alt="" />
                        <span>Public</span>
                        <i className="arrowDown_icon"></i>
                    </div>
                </div>
            </div>

            

            {!showPrev ? (
               
                  <EmojiPickerBackground text={text} user={user} setText={setText} showPrev={showPrev} setBackground={setBackground} background={background}/>
                
             
            )  : (
                <ImagePreview text={text} user={user} setText={setText} images={images} setImages={setImages} setShowPrev={setShowPrev} setError={setError}/>
            )}
            

            <AddToYourPost setShowPrev={setShowPrev}/>
            <button className="post_submit" onClick={() => {
                postSubmit()
            }} disabled={loading}>{loading ? <PulseLoader color="#fff" size={5}/> : "Post"}</button>
           
        </div>
    </div>
  )
}
