import React, {useState, useRef} from 'react'
import styles from './UploadImage.module.css'

function UploadImage({setImageLink}) {

    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(undefined)
    const [imgIsFetching, setImgIsFetching] = useState(false)
    const refInputImg = useRef()

    
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
        } else if (e.type === "dragleave") {
        setDragActive(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0] && e.dataTransfer.files[0].type.startsWith('image/')) {
            handleFiles(e.dataTransfer.files[0]);
        }
      };

    const handleFiles = (file) => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) { 
        var rawLog = reader.result.split(',')[1];
        var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
        setPreview(URL.createObjectURL(file))
        setImgIsFetching(true)
        fetch('https://script.google.com/macros/s/AKfycbyWX3EdWONKc_LefdFUP2aGTRx82xEBE0kiaCMb-Tmos8kUHuNs1vcpzKioYpXOQuDV/exec', //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend)})
            .then(res => res.json()).then(res => {
                setImageLink(res.url)
                setImgIsFetching(false)
            }).catch(e => console.log(e))
        }
    }



  return (
    <div onDragEnter={handleDrag} className={dragActive ? styles.imageWrapperOnDrag : styles.imageWrapper}>
        {
            !preview
                ?   <div className={styles.imgUpload}>
                        <input hidden ref={refInputImg} type="file" accept="image/*" id="imgInput" onChange={(e) => handleFiles(e.target.files[0])} />
                        <label htmlFor="imgInput">
                            {
                                !dragActive
                                    ?   <div className={styles.labelImg}>
                                            <p>Drag and drop a photo here</p>
                                            <p>or</p>
                                            <button type='button' onClick={() => refInputImg.current.click()} className={styles.uploadButton}>Upload a photo</button>
                                        </div>
                                    :   <div className={styles.dropHere}>
                                            Drop your photo here
                                        </div>
                            }
                            
                            </label>
                    </div>
                :   imgIsFetching 
                        ?   <div style={{backgroundImage: `url(${preview})`}} className={styles.imgFetchingWrapper}>
                                <div className={styles.uploadMsg}>Uploading photo..</div>
                                {/* <img className={styles.imgPreviewFetching} src={preview} /> */}
                            </div>
                        : <img className={styles.imgPreview} src={preview} />
        }
        { dragActive && <div className={styles.dragImgElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </div>
  )
}

export default UploadImage