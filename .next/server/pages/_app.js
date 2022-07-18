/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/contexts/auth.context.tsx":
/*!***************************************!*\
  !*** ./src/contexts/auth.context.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthProvider\": () => (/* binding */ AuthProvider),\n/* harmony export */   \"useAuth\": () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst AuthContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createContext({});\nconst AuthProvider = ({ children  })=>{\n    const [isAuth, setIsAuth] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);\n    const value = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(()=>({\n            isAuth,\n            setIsAuth\n        })\n    , [\n        isAuth\n    ]);\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/home/max/code/english-app/client/src/contexts/auth.context.tsx\",\n        lineNumber: 21,\n        columnNumber: 9\n    }, undefined));\n};\nconst useAuth = ()=>react__WEBPACK_IMPORTED_MODULE_1___default().useContext(AuthContext)\n;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dHMvYXV0aC5jb250ZXh0LnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXVEO0FBT3ZELEtBQUssQ0FBQ0MsV0FBVyxpQkFBR0QsMERBQW1CLENBQVcsQ0FBQyxDQUFDO0FBRTdDLEtBQUssQ0FBQ0csWUFBWSxJQUFjLENBQUMsQ0FBQ0MsUUFBUSxFQUFDLENBQUMsR0FBSyxDQUFDO0lBQ3hELEtBQUssRUFBRUMsTUFBTSxFQUFFQyxTQUFTLElBQUlOLHFEQUFjLENBQUMsS0FBSztJQUVoRCxLQUFLLENBQUNRLEtBQUssR0FBR1Isb0RBQWEsTUFDbkIsQ0FBQztZQUNQSyxNQUFNO1lBQ05DLFNBQVM7UUFDVixDQUFDO01BQ0QsQ0FBQ0Q7UUFBQUEsTUFBTTtJQUFBLENBQUM7SUFHVCxNQUFNLDZFQUFFSixXQUFXLENBQUNTLFFBQVE7UUFBQ0YsS0FBSyxFQUFFQSxLQUFLO2tCQUFHSixRQUFROzs7Ozs7QUFDckQsQ0FBQztBQUVNLEtBQUssQ0FBQ08sT0FBTyxPQUFTWCx1REFBZ0IsQ0FBQ0MsV0FBVyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb250ZXh0cy9hdXRoLmNvbnRleHQudHN4P2MzNTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IERpc3BhdGNoLCBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIElDb250ZXh0IHtcblx0aXNBdXRoOiBib29sZWFuO1xuXHRzZXRJc0F1dGg6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pjtcbn1cblxuY29uc3QgQXV0aENvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0PElDb250ZXh0Pih7fSBhcyBJQ29udGV4dCk7XG5cbmV4cG9ydCBjb25zdCBBdXRoUHJvdmlkZXI6IFJlYWN0LkZDID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuXHRjb25zdCBbaXNBdXRoLCBzZXRJc0F1dGhdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuXG5cdGNvbnN0IHZhbHVlID0gUmVhY3QudXNlTWVtbyhcblx0XHQoKSA9PiAoe1xuXHRcdFx0aXNBdXRoLFxuXHRcdFx0c2V0SXNBdXRoLFxuXHRcdH0pLFxuXHRcdFtpc0F1dGhdXG5cdCk7XG5cblx0cmV0dXJuIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L0F1dGhDb250ZXh0LlByb3ZpZGVyPjtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4gUmVhY3QudXNlQ29udGV4dChBdXRoQ29udGV4dCk7Il0sIm5hbWVzIjpbIlJlYWN0IiwiQXV0aENvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJpc0F1dGgiLCJzZXRJc0F1dGgiLCJ1c2VTdGF0ZSIsInZhbHVlIiwidXNlTWVtbyIsIlByb3ZpZGVyIiwidXNlQXV0aCIsInVzZUNvbnRleHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/contexts/auth.context.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! semantic-ui-css/semantic.min.css */ \"./node_modules/semantic-ui-css/semantic.min.css\");\n/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _fontsource_roboto_300_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fontsource/roboto/300.css */ \"./node_modules/@fontsource/roboto/300.css\");\n/* harmony import */ var _fontsource_roboto_300_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fontsource_roboto_300_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _fontsource_roboto_400_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fontsource/roboto/400.css */ \"./node_modules/@fontsource/roboto/400.css\");\n/* harmony import */ var _fontsource_roboto_400_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fontsource_roboto_400_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _fontsource_roboto_500_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fontsource/roboto/500.css */ \"./node_modules/@fontsource/roboto/500.css\");\n/* harmony import */ var _fontsource_roboto_500_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fontsource_roboto_500_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _fontsource_roboto_700_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fontsource/roboto/700.css */ \"./node_modules/@fontsource/roboto/700.css\");\n/* harmony import */ var _fontsource_roboto_700_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fontsource_roboto_700_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-cookie */ \"react-cookie\");\n/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_cookie__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var contexts_auth_context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! contexts/auth.context */ \"./src/contexts/auth.context.tsx\");\n\n\n\n\n\n\n\n\n\n\nconst MyApp = (props)=>{\n    const { Component , pageProps  } = props;\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(contexts_auth_context__WEBPACK_IMPORTED_MODULE_9__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_cookie__WEBPACK_IMPORTED_MODULE_8__.CookiesProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/home/max/code/english-app/client/src/pages/_app.tsx\",\n                lineNumber: 20,\n                columnNumber: 5\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/home/max/code/english-app/client/src/pages/_app.tsx\",\n            lineNumber: 19,\n            columnNumber: 4\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/home/max/code/english-app/client/src/pages/_app.tsx\",\n        lineNumber: 18,\n        columnNumber: 3\n    }, undefined));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBRVc7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUVMO0FBQ2dCO0FBQ007QUFFcEQsS0FBSyxDQUFDRyxLQUFLLElBQXVDQyxLQUFLLEdBQUssQ0FBQztJQUM1RCxLQUFLLENBQUMsQ0FBQyxDQUFDQyxTQUFTLEdBQUVDLFNBQVMsRUFBQyxDQUFDLEdBQUdGLEtBQUs7SUFFdEMsTUFBTSw2RUFDSkYsK0RBQVk7OEZBQ1hELHlEQUFlO2tHQUNkSSxTQUFTO21CQUFLQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7O0FBSTVCLENBQUM7QUFFRCxpRUFBZUgsS0FBSyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL19hcHAudHN4P2Y5ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCAnc2VtYW50aWMtdWktY3NzL3NlbWFudGljLm1pbi5jc3MnXG5cbmltcG9ydCAnQGZvbnRzb3VyY2Uvcm9ib3RvLzMwMC5jc3MnO1xuaW1wb3J0ICdAZm9udHNvdXJjZS9yb2JvdG8vNDAwLmNzcyc7XG5pbXBvcnQgJ0Bmb250c291cmNlL3JvYm90by81MDAuY3NzJztcbmltcG9ydCAnQGZvbnRzb3VyY2Uvcm9ib3RvLzcwMC5jc3MnO1xuXG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgeyBDb29raWVzUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1jb29raWUnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnY29udGV4dHMvYXV0aC5jb250ZXh0JztcblxuY29uc3QgTXlBcHA6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PEFwcFByb3BzPiA9IChwcm9wcykgPT4ge1xuXHRjb25zdCB7IENvbXBvbmVudCwgcGFnZVByb3BzIH0gPSBwcm9wcztcblxuXHRyZXR1cm4gKFxuXHRcdDxBdXRoUHJvdmlkZXI+XG5cdFx0XHQ8Q29va2llc1Byb3ZpZGVyPlxuXHRcdFx0XHQ8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG5cdFx0XHQ8L0Nvb2tpZXNQcm92aWRlcj5cblx0XHQ8L0F1dGhQcm92aWRlcj5cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29va2llc1Byb3ZpZGVyIiwiQXV0aFByb3ZpZGVyIiwiTXlBcHAiLCJwcm9wcyIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./node_modules/@fontsource/roboto/300.css":
/*!*************************************************!*\
  !*** ./node_modules/@fontsource/roboto/300.css ***!
  \*************************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/@fontsource/roboto/400.css":
/*!*************************************************!*\
  !*** ./node_modules/@fontsource/roboto/400.css ***!
  \*************************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/@fontsource/roboto/500.css":
/*!*************************************************!*\
  !*** ./node_modules/@fontsource/roboto/500.css ***!
  \*************************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/@fontsource/roboto/700.css":
/*!*************************************************!*\
  !*** ./node_modules/@fontsource/roboto/700.css ***!
  \*************************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/semantic-ui-css/semantic.min.css":
/*!*******************************************************!*\
  !*** ./node_modules/semantic-ui-css/semantic.min.css ***!
  \*******************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-cookie":
/*!*******************************!*\
  !*** external "react-cookie" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-cookie");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();