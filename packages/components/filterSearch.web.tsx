import * as React from "react";
// Customizable Area Start


import {  Typography,  Box, styled, makeStyles, Grid,  Checkbox,Chip,} from "@material-ui/core";
import {checkboxone} from '../Header/assets';


 
  
  import RemoveIcon from "@material-ui/icons/Remove";
  
  import AddIcon from "@material-ui/icons/Add";


const BoxContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 900px)": {
      // width: "88vw"
    },
    "@media (max-width: 500px)": {
      width: "100%"
    }
  });
  const BoxContainerLincense = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    "@media (max-width: 900px)": {
      // width: "88vw"
    },
    "@media (max-width: 500px)": {
      // width: "78vw"
    }
  });
 
  
 
  const BoxContainerIMage = styled(Box)({
    display: "flex",
    gap: "6rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    alignItems: "center",
    background: "#f3f4f4",
    // padding:"0.7rem",
    // width: "215px",
    height: "40px",
    paddingLeft: "1rem",
    justifyContent:"space-around",
    

    marginTop: "1rem",
  
   
  });
 
 
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// Customizable Area End

interface ViewProps {
    testID: string;
    // Customizable Area Start

    // Customizable Area End
}

const useStyles = makeStyles((theme) => ({
    FlexContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    FlexChildContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1rem"
    }
}))

export const FilterSearchs: React.FC<ViewProps> = (
    {
        // Customizable Area Start

        // Customizable Area End
    }
) => {
    // Customizable Area Start
    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event:any) => {
      setChecked(event.target.checked);
    };

    // Customizable Area End

    return (
        // Customizable Area Start
        <>

           <div>
       
  <Box style={{ background: "", padding: "1rem" }}>
 
                <Box style={{ height: "auto" }}>
                  <BoxContainer>
                    <Typography style={{ fontSize: "10px", color: "#0E0F17" }}>
                      Assets
                    </Typography>
                    <RemoveIcon />
                  </BoxContainer>
                  <BoxContainerIMage>
                    <Typography
                      style={{ fontSize: "14px", color: "#0E0F17" }}
                      className="backgroundAlignTag"
                    >
                      Images
                    </Typography>
                 <div >
                 <img src={checkboxone} alt="Q__stock"/>
                 </div>
                  </BoxContainerIMage>
                  <BoxContainerIMage>
                    <Typography style={{ fontSize: "14px", color: "#0E0F17" }}>
                      Videos
                    </Typography>
                    <div >
                 <img src={checkboxone} alt="Q__stock"/>
                 </div>
                  </BoxContainerIMage>
                  {/* SECOND COLUMN */}
                  {/* <BoxContainerone>
                    <Typography style={{ fontSize: "10px", color: "#0E0F17" }}>
                    LENCENSE
                    </Typography>
                    <RemoveIcon />
                  </BoxContainerone>
                  <BoxContainerIMage>
                    <Typography
                      style={{ fontSize: "14px", color: "#0E0F17" }}
                      className="backgroundAlignTag"
                    >
                      Free
                    </Typography>
                 <div >
                 <img src={checkboxone} alt="Q__stock"/>
                 </div>
                  </BoxContainerIMage>
                  <BoxContainerIMage>
                    <Typography
                      style={{ fontSize: "14px", color: "#0E0F17" }}
                      className="backgroundAlignTag"
                    >
                    Premium
                    </Typography>
                 <div >
                 <img src={checkboxone} alt="Q__stock"/>
                 </div>
                  </BoxContainerIMage> */}
                  <div style={{marginTop:"1.4rem"}}>
                  <BoxContainer>
                    <Typography style={{ fontSize: "10px", color: "#0E0F17" }}>
                      Assets
                    </Typography>
                    <RemoveIcon />
                  </BoxContainer>
                  <BoxContainerIMage>
                    <Typography
                      style={{ fontSize: "14px", color: "#0E0F17" }}
                      className="backgroundAlignTag"
                    >
                     Free
                    </Typography>
                 <div >
                 <img src={checkboxone} alt="Q__stock"/>
                 </div>
                  </BoxContainerIMage>
                  <BoxContainerIMage>
                    <Typography
                      style={{ fontSize: "14px", color: "#0E0F17" }}
                      className="backgroundAlignTag"
                    >
                     Free
                    </Typography>
                 <div >
                 <img src={checkboxone} alt="Q__stock"/>
                 </div>
                  </BoxContainerIMage>
                  </div>
                  {/* THIRD COLUME */}
                  <BoxContainerLincense>
                    <Typography style={{ fontSize: "10px", color: "#73767A" }}>
                      AIGENRATED
                    </Typography>
                    <AddIcon />
                    {/* {this.state.toggle ? (
                      <RemoveIcon onClick={this.handleClickToggle} />
                    ) : (
                      <AddIcon onClick={this.handleClickToggle} />
                    )} */}
                  </BoxContainerLincense>
                  {/* {this.state.toggle && (
                    <>
                      <BoxContainerLincense>
                        <Typography
                          style={{ fontSize: "10px", color: "#73767A" }}
                        >
                          PEOPLE
                        </Typography>
                        <RemoveIcon />
                      </BoxContainerLincense>
                      <BoxContainerIMage>
                        <Typography
                          style={{ fontSize: "14px", color: "#0E0F17" }}
                        >
                          Age
                        </Typography>
                        <Checkbox
                          defaultChecked
                          color="default"
                          inputProps={{
                            "aria-label": "checkbox with default color"
                          }}
                          style={{ paddingRight: "2px" }}
                        />
                      </BoxContainerIMage>
                      <BoxContainerIMage>
                        <Typography
                          style={{ fontSize: "14px", color: "#0E0F17" }}
                        >
                          Gender
                        </Typography>
                        <Checkbox
                          defaultChecked
                          color="default"
                          inputProps={{
                            "aria-label": "checkbox with default color"
                          }}
                          style={{ paddingRight: "2px" }}
                        />
                      </BoxContainerIMage>
                      <BoxContainerIMage>
                        <Typography
                          style={{ fontSize: "14px", color: "#0E0F17" }}
                        >
                          Ethnicity
                        </Typography>
                        <Checkbox
                          defaultChecked
                          color="default"
                          inputProps={{
                            "aria-label": "checkbox with default color"
                          }}
                          style={{ paddingRight: "2px" }}
                        />
                      </BoxContainerIMage>
                      <BoxContainerIMage>
                        <Typography
                          style={{ fontSize: "14px", color: "#0E0F17" }}
                        >
                          Number of People
                        </Typography>
                        <Checkbox
                          defaultChecked
                          color="default"
                          inputProps={{
                            "aria-label": "checkbox with default color"
                          }}
                          style={{ paddingRight: "2px" }}
                        />
                      </BoxContainerIMage>
                    </>
                  )} */}
                  <BoxContainerLincense>
                    <Typography style={{ fontSize: "10px", color: "#73767A" }}>
                      MOOD/EMOTION
                    </Typography>
                    <AddIcon />
                  </BoxContainerLincense>
                  <BoxContainerLincense>
                    <Typography style={{ fontSize: "10px" }}>
                      CATEGORY
                    </Typography>
                    <AddIcon />
                  </BoxContainerLincense>
                  <BoxContainerLincense>
                    <Typography style={{ fontSize: "10px", color: "#73767A" }}>
                      PEOPLE
                    </Typography>
                    <RemoveIcon />
                  </BoxContainerLincense>

                  {/* FOURTH COLUMN */}

                  {/* <BoxContainerIMage>
                    <Typography style={{ fontSize: "14px", color: "#0E0F17" }}>
                      AGE
                    </Typography>
                    <AddIcon />
                  </BoxContainerIMage> */}
                    <BoxContainerLincense>
                    <Typography style={{ fontSize: "14px", color: "#0E0F17" }}>
                      CATEGORY
                    </Typography>
                    <AddIcon />
                  </BoxContainerLincense>
                  <BoxContainerIMage>
                    <Typography style={{ fontSize: "14px", color: "#0E0F17" }}>
                      Age
                    </Typography>
                    <AddIcon />
                  </BoxContainerIMage>
                  <BoxContainerIMage>
                    <Typography style={{ fontSize: "14px", color: "#0E0F17" }}>
                      Gender
                    </Typography>
                    <AddIcon />
                  </BoxContainerIMage>

                  <BoxContainerIMage>
                    <Typography
                      style={{ fontSize: "14px", color: "#0E0F17" }}
                      className="backgroundAlignTag"
                    >
                     Free
                    </Typography>
                 <div >
                 <img src={checkboxone} alt="Q__stock"/>
                 </div>
                  </BoxContainerIMage>

                  <BoxContainerIMage>
                    <Typography
                      style={{ fontSize: "14px", color: "#0E0F17" }}
                      className="backgroundAlignTag"
                    >
                     Free
                    </Typography>
                 <div >
                 <img src={checkboxone} alt="Q__stock"/>
                 </div>
                  </BoxContainerIMage>
                  <BoxContainerIMage>
                    <Typography
                      style={{ fontSize: "14px", color: "#0E0F17" }}
                      className="backgroundAlignTag"
                    >
                     Free
                    </Typography>
                 <div >
                 <AddIcon />
                 </div>
                  </BoxContainerIMage>
                  <BoxContainerIMage>
                    <Typography
                      style={{ fontSize: "14px", color: "#0E0F17" }}
                      className="backgroundAlignTag"
                    >
                     Free
                    </Typography>
                 <div >
                 <img src={checkboxone} alt="Q__stock"/>
                 </div>
                  </BoxContainerIMage>
                  <BoxContainerIMage>
                    <Typography
                      style={{ fontSize: "14px", color: "#0E0F17" }}
                      className="backgroundAlignTag"
                    >
                     Free
                    </Typography>
                 <div >
                 <AddIcon />
                 </div>
                  </BoxContainerIMage>
                 
                </Box>
              </Box>
         
           </div>

        </>

        // Customizable Area End
    );
};

// Customizable Area Start

export default FilterSearchs;
// Customizable Area End

