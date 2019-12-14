import React, {useState, useReducer} from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';


const blogReducer = (state, action) => {

    switch (action.type) {
        case 'get_blogposts': 
            return action.payload;
            // Her antar vi att payload inneholder all informasjonen vi har i appen vår
            // Derfor vi ikke har [...state,  action.payload ]
        case 'edit_blogpost':
            return state.map((blogpost)=> {
                return blogpost.id === action.payload.id ? action.payload : blogpost;
            });
        case 'delete_blogpost':
            return state.filter((blogpost) => blogpost.id !== action.payload);
        case 'add_blogpost':
            return [
                ...state,
                {
                    id: Math.floor(Math.random()*9999),
                    title: action.payload.title,
                    content: action.payload.content
                }
            ];
        default:
            return state;
    }

};

const getBlogPosts = (dispatch) => {
    return async () => {
       const response = await jsonServer.get('/blogposts');
       // response.data === [{},{},{}]
       dispatch({type: 'get_blogposts', payload: response.data});
       // Reducer is called when dispatch is called
    };
};

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({type: 'add_blogpost', payload: {title, content}});
        if (callback) {
            callback();
        }
    };
};

const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({type: 'delete_blogpost', payload: id})
    }
};

const editBlogPost = (dispatch) => {
    return (id, title, content, callback) => {
        dispatch({
            type: 'edit_blogpost',
            payload: {id, title, content}
        });
        if (callback) {
            callback();
        }
    };
};

export const {Context, Provider } = createDataContext(
    blogReducer, 
    {
        addBlogPost,
        deleteBlogPost,
        editBlogPost,
        getBlogPosts
    }, 
    []
);

