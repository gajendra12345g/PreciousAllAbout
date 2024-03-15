import * as React from "react";
// Customizable Area Start
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import Label from "../Label/Label.web";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox.web";

const useStyles = makeStyles((theme: any) => ({
    collapseTitleWrap: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        cursor: 'pointer',
        alignItems: 'center'
    },
    subCatOptWrap: {
        height: '40px',
        maxHeight: '40px',
        paddingTop: '5px',
        paddingBottom: '5px',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#F3F4F4',
        marginTop: '10px'
    },
    subCatChildOptWrap: {
        height: '40px',
        maxHeight: '40px',
        paddingTop: '5px',
        paddingBottom: '5px',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#F3F4F4',
        marginTop: '10px',
        cursor: 'pointer'
    },
    subCatOptWrapLabel: {
        height: '40px',
        maxHeight: '40px',
        paddingTop: '0px',
        paddingBottom: '0px',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'transparent',
        marginTop: '5px',
    },
    subCatOptLabel: {
        marginLeft: '10px'
    },
    subCatOptCheckbox: {
        marginRight: '10px'
    },
    collapseIcon: {
        marginRight: '10px'
    },
    marginLeft10: {
        marginLeft: '10px'
    }
}));

// Customizable Area End

interface ViewProps {
    testID: string;
    // Customizable Area Start
    data: [];
    checkboxes:any;
    handleCheckboxChange : any
    // Customizable Area End
}


export const CustomFilters: React.FC<ViewProps> = (
    {
        // Customizable Area Start
        data,  checkboxes,
        handleCheckboxChange
        // Customizable Area End
    }
) => {
    // Customizable Area Start
    const classes = useStyles();
    const [open, setOpen] = React.useState([]);
    const [openChild, setOpenChild] = React.useState([]);

    const handleClick = (index: number) => {
        const newOpenCollapse: any = [...open];
        newOpenCollapse[index] = !newOpenCollapse[index];
        setOpen(newOpenCollapse);
    };

    const handleClickChild = (index: number) => {
        const newOpenCollapse: any = [...openChild];
        newOpenCollapse[index] = !newOpenCollapse[index];
        setOpenChild(newOpenCollapse);
    };
    const [filters, setFilters] = React.useState<any>([]);

    // Customizable Area End

    return (
        // Customizable Area Start
        <>
            {
                data.map((item: any, index: any) => {
                    return (
                        <List key={index}>
                            <div
                                className={classes.collapseTitleWrap}
                                onClick={() => handleClick(index)}
                            >
                                <Label 
                                    variant='secondary'
                                    weight='w500'
                                    textTransform="uppercase"
                                    size='l'
                                >
                                    {item.attributes.ftype}
                                </Label>
                                <span
                                    className={classes.collapseIcon}
                                >
                                    {
                                        open[index] ?
                                            <RemoveIcon />
                                        :   <AddIcon />
                                    }
                                </span>
                            </div>
                            <Collapse in={open[index]} unmountOnExit>
                                {
                                    item.attributes.sub_type.data.map((sCat: any, i: any) => {
                                        return (
                                            <>
                                                {
                                                    sCat.attributes.inner_sub_type.data.length ?
                                                    <>
                                                            <div
                                                                className={classes.subCatChildOptWrap}
                                                                onClick={() => handleClickChild(i)}
                                                            >
                                                                <div
                                                                    className={classes.marginLeft10}
                                                                >
                                                                    <Label 
                                                                        variant='secondary'
                                                                        weight='w500'
                                                                        textTransform="uppercase"
                                                                        size='l'
                                                                    >
                                                                        {sCat.attributes.sub_type}
                                                                    </Label>
                                                                </div>
                                                                <span
                                                                    className={classes.collapseIcon}
                                                                >
                                                                    {
                                                                        openChild[i] ?
                                                                            <RemoveIcon />
                                                                        :   <AddIcon />
                                                                    }
                                                                </span>
                                                            </div>
                                                            {
                                                                sCat.attributes.inner_sub_type.data.map((iFilter: any, ifIndex: any) => {
                                                                    return (
                                                                        <Collapse in={openChild[i]} unmountOnExit>
                                                                            <div
                                                                                className={classes.subCatOptWrapLabel}
                                                                                key={i}
                                                                            >
                                                                                <div
                                                                                    className={classes.subCatOptLabel}
                                                                                >
                                                                                    <Label 
                                                                                        variant='primary'
                                                                                        weight='w500'
                                                                                        textTransform="none"
                                                                                        size='xl'
                                                                                    >
                                                                                        {iFilter.attributes.fitype}
                                                                                    </Label>
                                                                                </div>
                                                                                <div
                                                                                    className={classes.subCatOptCheckbox}
                                                                                >
                                                                                    <CustomCheckBox 
                                                                                        checked={checkboxes[iFilter.id] || false}
                                                                                        onChange={() =>handleCheckboxChange(iFilter.id, item.attributes.ftype, item) as ViewProps}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </Collapse>
                                                                    )
                                                                })
                                                            }
                                                    </>
                                                    :   <div
                                                            className={classes.subCatOptWrap}
                                                            key={i}
                                                        >
                                                            <div
                                                                className={classes.subCatOptLabel}
                                                            >
                                                                <Label 
                                                                    variant='primary'
                                                                    weight='w500'
                                                                    textTransform="none"
                                                                    size='xl'
                                                                >
                                                                    {sCat.attributes.sub_type}
                                                                </Label>
                                                            </div>
                                                            <div
                                                                className={classes.subCatOptCheckbox}
                                                            >
                                                                <CustomCheckBox 
                                                                    checked={checkboxes[sCat.id] || false}
                                                                    onChange={() => handleCheckboxChange(sCat.id, item.attributes.ftype, item.attributes.sub_type.data)}
                                                                />
                                                            </div>
                                                        </div>
                                                }
                                            </>
                                        )
                                    })
                                }
                            </Collapse>
                        </List>
                    )
                })
            }
        </>
        // Customizable Area End
    );
};

// Customizable Area Start

export default CustomFilters;
// Customizable Area End

