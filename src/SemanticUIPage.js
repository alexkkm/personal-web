import { Link } from 'react-router-dom';
import { Menu, Search } from 'semantic-ui-react';

// Demonstration of Menu from semantic-ui
const MenuComponenet = () => {
    return (<Menu>
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

// Page of demonstrating semantic-UI
const SemanticUIPage = () => {
    return (
        <div>
            <MenuComponenet />
        </div>
    );


}
export default SemanticUIPage;