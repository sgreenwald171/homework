'use strict';

function trackDosage(medicationName, initialDosage) {
  return {
    getInstructions() {
      return `Take ${initialDosage}mg of ${medicationName}`;
    },
    adjustDosage(doctorPin, newDosage) {
      if (doctorPin === 2387 && newDosage > 0) {
        initialDosage = newDosage;
      } else {
        throw new Error('Restricted');
      }
    }
  };
}

const Sam = trackDosage('Aspirin', 50);
console.log(Sam.getInstructions());
Sam.adjustDosage(2387, 69);
console.log(Sam.getInstructions());