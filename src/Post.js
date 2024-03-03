import { useParams } from 'react-router-dom'
import { Grid, Container, Image, Header, Segment, Icon } from 'semantic-ui-react';
import Topics from './Topics';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc } from "firebase/firestore"
import firebaseTools from "./utils/firebase"


const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({
        author: []
    })

    useEffect(() => {
        getDoc(doc(firebaseTools.firestoreDB, "posts", postId)).then((docSnapShot) => {
            const data = docSnapShot.data();
            console.log(data)
            setPost(data);
        })
    }, []);

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Topics />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Image src={post.author.photoURL} />
                        {post.author.displayName}
                        <Header>
                            {post.title}
                            <Header.Subheader>
                                {post.topic}.{post.createdAt?.toDate().toLocaleDateString()}
                            </Header.Subheader>
                        </Header>
                        <Image src={post.imageURL} />
                        <Segment basic vertical>{post.content}</Segment>
                        <Segment basic vertical>
                            Comment 0, Like 0
                            <Icon name='thumbs up' color='blue'></Icon>
                            <Icon name='bookmark outline' color='grey'></Icon>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3}>Blank</Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default Post;