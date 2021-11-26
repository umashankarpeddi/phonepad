export class Combinations {
  static letterMap = {
    '0': ['0'],
    '1': ['1'],
    '2': ['a','b','c'],
    '3': ['d','e','f'],
    '4': ['g','h','i'],
    '5': ['j','k','l'],
    '6': ['m','n','o'],
    '7': ['p','q','r','s'],
    '8': ['t','u','v'],
    '9': ['w','x','y','z']
  }

  static calculatePossibleCombinations(phoneNumber: string,) {
    phoneNumber = phoneNumber.replace(/\D/g,'');
    const response = this.findCombinations(phoneNumber);
    return response;
  }

  static findCombinations(phoneNumber: any) {
    let phoneNumberLength = phoneNumber?.length;
    let combinations = [];
    if (phoneNumberLength < 7) {
      return [];
    }
    const letterCombinations = (currentPosition, numberToInsert) => {
      if (currentPosition === phoneNumber?.length) {
        combinations.push(numberToInsert);
      } else {
        let letters = (this.letterMap)[phoneNumber[currentPosition]];
        letters.forEach(letter => {
          letterCombinations(currentPosition + 1, numberToInsert + letter);
        });
      }
    }
    letterCombinations(0, "");
    return combinations;
  };
}
