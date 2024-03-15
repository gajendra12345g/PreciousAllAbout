import React from 'react';

import Label from '../Label/Label.web';
import Divider from '../Divider/Divider.web';

const DividerWithOr = (props: any) => {
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Divider 
                color={props.color}
                height={props.height}
                width={props.width}
            />
            <div
                style={{
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }}
            >
                <Label 
                    variant='primary'
                    weight='w400'
                    textTransform="uppercase"
                    size='l'
                >
                    or
                </Label>
            </div>
            <Divider 
                color={props.color}
                height={props.height}
                width={props.width}
            />
        </div>
    )
}

export default DividerWithOr;