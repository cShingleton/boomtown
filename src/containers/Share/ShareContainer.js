import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { FireBaseStorage, FireBaseAuth } from '../../config/firebase';
import { fetchItems } from '../Items/ItemsContainer';
import {
    captureTitleInput,
    captureDescriptionInput,
    selectItemTags,
    imageUploadProgress,
    setItemImageUrl,
    stepForward
} from '../../redux/modules/share';
import ShareForm from './ShareForm';
import ShareCard from './ShareCard';
import Loader from '../../components/Loader/';
import './styles.css';

class ShareContainer extends Component {
    
    selectImage = fileInput => {
        this.fileInput = this.fileInput || fileInput;
        this.fileInput.click();
    }

    handleImageUpload = () => {
        const cloud = FireBaseStorage.ref();
        const userId = FireBaseAuth.currentUser.uid;
        const fileName = this.fileInput.files[0].name;
        // ADD LATER IF TIME : this.props.dispatch(imageUploadProgress());
        cloud.child(`images/${userId}/${fileName}`)
                .put(this.fileInput.files[0])
                .then(result => {
                    this.props.dispatch(setItemImageUrl(result.metadata.downloadURLs[0]));
                    this.props.dispatch(stepForward(0));
                });
    }

    handleSubmit = () => {
        console.log('Submit handled!');
        let tags2 = this.props.formData.tags;
        let tags = {
            tags2
        };
        this.props.saveItem(
            this.props.formData.title,
            this.props.formData.imageurl,
            this.props.authenticated,
            this.props.formData.description,
            tags
        );
    }

    render() {
        if (this.props.data.loading) return <Loader />;
        return (
            <div className="share-wrapper">
                <ShareCard
                    cardData={this.props.formData}
                    userData={this.props.data.user}
                />
                <ShareForm
                    captureTitle={captureTitleInput}
                    captureDescription={captureDescriptionInput}
                    selectValues={this.props.formData.tags}
                    selectItemTags={selectItemTags}
                    selectImage={this.selectImage}
                    handleImageUpload={this.handleImageUpload}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

const submitItem = gql`
  mutation addItem(
      $title: String!
      $description: String!
      $imageurl: String!
      $tags: [AssignedTag]!
      $itemowner: ID!
  ) {
      addItem(
        title: $title
        description: $description
        imageurl: $imageurl
        tags: $tags
        itemowner: $itemowner
    ) {
        title
        description
        imageurl
        tags {
            title 
            id
        }
        itemowner {
            id 
            fullname
        }
    }
}`;

const fetchUser = gql`
    query fetchUser($id: ID!) {
        user (id: $id) {
            id
            bio
            fullname
            email
        }
    }
`;

const mapStateToProps = (state) => ({
    formData: state.share.form,
    authenticated: state.auth.userProfile
});

const ShareFormWithData = compose(
    graphql(fetchUser, {
        options: ownProps => ({
            variables: {
                id: ownProps.authenticated
            }
        })
    }),
    graphql(submitItem, {
        props: ({ mutate }) => ({
            saveItem: (title, imageurl, itemowner, description, tags) => mutate({
                variables: { title, imageurl, itemowner, description, tags }
            })
        }),
        options: () => ({
            refetchQueries: [
                { query: fetchItems }
            ]
        })
    })
);

export default connect(mapStateToProps)(ShareFormWithData(ShareContainer));

// const ShareItemForm = reduxForm({
//     form: 'ShareItemForm',
//     validate
// })(ShareContainer);

// const ShareItemFormWIthData = graphql(submitItemMutation, {
//     props: ({ mutate }) => ({
//         saveNewItem: (title, imageurl, itemowner, descripton, tags) => mutate({
//             varailbes: { title, imageurl, itemowner, descripton, tags }
//         })
//     }),
//     options: () => ({
//         refetchQueries: [
//             { query: itemsQuery}
//         ]
//     })
// })(ShareItemForm);

// export default connect(mapStateToProps)(withRouter(ShareItemFormWIthData));

