import React from "react";
import { makeStyles, ClickAwayListener } from "@material-ui/core";
import CustomDropDown from '../../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web';
import Card from '@material-ui/core/Card';
import Label from "../Label/Label.web";
import SearchIcon from '@material-ui/icons/Search';
import { setStorageData } from "../../../../framework/src/Utilities";

const useStyles = makeStyles((theme: any) => ({
    greySearchBarWrapper: {
        height: '48px',
        maxHeight: '48px',
        width: '100%',
        background: '#eeeeee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lightSearchBarWrapper: {
        maxWidth: "805px",
        width: "100%",
        height: "64px",
        background: "white",
        boxShadow: "10px 30px 50px rgba(191, 194, 195, 0.2)",
        marginTop: "-32px",
        margin: "auto",
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    searchIcon: {
        marginLeft: '10px'
    },
    inputWrap: {
        marginLeft: '10px',
        width: '100%',
        height: '48px'
    },
    input: {
        background: 'transparent',
        height: '48px',
        width: '100%',
        border: 'none',
        outline: 'none'
    },
    verticalGreyLine: {
        width: '1.6px',
        minWidth: '1.6px',
        height: '24px',
        minHeight: '24px',
        background: '#BFC2C3',
        marginLeft: '10px',
        marginRight: '10px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px',
            marginRight: '0px',
        },
    },
    suggessionCardWrap: {
        width: '100%',
        maxHeight: '300px',
        marginTop: '10px',
        borderRadius: '0px',
        paddingTop: '10px',
        position: 'absolute',
        zIndex: 999
    },
    landingSuggessionCardWrap: {
        width: '100%',
        maxWidth: '805px',
        margin: 'auto',
        maxHeight: '200px',
        borderRadius: '0px',
        position: 'relative',
        zIndex: 999,
        overflowY: 'auto'
    },
    listWrap: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #eeeeee',
        paddingTop: '10px',
        paddingBottom: '10px',
        marginLeft: '20px',
        marginRight: '20px',
        cursor: 'pointer'
    },
    listText: {
        marginLeft: '10px'
    },
    iconColor: {
        color: '#BFC2C3',
        cursor: 'pointer'
    },
    parentWrap: {
        position: 'absolute',
        width: '100%'
    },
    landingParentWrap: {
        position: 'relative'
    }
}))

const CustomSearch = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const classes = useStyles();
    const sampleOptions = [
        { label: "All Item", value: "all" },
        { label: "Image", value: "images" },
        { label: "Video", value: "videos" },
    ];
    const [selectedItem, setSelectedItem] = React.useState(sampleOptions[0]);
    const handleSelectNewItem = (newItem: any) => {
        setSelectedItem(newItem);
        setStorageData('Category', newItem.value);
    };


    const handleInputChange = (e: any) => {
        if (e.target.value.length) {
            setSearchQuery(e.target.value)
            props?.searchChange(e.target.value)
            setOpen(true)
        } else {
            setOpen(false)
            props?.searchChange(e.target.value)
        }
    }

    const enterPressed = (event: any) => {
        if (event.key === 'Enter' && searchQuery) {
            props?.clickSuggesion(searchQuery)
        }
    }

    const handleClickSuggession = (value: any) => {
        setSearchQuery(value)
        setOpen(false)
        props?.searchChange(value)
        props?.clickSuggesion(value)
        props.requestSearch(value)
    }

    const handleClickAway = () => {
        setOpen(false)
    }


    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.landingParentWrap}>
                    <div
                        className={classes.parentWrap}
                    >
                        <div
                            className={props?.variant == 'light' ? classes.lightSearchBarWrapper : classes.greySearchBarWrapper}
                        >
                            {
                                props.startIcon ?
                                    <div
                                        className={classes.searchIcon}
                                    >
                                        <SearchIcon
                                            className={classes.iconColor}
                                            onClick={() => handleClickSuggession(searchQuery)}
                                        />
                                    </div>
                                    : null
                            }
                            {
                                props.dropDown && props.dropDownPosition == 'start' ?
                                    <>
                                        <CustomDropDown
                                            variant="dropdownBtnPrimary"
                                            selectedItem={selectedItem}
                                            options={sampleOptions}
                                            selectNewItem={handleSelectNewItem}
                                            fontVariant="lemon"
                                        />
                                        <div className={classes.verticalGreyLine}></div>
                                    </>
                                    : null
                            }
                            <div
                                className={classes.inputWrap}
                            >
                                <input
                                    className={classes.input}
                                    onChange={(e: any) => handleInputChange(e)}
                                    placeholder="SEARCH"
                                    value={props.searchValue ? props.searchValue : ''}
                                    onKeyPress={(e: any) => enterPressed(e)}
                                />
                            </div>
                            {
                                props.dropDown && props.dropDownPosition == 'end' ?
                                    <>
                                        <div className={classes.verticalGreyLine}></div>
                                        <div>
                                            <CustomDropDown
                                                variant="dropdownBtnPrimary"
                                                selectedItem={selectedItem}
                                                options={sampleOptions}
                                                selectNewItem={handleSelectNewItem}
                                                fontVariant="lemon"
                                            />
                                        </div>
                                    </>
                                    : null
                            }
                            {
                                props.endIcon ?
                                    <div
                                        className={classes.searchIcon}
                                    >
                                        <SearchIcon
                                            className={classes.iconColor}
                                            onClick={() => handleClickSuggession(searchQuery)}
                                        />
                                    </div>
                                    : null
                            }
                        </div>
                        {
                            props?.searchList.length && open ?
                                <Card
                                    className={props?.variant == 'light' ? classes.landingSuggessionCardWrap : classes.suggessionCardWrap}
                                >
                                    {
                                        props?.searchList.length ? props?.searchList.map((search: any) => {
                                            return (
                                                <div
                                                    className={classes.listWrap}
                                                    onClick={() => handleClickSuggession(search.attributes.title)}
                                                >
                                                    <div>
                                                        <SearchIcon className={classes.iconColor} />
                                                    </div>
                                                    <div
                                                        className={classes.listText}
                                                    >
                                                        <Label
                                                            variant='primary'
                                                            weight='w500'
                                                            textTransform="uppercase"
                                                            size='xl'
                                                        >
                                                            {search.attributes.title}
                                                        </Label>
                                                    </div>
                                                </div>
                                            )
                                        }) : null
                                    }
                                </Card>
                                : null
                        }
                    </div>
                </div>
            </ClickAwayListener>
        </>
    )
}
export default CustomSearch