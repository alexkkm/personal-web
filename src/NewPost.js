import { useState, useEffect } from 'react';
import { Container, Header, Form, Image, Button } from 'semantic-ui-react'

import firebaseTools from "./utils/firebase"
import { collection, getDocs, doc, setDoc, Timestamp } from "firebase/firestore"


const NewPost = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("")
    const [file, setFile] = useState(null)

    // fetch the topics from firebase
    useEffect(() => {
        getDocs(collection(firebaseTools.firestoreDB, "topics")).then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map((doc) => {
                return doc.data();
            });
            console.log(data);
            setTopics(data)
        })
    }, []);

    const options = topics.map((topic) => {
        return {
            text: topic.name,
            value: topic.name
        }
    })

    const previewUrl = file ? URL.createObjectURL(file) : "https://react.semantic-ui.com/images/wireframe/image.png";

    const Post = () => {
        const documentRef = doc(collection(firebaseTools.firestoreDB, "posts"))
        setDoc(documentRef, {
            title, content, topic: selectedTopic, createdAt: Timestamp.now(),

        })
        alert("Already upload the post")
    }
    return (<Container>
        <Header>Create Post</Header>
        <Form onSubmit={Post}>
            <Image src={previewUrl} size="small" floated='left'></Image>
            <Button basic as="label" htmlFor="post-image">Upload the photo</Button>
            <Form.Input type="file" id="post-image" style={{ display: 'none' }} onChange={(e) => { setFile(e.target.files[0]) }}></Form.Input>
            <Form.Input placeholder="Input Post Title" value={title} onChange={(e) => { setTitle(e.target.value) }}></Form.Input>
            <Form.TextArea placeholder="Input Content" value={content} onChange={(e) => { setContent(e.target.value) }}></Form.TextArea>
            <Form.Dropdown placeholder="Select Post Topic" options={options} value={selectedTopic} onChange={(e, { value }) => {
                setSelectedTopic(value)
            }}
                selection
            />
            <Form.Button>Send Post</Form.Button>
        </Form>
    </Container >);
}

export default NewPost;