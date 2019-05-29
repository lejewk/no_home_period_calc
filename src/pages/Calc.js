import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CalcYearOld, CalcNoHousePeriod } from '../utils/Period';

const styles = theme => ({
  root: {
    
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});



class Calc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      hasHouse: false,
      married: false,
      birthDate: '',
      noticeDate: '',
      marryDate: '',
      noHouseDate: ''
    };
  }

  handleHasHouse = (event) => {
    this.setState({hasHouse: event.target.value === '1'});
  };

  handleMarried = (event) => {
    this.setState({married: event.target.value === '1'});
  };

  handleBirthDate = (event) => {
    this.setState({birthDate: event.target.value});
  };

  handleNoticeDate = (event) => {
    this.setState({noticeDate: event.target.value});
  };

  handleMarryDate = (event) => {
    this.setState({marryDate: event.target.value});
  };

  handleNoHouseDate = (event) => {
    this.setState({noHouseDate: event.target.value});
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      hasHouse: false,
      married: false,
      noticeDate: '',
      birthDate: '',
      marryDate: '',
      noHouseDate: ''
    });
  };

  render() {
    const { classes } = this.props;
    const { 
      activeStep, 
      hasHouse, 
      married,
      noticeDate,
      birthDate,
      marryDate,
      noHouseDate
    } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step key="현재 상황">
            <StepLabel>현재상황</StepLabel>
            <StepContent>
              <FormControl component="fieldset">
                <FormLabel component="legend">과거 주택 소유 유무</FormLabel>
                <RadioGroup
                    aria-label="hasHouse"
                    name="hasHouse"
                    value={hasHouse ? '1' : '0'}
                    onChange={this.handleHasHouse}
                    row
                >
                  <FormControlLabel value="0" control={<Radio />} label="없다" />
                  <FormControlLabel value="1" control={<Radio />} label="있다" />
                </RadioGroup>

                <FormLabel component="legend">결혼 유무</FormLabel>
                <RadioGroup
                    aria-label="married"
                    name="married"
                    value={married ? '1' : '0'}
                    onChange={this.handleMarried}
                    row
                >
                  <FormControlLabel value="0" control={<Radio />} label="미혼" />
                  <FormControlLabel value="1" control={<Radio />} label="기혼" />
                </RadioGroup>
              </FormControl>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={hasHouse === null || married === null}
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    다음
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
          <Step key="날짜 입력">
            <StepLabel>날짜 입력</StepLabel>
            <StepContent>
              <FormControl>
                <TextField
                  id="noticeDate"
                  label="공고일"
                  type="date"
                  value={noticeDate}
                  onChange={this.handleNoticeDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  className={classes.textField}
                />

                <TextField
                  id="birthDate"
                  label="생년월일"
                  type="date"
                  value={birthDate}
                  onChange={this.handleBirthDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  className={classes.textField}
                />

                {married &&
                <TextField
                  id="marryDate"
                  label="혼인신고일"
                  type="date"
                  value={marryDate}
                  onChange={this.handleMarryDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  className={classes.textField}
                />
                }
                {hasHouse &&
                <TextField
                  id="noHouseDate"
                  label="무주택자 된날"
                  type="date"
                  value={noHouseDate}
                  onChange={this.handleNoHouseDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  className={classes.textField}
                />
                }
              </FormControl>
              
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    뒤로
                  </Button>
                  <Button
                    disabled={
                      birthDate === '' || 
                      noticeDate === '' || 
                      (married && marryDate === '') || 
                      (hasHouse && noHouseDate === '')
                    }
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    계산
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        </Stepper>
        {activeStep === 2 && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>현재 만 {CalcYearOld(birthDate)} 세 입니다.</Typography>
            {married && hasHouse &&
              <Typography>결혼을 하였고 주택을 소유한적이 있습니다.</Typography>
            }
            {married && hasHouse === false &&
              <Typography>결혼을 하였고 주택을 소유한적이 없습니다.</Typography>
            }
            {married === false && hasHouse &&
              <Typography>결혼을 하지 않았고 주택을 소유한적이 있습니다.</Typography>
            }
            {married === false && hasHouse === false &&
              <Typography>결혼을 하지 않았고 주택을 소유한적이 없습니다.</Typography>
            }
            <Typography>따라서 무주택 기간은 {CalcNoHousePeriod(noticeDate, birthDate, marryDate, noHouseDate)} 입니다.</Typography>
            
            <Button
              onClick={this.handleReset} 
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              처음부터
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

Calc.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Calc);