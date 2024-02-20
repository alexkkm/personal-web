import { useState, useEffect } from 'react';
import { Container, Header, Form, Image, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import firebaseTools from "./utils/firebase"
import { collection, getDocs, doc, setDoc, Timestamp } from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth'

const NewPostPage = () => {
    const [currentUserInfo, setCurrentUserInfo] = useState([])

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("")
    const [file, setFile] = useState(null)

    // name the useNavigate() hook as "navigate"
    const navigate = useNavigate();

    // fetch the topics from firebase
    useEffect(() => {
        // fetch the data from the firestore collection "topics", and update the "topic selection dropdown" by the data fetched
        getDocs(collection(firebaseTools.firestoreDB, "topics")).then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map((doc) => {
                return doc.data();
            });
            console.log(data);
            setTopics(data)
        });

        // fetch the user info when rendering the page
        onAuthStateChanged(firebaseTools.auth, (info) => { setCurrentUserInfo(info) })
    }, []);

    // Dropdown options props for the "topic selection dropdown"
    const DropDownOptions = topics.map((topic) => {
        return {
            text: topic.name,
            value: topic.name
        }
    })

    const previewUrl = file ? URL.createObjectURL(file) : "https://react.semantic-ui.com/images/wireframe/image.png";

    // submit the post to the firestore
    const SubmitPost = () => {
        // create a collection refernece for the collection "post"
        const collectionRef = collection(firebaseTools.firestoreDB, "posts");
        // create a document refernece for the document within the collection referred by "collectionRef"
        const documentRef = doc(collectionRef);
        // write to the document referred by "documentRef" with the content {title: ...}
        setDoc(documentRef, {
            title: title,
            content,    // same as "content: content"
            topic: selectedTopic,
            createdAt: Timestamp.now(),
            author: {
                displayName: currentUserInfo.displayName || "",
                photoURL: currentUserInfo.photoURL || "",
                uid: currentUserInfo.uid,
                email: currentUserInfo.email
            },
        }).then(() => {
            // raise an alert if successfully submit post
            alert("Already upload the post")
            // navigate to home page
            navigate("/")
        })

    }

    return (<Container>
        <Header>Create Post</Header>
        <Form onSubmit={SubmitPost}>
            <Image src={previewUrl} size="small" floated='left'></Image>
            <Button basic as="label" htmlFor="post-image">Upload the photo</Button>
            <Form.Input type="file" id="post-image" style={{ display: 'none' }} onChange={(e) => { setFile(e.target.files[0]) }}></Form.Input>
            <Form.Input placeholder="Input Post Title" value={title} onChange={(e) => { setTitle(e.target.value) }}></Form.Input>
            <Form.TextArea placeholder="Input Content" value={content} onChange={(e) => { setContent(e.target.value) }}></Form.TextArea>
            <Form.Dropdown placeholder="Select Post Topic" options={DropDownOptions} value={selectedTopic} onChange={(e, { value }) => {
                setSelectedTopic(value)
            }}
                selection
            /> {/* topic selection dropdown */}
            <Form.Button>Send Post</Form.Button>
        </Form>
    </Container >);
}

export default NewPostPage;