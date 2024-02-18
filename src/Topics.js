import { useEffect, useState } from "react"
import { List } from 'semantic-ui-react'

import firebaseTools from "./utils/firebase"
import { collection, getDocs } from "firebase/firestore"

const Topics = () => {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getDocs(collection(firebaseTools.firestoreDB, "topics")).then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map((doc) => {
                return doc.data();
            });
            console.log(data);
            setTopics(data)
        })
    }, []);

    return (
        <List animated selection>
            {topics.map((topic) => {
                return (
                    <List.Item key={topic.name}>
                        {topic.name}
                    </List.Item>
                )
            })}
        </List>)
}


export default Topics