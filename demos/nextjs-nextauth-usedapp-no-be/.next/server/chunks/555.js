exports.id = 555;
exports.ids = [555];
exports.modules = {

/***/ 8658:
/***/ ((module) => {

// Exports
module.exports = {
	"nav": "Navbar_nav__rKVy1",
	"tab": "Navbar_tab__B69sr",
	"active": "Navbar_active__tcmKY"
};


/***/ }),

/***/ 9267:
/***/ ((module) => {

// Exports
module.exports = {
	"option": "Option_option__8_CNM",
	"disabled": "Option_disabled__5OOVw",
	"info": "Option_info__bEhBH",
	"name": "Option_name__kQOPQ"
};


/***/ }),

/***/ 3307:
/***/ ((module) => {

// Exports
module.exports = {
	"main": "Default_main__GFtQ8",
	"container": "Default_container__pFZPW",
	"footer": "Default_footer__GIca_",
	"links": "Default_links__mM2mN",
	"link": "Default_link__IxJaZ"
};


/***/ }),

/***/ 5470:
/***/ ((module) => {

// Exports
module.exports = {
	"header__wrapper": "Header_header__wrapper__tt7qX",
	"nav": "Header_nav___5aPN",
	"logo": "Header_logo__B3chz"
};


/***/ }),

/***/ 7069:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "h": () => (/* reexport */ Meta_Meta)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: ./app/components/elements/Meta/Meta.tsx


const Meta = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("title", {
                children: "Moralis Demo NextJS with NextAuth"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "description",
                content: "Moralis Demo NextJS with NextAuth"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "icon",
                href: "/favicon.ico"
            })
        ]
    });
};
/* harmony default export */ const Meta_Meta = (Meta);

;// CONCATENATED MODULE: ./app/components/elements/Meta/index.ts



/***/ }),

/***/ 5395:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "h_": () => (/* reexport */ Meta/* Meta */.h),
  "wp": () => (/* reexport */ Navbar_Navbar),
  "Wx": () => (/* reexport */ Option_Option)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./app/components/elements/buttons/Option/Option.module.css
var Option_module = __webpack_require__(9267);
var Option_module_default = /*#__PURE__*/__webpack_require__.n(Option_module);
;// CONCATENATED MODULE: ./app/components/elements/buttons/Option/Option.tsx



const Option = ({ name , logoPath , onClick , disabled  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: `${(Option_module_default()).option} ${disabled && (Option_module_default()).disabled}`,
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (Option_module_default()).info,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        src: logoPath,
                        alt: name,
                        width: 40,
                        height: 40
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: (Option_module_default()).name,
                        children: name
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                src: "/assets/chevronRight.svg",
                alt: "chevronRight",
                width: 24,
                height: 24
            })
        ]
    });
};
/* harmony default export */ const Option_Option = (Option);

;// CONCATENATED MODULE: ./app/components/elements/buttons/Option/index.ts


;// CONCATENATED MODULE: ./app/components/elements/buttons/index.ts


// EXTERNAL MODULE: ./app/components/elements/Meta/index.ts + 1 modules
var Meta = __webpack_require__(7069);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./app/components/elements/Navbar/Navbar.module.css
var Navbar_module = __webpack_require__(8658);
var Navbar_module_default = /*#__PURE__*/__webpack_require__.n(Navbar_module);
;// CONCATENATED MODULE: ./app/components/elements/Navbar/Navbar.tsx




const pages = [
    {
        href: "/",
        name: "User"
    },
    {
        href: "/private",
        name: "Private Page"
    }, 
];
const Navbar = ()=>{
    const { pathname  } = (0,router_.useRouter)();
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (Navbar_module_default()).nav,
        children: pages.map(({ href , name  })=>/*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: href,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                    className: `${(Navbar_module_default()).tab} ${href === pathname ? (Navbar_module_default()).active : null}`,
                    children: [
                        " ",
                        name
                    ]
                })
            }, name))
    });
};
/* harmony default export */ const Navbar_Navbar = (Navbar);

;// CONCATENATED MODULE: ./app/components/elements/Navbar/index.ts


;// CONCATENATED MODULE: ./app/components/elements/index.ts





/***/ }),

/***/ 3555:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "g": () => (/* reexport */ Default_Default)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./app/components/modules/Header/index.ts + 1 modules
var Header = __webpack_require__(3897);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./app/components/layouts/Default/Default.module.css
var Default_module = __webpack_require__(3307);
var Default_module_default = /*#__PURE__*/__webpack_require__.n(Default_module);
;// CONCATENATED MODULE: ./app/components/layouts/Default/Default.tsx




const links = [
    {
        name: "Forum",
        href: "https://moralis.io/"
    },
    {
        name: "Discord",
        href: "https://moralis.io/joindiscord/"
    },
    {
        name: "Docs",
        href: "https://docs.moralis.io/introduction/readme"
    },
    {
        name: "Blog",
        href: "https://moralis.io/blog/"
    },
    {
        name: "Youtube",
        href: "https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw"
    }, 
];
const Default = ({ children  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Default_module_default()).container,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Header/* Header */.h, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: (Default_module_default()).main,
                children: children
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("footer", {
                className: (Default_module_default()).footer,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (Default_module_default()).links,
                        children: links.map(({ href , name  })=>/*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: href,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: (Default_module_default()).link,
                                children: name
                            }, name))
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://moralis.io/",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            src: "/assets/poweredByMoralis.svg",
                            alt: "Powered By Moralis Logo",
                            width: 173,
                            height: 28
                        })
                    })
                ]
            })
        ]
    });
/* harmony default export */ const Default_Default = (Default);

;// CONCATENATED MODULE: ./app/components/layouts/Default/index.ts



/***/ }),

/***/ 3897:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "h": () => (/* reexport */ Header_Header)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./app/components/elements/index.ts + 5 modules
var components_elements = __webpack_require__(5395);
// EXTERNAL MODULE: ./node_modules/next/dynamic.js
var dynamic = __webpack_require__(5152);
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./app/components/modules/Header/Header.module.css
var Header_module = __webpack_require__(5470);
var Header_module_default = /*#__PURE__*/__webpack_require__.n(Header_module);
;// CONCATENATED MODULE: ./app/components/modules/Header/Header.tsx





const WalletInfo = dynamic_default()(null, {
    loadableGenerated: {
        modules: [
            "..\\app\\components\\modules\\Header\\Header.tsx -> " + "../WalletInfo/WalletInfo"
        ]
    },
    ssr: false
});

const Header = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("header", {
        className: (Header_module_default()).header__wrapper,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
            className: (Header_module_default()).nav,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            alt: "Moralis-Logo-LightBG",
                            className: (Header_module_default()).logo,
                            height: 30,
                            src: "/Moralis-Logo-LightBG.svg",
                            width: 125
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(components_elements/* Navbar */.wp, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(WalletInfo, {})
            ]
        })
    });
};
/* harmony default export */ const Header_Header = (Header);

;// CONCATENATED MODULE: ./app/components/modules/Header/index.ts



/***/ })

};
;