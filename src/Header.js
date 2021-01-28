import React, { useState } from 'react'
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap'
import {Link} from 'react-router-dom'

const Header = () => {
    const [open, setOpen ] = useState(false)
    const toogle = () => {
        setOpen(!open)
    }

    return (
        <div className='container'>
            <Navbar color='light' light expand='md'>
                <NavbarBrand tag={Link} to='/'>Minhas Séries</NavbarBrand>
                <NavbarToggler onClick={toogle} />
                <Collapse isOpen={open} navbar>
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        <NavLink tag={Link} to='/generos'>Genêros</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/series'>Séries</NavLink>
                    </NavItem>
                </Nav>                
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header