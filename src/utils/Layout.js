import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getCategories } from '../services/CategoryService';
import { getSubCategories } from '../services/SubCategoryService';
import AddBookModal from './AddBookModal';
import navIcon1 from '../resources/img/nav-icon1.svg';
import navIcon2 from '../resources/img/nav-icon2.svg';
import navIcon3 from '../resources/img/nav-icon3.svg';
import shoppingCart from '../resources/img/Shopping_Cart-removebg-preview.png';
import logo from '../resources/img/Logo-removebg-preview.png';

const Layout = () => {
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const fetchCategories = async () => {
    const response = await getCategories();
    // console.log(response);
    setCategories(response);
  };

  const fetchSubCategories = async () => {
    const response = await getSubCategories();
    // console.log(response);
    setSubCategories(response);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  return (
    <div>
      <Navbar
        expand='lg'
        className='bg-body-tertiary navbarContainer'
        sticky='top'
      >
        <Container>
          <Navbar.Brand href='/'>
            <img src={logo} alt='Icon' style={{ width: '10rem' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto my-2 my-lg-0'>
              {categories &&
                categories.map((category) => {
                  return (
                    <NavDropdown
                      title={category.categoryName}
                      key={category.id}
                      id='categoriesScrollingDropdown'
                    >
                      {subCategories &&
                        subCategories.map((subCategory) => {
                          if (subCategory.category.id === category.id) {
                            return (
                              <NavDropdown.Item
                                key={subCategory.id}
                                href={`/subcategories/${subCategory.id}/books`}
                              >
                                {subCategory.subCategoryName}
                              </NavDropdown.Item>
                            );
                          }
                        })}
                    </NavDropdown>
                  );
                })}
              <Nav.Link href='/cart'>
                <img src={shoppingCart} alt='Icon' style={{ width: '2rem' }} />
              </Nav.Link>
              <Nav.Link href='/checkout'>CheckOut</Nav.Link>

              <Button
                className='navBarBtns'
                variant='outline-success'
                onClick={() => setModalShow(true)}
              >
                Add a Book
              </Button>

              <Button
                className='navBarBtns'
                variant='outline-danger'
                onClick={() => {
                  sessionStorage.removeItem('token');
                  sessionStorage.removeItem('username');
                  sessionStorage.removeItem('user_id');
                  localStorage.removeItem('cartItems');
                  localStorage.removeItem('finalCartStats');
                  window.location.href = '/login';
                }}
              >
                Log Out
              </Button>

              <AddBookModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                categories={categories != null ? categories : {}}
                subcategories={subCategories != null ? subCategories : {}}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className='py-4'>
        <Outlet />
        {}
      </Container>

      <footer className='bg-body-tertiary footer'>
        <div className='social-icon'>
          <a href='https://www.linkedin.com/in/tharindu-thennakoon-b1a40b94'>
            <img src={navIcon1} alt='Icon' />
          </a>
          <a href='https://www.facebook.com/tharindu.thennakoon.397'>
            <img src={navIcon2} alt='Icon' />
          </a>
          <a href='https://www.instagram.com/tharinduthenne/'>
            <img src={navIcon3} alt='Icon' />
          </a>
        </div>
        <p>Copyright ©️ 2023 Readers' Nest. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Layout;
