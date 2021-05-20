import React from 'react'
import { Switch } from 'react-router-dom'

import RouteHandler from '../components/RouteHandler'

import ManagerHome from '../pages/Manager/ManagerHome'
import SignIn from '../pages/SignIn'
import NotFound from '../pages/NotFound'

// Forms and Lists
import ProducerForm from '../pages/Manager/ProducerPages/ProducerForm'
import ProducerEdit from '../pages/Manager/ProducerPages/ProducerEdit'
import ProducerList from '../pages/Manager/ProducerPages/ProducerList'
import ProducerDetails from '../pages/Manager/ProducerPages/ProducerDetails'

import ActivityForm from '../pages/Manager/ActivityPages/ActivityForm'
import ActivityList from '../pages/Manager/ActivityPages/ActivityList'
import ActivityDetails from '../pages/Manager/ActivityPages/ActivityDetails'

import ProductForm from '../pages/Manager/ProductPages/ProductForm'
import ProductList from '../pages/Manager/ProductPages/ProductList'
import ProductDetails from '../pages/Manager/ProductPages/ProductDetails'

import MyProfile from '../pages/Manager/MyProfile'
import UserManagement from '../pages/Manager/UserManagement'

const Routes = () => {
    return (
        <Switch>
            <RouteHandler exact path='/'>
                <SignIn />
            </RouteHandler>

            <RouteHandler private path='/home'>
                <ManagerHome />
            </RouteHandler>

            <RouteHandler private path='/producer-form'>
                <ProducerForm />
            </RouteHandler>

            <RouteHandler private path='/producer-edit/:id'>
                <ProducerEdit />
            </RouteHandler>

            <RouteHandler private path='/producer-list'>
                <ProducerList />
            </RouteHandler>

            <RouteHandler private path='/producer-details/:id'>
                <ProducerDetails />
            </RouteHandler>

            <RouteHandler private path='/product-form'>
                <ProductForm />
            </RouteHandler>

            <RouteHandler private path='/product-list'>
                <ProductList />
            </RouteHandler>

            <RouteHandler private path='/product-details/:id'>
                <ProductDetails />
            </RouteHandler>

            <RouteHandler private path='/activity-form'>
                <ActivityForm />
            </RouteHandler>

            <RouteHandler private path='/activity-list'>
                <ActivityList />
            </RouteHandler>

            <RouteHandler private path='/activity-details/:id'>
                <ActivityDetails />
            </RouteHandler>

            <RouteHandler private exact path='/my-profile/:id/:role'>
                <MyProfile />
            </RouteHandler>

            <RouteHandler private exact path='/management/:id/:role'>
                <UserManagement />
            </RouteHandler>

            <RouteHandler path='*'>
                <NotFound />
            </RouteHandler>
        </Switch>
    )
}

export default Routes