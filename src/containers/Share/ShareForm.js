import React from 'react';
import { RaisedButton, FlatButton, SelectField, MenuItem } from 'material-ui';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';
import { connect } from 'react-redux';
import { stepForward, stepBackward } from '../../redux/modules/share';
import ValidatedTextField from '../../components/ValidatedTextField/';
import './styles.css';

let uploadInput = false;

// WRAP EVERYTHING IN A FORM? 

const Share = ({ 
    handleImageUpload, 
    selectImage,
    dispatch,
    stepIndex,
    captureTitle,
    captureDescription,
    selectValues,
    selectItemTags,
    handleSubmit
}) => {
    const tags = ['Electronics', 'Household Items', 'Musical Instruments', 'Sporting Goods',
        'Recreational Equipment', 'Physical Media', 'Tools'];

    function renderStepActions(step) {
        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 3 ? 'Confirm' : 'Next'}
                    disableTouchRipple
                    disableFocusRipple
                    onTouchTap={stepIndex === 3 ? () => handleSubmit() : () => dispatch(stepForward(step))}
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
    <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }} 
        className="share-form">
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
                            <input
                                onChange={handleImageUpload}
                                ref={input => { uploadInput = input; }}
                                hidden
                                type="file"
                                id="input"
                            />
                            <RaisedButton
                                label="Select An Image"
                                disableTouchRipple
                                disableFocusRipple
                                onClick={() => selectImage(uploadInput)}
                                style={{marginRight: 12}}
                            />
                        <br />
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
