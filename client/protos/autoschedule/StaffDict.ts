// Original file: protos/autoschedule.proto


export interface StaffDict {
  'userId'?: (string);
  'dailyOtLimit'?: (number);
  'weeklyOtLimit'?: (number);
  'score'?: (number);
  'fulltime'?: (number);
  '_fulltime'?: "fulltime";
}

export interface StaffDict__Output {
  'userId': (string);
  'dailyOtLimit': (number);
  'weeklyOtLimit': (number);
  'score': (number);
  'fulltime'?: (number);
  '_fulltime': "fulltime";
}
