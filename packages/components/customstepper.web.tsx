import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { StepConnector, StepLabel, Step, Stepper } from "@material-ui/core";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 18,
    left: "calc(-50% + 25px)",
    right: "calc(50% + 25px)",
  },
  active: {
    "& $line": {
      borderColor: "#000",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#000",
    },
  },
  line: {
    borderColor: "#BFC2C3",
    borderTopWidth: 1,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#F3F4F4",
    display: "flex",
    height: 40,
    width: "100%",
    alignItems: "center",
  },
  active: {
    color: "#fff",

    padding: "2px",
    border: "1px dashed #3A82FF",
    borderRadius: "50%",
    width: 32,
    height: 32,
    textAlign: "center",
    fontSize: 10,
    fontWeight: 500,
    fontFamily: "LemonMilk",
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    padding: "2px",
    backgroundColor: "currentColor",
    fontSize: 10,
    fontWeight: 500,
    fontFamily: "LemonMilk",
  },
  completed: {
    color: "#fff",
    width: 32,
    height: 32,
    borderRadius: "50%",
    zIndex: 1,
    padding: "2px",
    border: "1px dashed #3A82FF",
    fontSize: 10,
    fontWeight: 500,
    fontFamily: "LemonMilk",
  },
  completedInner: {
    height: "31px",
    width: "31px",
    borderRadius: "50%",
    background: "#3A82FF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  completedInnerPrevious: {
    height: "31px",
    width: "31px",
    borderRadius: "50%",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: "31px",
    width: "31px",
    borderRadius: "50%",
    background: "#F3F4F4",
    color: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function QontoStepIcon(props: any) {
  const classes = useQontoStepIconStyles();
  const { active, completed, icon } = props;
  return (
    <div className={clsx(classes.root)}>
      <div className={classes[completed ? "completed" : "circle"]}>
        <div
          className={
            completed
              ? classes.completedInnerPrevious
              : active
              ? classes.completedInner
              : classes.innerCircle
          }
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

function getSteps() {
  return ["Select campaign settings", "Create an ad group", "Create an ad"];
}

export default function CustomeStepper(props: any) {
  const steps = getSteps();

  return (
    <div>
      <Stepper
        alternativeLabel
        activeStep={props.activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon} />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
