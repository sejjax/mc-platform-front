import React, { useState } from 'react';
import { useEffect } from 'react';

import searchFailImg from 'assets/images/users/error-close.svg';
import searchSuccessImg from 'assets/images/users/find-success.svg';
import searchImg from 'assets/images/users/search.svg';
import axios from 'axios';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, Card, CardBody, Input, Label } from 'reactstrap';

const UsersAccess = (props) => {
  const users = useSelector((state) => state.Users.users);

  const searchUserHandler = () => {
    console.log(formik.values.searchUserId);
  };

  const selectUserHandler = (item) => {
    formik.setFieldValue('selectedUser', item.id);
    formik.setFieldValue('permissions', item.permissions);
  };

  const updateUserRights = () => {
    console.log(formik.values);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      searchUserId: '',
      selectedUser: null,
      permissions: null,
    },
  });

  return (
    <>
      <Card className="mt-3 users__access_card">
        <CardBody>
          <div className="d-flex align-items-strech users__access_search_input_wrapper">
            <Input
              name="searchUserId"
              value={formik.values.searchUserId}
              onChange={formik.handleChange}
              placeholder="Email or Personal ID"
            />
            <div className="users__access_search_img_wrapper" onClick={searchUserHandler}>
              <img src={searchImg} alt="Поиск" />
            </div>
          </div>
          {users !== null ? (
            users !== false ? (
              <div className="users__access_find_wrapper">
                <div className="users__access_find_img_wrapper users__access_find_success">
                  <img src={searchSuccessImg} />
                </div>
                <div className="users__access_find_content_wrapper ">
                  <div>Users has been successfully found</div>
                  Please make sure that this particular user will be promoted and mark the radio
                  button next to the user name
                </div>
              </div>
            ) : (
              <div className="users__access_find_wrapper">
                <div className="users__access_find_img_wrapper">
                  <img src={searchFailImg} />
                </div>
                <div className="users__access_find_content_wrapper">
                  <div>User is not found</div>
                  Be careful when entering search data
                </div>
              </div>
            )
          ) : null}
          <div className="users__access_find_users_wrapper">
            {Array.isArray(users) ? (
              users.map((item, index) => {
                return (
                  <Label key={`${item.id}_${index}`}>
                    <Card
                      className={`users__access_finder_user_wrapper ${
                        +formik.values.selectedUser === item.id
                          ? 'users__access_finder_user_wrapper_active'
                          : ''
                      }`}>
                      <CardBody className="d-flex users__access_finder_user_cardbody">
                        <Input
                          type="radio"
                          name="selectedUser"
                          value={item.id}
                          onChange={() => selectUserHandler(item)}
                        />
                        <div className="ms-2">
                          <div className="users__access_login">{item.username}</div>
                          <div className="users__access_email mt-0.5">{item.email}</div>
                          <div className="d-flex mt-4">
                            <div className="users__access_partner">
                              Partner ID
                              <div>85469</div>
                            </div>
                            <div className="users__access__regdate">
                              Registration Date
                              <div>25.01.2022</div>
                            </div>
                          </div>
                          <div className="users__access_perm">
                            Permissions
                            <div>Administrator Financial Controller Notification Manager</div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Label>
                );
              })
            ) : (
              <Card className="users__access_finder_user_wrapper users__access_finder_user_wrapper_active">
                <CardBody className="d-flex users__access_finder_user_cardbody">
                  <Input type="radio" />
                  <div className="ms-2">
                    <div className="users__access_login">solo</div>
                    <div className="users__access_email mt-0.5">stan_smith@gmail.com</div>
                    <div className="d-flex mt-4">
                      <div className="users__access_partner">
                        Partner ID
                        <div>85469</div>
                      </div>
                      <div className="users__access__regdate">
                        Registration Date
                        <div>25.01.2022</div>
                      </div>
                    </div>
                    <div className="users__access_perm">
                      Permissions
                      <div>Administrator Financial Controller Notification Manager</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
          {formik.values?.permissions && (
            <>
              <div className="users__access_rights_wrapper">
                <h4>User Rights</h4>
                <div className="users__access_rights">
                  <div className="users__access_right">
                    <Label>
                      <Input
                        type="checkbox"
                        name="permissions"
                        checked={formik.values.permissions.indexOf('1') !== -1}
                        value="1"
                        onChange={formik.handleChange}
                      />
                      Administrator
                    </Label>
                  </div>
                  <div className="users__access_right">
                    <Label>
                      <Input
                        type="checkbox"
                        name="permissions"
                        checked={formik.values.permissions.indexOf('2') !== -1}
                        value="2"
                        onChange={formik.handleChange}
                      />
                      Financial controller
                    </Label>
                  </div>
                  <div className="users__access_right">
                    <Label>
                      <Input
                        type="checkbox"
                        name="permissions"
                        checked={formik.values.permissions.indexOf('3') !== -1}
                        value="3"
                        onChange={formik.handleChange}
                      />
                      Notification Manager
                    </Label>
                  </div>
                </div>
              </div>
              <div className="users__access_rights_btns">
                <Button color="primary" onClick={updateUserRights}>
                  Save
                </Button>
                <div className="users__access_rights_btn_cancel">Cancel</div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

UsersAccess.propTypes = {};

export default UsersAccess;
