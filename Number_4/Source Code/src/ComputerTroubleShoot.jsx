import React, { useState, useEffect } from 'react';
import { StugnaES } from 'stugna-es';
import stugna from 'stugna-es';

import "./ComputerTroubleshoot.css";

import computerMouse from "./assets/img/mouse.png";
import computerKeyboard from "./assets/img/keyboard.png";
import computerMonitor from "./assets/img/monitor.png";
import headphone from "./assets/img/headphones.png";
import technician from "./assets/img/technician.png";
import screw from "./assets/img/screwdriver.png";


// mouse
import realMouse from "./assets/img/mouse_real.png";
// import blackScreenMonitor from "./assets/img/monitor_black.png";
import mouseDriver from "./assets/img/mouse_driver.jpg";
import consultTechnician from "./assets/img/technician_works.png";
import mouseUSB from "./assets/img/usb_mouse.jpg";


// keyboard
import keyboardDriver from "./assets/img/keyboard_install.jpg";
import realKeyboard from "./assets/img/keyboard_real.png";

// Monitor
import realMonitor from "./assets/img/monitor_real.png";
import monitorDriver from "./assets/img/monitor_driver.jpg";
import monitorON from "./assets/img/monitor_on.jpg";
import monitorUSB from "./assets/img/monitor_connect.jpg";
import monitorCable from "./assets/img/monitor_cable.png";

// Headphone
import realHeadphone from "./assets/img/headphone_real.png";
import headphoneDriver from "./assets/img/audio_driver.jpg";
import headphoneUSB from "./assets/img/headphone_connect.png";

export default function ComputerTroubleShoot() {
  const [hardwareDetails, setHardwareDetails] = useState(null);
  const [reply, setReply] = useState(null);
  const [selectedHardware, setSelectedHardware] = useState(null);
  const [response, setUserResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  const [hardwareButtons, showHardwareButtons] = useState(true);
  const [optionButtons, showOptionButtons] = useState(false);
  const [returnButton, showReturnButton] = useState(false);

  // mouse troubleshoot
  const [mouseDrive, showMouseDriver] = useState(false);
  const [mouseConnect, showMouseConnect] = useState(false);
  const [consult, showConsultTechnician] = useState(false);
  const [buyMouse, showMouse] = useState(false);
  
  // keyboard troubleshoot
  const [keyDriver, showKeyboardInstall] = useState(false);
  const [keyboardConnect, showKeyboardConnect] = useState(false);
  const [buyKeyboard, showKeyboard] = useState(false);

  //  Monitor troubleshoot
  const [monitorGraphicsDrivers, showMonitorGraphicsDrivers] = useState(false);
  const [monitorConnect, showMonitorConnect] = useState(false);
  const [buyMonitor, showMonitor] = useState(false);
  const [onMonitor, showOnMonitor] = useState(false);
  const [cableMonitor, showCableMonitor] = useState(false);

  // Headphone troubleshoot
  const [headphoneDrive, showHeadphoneDriver] = useState(false);
  const [headphoneConnect, showHeadphoneConnect] = useState(false);
  const [buyHeadphone, showHeadphone] = useState(false);


  const es = new StugnaES();

  let rulesData = [
    {
      condition: "computerHardware = 'mouse'",
      factName: "hardwareToTroubleshoot",
      factValue: "mouse",
      description: "This is mouse",
    },
    {
      condition: "computerHardware = 'keyboard'",
      factName: "hardwareToTroubleshoot",
      factValue: "keyboard",
      description: "This is keyboard",
    },
    {
      condition: "computerHardware = 'monitor'",
      factName: "hardwareToTroubleshoot",
      factValue: "monitor",
      description: "This is monitor",
    },
    {
      condition: "computerHardware = 'headphone'",
      factName: "hardwareToTroubleshoot",
      factValue: "headphone",
      description: "This is headphone",
    },
  ];

  es.rulesImport(rulesData);

    const getUnknownFacts = (hardware) => {
      let factsData = [
        {
          name: "computerHardware",
          value: hardware,
        },
      ];
      es.factsImport(factsData);

      const factWanted = es.factGet("hardwareToTroubleshoot");
      console.log(factWanted);
      setSelectedHardware(hardware);
      showHardwareButtons(false);
      showOptionButtons(true);
      setHardwareDetails(true);

      setReply(`Is your ${hardware} physically connected?`);
    };

  const handleUserResponse = (userResponse) => {
    setUserResponse(userResponse);

    switch (selectedHardware) {
      case 'mouse':
        if (currentStep === 0) {
          if (userResponse === 'no') {
            setReply("Try checking the mouse connection.");
            showOptionButtons(false);
            showMouseConnect(true);
          } else {
            setReply("Is the mouse driver installed?");
          }
          break;
        } else if (currentStep === 1) {
          if (userResponse === 'no') {
            setReply("Install the mouse driver.");
            showOptionButtons(false);
            showMouseDriver(true);
          } else {
            setReply("Is it working on another computer?");
            break;
          }
        } else if (currentStep === 2) {
          if (userResponse === 'yes') {
            setReply("Please bring this to a computer technician.");
            showOptionButtons(false);
            showConsultTechnician(true);
          } else {
            setReply("I suggest you buy a new mouse.");
            showOptionButtons(false);
            showMouse(true);
          }
        }
      break;
      case 'keyboard':
        if (currentStep === 0) {
          if (userResponse === 'no') {
            setReply("Try checking the keyboard connection.");
            showOptionButtons(false);
            showKeyboardConnect(true);
          } else {
            setReply("Is the keyboard driver installed?");
          }
          break;
        } else if (currentStep === 1) {
          if (userResponse === 'no') {
            setReply("Install the keyboard driver.");
            showKeyboardInstall(true);
            showOptionButtons(false);
          } else {
            setReply("Is it working on another computer?");
            break;
          }
        } else if (currentStep === 2) {
          if (userResponse === 'yes') {
            setReply("Please bring this to a computer technician.");
            showOptionButtons(false);
            showConsultTechnician(true);
          } else {
            setReply("I suggest you buy a new keyboard.");
            showOptionButtons(false);
            showKeyboard(true);
          }
        }
      break;
      case 'monitor':
        if (currentStep === 0) {
          if (userResponse === 'no') {
            setReply("Try checking the monitor connection.");
            showOptionButtons(false);
            showMonitorConnect(true);
          } else {
            setReply("Is the monitor turned on?");
          }
          break;
        } if (currentStep === 1) {
          if (userResponse === 'no') {
            setReply("Turn on the computer");
            showOptionButtons(false);
            showOnMonitor(true);
          } else {
            setReply("Is the graphics driver installed?");
          }
          break;
        } else if (currentStep === 2) {
          if (userResponse === 'no') {
            setReply("Install the graphics driver.");
            showMonitorGraphicsDrivers(true);
            showOptionButtons(false);
          } else {
            setReply("Have you tried different cable");
            break;
          }
        } else if (currentStep === 3) {
          if (userResponse === 'no') {
            setReply("Try using a different video cable (e.g., HDMI, VGA) to connect the monitor to the computer.");
            showCableMonitor(true);
            showOptionButtons(false);
          } else {
            setReply("Is it working on another computer?");
            break;
          }
        } else if (currentStep === 4) {
          if (userResponse === 'yes') {
            setReply("Please bring this to a computer technician.");
            showOptionButtons(false);
            showConsultTechnician(true);
          } else {
            setReply("I suggest you buy a new monitor.");
            showOptionButtons(false);
            showMonitor(true);
          }
        }
      break;
      case 'headphone':
        if (currentStep === 0) {
          if (userResponse === 'no') {
            setReply("Check that your headphone plug is in the correct audio jack securely.");
            showOptionButtons(false);
            showHeadphoneConnect(true);
          } else {
            setReply("Is the audio driver installed?");
          }
          break;
        } else if (currentStep === 1) {
          if (userResponse === 'no') {
            setReply("Install the audio driver.");
            showHeadphoneDriver(true);
            showOptionButtons(false);
          } else {
            setReply("Is it working on another computer?");
            break;
          }
        } else if (currentStep === 2) {
          if (userResponse === 'yes') {
            setReply("Please bring this to a computer technician.");
            showOptionButtons(false);
            showConsultTechnician(true);
          } else {
            setReply("I suggest you buy a new heaphone.");
            showOptionButtons(false);
            showHeadphone(true);
          }
        }
      break;
    }

    // Increment the step for the next question
    setCurrentStep(currentStep + 1);
  };

  const toggleReturn = () => {
    setReply(null);
    showHardwareButtons(true);
    setSelectedHardware(null); 
    setUserResponse(null);
    setCurrentStep(0);
    setHardwareDetails(false);
  }


  // Set the initial reply when the user selects 'mouse'
  return (
    <div className='container'>
      <div className='content'>

      <div className='container-title'>
        <h1>Computer Troubleshooting Solution</h1>
        <div className='title-img'>
          <img src={screw} alt="Screwdriver" />
        </div>
      </div>
      <div className='guide'>
        <img src={technician} alt="Technician" />
        <div className='guide-content'>
          <div className="hardware-description">
            {hardwareDetails && 
              (<p><span className='hard'>Hardware </span><span>{rulesData.find((rules) => rules.factValue === selectedHardware)?.factValue || null} </span></p> )
            }
          </div> 
          <div className='prompt'>
            <p>
              <span>Prompt:</span> {reply === null
                ? "Select the hardware you want to troubleshoot."
                : reply}
            </p>
          </div>
        </div>
      </div>
      {hardwareButtons && (
        <div className='hardware-buttons'>
          <div onClick={() => getUnknownFacts('mouse')} className='computer-hardware'>
            <img src={computerMouse} alt="Mouse" />
            <p>Mouse</p>
          </div>
          <div onClick={() => getUnknownFacts('keyboard')} className='computer-hardware'>
            <img src={computerKeyboard} alt="Keyboard" />
            <p>Keyboard</p>
          </div>
          <div onClick={() => getUnknownFacts('monitor')} className='computer-hardware'>
            <img src={computerMonitor} alt="Monitor" />
            <p>Monitor</p>
          </div>
          <div onClick={() => getUnknownFacts('headphone')} className='computer-hardware'>
            <img src={headphone} alt="Headphone" />
            <p>Headphone</p>
          </div>
        </div>
      )}
      {optionButtons && (
        <div className='option-buttons'>
          <div className="btn option"
            onClick={() => handleUserResponse('yes')}
          >
            YES
          </div>
          <div className='btn option'
            onClick={() => handleUserResponse('no')}
          >
            NO
          </div>
        </div>
      )}

      {
        mouseConnect && (
          <div className='hardwares'>
            <img src={mouseUSB}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showMouseConnect(false)}}>
              Return
            </div>
          </div>
        )
      }
      {
        mouseDrive && (
          <div className='hardwares'>
            <img src={mouseDriver}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showMouseDriver(false)}}>
              Return
            </div>
          </div>
        )

      }
      {
        buyMouse && (
          <div className='hardwares'>
            <img src={realMouse}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showMouse(false)}}>
              Return
            </div>
          </div>
        )

      }
      {
        consult && (
          <div className='hardwares'>
            <img src={consultTechnician}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showConsultTechnician(false)}}>
              Return
            </div>
          </div>
        )

      }
      {
        keyboardConnect && (
          <div className='hardwares'>
            <img src={mouseUSB}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showKeyboardConnect(false)}}>
              Return
            </div>
          </div>
        )

      }
      {
        keyDriver && (
          <div className='hardwares'>
            <img src={keyboardDriver}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showKeyboardInstall(false)}}>
              Return
            </div>
          </div>
        )

      }
      {
        buyKeyboard && (
          <div className='hardwares'>
            <img src={realKeyboard}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showKeyboard(false)}}>
              Return
            </div>
          </div>
        )
      }
      {
        monitorConnect && (
          <div className='hardwares'>
            <img src={monitorUSB}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showMonitorConnect(false)}}>
              Return
            </div>
          </div>
        )
      }
      {
        onMonitor && (
          <div className='hardwares'>
            <img src={monitorON}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showOnMonitor(false)}}>
              Return
            </div>
          </div>
        )
      }
      {
        monitorGraphicsDrivers && (
          <div className='hardwares'>
            <img src={monitorDriver}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showMonitorGraphicsDrivers(false)}}>
              Return
            </div>
          </div>
        )
      }
      {
        buyMonitor && (
          <div className='hardwares'>
            <img src={realMonitor}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showMonitor(false)}}>
              Return
            </div>
          </div>
        )
      }
      {
        cableMonitor && (
          <div className='hardwares'>
            <img src={monitorCable}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showCableMonitor(false)}}>
              Return
            </div>
          </div>
        )
      }
      {
        headphoneConnect && (
          <div className='hardwares h-headphone'>
            <img src={headphoneUSB}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showHeadphoneConnect(false)}}>
              Return
            </div>
          </div>
        )

      }
      {
        headphoneDrive && (
          <div className='hardwares'>
            <img src={headphoneDriver}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showHeadphoneDriver(false)}}>
              Return
            </div>
          </div>
        )

      }
      {
        buyHeadphone && (
          <div className='hardwares'>
            <img src={realHeadphone}/>
            <div className='btn return-button' onClick={() => {toggleReturn(); showHeadphone(false)}}>
              Return
            </div>  
          </div>
        )
      }
      </div>
    </div>
  );
};
