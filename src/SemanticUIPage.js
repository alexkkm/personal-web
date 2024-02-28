import { Link } from 'react-router-dom';
import { Grid, Item, Image, Icon, Menu, Search } from 'semantic-ui-react';

// Demonstration of Menu from semantic-ui
const MenuComponenet = () => {
    return (
        <Menu>
            <Menu.Item as={Link} to="/">    {/** Can define the component "Menu.Item" to act as component "Link" */}
                Home
            </Menu.Item>
            <Menu.Item>
                <Search></Search>   {/** Searching */}
            </Menu.Item>
            <Menu.Menu position='left'>
                <Menu.Item as={Link} to='/new-post'>New Post</Menu.Item>
                <Menu.Item as={Link} to='/account'>Account</Menu.Item>
            </Menu.Menu>
        </Menu>)
}

// Demonstration of Item from semantic-ui
const ItemComponent = () => {
    // An array consists of 2 elements
    const array = [{ id: 1, value: 2 }, { id: 2, value: 30 }]
    // the url of the image shown below
    const imageURL = "";

    return (
        <Item.Group>    {/** <Item.Group> consists by some <Item> */}
            {/** In this example, let's use map() to create several <Item> according to the number of elements in "array" */}
            {array.map((element) => {
                return <Item>
                    <Item.Image src={imageURL} size="tiny" />
                    <Item.Content>
                        <Item.Meta>
                            <Image src={imageURL} />
                            <Icon name="user circle" />
                        </Item.Meta>
                        <Item.Header>Title</Item.Header>
                        <Item.Description>{element.id},,,{element.value}</Item.Description>
                        <Item.Extra>
                            Comment 0, Like 0
                        </Item.Extra>
                    </Item.Content>
                </Item>
            })}
        </Item.Group>
    )
}

// Demonstration of Grid from semantic-ui
const GridComponent = () => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>
                    <h3>This is column who occupies 3 space</h3>
                </Grid.Column>
                <Grid.Column width={10}>
                    <h3>This column occupies 10 space</h3>
                    <ItemComponent />
                </Grid.Column>
                <Grid.Column width={3}>
                    <h3>This is another column who occupies 3 space</h3>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

// Page of demonstrating semantic-UI
const SemanticUIPage = () => {
    return (
        <div>
            <MenuComponenet />
            <GridComponent />
        </div>
    );
}

export default SemanticUIPage;