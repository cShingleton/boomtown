import React from 'react';
import { RaisedButton, FlatButton, SelectField, MenuItem } from 'material-ui';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';
import { connect } from 'react-redux';
import { black, blue500 } from 'material-ui/styles/colors';
import { stepForward, stepBackward } from '../../redux/modules/share';
import ValidatedTextField from '../../components/ValidatedTextField/';
import './styles.css';

const styles = {
    errorStyle: {
        color: black
    },
    floatingLabelStyle: {
        color: blue500
    }
};

let uploadInput = false;

// IMPLEMENT A RENDER ACTION BUTTONS FUNCTION FOR BACK/NEXT BUTTONS

const Share = ({ 
    handleImageUpload, 
    selectImage,
    dispatch,
    stepIndex,
    captureTitle,
    captureDescription,
    selectValues,
    selectItemTags
}) => {
    const tags = ['Electronics', 'Household Items', 'Musical Instruments', 'Sporting Goods',
        'Recreational Equipment', 'Physical Media', 'Tools'];

    function renderStepActions(step) {
        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 3 ? 'Finish' : 'Next'}
                    disableTouchRipple
                    disableFocusRipple
                    primary
                    onTouchTap={() => dispatch(stepForward(step))}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple
                        disableFocusRipple
                        onTouchTap={() => dispatch(stepBackward(step))}
                    />
                )}
            </div>
        );
    }


    return (
    <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
        <Stepper
            activeStep={stepIndex}
            linear
            orientation="vertical"
        >
            <Step>
                <StepLabel>Add an Image</StepLabel>
                    <StepContent>
                        <p> We live in a visual culture. Upload an image of the item you're sharing.
                        </p>
                        <RaisedButton
                            label="Select An Image"
                            disableTouchRipple
                            disableFocusRipple
                            primary
                            onClick={() => selectImage(uploadInput)}
                            style={{marginRight: 12}}
                        /><br />
                        {renderStepActions(0)}
                    </StepContent>
            </Step>
            <Step>
                <StepLabel>Add a Title and Description</StepLabel>
                <StepContent>
                    <p>Folks need to know what you're sharing. Give them a clue by adding a title and a description.</p>
                    <ValidatedTextField
                        label="Title"
                        type="input"
                        onChangeAction={(e) => dispatch(captureTitle(e.target.value))}
                    /><br />
                    <ValidatedTextField
                        label="Description"
                        type="input"
                        onChangeAction={(e) => dispatch(captureDescription(e.target.value))}
                    />
                    {renderStepActions(1)}
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Categorize your Item</StepLabel>
                <StepContent>
                    <p>To share an item, you'll add it to our list of categories. You can select multiple categories.</p>
                    <SelectField
                        multiple
                        hintText={'Select Category Tags'}
                        value={selectValues}
                        onChange={(event, index, values) => dispatch(selectItemTags(values, selectValues))}
                    >
                        {tags.map(tag => (
                            <MenuItem
                                key={tag}
                                insetChildren
                                checked={selectValues && selectValues.includes(tag)}
                                value={tag}
                                primaryText={tag}
                            />
                        ))}
                    </SelectField>
                    {renderStepActions(2)}
                </StepContent>
            </Step>
            <Step> 
                <StepLabel>Confirm Things</StepLabel>
                <StepContent>
                    <p>Great! If you're happy with everything, tap the button.</p>
                    {renderStepActions(3)}
                </StepContent>
            </Step>
        </Stepper>
    </div>
    );
};

function mapStateToProps(state) {
    return {
        stepIndex: state.share.step.stepIndex
    };
}

export default connect(mapStateToProps)(Share);

        // FOR IMAGE UPLOADING 
        // <form onSubmit={this.handleSubmit}>
        //     <input
        //         onChange={handleImageUpload}
        //         ref={input => { uploadInput = input; }}
        //         hidden
        //         type="file"
        //         id="input"
        //     />
        // </form>
           
//           <Step>
//             <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
//               Create an ad group
//             </StepButton>
//             <StepContent>
//               <p>An ad group contains one or more ads which target a shared set of keywords.</p>
//               {this.renderStepActions(1)}
//             </StepContent>
//           </Step>
//           <Step>
//             <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
//               Create an ad
//             </StepButton>
//             <StepContent>
//               <p>
//                 Try out different ad text to see what brings in the most customers,
//                 and learn how to enhance your ads using features like ad extensions.
//                 If you run into any problems with your ads, find out how to tell if
//                 they're running and how to resolve approval issues.
//               </p>
//               {this.renderStepActions(2)}
//             </StepContent>
//           </Step>
//         </Stepper>
//       </div>
//     );
//   } 


// import React from 'react';

// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
// import ExpandTransition from 'material-ui/internal/ExpandTransition';
// import TextField from 'material-ui/TextField';

// /**
//  * A contrived example using a transition between steps
//  */
// class HorizontalTransition extends React.Component {

//   getStepContent(stepIndex) {
//     switch (stepIndex) {
//       case 0:
//         return (
//           <p>
//             Select campaign settings. Campaign settings can include your budget, network, bidding
//             options and adjustments, location targeting, campaign end date, and other settings that
//             affect an entire campaign.
//           </p>
//         );
//       case 1:
//         return (
//           <div>
//             <TextField style={{marginTop: 0}} floatingLabelText="Ad group name" />
//             <p>
//               Ad group status is different than the statuses for campaigns, ads, and keywords, though the
//               statuses can affect each other. Ad groups are contained within a campaign, and each campaign can
//               have one or more ad groups. Within each ad group are ads, keywords, and bids.
//             </p>
//             <p>Something something whatever cool</p>
//           </div>
//         );
//       case 2:
//         return (
//           <p>
//             Try out different ad text to see what brings in the most customers, and learn how to
//             enhance your ads using features like ad extensions. If you run into any problems with your
//             ads, find out how to tell if they're running and how to resolve approval issues.
//           </p>
//         );
//       default:
//         return 'You\'re a long way from home sonny jim!';
//     }
//   }

//   renderContent() {
//     const {finished, stepIndex} = this.state;
//     const contentStyle = {margin: '0 16px', overflow: 'hidden'};

//     if (finished) {
//       return (
//         <div style={contentStyle}>
//           <p>
//             <a
//               href="#"
//               onClick={(event) => {
//                 event.preventDefault();
//                 this.setState({stepIndex: 0, finished: false});
//               }}
//             >
//               Click here
//             </a> to reset the example.
//           </p>
//         </div>
//       );
//     }

//     return (
//       <div style={contentStyle}>
//         <div>{this.getStepContent(stepIndex)}</div>
//         <div style={{marginTop: 24, marginBottom: 12}}>
//           <FlatButton
//             label="Back"
//             disabled={stepIndex === 0}
//             onTouchTap={this.handlePrev}
//             style={{marginRight: 12}}
//           />
//           <RaisedButton
//             label={stepIndex === 2 ? 'Finish' : 'Next'}
//             primary={true}
//             onTouchTap={this.handleNext}
//           />
//         </div>
//       </div>
//     );
//   }

//   render() {
//     const {loading, stepIndex} = this.state;

//     return (
//       <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
//         <Stepper activeStep={stepIndex}>
//           <Step>
//             <StepLabel>Select campaign settings</StepLabel>
//           </Step>
//           <Step>
//             <StepLabel>Create an ad group</StepLabel>
//           </Step>
//           <Step>
//             <StepLabel>Create an ad</StepLabel>
//           </Step>
//         </Stepper>
//         <ExpandTransition loading={loading} open={true}>
//           {this.renderContent()}
//         </ExpandTransition>
//       </div>
//     );
//   }
// }

// export default HorizontalTransition;