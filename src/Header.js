import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search } from 'semantic-ui-react';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import auth from './utils/firebase';

// Define a header thatwill be display no matter on what pages
const Header = () => {
    const [user, setUser] = useState(null);

    // do just after the "Header" is rendered
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => { setUser(currentUser) });
        console.log("Hi")
    }, [])

    return <Menu>
        <Menu.Item as={Link} to="/">
            Home
        </Menu.Item>
        <Menu.Item>
            <Search></Search>
        </Menu.Item>
        <Menu.Item>
            {user ? user.uid : null}
        </Menu.Item>
        <Menu.Menu position='left'>
            {user ? (<>
                <Menu.Item as={Link} to='/new-post'>New Post</Menu.Item>
                <Menu.Item as={Link} to='/account'>Account</Menu.Item>
                <Menu.Item onClick={() => signOut(auth)}>Sign Out</Menu.Item>
            </>) : (<Menu.Item as={Link} to='/signin'>Login/Register</Menu.Item>)}

        </Menu.Menu>
    </Menu>
}


export default Header