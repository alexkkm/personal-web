import { Grid, Item, Image, Icon, Container } from 'semantic-ui-react'

import { collection, getDocs } from "firebase/firestore"
import firebaseTools from "./utils/firebase"

import Topics from './Topics'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const PostsPage = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // fetch the data from the firestore collection "posts", and update the "topic selection dropdown" by the data fetched
        getDocs(collection(firebaseTools.firestoreDB, "posts")).then((collectionSnapShot) => {
            // create an array that consist of all documents that fetched from collection "posts"
            const data = collectionSnapShot.docs.map((doc) => {
                // for each documents, return as an object {..doc.data(),id} into the array "data"
                const id = doc.id;
                return { ...doc.data(), id };   // '...doc.data()' means all elements in "doc.data()"
            });
            console.log(data);
            setPosts(data);
        });
    }, []);

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Topics />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Item.Group>
                            {posts.map((post) => {
                                return (
                                    <Item key={post.id} as={Link} to={`/posts/${post.id}`}>
                                        <Item.Image src={post.imageURL || "https://react.semantic-ui.com/images/wireframe/image.png"} size="tiny" />
                                        <Item.Content>
                                            <Item.Meta>
                                                {post.author.imageURL ? <Image src={post.author.photoURL}></Image> : <Icon name="user circle" />}
                                                {post.topic}.{post.author.displayName || "User"}
                                            </Item.Meta>
                                            <Item.Header>{post.title}</Item.Header>
                                            <Item.Description>{post.content}</Item.Description>
                                            <Item.Extra>
                                                Comment 0, Like {post.likedBy?.length || 0}
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                )
                            })}
                        </Item.Group>

                    </Grid.Column>
                    <Grid.Column width={3}>Blank</Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default PostsPage