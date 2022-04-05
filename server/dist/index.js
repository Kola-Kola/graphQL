"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var data_json_1 = __importDefault(require("./data.json"));
var PORT = 3001;
var people = data_json_1["default"];
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  enum Status {\n    PROTECTED\n    VULNERABLE\n  }\n\n  scalar Date\n\n  type People {\n    createdAt: Date!\n    id: ID!\n    fullName: String!\n    status: Status!\n    profilePicture: String!\n  }\n\n  type Query {\n    countPeople(filter: String): Int\n    people(filter: String, from: ID, limit: Int): [People]!\n  }\n"], ["\n  enum Status {\n    PROTECTED\n    VULNERABLE\n  }\n\n  scalar Date\n\n  type People {\n    createdAt: Date!\n    id: ID!\n    fullName: String!\n    status: Status!\n    profilePicture: String!\n  }\n\n  type Query {\n    countPeople(filter: String): Int\n    people(filter: String, from: ID, limit: Int): [People]!\n  }\n"])));
var formatFullName = function (_a) {
    var firstName = _a.firstName, lastName = _a.lastName;
    return "".concat(firstName, " ").concat(lastName);
};
var search = function (data, filter) {
    if (filter === void 0) { filter = ""; }
    if (!filter) {
        return data;
    }
    return data.filter(function (person) {
        var fullName = formatFullName(person);
        return fullName.toLowerCase().includes(filter.toLowerCase());
    });
};
var resolvers = {
    People: {
        fullName: formatFullName
    },
    Query: {
        countPeople: function (context, _a) {
            var filter = _a.filter;
            return search(people, filter).length;
        },
        people: function (context, _a) {
            var filter = _a.filter, from = _a.from, _b = _a.limit, limit = _b === void 0 ? Infinity : _b;
            var data = search(people, filter);
            var startIndex = data.findIndex(function (_a) {
                var id = _a.id;
                return id === from;
            }) + 1;
            var withProfilePicture = data.map(function (item, i) { return (__assign(__assign({}, item), { profilePicture: "https://picsum.photos/200/300?random=".concat(i) })); });
            return withProfilePicture.slice(startIndex, Math.max(1, limit));
        }
    }
};
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
server.listen(PORT).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80 Server ready at ".concat(url));
});
var templateObject_1;
