import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { FireBaseStorage, FireBaseAuth } from '../../config/firebase';
import { captureTitleInput, captureDescriptionInput, selectItemTags } from '../../redux/modules/share';
import ShareForm from './ShareForm';
import ShareCard from './ShareCard';
import Loader from '../../components/Loader/';
import './styles.css';

class ShareContainer extends Component {

//     selectImage = fileInput => {
//         this.fileInput = this.fileInput || fileInput;
//         this.fileInput.click();
//     }
//     

//     handleImageUpload = () => {
//         const cloud = FireBaseStorage.ref();
//         const userId = FireBaseAuth.currentUser.uid;
//         const fileName = this.fileInput.files[0].name;
//         //this.props.dispatch(startImageUpload());
//         cloud.child(`images/${userId}/${fileName}`)
//                 .put(this.fileInput.files[0])
//                 .then(result => {
//                     //this.props.dispatch(setItemImageUrl(result.metadata.downloadUrls[0]));
//                     this.handleNext();
//                 });
//     }

    //handleSubmit = () => {
//         console.log('Submit handled!');
//     }

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
                />
            </div>
        );
    }
}

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

const ShareFormWithData = graphql(fetchUser, {
    options: ownProps => ({
        variables: {
            id: ownProps.authenticated
        }
    })
});

export default connect(mapStateToProps)(ShareFormWithData(ShareContainer));

// handleImageUpload={this.handleImageUpload} selectImage={this.selectImage} -- share component props

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


// /**
//  * A basic vertical non-linear implementation
//  */
// class VerticalNonLinear extends React.Component {

//   state = {
//     loading: false,
//     finished: false,
//     stepIndex: 0,
//   };

//   dummyAsync = (cb) => {
//     this.setState({loading: true}, () => {
//       this.asyncTimer = setTimeout(cb, 500);
//     });
//   };



//   handleNext = () => {
//     const {stepIndex} = this.state;
//     if (!this.state.loading) {
//       this.dummyAsync(() => this.setState({
//         loading: false,
//         stepIndex: stepIndex + 1,
//         finished: stepIndex >= 2,
//       }));
//     }
//   };

//   handlePrev = () => {
//     const {stepIndex} = this.state;
//     if (stepIndex > 0) {
//       this.setState({stepIndex: stepIndex - 1});
//     }
//   };

//handlePrev = () => {
//     const {stepIndex} = this.state;
//     if (!this.state.loading) {
//       this.dummyAsync(() => this.setState({
//         loading: false,
//         stepIndex: stepIndex - 1,
//       }));
//     }
//   };


// export default VerticalNonLinear;
