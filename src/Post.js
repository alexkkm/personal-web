import { useParams } from 'react-router-dom'
import { Grid, Container, Image, Header, Segment, Icon } from 'semantic-ui-react';
import Topics from './Topics';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore"
import firebaseTools from "./utils/firebase"



const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({
        author: []
    })

    useEffect(() => {

        /*
        // read the document and return the snapshot
        getDoc(doc(firebaseTools.firestoreDB, "posts", postId)).then((docSnapShot) => {
            const data = docSnapShot.data();
            console.log(data)
            setPost(data);
        })
        */

        // onSnapshot() will attach a snapshot listener on the document "posts", and return a function that can unsubscribe the snapshot listener which is named as "unsubscribeFunction()"
        // when the document is updated (eg. added a user into the field "bookmarkedBy"), which will run the code {(docSnapShot)=>{ const data; ...}}
        const unsubscribeFunction = onSnapshot(doc(firebaseTools.firestoreDB, "posts", postId), (docSnapShot) => {
            const data = docSnapShot.data();
            console.log(data)
            setPost(data);
        })

        // when the component is unmounted
        return () => { unsubscribeFunction() }
    }, [postId]);

    const toggleBookmark = () => {
        const currentUserID = firebaseTools.auth.currentUser.uid;

        if (isBookmarked) {
            updateDoc(doc(firebaseTools.firestoreDB, "posts", postId),
                {
                    bookmarkedBy: arrayRemove(currentUserID),
                });
        } else {
            updateDoc(doc(firebaseTools.firestoreDB, "posts", postId),
                {
                    bookmarkedBy: arrayUnion(currentUserID),
                });
        }

    }

    const toggleLike = () => {
        const currentUserID = firebaseTools.auth.currentUser.uid;

        if (isLiked) {
            updateDoc(doc(firebaseTools.firestoreDB, "posts", postId),
                {
                    likedBy: arrayRemove(currentUserID),
                });
        } else {
            updateDoc(doc(firebaseTools.firestoreDB, "posts", postId),
                {
                    likedBy: arrayUnion(currentUserID),
                });
        }

    }

    const isBookmarked = post.bookmarkedBy?.includes(firebaseTools.auth.currentUser.uid);
    const isLiked = post.likedBy?.includes(firebaseTools.auth.currentUser.uid);

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Topics />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {post.author.photoURL ? <Image src={post.author.photoURL} /> : <Icon name="user circle" />}

                        {post.author.displayName || 'user'}
                        <Header>
                            {post.title}
                            <Header.Subheader>
                                {post.topic}.{post.createdAt?.toDate().toLocaleDateString()}
                            </Header.Subheader>
                        </Header>
                        <Image src={post.imageURL} />
                        <Segment basic vertical>{post.content}</Segment>
                        <Segment basic vertical>
                            Comment 0, Like {post.likedBy?.length || 0}
                            <Icon name={`thumbs up ${isLiked ? '' : 'outline'}`} color={isLiked ? "blue" : 'grey'} link onClick={toggleLike}></Icon>
                            <Icon name={`bookmark ${isBookmarked ? '' : 'outline'}`} color={isBookmarked ? "yellow" : 'grey'} link onClick={toggleBookmark}></Icon>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3}>Blank</Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default Post;