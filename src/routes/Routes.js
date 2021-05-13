import React from 'react'
import { Switch } from 'react-router-dom'

import RouteHandler from '../components/RouteHandler'

import ManagerHome from '../pages/Manager/ManagerHome'
import SignIn from '../pages/SignIn'
import NotFound from '../pages/NotFound'

// Forms and Lists
import ProducerForm from '../pages/Manager/ProducerForm'
import ProducerEdit from '../pages/Manager/ProducerEdit'
import ProducerListPage from '../pages/Manager/ProducerListPage'
import ActivityForm from '../pages/Manager/ActivityForm'
import ActivityEdit from '../pages/Manager/ActivityEdit'
import ActivityList from '../pages/Manager/ActivityList'
import ProductForm from '../pages/Manager/ProductForm'
import ProductEdit from '../pages/Manager/ProductEdit'
import ProductList from '../pages/Manager/ProductList'

// Details
import ProducerDetails from '../pages/Manager/ProducerDetails'
import ProductDetails from '../pages/Manager/ProductDetails'
import ActivityDetails from '../pages/Manager/ActivityDetails'

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
                <ProducerListPage />
            </RouteHandler>

            <RouteHandler private path='/producer-details/:id'>
                <ProducerDetails />
            </RouteHandler>

            <RouteHandler private path='/product-form'>
                <ProductForm />
            </RouteHandler>

            <RouteHandler private path='/product-edit/:id'>
                <ProductEdit />
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

            <RouteHandler private path='/activity-edit/:id'>
                <ActivityEdit />
            </RouteHandler>

            <RouteHandler private path='/activity-list'>
                <ActivityList />
            </RouteHandler>

            <RouteHandler private path='/activity-details/:id'>
                <ActivityDetails />
            </RouteHandler>

            <RouteHandler path='*'>
                <NotFound />
            </RouteHandler>
        </Switch>
    )
}

export default Routes