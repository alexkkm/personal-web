import { Grid } from 'semantic-ui-react'

import Topics from './Topics'

const PostsPage = () => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}><Topics /></Grid.Column>
                <Grid.Column width={10}>Post List</Grid.Column>
                <Grid.Column width={3}>Blank</Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default PostsPage