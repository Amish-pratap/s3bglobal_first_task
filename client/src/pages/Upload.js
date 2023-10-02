
import React, { useEffect, useState } from 'react';
import './Upload.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import FileDisplay from '../components/FileDisplay';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const userSignedIn = localStorage.getItem('userSignedIn');
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchFiles = () => {
        if (userSignedIn) {

            fetch(`http://localhost:5000/api/userFiles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === 'Files retrieved successfully') {
                        setFiles(data.files);
                        // console.log('success')
                    } else {
                        console.error('Error retrieving files');
                    }
                })
                .catch((error) => {
                    console.error('API error:', error);
                });
        }
        else {
            navigate('/');
        }
    }

    useEffect(() => {
        fetchFiles();
    }, [userSignedIn, navigate]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    fetchFiles();
                })
                .catch((error) => {
                    console.error('File upload error:', error);
                });
        }
    };

    const handleFileDelete = (fileId) => {
        fetch(`http://localhost:5000/api/${fileId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                fetchFiles();
            })
            .catch((error) => {
                console.error('File delete error:', error);
            });
    }
    if (!userSignedIn) {
        return (
            <div>
                404 Page not found
            </div>
        )
    }

    return (
        <div className='home__container'>
            <section>
                <Header />
            </section>
            <section >
                <h3>Uploaded Files:</h3>
                <div className='uploaded__userFiles'>
                    <div>
                        {files.length === 0 ? (
                            <div className='nofile'>
                                <p>No files uploaded yet.</p>
                            </div>

                        ) : (
                            files.map((file) => (
                                <div className='file__container' key={file._id}>
                                    <h2>File Information</h2>
                                    <p><strong>File Name:</strong> {file.filename}</p>
                                    <p><strong>Original Name:</strong> {file.originalname}</p>
                                    <p><strong>MIME Type:</strong> {file.mimetype}</p>
                                    <p><strong>Size:</strong> {file.size} bytes</p>
                                    <p><strong>Upload Date:</strong>{file.uploadDate}</p>
                                    <button className='delete__button' onClick={() => handleFileDelete(file._id)} >Delete</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <h3>Upload a File:</h3>
                <div className='form__data'>

                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleFileUpload}>Upload</button>
                </div>
            </section>
            <section>
                <Footer />
            </section>
        </div>
    )
}

export default Upload
