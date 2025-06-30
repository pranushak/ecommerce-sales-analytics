

import React,{ useState } from 'react';

const UploadForm = () => {
    const [file, setFile] = useState(null);

    const handleFile = (e) => {
         setFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        if(!file){
            return "Please select a CSV file";
        const formData = new FormData();
        formData.append("file",file);

        try {
        await axios.post("http://localhost:5000/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Upload successful!");
        } catch (err) {
        alert("Upload failed!");
        console.error(err);
            }
        };
    }
    return (
        <div>
            <input type ="file" accept=".csv" onChange={handleFile} />
            <button onClick = {handleUpload}> Upload CSV </button>
        </div>
    );   
}

export default UploadForm;