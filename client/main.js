"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.generateSchedule = void 0;
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var PROTO_PATH = __dirname + '/protos/autoschedule.proto';
var days = {
    0: { "start": 0, "end": 2 },
    1: { "start": 2, "end": 4 },
    2: { "start": 4, "end": 7 },
    3: { "start": 7, "end": 8 },
    4: { "start": 8, "end": 10 },
    5: { "start": 10, "end": 16 },
    6: { "start": 16, "end": 21 }
};
var shiftSlots = {
    0: { 'shiftSlotId': 0, 'start': 12, 'end': 20, 'hours': 8 },
    1: { 'shiftSlotId': 1, 'start': 8, 'end': 16, 'hours': 8 },
    2: { 'shiftSlotId': 2, 'start': 3, 'end': 5, 'hours': 2 },
    3: { 'shiftSlotId': 3, 'start': 0, 'end': 8, 'hours': 8 },
    4: { 'shiftSlotId': 4, 'start': 8, 'end': 15, 'hours': 7 },
    5: { 'shiftSlotId': 5, 'start': 5, 'end': 10, 'hours': 5 },
    6: { 'shiftSlotId': 6, 'start': 8, 'end': 14, 'hours': 6 },
    7: { 'shiftSlotId': 7, 'start': 8, 'end': 16, 'hours': 8 },
    8: { 'shiftSlotId': 8, 'start': 8, 'end': 16, 'hours': 8 },
    9: { 'shiftSlotId': 9, 'start': 2, 'end': 22, 'hours': 20 },
    10: { 'shiftSlotId': 10, 'start': 10, 'end': 18, 'hours': 8 },
    11: { 'shiftSlotId': 11, 'start': 12, 'end': 20, 'hours': 8 },
    12: { 'shiftSlotId': 12, 'start': 14, 'end': 22, 'hours': 8 },
    13: { 'shiftSlotId': 13, 'start': 16, 'end': 24, 'hours': 8 },
    14: { 'shiftSlotId': 14, 'start': 10, 'end': 18, 'hours': 8 },
    // overlapping shiftSlots across day
    15: { 'shiftSlotId': 15, 'start': 19, 'end': 5, 'hours': 10 },
    16: { 'shiftSlotId': 16, 'start': 13, 'end': 23, 'hours': 10 },
    17: { 'shiftSlotId': 17, 'start': 11, 'end': 21, 'hours': 10 },
    18: { 'shiftSlotId': 18, 'start': 13, 'end': 16, 'hours': 3 },
    19: { 'shiftSlotId': 19, 'start': 2, 'end': 3, 'hours': 1 },
    20: { 'shiftSlotId': 20, 'start': 1, 'end': 5, 'hours': 4 }
};
var staffDicts = {
    0: { 'userId': 'marcus', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 1, 'fulltime': 1 },
    1: { 'userId': 'cherry', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 2, 'fulltime': 1 },
    2: { 'userId': 'daniel', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 3, 'fulltime': 1 },
    3: { 'userId': 'elijah', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 4, 'fulltime': 1 },
    4: { 'userId': 'phillip', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 5, 'fulltime': 1 },
    5: { 'userId': 'marcel', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 6, 'fulltime': 1 },
    6: { 'userId': 'winston', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 7, 'fulltime': 1 },
    7: { 'userId': 'arial', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 8, 'fulltime': 1 },
    8: { 'userId': 'tina', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 9, 'fulltime': 1 },
    9: { 'userId': 'marcus_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 10, 'fulltime': 0 },
    10: { 'userId': 'cherry_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 11, 'fulltime': 0 },
    11: { 'userId': 'daniel_1', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 12, 'fulltime': 0 },
    12: { 'userId': 'elijah_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 13, 'fulltime': 0 },
    13: { 'userId': 'phillip_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 14, 'fulltime': 0 },
    14: { 'userId': 'marcel_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 46, 'score': 15, 'fulltime': 0 },
    15: { 'userId': 'winston_1', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 16, 'fulltime': 0 },
    16: { 'userId': 'arial_1', 'dailyOtLimit': 8, 'weeklyOtLimit': 44, 'score': 17, 'fulltime': 0 },
    17: { 'userId': 'tina_1', 'dailyOtLimit': 10, 'weeklyOtLimit': 46, 'score': 18, 'fulltime': 0 }
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
var protoObj = (grpc.loadPackageDefinition(packageDefinition));
var autoschedule = protoObj.autoschedule;
var client = new autoschedule.AutoSchedule('localhost:50051', grpc.credentials.createInsecure());
var fetchSchedule = function (_a) {
    var days = _a.days, shiftSlots = _a.shiftSlots, staffDicts = _a.staffDicts;
    return new Promise(function (resolve, reject) {
        client.GenerateSchedule({ days: days, shiftSlots: shiftSlots, staffDicts: staffDicts }, function (err, response) {
            if (err) {
                return reject(err);
            }
            var staffSchedules = Object.entries(response.schedules)
                .map(function (_a) {
                var _b;
                var key = _a[0], value = _a[1];
                return (_b = {}, _b[key] = value.schedule, _b);
            })
                .reduce(function (obj, value) { return Object.assign(obj, value); }, {});
            return resolve(staffSchedules);
        });
    });
};
exports.generateSchedule = function (_a) {
    var days = _a.days, shiftSlots = _a.shiftSlots, staffDicts = _a.staffDicts;
    return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchSchedule({ days: days, shiftSlots: shiftSlots, staffDicts: staffDicts })];
                case 1:
                    result = _b.sent();
                    console.log(result);
                    return [2 /*return*/, result];
                case 2:
                    error_1 = _b.sent();
                    console.error("ERROR:" + error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.generateSchedule({ days: days, shiftSlots: shiftSlots, staffDicts: staffDicts });
