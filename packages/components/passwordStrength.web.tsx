import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Label from '../../../components/src/Label/Label.web';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const PasswordStrength = (props: any) => {

    const [number, setNumber] = useState(false);
    const [pwdLength, setPwdLength] = useState(false);
    const [lowCase, setLowCase] = useState(false);
    const [upCase, setUpCase] = useState(false);
    const [boxLength, setBoxLength] = useState(1);
    const checkStrength = () => {
        
        if(props.password.length >= 8){
            setPwdLength(true) 
        }
        if(props.password.match(/([0-9])/)){
            setNumber(true)
        }
        if(props.password.match(/([a-z])/)){
            setLowCase(true)
        }
        if(props.password.match(/([A-Z])/)){
            setUpCase(true)
        }
    }
;
    const boxes = () => {
        const tempArr = [number, pwdLength, upCase, lowCase]
        const trueCount = tempArr.reduce((count: any, current: any) => {
            if (current) {
              return count + 1;
            }
            return count;
        }, 0);
        setBoxLength(trueCount)
    }

    const getBoxes = () => {
        if(boxLength == 1){
            return(
                <div style={styles.boxWrap}>
                    <div style={styles.yellowBox1}></div>
                </div>
            )
        } else if(boxLength == 2){
            return(
                <div style={styles.boxWrap}>
                    <div style={styles.yellowBox1}></div>
                    <div style={styles.yellowBox}></div>
                </div>
            )
        } else if(boxLength == 3){
            return(
                <div style={styles.boxWrap}>
                    <div style={styles.yellowBox1}></div>
                    <div style={styles.yellowBox}></div>
                    <div style={styles.yellowBox}></div>
                </div>
            )
        } else {
            return(
                <div style={styles.boxWrap}>
                    <div style={styles.greenBox1}></div>
                    <div style={styles.greenBox}></div>
                    <div style={styles.greenBox}></div>
                    <div style={styles.greenBox}></div>
                </div>
            )
        }
    }

    useEffect(() => {
        if(props.password.length){
            checkStrength();
            boxes();
        }
    })

    return  <div>
                {
                    getBoxes()
                }
                
                {boxLength < 4 ? 
                    <div style={styles.cardWrap}>
                        <Card
                            style={styles.card}
                        >
                            <div>
                                <Label
                                    variant='primary'
                                    weight='w400'
                                    textTransform="none"
                                    size='xl'
                                >
                                    Your password should 
                                </Label>
                            </div>
                            <div
                                style={styles.ruleList}
                            >
                                {
                                    pwdLength ? 
                                        <CheckCircleOutlineIcon style={styles.listIconGreen} />
                                    :   <RemoveCircleOutlineIcon style={styles.listIconRed} />
                                }
                                <span
                                    style={styles.listText}
                                >
                                    <Label
                                        variant='secondary'
                                        weight='w400'
                                        textTransform="none"
                                        size='l'
                                    >
                                        Minimum 8 characters
                                    </Label>
                                </span>
                            </div>
                            <div
                                style={styles.ruleList}
                            >
                                {
                                    upCase ? 
                                        <CheckCircleOutlineIcon style={styles.listIconGreen} />
                                    :   <RemoveCircleOutlineIcon style={styles.listIconRed} />
                                }
                                <span
                                    style={styles.listText}
                                >
                                    <Label
                                        variant='secondary'
                                        weight='w400'
                                        textTransform="none"
                                        size='l'
                                    >
                                        Contains uppercase characters ( A, C , E )
                                    </Label>
                                </span>
                            </div>
                            <div
                                style={styles.ruleList}
                            >
                                {
                                    lowCase ? 
                                        <CheckCircleOutlineIcon style={styles.listIconGreen} />
                                    :   <RemoveCircleOutlineIcon style={styles.listIconRed} />
                                }
                                <span
                                    style={styles.listText}
                                >
                                    <Label
                                        variant='secondary'
                                        weight='w400'
                                        textTransform="none"
                                        size='l'
                                    >
                                        Contains lowercase characters ( a, c , e )
                                    </Label>
                                </span>
                            </div>
                            <div
                                style={styles.ruleList}
                            >
                                {
                                    number ?
                                        <CheckCircleOutlineIcon style={styles.listIconGreen} />
                                    :   <RemoveCircleOutlineIcon style={styles.listIconRed} />
                                }
                                <span
                                    style={styles.listText}
                                >
                                    <Label
                                        variant='secondary'
                                        weight='w400'
                                        textTransform="none"
                                        size='l'
                                    >
                                        Contains number ( 0, 1, 9)
                                    </Label>
                                </span>
                            </div>
                        </Card>
                    </div>
                : null}
            </div>;
}

const styles: any = {
    cardWrap: {
        width: '100%',
        marginTop: '10px'
    },
    card: {
        borderRadius: '0px',
        padding: '15px',
        paddingTop: '20px',
        paddingBottom: '20px'
    },
    cardHead: {

    },
    ruleList: {
        display: 'flex',
        marginTop: '10px',
        marginBottom: '10px'
    },
    listIconGreen: {
        height: '12px',
        width: '12px',
        color: 'green'
    },
    listIconRed: {
        height: '12px',
        width: '12px',
        color: 'red'
    },
    listText: {
        marginLeft: '5px'
    },
    boxWrap: {
        display: 'flex'
    },
    yellowBox: {
        height: '3px',
        width: '51px',
        background: '#F59E0B',
        marginLeft: '5px'
    },
    yellowBox1: {
        height: '3px',
        width: '51px',
        background: '#F59E0B'
    },
    greenBox: {
        height: '3px',
        width: '51px',
        background: '#057A55',
        marginLeft: '5px'
    },
    greenBox1: {
        height: '3px',
        width: '51px',
        background: '#057A55'
    }
}

export default PasswordStrength;