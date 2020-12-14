import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import AlertMsg from "../components/AlertMsg";
import SideMenu from "../components/SideMenu";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import ProfilePage from "../pages/admin/ProfilePage";
import FriendListPage from "../pages/admin/FriendListPage";
import BlogListPage from "../pages/admin/BlogListPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import AddEditBlogPage from "../pages/AddEditBlogPage";
import NotFoundPage from "../pages/NotFoundPage";

const AdminLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container fluid>
        <Row>
          <Col md={3} lg={2}>
            <SideMenu />
          </Col>
          <Col md={9} lg={10}>
            <AlertMsg />
            <Switch>
              <Route exact path="/admin/profile" component={ProfilePage} />
              <Route exact path="/admin/friends" component={FriendListPage} />
              <Route exact path="/admin/blogs" component={BlogListPage} />
              <Route exact path="/admin/blogs/:id" component={BlogDetailPage} />
              <Route exact path="/admin/blog/add" component={AddEditBlogPage} />
              <Route
                exact
                path="/admin/blog/edit/:id"
                component={AddEditBlogPage}
              />
              {/* <Route exact path="/admin/messenger" component={MessengerPage} /> */}
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
