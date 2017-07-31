import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { FireBaseStorage, FireBaseAuth } from '../../config/firebase';
import { fetchItems } from '../Items/ItemsContainer';
import {
    captureTitleInput,
    captureDescriptionInput,
    selectItemTags,
    // imageUploadProgress,
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

    tagToIdConverter = tags => (
        tags.map(tag => {
            switch (tag) {
            case 'Household Items':
                return { id: 1 };
            case 'Recreational Equipment':
                return { id: 2 };
            case 'Musical Instruments':
                return { id: 3 };
            case 'Sporting Goods':
                return { id: 4 };
            case 'Physical Media':
                return { id: 5 };
            case 'Tools':
                return { id: 6 };
            case 'Electronics':
                return { id: 7 };
            default:
                return false;
            }
        })
    );

    handleSubmit = () => {
        const tags = this.tagToIdConverter(this.props.formData.tags);
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

ShareContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    authenticated: PropTypes.string.isRequired,
    formData: PropTypes.shape({
        imageurl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        user: PropTypes.objectOf(PropTypes.string).isRequired
    }).isRequired,
    saveItem: PropTypes.func.isRequired
};
