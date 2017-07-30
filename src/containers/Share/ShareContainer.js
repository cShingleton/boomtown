import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FireBaseStorage, FireBaseAuth } from '../../config/firebase';
import Share from './Share';

class ShareContainer extends Component {

//     selectImage = fileInput => {
//         this.fileInput = this.fileInput || fileInput;
//         this.fileInput.click();
//     }
//     handleSubmit = () => {
//         console.log('Submit handled!');
//     }

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

    render() {
        return (
            <div>
                <Share
                    renderStepActions={this.renderStepActions}  
                />
            </div>
        );
    }
}

export default connect()(ShareContainer);

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
