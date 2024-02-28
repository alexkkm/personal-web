import { Grid, Item, Image, Icon } from 'semantic-ui-react'

import { collection, getDocs } from "firebase/firestore"
import firebaseTools from "./utils/firebase"

import Topics from './Topics'
import { useEffect, useState } from 'react'


const PostsPage = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // fetch the data from the firestore collection "posts", and update the "topic selection dropdown" by the data fetched
        getDocs(collection(firebaseTools.firestoreDB, "posts")).then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map((doc) => {
                return doc.data();
            });
            console.log(data);
            setPosts(data)
        });
    }, []);

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Topics />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Item.Group>
                        {posts.map((post) => {
                            return <Item>
                                <Item.Image src={post.imageURL} size="tiny" />
                                <Item.Content>
                                    <Item.Meta>
                                        {post.author.imageURL ? <Image src={post.author.photoURL}></Image> : <Icon name="user circle" />}
                                        {post.topic}.{post.author.displayName || "User"}
                                    </Item.Meta>
                                    <Item.Header>{post.title}</Item.Header>
                                    <Item.Description>{post.content}</Item.Description>
                                    <Item.Extra>
                                        Comment 0, Like 0
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        })}
                    </Item.Group>

                </Grid.Column>
                <Grid.Column width={3}>Blank</Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default PostsPage