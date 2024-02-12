import { Link } from 'react-router-dom';
import { Menu, Search } from 'semantic-ui-react';

const Header = () => {
    return <Menu>
        <Menu.Item as={Link} to="/">
            Home
        </Menu.Item>
        <Menu.Item>
            <Search></Search>
        </Menu.Item>
        <Menu.Menu position='left'>
            <Menu.Item as={Link} to='/signin'>Login/Register</Menu.Item>
        </Menu.Menu>
    </Menu>
}


export default Header