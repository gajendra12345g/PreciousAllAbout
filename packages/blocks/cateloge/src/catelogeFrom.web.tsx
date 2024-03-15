import React from "react";
// Customizable Area Start
import {
    Box,
    Grid, styled, MenuItem, Select, Divider, Chip,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import Input from "../../../components/src/DesignSystem/Input/Input.web";
import CustomCheckBox from "../../../components/src/DesignSystem/CustomCheckBox/CustomCheckBox.web";
import CustomTypography from "../../../components/src/DesignSystem/CustomTypography/CustomTypography.web";
// Customizable Area End
import CustomButton from "../../../components/src/DesignSystem/CustomButton/CustomButton.web";
import ModalComponent from "../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
export const configJSON = require("./config");
export const images = require("./assets")

interface Props {
    value: any;
    handleContentInfo: any;
    deleteAllModalOpen: any
    submitModal: any;
    title: any;
    handleFormChange: any;
    description: any;
    selectedCategoryIndex: any;
    handleCategoryChange: any;
    showCategoryData: any;
    isChecked: any;
    handleCheckBoxChange: () => void;
    inputValue: any;
    handleInputKeywordChange: any;
    handleKeyDown: any;
    handleRemoveKeyword: any;
    keywords: any;
    suggestions: any;
    handleAddKeyword: any;
    goToDashboard: any;
    closeModal: any
    location: any;
    handleDeleteKeyword: any,
    submittedDate: any,
    reviewAcceptDate: any
}
export default class CatalogueForm extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    // Customizable Area End

    render() {
        // Customizable Area Start
        const { value, handleRemoveKeyword, goToDashboard, reviewAcceptDate, handleDeleteKeyword, submittedDate, location, handleContentInfo, suggestions, closeModal, handleAddKeyword, handleKeyDown, keywords, deleteAllModalOpen, handleInputKeywordChange, handleCheckBoxChange, inputValue, submitModal, title, isChecked, handleCategoryChange, selectedCategoryIndex, description, handleFormChange, showCategoryData } = this.props;
        let dateObject = new Date(submittedDate);
        const day = dateObject.getUTCDate();
        const month = dateObject.getUTCMonth() + 1;
        const year = dateObject.getUTCFullYear();
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        // Customizable Area End
        return (
            // Customizable Area Start
            <CustomFormConatiner>
                <Box style={webStyle.detailFields}>
                    {value == 1 && <Box style={webStyle.submittedDateStyle}><CustomTypography variant="outfitBody2" component="text_none">{configJSON.submittedDate} {formattedDate}</CustomTypography></Box>}

                    {
                    value == 2 && <Box style={webStyle.submittedDateStyle}>
                        <CustomTypography variant="outfitBody2" component="text_none">{configJSON.submittedDate} {formattedDate}</CustomTypography>
                        <CustomTypography variant="outfitBody2" component="text_none">{configJSON.dateReview} {reviewAcceptDate}</CustomTypography>
                    <CustomTypography variant="outfitBody2" component="text_none">{configJSON.expireContent}</CustomTypography>
                    </Box>
                    }
                    <Box ><CustomTypography variant="font_family" component="text_none">Title</CustomTypography>
                        <Input
                            placeholder="Enter Title"
                            type='text'
                            required
                            name="title"
                            value={title}
                            data-test-id="handleFormChange"
                            onChange={handleFormChange}

                        />
                        <div style={webStyle.countText}>
                            <CustomTypography variant="outfitBody3" component="secondary" textTransform="text_none">
                                {`${title.length}/100`}
                            </CustomTypography></div></Box>
                    <Box><CustomTypography variant="font_family" component="text_none">Description</CustomTypography>
                        <Input
                            placeholder="Enter description"
                            multiline
                            rows={4}
                            type='text'
                            required
                            data-test-id="handleFormChange"
                            onChange={handleFormChange}
                            name='description'
                            value={description}
                        />
                        <div style={webStyle.countText}>
                            <CustomTypography variant="outfitBody3" component="secondary" textTransform="text_none">
                                {`${description.length}/500`}
                            </CustomTypography></div>
                    </Box>
                    <CustomTypography variant="font_family" component="text_none">Category</CustomTypography>

                    <Box style={webStyle.category}>
                        <Select
                            disableUnderline
                            value={selectedCategoryIndex}
                            data-test-id="handleCategoryChange"
                            onChange={handleCategoryChange}
                            IconComponent={ExpandMoreIcon}
                            style={webStyle.chooseStyle}
                            displayEmpty
                        >
                            <MenuItem value="" style={webStyle.display_none}>
                                {configJSON.choosecategory}
                            </MenuItem>
                            {showCategoryData.map((item: any, index: any) => (
                                <MenuItem key={index} value={item.id}>{item.attributes.title}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box style={webStyle.checkbox}>
                        <div style={webStyle.showCheckbox}>

                            <CustomCheckBox
                                testID={"CustomCheckBox"}
                                checked={isChecked}
                                onChange={handleCheckBoxChange}
                            />
                        </div>
                        <Grid>
                            <CustomTypography component="outfitBody1">{configJSON.nsfw}<span>{configJSON.Content}</span></CustomTypography>
                            <CustomTypography variant="contentfEature" component="text_none">{configJSON.contentDetails}</CustomTypography>
                        </Grid>
                    </Box>
                    <Box><CustomTypography variant="font_family" component="text_none">Location</CustomTypography>
                        <Input
                            placeholder="Enter location"
                            type='text'
                            required
                            value={location}
                            onChange={handleFormChange}
                            name="location"
                            data-test-id="handleFormChangeLocation"
                        /></Box>
                    <Box><CustomTypography variant="font_family" component="text_none">Keywords</CustomTypography>
                        <Box>
                            <Input
                                variant="outlined"
                                value={inputValue}
                                type="text"
                                data-test-id="handleInputKeywordChange"
                                onChange={handleInputKeywordChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Add your keywords"
                            />

                            <Box marginTop={2}>
                                {keywords.map((keyword: any) => (
                                    <Chip
                                        key={keyword}
                                        label={keyword}
                                        onDelete={() => handleRemoveKeyword(keyword)}
                                        style={webStyle.chip}
                                        data-test-id="handleRemoveKeyword"
                                    />
                                ))}
                            </Box>
                            <CustomTypography variant="outfitBody1" component="blue">{configJSON.keywordSuggestion} <span style={{ fontSize: "12px" }}>{configJSON.auto}</span></CustomTypography>
                            {value == 0 && <Box marginTop={2}>
                                {suggestions
                                    .filter((suggestion: any) =>
                                        suggestion.toLowerCase().includes(inputValue.toLowerCase())
                                    )
                                    .map((suggestion: any) => (
                                        <ChipStyle
                                            key={suggestion}
                                            label={suggestion}
                                            data-test-id="handleAddKeyword"
                                            onDelete={() => handleDeleteKeyword(suggestion)}
                                            onClick={() => handleAddKeyword(suggestion)}
                                            deleteIcon={<CloseIcon />}
                                        />
                                    ))}
                            </Box>}
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <div style={webStyle.detailFields}>
                    {value == 0 ? (<CustomButton
                        variant={'primary'}
                        fullWidth='fullWidth'
                        size={'large'}
                        data-test-id="submitModal"
                        onClick={handleContentInfo}>submit</CustomButton>
                    ) :
                        <CustomButton variant="secondary" fullWidth='fullWidth' size="large" data-test-id="deleteAllContent" onClick={deleteAllModalOpen}>{configJSON.deleteBtn}</CustomButton>}
                </div>
                <ModalComponent
                    open={submitModal}
                    maxWidth={508}
                    maxHeight={508}
                    modalMinHeight={'0px'}
                >
                    <Grid>
                        <div style={webStyle.crossIcons}>
                            <CloseIcon onClick={closeModal} />
                        </div>
                        <Grid style={webStyle.submitModalContent}>

                            <CustomTypography component="outfitBody4">{configJSON.modalHead}</CustomTypography>
                            <CustomTypography variant="outfitBody2" component="font_color">{configJSON.modalContent}</CustomTypography>
                            <div style={webStyle.btnWidth}>
                                <CustomButton variant="primary" fullWidth='fullWidth' size={"large"} closeBtn={true} data-test-id="closeModal" onClick={closeModal}>{configJSON.submitMore}</CustomButton>
                            </div>
                            <Grid style={webStyle.dashboardBtn} onClick={goToDashboard} data-test-id="goToDashboard">{configJSON.dashboard}</Grid>
                        </Grid>
                    </Grid>
                </ModalComponent>
            </CustomFormConatiner>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const webStyle: any = {
    detailFields: {
        width: "90%",
        padding: "10px 20px"
    },
    checkbox: {
        display: "flex",
        gap: '10px',
        padding: "10px 0px"
    },
    showCheckbox: {
        margin: "auto 0px"
    },
    submitModalContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "50px 80px",
        gap: "16px",
        textAlign: "center"

    },
    dashboardBtn: {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        fontFamily: 'LemonMilk',
        color: "#3A82FF",
        cursor: "pointer",
        textTransform: "uppercase"
    },
    chip: {
        margin: "4px",
        cursor: "pointer",
        borderRadius: 0,
        backgroundColor: "white",
        color: "#73767A",
        border: "1px solid #73767A",
        marginBottom: "20px"
    },
    category: {
        border: "1px solid #BFC2C3",
        padding: "10px",
        marginTop: "10px"
    },
    btnWidth: { width: "224px" },
    countText: { textAlign: "end" },
    crossIcons: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    display_none: {
        display: "none"
    },
    chooseStyle: {
        display: "flex", color: '#73767A'
    },
    submittedDateStyle: {
        margin: "20px 0px",
        display:"flex",
        flexDirection:"column",
        gap:"15px"
    }
};
const ChipStyle = styled(Chip)({
    color: "#3A82FF",
    border: "1px solid #3A82FF",
    margin: "4px",
    cursor: "pointer",
    borderRadius: 0,
    backgroundColor: "white",
    '& .MuiChip-deleteIcon': {
        color: '#3A82FF',
        width: 18,
        height: 18,
    },
})
const CustomFormConatiner = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: "1",
    overflowY: "auto",
    "& .MuiDrawer-paper::-webkit-scrollbar": {
        display: "none",
    },

})
// Customizable Area End
