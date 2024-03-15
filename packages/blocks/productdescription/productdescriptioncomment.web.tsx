//@ts-nocheck

import React from "react";

import {
    Container,
    // Customizable Area Start
    Grid,
    Breadcrumbs,
    Divider,
    // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Header from "../../../../packages/components/src/DesignSystem/Header/Header.web";
import CustomButton from "../../../../packages/components/src/DesignSystem/CustomButton/CustomButton.web";
import Avatar from '@material-ui/core/Avatar';
import customTheme from "../../../../packages/components/src/DesignSystem/Theme/Theme.web";
import CustomTypography from "../../../../packages/components/src/DesignSystem/CustomTypography/CustomTypography.web";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CustomLink from "../../../../packages/components/src/DesignSystem/Link/Link.web";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff",
            contrastText: "#fff",
        },
    },
    typography: {
        h6: {
            fontWeight: 500,
        },
        subtitle1: {
            margin: "20px 0px",
        },
    },
});

// Customizable Area End

import ProductDescriptionController, {
    Props,
} from "./ProductDescriptionController";



export default class ProductDescriptionComment extends ProductDescriptionController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    // Customizable Area End

    render() {
        return (
            // Customizable Area Start
            <ThemeProvider theme={theme}>
                <Header navigation={this.props.navigation} testID={""} classNameProps={undefined} />
                <Container maxWidth={"xl"} style={webStyle.mainCommentContainer}>
                    <div style={webStyle.breadcrumbBlock}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <CustomLink url="/" component={"breadcrumbText"}>
                        Home
                        </CustomLink>
                        <CustomLink component={"breadcrumbText"} url={`/ProductDescription/${this.state.searchQuery}`}>
                        ProductDetail
                        </CustomLink>
                        <CustomTypography  variant="primary" component="body10">Comment</CustomTypography>
                    </Breadcrumbs>
                    </div>
                    <div style={webStyle.mainCommentDiv}>
                        <Grid container>
                            <Grid item xs={12}>
                                <CustomTypography variant={'primary'} component={'body3'}>{this.state.commentsData && this.state.commentsData.length} COMMENTS</CustomTypography>
                                <Divider style={webStyle.dividerStyleCss}></Divider>
                                <div style={this.state.showCommentBlock ? webStyle.CommentDisplay : webStyle.CommentWrapper} onClick={this.handleCommentBlock}>
                                    <Avatar style={webStyle.avatarCss} alt="Remy Sharp" src={""} />
                                    {this.state.showCommentBlock ? <div style={webStyle.CommentBlock}>
                                        <TextareaAutosize style={webStyle.TextAreaBlock}   aria-label="minimum height" minRows={10} placeholder="Add your comment..." onChange={this.handleCommentChange} value={this.state.CommentInput} />
                                        <div style={webStyle.BtnComment}><CustomButton  onClick={this.handleAddComment} variant="CommentButton" size={"largeBtn"}>ADD COMMENT</CustomButton></div>
                                    </div> : <CustomTypography variant={'secondary'} component={'outfitBody2'} textTransform={'none'}>Add your comment</CustomTypography>}
                                </div>
                                { this.state.commentsData && this.state.commentsData?.map((data, index) => (
                                    <div key={index} style={webStyle.commentmainCommentDiv}>
                                        <div style={{ display: "flex", flex: 0.25 }}>
                                            <Avatar style={webStyle.avatarCss} alt={data.attributes.account_name} src={data.attributes.account_image} />
                                        </div>
                                        <div style={webStyle.commentInnerDiv}>
                                            <CustomTypography variant={'primary'} component={'body11bold'}>{data.attributes.account_name}
                                                <span style={{ fontSize: 13, color: "gray" }}> . {this.timeElapsedAgo(data.attributes.created_at)}</span></CustomTypography>
                                            <CustomTypography variant={'secondary'} component={'body15'}>{data.attributes.comment}</CustomTypography>
                                            <span onClick={() => this.handleReplyBlock(data.id)} style={webStyle.CursorCSS} data-test-id={`replyIdBTn${index}`}>
                                                <CustomTypography variant={'blue'} component={'body14'}>REPLY</CustomTypography>
                                            </span>
                                            {this.state.commentId === data.id && <div style={webStyle.replyBlock}>
                                                <TextareaAutosize style={webStyle.TextAreaBlock}  aria-label="minimum height" minRows={5} placeholder={`${data.attributes.account_name}...`} onChange={this.handleReplyChange} value={this.state.ReplyText} />
                                                <div style={webStyle.BtnComment}><CustomButton  onClick={this.handleAddReply} variant="ReplyButton" size="largeBtn">REPLY</CustomButton></div>
                                            </div>
                                            }
                                            {
                                                data.attributes.reply && data.attributes.reply.length && data?.attributes?.reply.map((item) => {
                                                    return (
                                                        <div key={index} style={webStyle.commentmainCommentDiv}>
                                                            <div style={{ display: "flex", flex: 0.25 }}>
                                                                <Avatar style={webStyle.avatarCss} alt={"reply_img"} src={item.image} />
                                                            </div>
                                                            <div style={webStyle.commentInnerDiv}>
                                                                <CustomTypography variant={'primary'} component={'body11bold'}>{item.name}
                                                                    <span style={{ fontSize: 13, color: "gray" }}> . {this.timeElapsedAgo(item.created_at)}</span></CustomTypography>
                                                                <CustomTypography variant={'secondary'} component={'body15'}>{item.content}</CustomTypography>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                ))}
                                <div style={webStyle.marginTop20}>
                                <Divider style={webStyle.dividerStyleCss}></Divider>
                                <div style={webStyle.loadMoreBTn}>
                                    <CustomButton size="largeBtn" variant={'loadMoreCommentBtn'} data-test-id="load_more_btn" onClick={this.handleLoadMore}>LOADS MORE COMMENTS</CustomButton>
                                </div>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </div>
                </Container>
            </ThemeProvider>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const webStyle = {
    mainCommentContainer: {
        padding: 0,
        backgroundColor: customTheme.palette.grey.secondary
    },
    mainCommentDiv: {
        padding: 50,
        margin: "25px 25px",
        marginBottom: 15,
        backgroundColor: customTheme.palette.white.main
    },
    marginTop50: { marginTop: 50 },
    avatarCss: { marginRight: 15, height: 30, width: 30 },
    commentmainCommentDiv: { display: "flex", flex: 12, marginTop: 20 },
    commentInnerDiv: { display: "flex", flex: 11.75, flexDirection: "column" },
    dividerStyleCss: {
        marginBottom: 20,
        marginTop: 16
    },
    CommentDisplay: {
        display: "flex",
        cursor:"pointer"
    },
    CommentWrapper: {
        display: "flex",
        alignItems: "center",
        cursor:"pointer"
    },
    CommentBlock: {
        width: "100%"
    },
    replyBlock: {
        marginTop: "10px"
    },
    TextAreaBlock: {
        width: "95%",
        border: `1px solid ${customTheme.palette.white.dark}`,
        padding: "15px",
        fontSize: "14px",
        color: `${customTheme.palette.white.grey}`,
        fontWeight: 400,
        fontFamily: "Outfit"
    },
    BtnComment: {
        width: "95%",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "10px"
    },
    breadcrumbBlock:{
        margin:"25px"
    },
    breadcrumbText:{
        color:"#73767A",
        fontSize: '14px',
        fontWeight: '400',
        fontFamily: "Outfit",
        underline:"none"
       },
       loadMoreBTn:{
        display:"flex",
        justifyContent:"flex-end"
       },  
       CursorCSS:{
       cursor:"pointer"
       } 
};
// Customizable Area End
