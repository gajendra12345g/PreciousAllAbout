import * as React from "react";
// Customizable Area Start
import { makeStyles } from "@material-ui/core";
import {FilterIcon} from './assets';
import { CloseRounded } from "@material-ui/icons";
// Customizable Area End

interface ViewProps {
    testID: string;
    // Customizable Area Start
    onClick: any;
    // Customizable Area End
}

const useStyles = makeStyles((theme: any) => ({
    filterBtnWrapper: {
        display: 'flex',
        width: '100%',
        height: '48px',
        border: '1px solid #BFC2C3',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    filterIcon: {
        height: '13px',
        width: '13px'
    },
    btnLabel: {
        color: '#73767A',
        fontSize: '12px',
        lineHeight: '18px',
        letter: '2.5%',
        marginLeft: '10px',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    filterBtnWrapperOpened: {
        display: 'flex',
        width: '100%',
        height: '48px',
        border: '1px solid #BFC2C3',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    openedFilter: {
        marginLeft: '10px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    closeIconWrap: {
        marginRight: '10px',
        [theme.breakpoints.down('sm')]: {
            margin: 0
        },
    },
    closeIcon: {
        height: '15px',
        width: '15px',
        cursor: 'pointer'
    }
}))

export const FilterBtn: React.FC<ViewProps> = (
    {
        // Customizable Area Start
        onClick
        // Customizable Area End
    }
) => {
    // Customizable Area Start

    const [filterOpen, setFilterOpen] = React.useState(false);

    const classes = useStyles();
    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
        onClick();
    }

    // Customizable Area End

    return (
        // Customizable Area Start
        <>
            {
                filterOpen ?
                    <div
                        className={classes.filterBtnWrapperOpened}
                    >
                        <div
                            className={classes.openedFilter}
                        >
                            <img 
                                src={FilterIcon}
                                className={classes.filterIcon} 
                            />
                            <span
                                className={classes.btnLabel}
                            >
                                FILTERS
                            </span>
                        </div>
                        <div
                            className={classes.closeIconWrap}
                        >
                            <CloseRounded 
                                className={classes.closeIcon}
                                onClick={toggleFilter}
                            />
                        </div>
                    </div>
                :   <div
                        className={classes.filterBtnWrapper}
                        onClick={toggleFilter}
                    >
                        <img 
                            src={FilterIcon}
                            className={classes.filterIcon} 
                        />
                        <span
                            className={classes.btnLabel}
                        >
                            FILTERS
                        </span>
                    </div>
            }
        </>
        // Customizable Area End
    );
};

// Customizable Area Start

export default FilterBtn;
// Customizable Area End

